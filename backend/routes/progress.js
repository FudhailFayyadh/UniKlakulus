const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateProgressUpdate = [
  body('topic')
    .isIn(['limit', 'derivative', 'integral'])
    .withMessage('Topic must be one of: limit, derivative, integral'),
  body('score')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100'),
  body('timeSpent')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Time spent must be a positive integer (in minutes)'),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean value')
];

const validateQuizResult = [
  body('topic')
    .isIn(['limit', 'derivative', 'integral', 'mixed'])
    .withMessage('Topic must be one of: limit, derivative, integral, mixed'),
  body('score')
    .isFloat({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100'),
  body('totalQuestions')
    .isInt({ min: 1 })
    .withMessage('Total questions must be at least 1'),
  body('correctAnswers')
    .isInt({ min: 0 })
    .withMessage('Correct answers must be non-negative'),
  body('timeSpent')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Time spent must be non-negative (in seconds)'),
  body('answers')
    .optional()
    .isArray()
    .withMessage('Answers must be an array')
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// @route   GET /api/progress
// @desc    Get user's learning progress
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('progress stats quizResults')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Calculate additional progress metrics
    const progressMetrics = {
      overallCompletion: Object.values(user.progress).filter(topic => topic.completed).length,
      totalTopics: 3,
      averageScore: user.stats.averageScore || 0,
      totalTimeSpent: user.stats.totalTimeSpent || 0,
      recentActivity: user.quizResults
        .filter(quiz => {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return quiz.completedAt >= oneWeekAgo;
        })
        .length
    };

    res.json({
      success: true,
      progress: {
        topics: user.progress,
        metrics: progressMetrics,
        recentQuizzes: user.quizResults
          .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
          .slice(0, 5)
      }
    });

  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching progress'
    });
  }
});

// @route   PUT /api/progress/topic
// @desc    Update progress for a specific topic
// @access  Private
router.put('/topic', authMiddleware, validateProgressUpdate, handleValidationErrors, async (req, res) => {
  try {
    const { topic, score, timeSpent, completed } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update topic progress
    const progressData = {};
    if (score !== undefined) progressData.score = Math.max(user.progress[topic].score, score); // Keep highest score
    if (timeSpent !== undefined) progressData.timeSpent = user.progress[topic].timeSpent + timeSpent;
    if (completed !== undefined) progressData.completed = completed;

    user.updateProgress(topic, progressData);

    // Update learning streak
    const today = new Date();
    const lastActiveDate = user.stats.lastActiveDate ? new Date(user.stats.lastActiveDate) : null;
    
    if (!lastActiveDate || lastActiveDate.toDateString() !== today.toDateString()) {
      // Different day, check if consecutive
      if (lastActiveDate) {
        const daysDiff = Math.floor((today - lastActiveDate) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          user.stats.streakDays = (user.stats.streakDays || 0) + 1;
        } else if (daysDiff > 1) {
          user.stats.streakDays = 1; // Reset streak
        }
      } else {
        user.stats.streakDays = 1; // First day
      }
    }

    await user.save();

    res.json({
      success: true,
      message: 'Progress updated successfully',
      progress: user.progress[topic],
      streak: user.stats.streakDays
    });

  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating progress'
    });
  }
});

// @route   POST /api/progress/quiz-result
// @desc    Save quiz result and update progress
// @access  Private
router.post('/quiz-result', authMiddleware, validateQuizResult, handleValidationErrors, async (req, res) => {
  try {
    const {
      topic,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent = 0,
      answers = []
    } = req.body;

    const userId = req.user._id;

    // Validate that correctAnswers doesn't exceed totalQuestions
    if (correctAnswers > totalQuestions) {
      return res.status(400).json({
        success: false,
        message: 'Correct answers cannot exceed total questions'
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create quiz result object
    const quizResult = {
      topic,
      score,
      totalQuestions,
      correctAnswers,
      timeSpent,
      completedAt: new Date(),
      answers: answers.map(answer => ({
        questionId: answer.questionId,
        questionText: answer.questionText,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: answer.correctAnswer,
        isCorrect: answer.isCorrect,
        timeSpent: answer.timeSpent || 0
      }))
    };

    // Add quiz result using the model method
    user.addQuizResult(quizResult);

    // Update topic progress if it's not a mixed quiz
    if (topic !== 'mixed') {
      const currentTopicScore = user.progress[topic].score;
      const newTopicScore = Math.max(currentTopicScore, score);
      const timeInMinutes = Math.round(timeSpent / 60);

      user.updateProgress(topic, {
        score: newTopicScore,
        timeSpent: timeInMinutes,
        completed: newTopicScore >= 70 // Consider 70% as completion threshold
      });
    }

    // Update learning streak (same logic as topic update)
    const today = new Date();
    const lastActiveDate = user.stats.lastActiveDate ? new Date(user.stats.lastActiveDate) : null;
    
    if (!lastActiveDate || lastActiveDate.toDateString() !== today.toDateString()) {
      if (lastActiveDate) {
        const daysDiff = Math.floor((today - lastActiveDate) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          user.stats.streakDays = (user.stats.streakDays || 0) + 1;
        } else if (daysDiff > 1) {
          user.stats.streakDays = 1;
        }
      } else {
        user.stats.streakDays = 1;
      }
    }

    await user.save();

    // Calculate performance feedback
    const percentage = (correctAnswers / totalQuestions) * 100;
    let performanceLevel = 'poor';
    let message = 'Keep practicing! You can do better.';

    if (percentage >= 90) {
      performanceLevel = 'excellent';
      message = 'Outstanding! You have mastered this topic!';
    } else if (percentage >= 80) {
      performanceLevel = 'good';
      message = 'Great job! You have a solid understanding.';
    } else if (percentage >= 70) {
      performanceLevel = 'average';
      message = 'Good work! A little more practice will help.';
    }

    res.json({
      success: true,
      message: 'Quiz result saved successfully',
      result: {
        score,
        percentage: Math.round(percentage),
        performanceLevel,
        feedback: message,
        newPersonalBest: topic !== 'mixed' && score > (user.progress[topic].score - score),
        streak: user.stats.streakDays,
        totalQuizzesTaken: user.stats.totalQuizzesTaken
      }
    });

  } catch (error) {
    console.error('Save quiz result error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving quiz result'
    });
  }
});

// @route   GET /api/progress/analytics
// @desc    Get detailed analytics for user progress
// @access  Private
router.get('/analytics', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('progress stats quizResults createdAt')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Time-based analytics
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const recentQuizzes = user.quizResults.filter(quiz => quiz.completedAt >= last30Days);
    const weeklyQuizzes = user.quizResults.filter(quiz => quiz.completedAt >= last7Days);

    // Topic performance analytics
    const topicAnalytics = {};
    ['limit', 'derivative', 'integral'].forEach(topic => {
      const topicQuizzes = user.quizResults.filter(quiz => quiz.topic === topic);
      const topicScores = topicQuizzes.map(quiz => quiz.score);
      
      topicAnalytics[topic] = {
        totalQuizzes: topicQuizzes.length,
        averageScore: topicScores.length > 0 ? Math.round(topicScores.reduce((a, b) => a + b, 0) / topicScores.length) : 0,
        bestScore: topicScores.length > 0 ? Math.max(...topicScores) : 0,
        latestScore: topicScores.length > 0 ? topicScores[topicScores.length - 1] : 0,
        improvement: topicScores.length >= 2 ? topicScores[topicScores.length - 1] - topicScores[0] : 0,
        completed: user.progress[topic].completed,
        timeSpent: user.progress[topic].timeSpent
      };
    });

    // Learning pattern analytics
    const studyDays = [...new Set(user.quizResults.map(quiz => 
      quiz.completedAt.toDateString()
    ))].length;

    const averageSessionTime = recentQuizzes.length > 0 
      ? Math.round(recentQuizzes.reduce((sum, quiz) => sum + (quiz.timeSpent || 0), 0) / recentQuizzes.length / 60)
      : 0;

    // Progress velocity (quizzes per week)
    const membershipWeeks = Math.ceil((now - new Date(user.createdAt)) / (1000 * 60 * 60 * 24 * 7));
    const quizzesPerWeek = membershipWeeks > 0 ? Math.round(user.quizResults.length / membershipWeeks * 10) / 10 : 0;

    res.json({
      success: true,
      analytics: {
        overview: {
          totalQuizzes: user.quizResults.length,
          recentQuizzes: recentQuizzes.length,
          weeklyQuizzes: weeklyQuizzes.length,
          averageScore: user.stats.averageScore,
          studyStreak: user.stats.streakDays,
          totalStudyDays: studyDays,
          memberSince: user.createdAt
        },
        performance: {
          topicAnalytics,
          averageSessionTime,
          quizzesPerWeek,
          completionRate: Math.round((Object.values(user.progress).filter(topic => topic.completed).length / 3) * 100)
        },
        trends: {
          last7Days: weeklyQuizzes.map(quiz => ({
            date: quiz.completedAt,
            score: quiz.score,
            topic: quiz.topic
          })),
          monthlyProgress: recentQuizzes.reduce((acc, quiz) => {
            const week = Math.floor((now - quiz.completedAt) / (1000 * 60 * 60 * 24 * 7));
            const weekKey = `week_${week}`;
            if (!acc[weekKey]) acc[weekKey] = [];
            acc[weekKey].push(quiz.score);
            return acc;
          }, {})
        }
      }
    });

  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics'
    });
  }
});

// @route   POST /api/progress/study-session
// @desc    Log a study session (reading material, watching videos)
// @access  Private
router.post('/study-session', 
  authMiddleware,
  [
    body('topic')
      .isIn(['limit', 'derivative', 'integral'])
      .withMessage('Topic must be one of: limit, derivative, integral'),
    body('duration')
      .isInt({ min: 1 })
      .withMessage('Duration must be at least 1 minute'),
    body('activity')
      .isIn(['reading', 'video', 'practice'])
      .withMessage('Activity must be one of: reading, video, practice')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { topic, duration, activity } = req.body;
      const userId = req.user._id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Update topic progress with study time
      user.updateProgress(topic, {
        timeSpent: duration // duration is added to existing time in updateProgress method
      });

      // Update overall stats
      user.stats.totalTimeSpent += duration;
      
      await user.save();

      res.json({
        success: true,
        message: 'Study session logged successfully',
        session: {
          topic,
          duration,
          activity,
          totalTopicTime: user.progress[topic].timeSpent,
          totalStudyTime: user.stats.totalTimeSpent
        }
      });

    } catch (error) {
      console.error('Log study session error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while logging study session'
      });
    }
  }
);

module.exports = router;