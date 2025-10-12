// Global variables for authentication and user data
let currentUser = null;
let userProgress = {
  sectionsViewed: [],
  quizAttempts: [],
  totalTimeSpent: 0,
  lastActivity: null,
  completionPercentage: 0,
  badges: []
};

// Authentication state observer - DIPERBAIKI
auth.onAuthStateChanged(async (user) => {
  console.log('🔐 Auth state changed:', user ? user.email : 'logged out');
  showLoadingOverlay();
  
  if (user) {
    currentUser = user;
    console.log('👤 User signed in:', user.displayName || user.email);
    
    // PERBAIKAN: Pastikan urutan loading yang benar
    try {
      await loadUserData(); // Load data dulu
      showUserProfile(); // Baru show profile
      closeAuthModal();
      updateUIForAuthenticatedUser();
      
      // TAMBAHAN: Trigger update UI lagi setelah semua selesai
      setTimeout(() => {
        updateProgressDisplay();
        console.log('🔄 Final UI update triggered');
      }, 500);
      
    } catch (error) {
      console.error('❌ Error in auth state change:', error);
    }
  } else {
    currentUser = null;
    console.log('👤 User signed out');
    
    hideUserProfile();
    resetUserProgress();
    updateUIForGuestUser();
  }
  
  hideLoadingOverlay();
});

// Google Sign In dengan error handling yang lebih baik
async function signInWithGoogle() {
  try {
    showLoadingAuth();
    
    // Configure Google Provider dengan domain yang benar
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const result = await auth.signInWithPopup(googleProvider);
    
    // Check if this is a new user
    if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
      await createUserDocument(result.user);
      showWelcomeMessage(result.user.displayName || result.user.email);
    }
    
    hideLoadingAuth();
    console.log('Google sign-in successful');
  } catch (error) {
    hideLoadingAuth();
    console.error('Google sign-in error:', error);
    
    // Handle specific error types
    if (error.code === 'auth/popup-closed-by-user') {
      showErrorMessage('Login dibatalkan oleh pengguna');
    } else if (error.code === 'auth/unauthorized-domain') {
      showErrorMessage('Domain tidak diotorisasi. Silakan hubungi administrator.');
    } else {
      showErrorMessage('Gagal masuk dengan Google: ' + error.message);
    }
  }
}

// Email Sign In
async function signInWithEmail(event) {
  event.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  try {
    showLoadingAuth();
    await auth.signInWithEmailAndPassword(email, password);
    hideLoadingAuth();
  } catch (error) {
    hideLoadingAuth();
    console.error('Email sign-in error:', error);
    showErrorMessage('Gagal masuk: ' + getErrorMessage(error.code));
  }
}

// Email Registration
async function registerWithEmail(event) {
  event.preventDefault();
  
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  
  try {
    showLoadingAuth();
    
    // Create user account
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    
    // Update user profile with display name
    await userCredential.user.updateProfile({
      displayName: name
    });
    
    // Create user document in Firestore
    await createUserDocument(userCredential.user);
    
    hideLoadingAuth();
    showWelcomeMessage(name);
  } catch (error) {
    hideLoadingAuth();
    console.error('Registration error:', error);
    showErrorMessage('Gagal mendaftar: ' + getErrorMessage(error.code));
  }
}

// Sign Out
async function signOut() {
  try {
    // Save current progress before signing out
    await saveUserProgress();
    await auth.signOut();
    showInfoMessage('Berhasil keluar. Sampai jumpa lagi!');
  } catch (error) {
    console.error('Sign-out error:', error);
    showErrorMessage('Gagal keluar: ' + error.message);
  }
}

// Create user document in Firestore
async function createUserDocument(user) {
  const userDoc = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || 'User',
    photoURL: user.photoURL || null,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
    progress: {
      sectionsViewed: [],
      quizAttempts: [],
      totalTimeSpent: 0,
      completionPercentage: 0,
      badges: ['welcome']
    },
    settings: {
      emailNotifications: true,
      theme: 'default'
    }
  };
  
  try {
    await db.collection('users').doc(user.uid).set(userDoc, { merge: true });
    console.log('User document created/updated successfully');
  } catch (error) {
    console.error('Error creating user document:', error);
  }
}

// Load user data from Firestore - DIPERBAIKI
async function loadUserData() {
  if (!currentUser) {
    console.log('❌ No current user found');
    return;
  }
  
  try {
    console.log('🔄 Loading user data for:', currentUser.uid);
    
    const userDoc = await db.collection('users').doc(currentUser.uid).get();
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('📊 Raw user data from Firestore:', userData);
      
      // PERBAIKAN: Load progress data dengan fallback yang lebih robust
      if (userData.progress) {
        userProgress = {
          sectionsViewed: userData.progress.sectionsViewed || [],
          quizAttempts: userData.progress.quizAttempts || [],
          totalTimeSpent: userData.progress.totalTimeSpent || 0,
          lastActivity: userData.progress.lastActivity || null,
          completionPercentage: userData.progress.completionPercentage || 0,
          badges: userData.progress.badges || []
        };
      } else {
        // Jika tidak ada progress object, cek di root level (backward compatibility)
        userProgress = {
          sectionsViewed: userData.sectionsViewed || [],
          quizAttempts: userData.quizAttempts || [],
          totalTimeSpent: userData.totalTimeSpent || 0,
          lastActivity: userData.lastActivity || null,
          completionPercentage: userData.completionPercentage || 0,
          badges: userData.badges || []
        };
      }
      
      console.log('✅ Loaded user progress:', userProgress);
      console.log('📈 Completion percentage:', userProgress.completionPercentage);
      
      // Update last login
      await db.collection('users').doc(currentUser.uid).update({
        lastLogin: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      // PENTING: Update UI setelah data loaded
      updateProgressDisplay();
      console.log('🎨 UI updated with progress');
      
    } else {
      console.log('📄 User document does not exist, creating...');
      await createUserDocument(currentUser);
    }
  } catch (error) {
    console.error('❌ Error loading user data:', error);
    showErrorMessage('Gagal memuat data pengguna: ' + error.message);
  }
}

// Save user progress to Firestore
async function saveUserProgress() {
  if (!currentUser) return;
  
  try {
    await db.collection('users').doc(currentUser.uid).update({
      progress: userProgress,
      lastActivity: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log('User progress saved successfully');
  } catch (error) {
    console.error('Error saving user progress:', error);
  }
}

// Track section viewing
function trackSectionView(sectionId) {
  if (!currentUser) return;
  
  if (!userProgress.sectionsViewed.includes(sectionId)) {
    userProgress.sectionsViewed.push(sectionId);
    updateCompletionPercentage();
    saveUserProgress();
    
    // Award badge if applicable
    checkAndAwardBadges();
  }
}

// Track quiz attempt dengan sistem progress baru (tanpa batasan harian)
function trackQuizAttempt(quizData) {
  if (!currentUser) return;

  const now = new Date();
  const attempt = {
    ...quizData,
    userId: currentUser.uid,
    timestamp: now.toISOString()
  };

  // Tambahkan ke array quiz attempts
  userProgress.quizAttempts.push(attempt);
  userProgress.lastActivity = now.toISOString();

  // Tambah progress jika nilai >= 70% (tanpa batasan harian)
  if (quizData.progressEligible && quizData.percentage >= 70) {
    console.log('🎯 Quiz berhasil! Progress ditambahkan.');
  } else {
    console.log('📝 Quiz selesai, tapi nilai belum mencapai 70%.');
  }

  // Update completion percentage
  updateCompletionPercentage();
  
  // Check for new badges
  checkAndAwardBadges();
  
  // Save to database
  saveUserProgress();
  
  // Update UI
  updateProgressDisplay();
}

// Update completion percentage dengan logika baru (tanpa batasan quiz harian)
function updateCompletionPercentage() {
  if (!currentUser) return;

  // 1. Section views (60% dari total progress)
  const totalSections = 3; // limit, derivative, integral
  const viewedSections = [...new Set(userProgress.sectionsViewed)].length;
  const sectionProgress = (viewedSections / totalSections) * 60;

  // 2. Successful quizzes (40% dari total progress)
  const successfulQuizzes = userProgress.quizAttempts.filter(q => 
    q.progressEligible && q.percentage >= 70
  );
  
  // Setiap quiz yang berhasil (nilai >= 70%) menambah 10% progress
  // Maksimal 4 quiz untuk mencapai 40% (sisanya dari section views)
  const maxQuizForProgress = 4;
  const quizProgress = Math.min(successfulQuizzes.length, maxQuizForProgress) * 10;

  // Total completion
  userProgress.completionPercentage = Math.min(Math.round(sectionProgress + quizProgress), 100);

  console.log(`📊 Progress Update: Sections(${sectionProgress}%) + Quizzes(${quizProgress}%) = ${userProgress.completionPercentage}%`);
}

// Check and award badges
function checkAndAwardBadges() {
  const badges = userProgress.badges || [];
  
  // First section badge
  if (userProgress.sectionsViewed.length >= 1 && !badges.includes('first-steps')) {
    badges.push('first-steps');
    showBadgeNotification('🎯 Badge Baru: Langkah Pertama!');
  }
  
  // All sections viewed badge
  if (userProgress.sectionsViewed.length >= 3 && !badges.includes('explorer')) {
    badges.push('explorer');
    showBadgeNotification('🏆 Badge Baru: Penjelajah Kalkulus!');
  }
  
  // First quiz badge
  if (userProgress.quizAttempts.length >= 1 && !badges.includes('quiz-taker')) {
    badges.push('quiz-taker');
    showBadgeNotification('🧠 Badge Baru: Pencoba Quiz!');
  }
  
  // High score badge
  const highScore = userProgress.quizAttempts.some(attempt => attempt.percentage >= 80);
  if (highScore && !badges.includes('high-achiever')) {
    badges.push('high-achiever');
    showBadgeNotification('⭐ Badge Baru: Pencapaian Tinggi!');
  }
  
  userProgress.badges = badges;
}

// UI Update Functions
function showUserProfile() {
  if (!currentUser) return;
  
  document.getElementById('user-avatar').src = currentUser.photoURL || 'https://via.placeholder.com/40x40?text=👤';
  document.getElementById('user-name').textContent = currentUser.displayName || 'User';
  document.getElementById('user-profile').classList.remove('hidden');
  document.getElementById('login-btn').classList.add('hidden');
}

function hideUserProfile() {
  document.getElementById('user-profile').classList.add('hidden');
  document.getElementById('login-btn').classList.remove('hidden');
}

function updateProgressDisplay() {
  const progressText = document.getElementById('progress-text');
  const progressFill = document.getElementById('progress-fill');
  
  console.log('🎨 Updating progress display...'); 
  console.log('📊 Current completion percentage:', userProgress.completionPercentage);
  
  if (progressText) {
    progressText.textContent = `Progress: ${userProgress.completionPercentage}%`;
    console.log('✅ Progress text updated');
  } else {
    console.log('❌ Progress text element not found');
  }
  
  if (progressFill) {
    progressFill.style.width = `${userProgress.completionPercentage}%`;
    console.log('✅ Progress fill updated');
  } else {
    console.log('❌ Progress fill element not found');
  }
  
  // TAMBAHAN: Update badge display jika ada
  updateBadgeDisplay();
}

// Fungsi baru untuk update badge display
function updateBadgeDisplay() {
  // Ini bisa ditambahkan nanti jika ingin menampilkan badges di UI
  console.log('🏆 User badges:', userProgress.badges);
}

function updateUIForAuthenticatedUser() {
  // Enable quiz access
  const quizNavLink = document.getElementById('quiz-nav-link');
  if (quizNavLink) {
    quizNavLink.classList.remove('disabled');
  }
}

function updateUIForGuestUser() {
  // Restrict quiz access
  const quizNavLink = document.getElementById('quiz-nav-link');
  if (quizNavLink) {
    quizNavLink.classList.add('disabled');
  }
}

function resetUserProgress() {
  userProgress = {
    sectionsViewed: [],
    quizAttempts: [],
    totalTimeSpent: 0,
    lastActivity: null,
    completionPercentage: 0,
    badges: []
  };
  updateProgressDisplay();
}

// Modal and UI Functions
function showAuthModal() {
  document.getElementById('auth-modal').classList.remove('hidden');
  showLoginForm();
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.add('hidden');
}

function showLoginForm() {
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('register-form').classList.add('hidden');
}

function showRegisterForm() {
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.remove('hidden');
}

function showLoadingAuth() {
  document.getElementById('loading-auth').classList.remove('hidden');
  document.getElementById('login-form').classList.add('hidden');
  document.getElementById('register-form').classList.add('hidden');
}

function hideLoadingAuth() {
  document.getElementById('loading-auth').classList.add('hidden');
}

function showLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.remove('hidden');
}

function hideLoadingOverlay() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.classList.add('hidden');
}

// Notification Functions
function showWelcomeMessage(name) {
  showNotification(`🎉 Selamat datang, ${name}! Mulai perjalanan belajar kalkulus Anda.`, 'success');
}

function showBadgeNotification(message) {
  showNotification(message, 'badge');
}

function showInfoMessage(message) {
  showNotification(message, 'info');
}

function showErrorMessage(message) {
  if (typeof showNotification === 'function') {
    showNotification(message, 'error');
  } else {
    alert(message);
  }
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Hide after 4 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Error message helper
function getErrorMessage(errorCode) {
  const errorMessages = {
    'auth/user-not-found': 'Email tidak ditemukan',
    'auth/wrong-password': 'Password salah',
    'auth/email-already-in-use': 'Email sudah digunakan',
    'auth/weak-password': 'Password terlalu lemah',
    'auth/invalid-email': 'Format email tidak valid',
    'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
    'auth/popup-closed-by-user': 'Popup ditutup oleh pengguna',
    'auth/cancelled-popup-request': 'Request popup dibatalkan'
  };
  
  return errorMessages[errorCode] || 'Terjadi kesalahan yang tidak diketahui';
}

// Fungsi debug untuk manual refresh
function manualRefreshProgress() {
  console.log('🔄 Manual refresh triggered');
  if (currentUser) {
    loadUserData().then(() => {
      updateProgressDisplay();
      console.log('✅ Manual refresh completed');
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Firebase integration initialized');
  
  // TAMBAHAN: Cek jika user sudah login saat page load
  setTimeout(() => {
    if (currentUser) {
      console.log('🔄 User already logged in, refreshing progress display');
      updateProgressDisplay();
    }
  }, 1000); // Give time for auth state to initialize
});