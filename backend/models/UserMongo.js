const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only if not Google OAuth
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  googleId: {
    type: String,
    sparse: true // Allow multiple null values
  },
  // Learning Progress
  progress: {
    limit: {
      completed: { type: Boolean, default: false },
      score: { type: Number, default: 0, min: 0, max: 100 },
      timeSpent: { type: Number, default: 0 }, // in minutes
      lastAccessed: { type: Date, default: null }
    },
    derivative: {
      completed: { type: Boolean, default: false },
      score: { type: Number, default: 0, min: 0, max: 100 },
      timeSpent: { type: Number, default: 0 },
      lastAccessed: { type: Date, default: null }
    },
    integral: {
      completed: { type: Boolean, default: false },
      score: { type: Number, default: 0, min: 0, max: 100 },
      timeSpent: { type: Number, default: 0 },
      lastAccessed: { type: Date, default: null }
    }
  },
  // Quiz Results History
  quizResults: [{
    topic: {
      type: String,
      enum: ['limit', 'derivative', 'integral', 'mixed'],
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 100
    },
    totalQuestions: {
      type: Number,
      required: true,
      min: 1
    },
    correctAnswers: {
      type: Number,
      required: true,
      min: 0
    },
    timeSpent: {
      type: Number, // in seconds
      default: 0
    },
    completedAt: {
      type: Date,
      default: Date.now
    },
    answers: [{
      questionId: String,
      questionText: String,
      selectedAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean,
      timeSpent: Number // time spent on this question in seconds
    }]
  }],
  // User Statistics
  stats: {
    totalQuizzesTaken: { type: Number, default: 0 },
    totalTimeSpent: { type: Number, default: 0 }, // in minutes
    averageScore: { type: Number, default: 0 },
    streakDays: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: Date.now }
  },
  // Account Management
  lastLogin: {
    type: Date,
    default: Date.now
  },
  loginCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ createdAt: -1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Update login statistics
userSchema.pre('save', function(next) {
  if (this.isModified('lastLogin')) {
    this.loginCount += 1;
  }
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Instance method to update progress
userSchema.methods.updateProgress = function(topic, progressData) {
  if (!this.progress[topic]) {
    throw new Error(`Invalid topic: ${topic}`);
  }
  
  Object.assign(this.progress[topic], progressData);
  this.progress[topic].lastAccessed = new Date();
  
  // Update general stats
  this.stats.lastActiveDate = new Date();
};

// Instance method to add quiz result
userSchema.methods.addQuizResult = function(quizData) {
  this.quizResults.push(quizData);
  this.stats.totalQuizzesTaken += 1;
  this.stats.totalTimeSpent += Math.round(quizData.timeSpent / 60); // convert to minutes
  
  // Recalculate average score
  const totalScore = this.quizResults.reduce((sum, quiz) => sum + quiz.score, 0);
  this.stats.averageScore = Math.round(totalScore / this.quizResults.length);
  
  this.stats.lastActiveDate = new Date();
};

// Static method to get user statistics
userSchema.statics.getUserStats = function(userId) {
  return this.findById(userId)
    .select('stats progress quizResults')
    .lean();
};

// Virtual for user's completion percentage
userSchema.virtual('completionPercentage').get(function() {
  const topics = ['limit', 'derivative', 'integral'];
  const completedTopics = topics.filter(topic => this.progress[topic].completed);
  return Math.round((completedTopics.length / topics.length) * 100);
});

// Ensure virtual fields are serialized
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('User', userSchema);