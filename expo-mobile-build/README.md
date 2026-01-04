# UniKalkulus - Expo Mobile App

A React Native mobile application for the UniKalkulus calculus learning platform, built with Expo.

## 📱 Features

- **Splash Screen** - Beautiful gradient splash screen with logo (similar to Flutter version)
- **Authentication** - Email/password login and registration (Google auth ready)
- **Learning Materials** - Interactive calculus lessons covering:
  - Limit (Limit)
  - Turunan (Derivative)
  - Integral (Integral)
- **Quiz System** - Test your understanding with interactive quizzes
- **Firebase Integration** - User authentication and data persistence

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- For Android: Android Studio with Android SDK
- For iOS: Xcode (macOS only)

### Installation

1. Navigate to the expo-mobile-build folder:
   ```bash
   cd expo-mobile-build
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Prepare assets:
   - Copy image assets from `../mobile-build/splash_screen_test/assets/image/` to `./assets/`
   - Rename and resize as needed (see `assets/README.md`)

### Running the App

Start the Expo development server:
```bash
npm start
```

Then choose your platform:
- Press `a` for Android emulator
- Press `i` for iOS simulator (macOS only)
- Scan QR code with Expo Go app on your physical device

### Building for Production

#### Android APK:
```bash
expo build:android -t apk
```

#### Android App Bundle (for Play Store):
```bash
expo build:android -t app-bundle
```

#### iOS (requires Apple Developer account):
```bash
expo build:ios
```

## 📂 Project Structure

```
expo-mobile-build/
├── App.js                 # Main app component with navigation
├── app.json              # Expo configuration
├── package.json          # Dependencies
├── babel.config.js       # Babel configuration
├── assets/               # Images, icons, splash screen
├── config/
│   └── firebase.js       # Firebase configuration
└── screens/
    ├── SplashScreen.js   # Splash screen with gradient & logo
    ├── LoginScreen.js    # Authentication screen
    └── HomeScreen.js     # Main content screen
```

## 🎨 Splash Screen

The splash screen features:
- Blue gradient background (#2196F3 to #1976D2)
- UniKalkulus logo
- App title and subtitle
- Loading indicator
- 3-second display duration (similar to Flutter version)

## 🔥 Firebase Configuration

Firebase is pre-configured with the same credentials as the web version. The configuration can be found in `config/firebase.js`.

Services used:
- Firebase Authentication
- Cloud Firestore (for user data and progress)

## 📱 Screens Overview

### 1. Splash Screen
- Displays for 3 seconds on app launch
- Gradient background matching Flutter version
- Logo and branding

### 2. Login/Register Screen
- Email/password authentication
- Google Sign-In ready (placeholder)
- Toggle between login and registration
- Form validation

### 3. Home Screen
- Material section with calculus lessons
- Quiz section
- User profile with logout
- Tab navigation between sections

## 🛠️ Technologies Used

- **React Native** - Mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Firebase** - Backend services
- **Expo Linear Gradient** - Gradient backgrounds
- **Expo Splash Screen** - Splash screen management

## 📝 Next Steps

To enhance the app further:

1. **Assets**: Add proper app icons and images
2. **Firebase Auth**: Implement full Google authentication
3. **MathJax**: Integrate math equation rendering
4. **Quiz Implementation**: Complete quiz functionality with scoring
5. **Progress Tracking**: Implement user progress save/load
6. **Offline Mode**: Add local caching for lessons
7. **Dark Mode**: Add theme switching capability

## 🤝 Contributing

This mobile app is based on the UniKalkulus web application. Any improvements or bug fixes are welcome!

## 📄 License

This project is part of the UniKalkulus learning platform.

## 🔗 Related Projects

- Web Version: `../index.html`
- Flutter Version: `../mobile-build/splash_screen_test/`
