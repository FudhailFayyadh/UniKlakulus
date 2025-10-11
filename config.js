// API Configuration
const API_CONFIG = {
  // Change this to your deployed backend URL
  BASE_URL: 'http://localhost:5000/api', // For development (backend port)
  // BASE_URL: 'https://your-backend-url.herokuapp.com/api', // For production
  
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me',
      PROFILE: '/auth/profile',
      CHANGE_PASSWORD: '/auth/change-password',
      LOGOUT: '/auth/logout',
      STATS: '/auth/stats'
    },
    USER: {
      PROFILE: '/user/profile',
      DASHBOARD: '/user/dashboard',
      QUIZ_HISTORY: '/user/quiz-history',
      LEADERBOARD: '/user/leaderboard',
      RESET_PROGRESS: '/user/reset-progress'
    },
    PROGRESS: {
      GET: '/progress',
      UPDATE_TOPIC: '/progress/topic',
      QUIZ_RESULT: '/progress/quiz-result',
      ANALYTICS: '/progress/analytics',
      STUDY_SESSION: '/progress/study-session'
    }
  },
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Default headers
  HEADERS: {
    'Content-Type': 'application/json'
  }
};

// Environment detection
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

if (isProduction) {
  // Update this with your actual production backend URL
  API_CONFIG.BASE_URL = 'https://your-backend-url.herokuapp.com/api';
}

// Export for use in other files
window.API_CONFIG = API_CONFIG;