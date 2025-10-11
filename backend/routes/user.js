const express = require('express');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile (alias for auth/me)
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .lean();

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   GET /api/user/dashboard
// @desc    Get user dashboard data
// @access  Private
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      dashboard: {
        user: {
          name: user.name,
          email: user.email,
          joinDate: user.createdAt,
          lastLogin: user.lastLogin
        },
        message: 'Dashboard loaded successfully'
      }
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard'
    });
  }
});

// @route   GET /api/user/quiz-history
// @desc    Get user quiz history with pagination
// @access  Private
router.get('/quiz-history', authMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const topic = req.query.topic; // Optional filter by topic

    const user = await User.findById(req.user._id)
      .select('quizResults')
      .lean();

    let quizResults = user.quizResults || [];

    // Filter by topic if specified
    if (topic && topic !== 'all') {
      quizResults = quizResults.filter(quiz => quiz.topic === topic);
    }

    // Sort by completion date (newest first)
    quizResults.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = quizResults.slice(startIndex, endIndex);

    // Calculate statistics
    const totalQuizzes = quizResults.length;
    const totalScore = quizResults.reduce((sum, quiz) => sum + quiz.score, 0);
    const averageScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;

    res.json({
      success: true,
      quizHistory: {
        results: paginatedResults,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalQuizzes / limit),
          totalResults: totalQuizzes,
          hasNext: endIndex < totalQuizzes,
          hasPrev: page > 1
        },
        statistics: {
          totalQuizzes,
          averageScore,
          topicBreakdown: {
            limit: quizResults.filter(q => q.topic === 'limit').length,
            derivative: quizResults.filter(q => q.topic === 'derivative').length,
            integral: quizResults.filter(q => q.topic === 'integral').length,
            mixed: quizResults.filter(q => q.topic === 'mixed').length
          }
        }
      }
    });

  } catch (error) {
    console.error('Get quiz history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching quiz history'
    });
  }
});

// @route   DELETE /api/user/quiz-result/:resultId
// @desc    Delete a specific quiz result
// @access  Private
router.delete('/quiz-result/:resultId', authMiddleware, async (req, res) => {
  try {
    const { resultId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find and remove the quiz result
    const initialLength = user.quizResults.length;
    user.quizResults = user.quizResults.filter(
      result => result._id.toString() !== resultId
    );

    if (user.quizResults.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Quiz result not found'
      });
    }

    // Recalculate statistics
    user.stats.totalQuizzesTaken = user.quizResults.length;
    if (user.quizResults.length > 0) {
      const totalScore = user.quizResults.reduce((sum, quiz) => sum + quiz.score, 0);
      user.stats.averageScore = Math.round(totalScore / user.quizResults.length);
    } else {
      user.stats.averageScore = 0;
    }

    await user.save();

    res.json({
      success: true,
      message: 'Quiz result deleted successfully'
    });

  } catch (error) {
    console.error('Delete quiz result error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting quiz result'
    });
  }
});

// @route   GET /api/user/leaderboard
// @desc    Get leaderboard (top users by average score)
// @access  Private
router.get('/leaderboard', authMiddleware, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const topic = req.query.topic; // Optional filter by topic

    let matchCondition = { isActive: true };
    let sortCondition = { 'stats.averageScore': -1, 'stats.totalQuizzesTaken': -1 };

    // If specific topic requested, we need to aggregate differently
    if (topic && topic !== 'all') {
      const users = await User.aggregate([
        { $match: matchCondition },
        { $unwind: '$quizResults' },
        { $match: { 'quizResults.topic': topic } },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            avatar: { $first: '$avatar' },
            averageScore: { $avg: '$quizResults.score' },
            totalQuizzes: { $sum: 1 },
            lastActive: { $first: '$stats.lastActiveDate' }
          }
        },
        { $sort: { averageScore: -1, totalQuizzes: -1 } },
        { $limit: limit }
      ]);

      return res.json({
        success: true,
        leaderboard: users,
        topic: topic
      });
    }

    // General leaderboard
    const users = await User.find(matchCondition)
      .select('name avatar stats.averageScore stats.totalQuizzesTaken stats.lastActiveDate')
      .sort(sortCondition)
      .limit(limit)
      .lean();

    // Find current user's rank
    const currentUserRank = await User.countDocuments({
      isActive: true,
      $or: [
        { 'stats.averageScore': { $gt: req.user.stats.averageScore } },
        {
          'stats.averageScore': req.user.stats.averageScore,
          'stats.totalQuizzesTaken': { $gt: req.user.stats.totalQuizzesTaken }
        }
      ]
    }) + 1;

    res.json({
      success: true,
      leaderboard: users,
      currentUserRank,
      topic: 'all'
    });

  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching leaderboard'
    });
  }
});

// Progress tracking has been removed for simplification

module.exports = router;