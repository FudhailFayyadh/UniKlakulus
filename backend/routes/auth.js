const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { authMiddleware, generateToken } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number')
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
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

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, handleValidationErrors, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = { ...user };
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, handleValidationErrors, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user and include password for comparison
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated. Please contact support.'
      });
    }

    // Verify password
    const isPasswordMatch = await User.comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    await User.updateById(user._id, { lastLogin: new Date() });

    // Generate JWT token
    const token = generateToken(user._id);

    // Remove password from response
    const userResponse = { ...user };
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', 
  authMiddleware,
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email } = req.body;
      const userId = req.user._id;

      // Check if email is being changed and already exists
      if (email && email !== req.user.email) {
        const existingUser = await User.findByEmailExcluding(email, userId);
        if (existingUser) {
          return res.status(400).json({
            success: false,
            message: 'Email is already in use by another account'
          });
        }
      }

      // Update user
      const updateData = {};
      if (name) updateData.name = name;
      if (email) updateData.email = email;

      const user = await User.updateById(userId, updateData);
      
      // Remove password from response
      if (user && user.password) {
        delete user.password;
      }

      res.json({
        success: true,
        message: 'Profile updated successfully',
        user
      });

    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating profile'
      });
    }
  }
);

// @route   PUT /api/auth/change-password
// @desc    Change user password
// @access  Private
router.put('/change-password',
  authMiddleware,
  [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters long')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user._id;

      // Get user with password
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Verify current password
      const isCurrentPasswordValid = await User.comparePassword(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Current password is incorrect'
        });
      }

      // Hash new password
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      // Update password
      await User.updateById(userId, { password: hashedPassword });

      res.json({
        success: true,
        message: 'Password changed successfully'
      });

    } catch (error) {
      console.error('Password change error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while changing password'
      });
    }
  }
);

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', authMiddleware, (req, res) => {
  // Since we're using JWT, logout is handled client-side by removing the token
  // We can log this action for audit purposes
  console.log(`User ${req.user.email} logged out at ${new Date().toISOString()}`);
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @route   GET /api/auth/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select('stats progress quizResults')
      .lean();

    // Calculate additional statistics
    const totalQuizzes = user.quizResults.length;
    const recentQuizzes = user.quizResults
      .filter(quiz => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        return quiz.completedAt >= sevenDaysAgo;
      })
      .length;

    const topicProgress = {
      limit: user.progress.limit,
      derivative: user.progress.derivative,
      integral: user.progress.integral
    };

    const completedTopics = Object.values(topicProgress)
      .filter(topic => topic.completed).length;

    const overallProgress = Math.round((completedTopics / 3) * 100);

    res.json({
      success: true,
      stats: {
        ...user.stats,
        totalQuizzes,
        recentQuizzes,
        overallProgress,
        topicProgress
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

module.exports = router;