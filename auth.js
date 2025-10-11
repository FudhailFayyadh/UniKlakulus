// Authentication Manager Class
class AuthManager {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    this.isInitialized = false;
    
    // Initialize on page load
    this.init();
  }

  async init() {
    if (this.token && !this.user) {
      // Token exists but no user data, fetch user info
      await this.getCurrentUser();
    }
    this.updateUI();
    this.isInitialized = true;
  }

  // Make authenticated API request
  async apiRequest(endpoint, options = {}) {
    const url = `${API_CONFIG.BASE_URL}${endpoint}`;
    const defaultOptions = {
      headers: {
        ...API_CONFIG.HEADERS,
        ...(this.token && { Authorization: `Bearer ${this.token}` })
      },
      ...options
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        ...defaultOptions,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please check your connection.');
      }
      
      // Handle auth errors
      if (error.message.includes('401') || error.message.includes('Token')) {
        this.logout();
        throw new Error('Session expired. Please login again.');
      }
      
      throw error;
    }
  }

  // Register new user
  async register(name, email, password) {
    try {
      this.showLoading(true);
      
      const response = await this.apiRequest(API_CONFIG.ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      });

      if (response.success) {
        this.token = response.token;
        this.user = response.user;
        
        localStorage.setItem('authToken', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        this.updateUI();
        this.trackEvent('user_registered');
        
        return { success: true, data: response };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      this.showLoading(false);
    }
  }

  // Login user
  async login(email, password) {
    try {
      this.showLoading(true);
      
      const response = await this.apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (response.success) {
        this.token = response.token;
        this.user = response.user;
        
        localStorage.setItem('authToken', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        
        this.updateUI();
        this.trackEvent('user_logged_in');
        
        return { success: true, data: response };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      this.showLoading(false);
    }
  }

  // Get current user info
  async getCurrentUser() {
    try {
      if (!this.token) return null;

      const response = await this.apiRequest(API_CONFIG.ENDPOINTS.AUTH.ME);
      
      if (response.success) {
        this.user = response.user;
        localStorage.setItem('user', JSON.stringify(this.user));
        return response.user;
      }
    } catch (error) {
      console.error('Get current user error:', error);
      this.logout(); // Invalid token, logout
      return null;
    }
  }

  // Update user profile
  async updateProfile(profileData) {
    try {
      this.showLoading(true);
      
      const response = await this.apiRequest(API_CONFIG.ENDPOINTS.AUTH.PROFILE, {
        method: 'PUT',
        body: JSON.stringify(profileData)
      });

      if (response.success) {
        this.user = response.user;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.updateUI();
        
        return { success: true, data: response };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error.message };
    } finally {
      this.showLoading(false);
    }
  }

  // Change password
  async changePassword(currentPassword, newPassword) {
    try {
      this.showLoading(true);
      
      const response = await this.apiRequest(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        method: 'PUT',
        body: JSON.stringify({ currentPassword, newPassword })
      });

      if (response.success) {
        return { success: true, data: response };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Change password error:', error);
      return { success: false, error: error.message };
    } finally {
      this.showLoading(false);
    }
  }

  // Update user progress
  async updateProgress(topic, progressData) {
    if (!this.isAuthenticated()) return;

    try {
      const response = await this.apiRequest(API_CONFIG.ENDPOINTS.PROGRESS.UPDATE_TOPIC, {
        method: 'PUT',
        body: JSON.stringify({ topic, ...progressData })
      });

      if (response.success) {
        // Update local user data
        if (this.user && this.user.progress) {
          this.user.progress[topic] = response.progress;
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        return response;
      }
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  }

  // Save quiz result
  async saveQuizResult(quizData) {
    if (!this.isAuthenticated()) return;

    try {
      const response = await this.apiRequest(API_CONFIG.ENDPOINTS.PROGRESS.QUIZ_RESULT, {
        method: 'POST',
        body: JSON.stringify(quizData)
      });

      if (response.success) {
        // Refresh user data to get updated stats
        await this.getCurrentUser();
        this.trackEvent('quiz_completed', { 
          topic: quizData.topic, 
          score: quizData.score 
        });
        return response;
      }
    } catch (error) {
      console.error('Failed to save quiz result:', error);
    }
  }

  // Get user dashboard data
  async getDashboard() {
    if (!this.isAuthenticated()) return null;

    try {
      const response = await this.apiRequest(API_CONFIG.ENDPOINTS.USER.DASHBOARD);
      return response.success ? response.dashboard : null;
    } catch (error) {
      console.error('Failed to get dashboard:', error);
      return null;
    }
  }

  // Get quiz history
  async getQuizHistory(page = 1, limit = 10, topic = 'all') {
    if (!this.isAuthenticated()) return null;

    try {
      const params = new URLSearchParams({ page, limit, topic });
      const response = await this.apiRequest(`${API_CONFIG.ENDPOINTS.USER.QUIZ_HISTORY}?${params}`);
      return response.success ? response.quizHistory : null;
    } catch (error) {
      console.error('Failed to get quiz history:', error);
      return null;
    }
  }

  // Get leaderboard
  async getLeaderboard(limit = 10, topic = 'all') {
    if (!this.isAuthenticated()) return null;

    try {
      const params = new URLSearchParams({ limit, topic });
      const response = await this.apiRequest(`${API_CONFIG.ENDPOINTS.USER.LEADERBOARD}?${params}`);
      return response.success ? response : null;
    } catch (error) {
      console.error('Failed to get leaderboard:', error);
      return null;
    }
  }

  // Logout user
  async logout() {
    try {
      if (this.token) {
        await this.apiRequest(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {
          method: 'POST'
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      this.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      this.updateUI();
      this.trackEvent('user_logged_out');
    }
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.token;
  }

  // Get user role
  getUserRole() {
    return this.user?.role || 'student';
  }

  // Check if user is admin
  isAdmin() {
    return this.getUserRole() === 'admin';
  }

  // Update UI based on authentication status
  updateUI() {
    const authBtn = document.getElementById('auth-btn');
    const userInfo = document.getElementById('user-info');
    
    if (!authBtn) return; // UI not ready yet
    
    if (this.isAuthenticated() && this.user) {
      authBtn.innerHTML = `
        <div class="user-dropdown">
          <button class="user-avatar" onclick="authManager.toggleUserMenu()" title="${this.user.name}">
            <span>${this.user.name.charAt(0).toUpperCase()}</span>
          </button>
          <div id="user-menu" class="user-menu hidden">
            <div class="user-menu-header">
              <p><strong>${this.user.name}</strong></p>
              <small>${this.user.email}</small>
            </div>
            <div class="user-menu-actions">
              <button onclick="authManager.logout()" class="logout-btn">
                <span>🚪</span> Logout
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      authBtn.innerHTML = `
        <button class="login-btn" onclick="authManager.showLoginModal()">
          <span>🔐</span>
          <span>Login</span>
        </button>
      `;
    }

    // Update navigation based on auth status
    this.updateNavigation();
  }

  // Update navigation restrictions
  updateNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      // Remove any existing auth restrictions
      link.classList.remove('auth-required');
      
      // Add auth requirements for certain pages
      if (link.getAttribute('onclick')?.includes('quiz') && !this.isAuthenticated()) {
        link.classList.add('auth-required');
        link.title = 'Login required to take quiz';
      }
    });
  }

  // Toggle user menu
  toggleUserMenu() {
    const menu = document.getElementById('user-menu');
    if (menu) {
      menu.classList.toggle('hidden');
    }
  }

  // Close user menu when clicking outside
  closeUserMenuOnOutsideClick(event) {
    const userDropdown = document.querySelector('.user-dropdown');
    const userMenu = document.getElementById('user-menu');
    
    if (userDropdown && !userDropdown.contains(event.target) && userMenu) {
      userMenu.classList.add('hidden');
    }
  }

  // Show login modal
  showLoginModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.remove('hidden');
      this.showLoginForm();
    }
  }

  // Show login form
  showLoginForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) loginForm.classList.remove('hidden');
    if (registerForm) registerForm.classList.add('hidden');
  }

  // Show register form
  showRegisterForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) loginForm.classList.add('hidden');
    if (registerForm) registerForm.classList.remove('hidden');
  }

  // Hide auth modal
  hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  }

  // Methods for Profile, Progress, and Dashboard have been removed for simplification

  // Show loading state
  showLoading(show) {
    const existingLoader = document.querySelector('.auth-loader');
    
    if (show && !existingLoader) {
      const loader = document.createElement('div');
      loader.className = 'auth-loader';
      loader.innerHTML = `
        <div class="loader-backdrop">
          <div class="loader-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      `;
      document.body.appendChild(loader);
    } else if (!show && existingLoader) {
      existingLoader.remove();
    }
  }

  // Show notification
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">
          ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
        </span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove();
      }
    }, duration);
  }

  // Track events (for analytics)
  trackEvent(eventName, properties = {}) {
    console.log('Event:', eventName, properties);
    // Here you can integrate with analytics services like Google Analytics, Mixpanel, etc.
  }

  // Utility function
  capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Initialize auth manager
const authManager = new AuthManager();

// Global event listeners
document.addEventListener('click', (event) => {
  authManager.closeUserMenuOnOutsideClick(event);
});

// Make authManager available globally
window.authManager = authManager;