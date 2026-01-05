# UniKalkulus Mobile App - Installation Guide

## 📱 About the App

UniKalkulus is a mobile application for learning calculus concepts including Limit, Derivative, and Integral. The app features:

- ✨ Beautiful splash screen with UniKalkulus branding
- 📚 Complete web-based learning materials
- 🧠 Interactive quizzes
- 🔐 Firebase authentication (Google & Email)
- 📊 Progress tracking

## 🚀 Building the App

### Prerequisites
- Flutter SDK (>= 3.10.1)
- Android Studio or Xcode
- Git

### Build Instructions

1. **Navigate to project directory:**
   ```bash
   cd flutter-mobile-build/splash_screen_test
   ```

2. **Install dependencies:**
   ```bash
   flutter pub get
   ```

3. **Build Android APK:**
   ```bash
   flutter build apk --release
   ```
   
   The APK will be generated at:
   ```
   build/app/outputs/flutter-apk/app-release.apk
   ```

4. **Build Android App Bundle (for Google Play Store):**
   ```bash
   flutter build appbundle --release
   ```

5. **Build for iOS (macOS only):**
   ```bash
   flutter build ios --release
   ```

## 📦 Installing the APK on Android Device

### Quick Install Steps:

1. **Find the app-release.apk** file at:
   ```
   flutter-mobile-build\splash_screen_test\build\app\outputs\flutter-apk\app-release.apk
   ```

2. **Copy the APK** to your Android mobile device (via USB, Bluetooth, or cloud storage)

3. **Locate the file** in your mobile device storage using a file manager

4. **Tap the APK file** to execute/install it

5. **Accept the installation** - you will get a notification asking to install the app

6. **Allow installation from unknown sources** if prompted:
   - Go to **Settings** → **Security** or **Privacy**
   - Enable **Install from Unknown Sources** or **Install Unknown Apps**
   - Return to the installation

7. **Follow the on-screen instructions** on your Android device until installation completes

8. **Open the app** by:
   - Searching for "UniKalkulus" in your app drawer
   - Finding it by the app icon

9. **Enjoy the splash screen!** 🎉

### Alternative Installation Methods

#### Method A: Using ADB (Android Debug Bridge)
```bash
adb install flutter-mobile-build/splash_screen_test/build/app/outputs/flutter-apk/app-release.apk
```

#### Method B: Direct Run from Development
```bash
cd flutter-mobile-build/splash_screen_test
flutter run --release
```

## 🔍 Features

### Splash Screen (3-second loading)
- UniKalkulus logo and branding
- Smooth transition animation

### Main Content
- **Learning Materials**: Limit, Derivative, Integral
- **Video Tutorials**: Embedded YouTube lessons
- **Interactive Quiz**: Test your calculus knowledge
- **User Authentication**: Google Sign-in & Email/Password
- **Progress Tracking**: Monitor your learning journey

## ⚙️ App Specifications

- **Package Name**: com.example.unikalkulus
- **Version**: 1.0.0+1
- **Minimum SDK**: Android 6.0 (API 23)
- **App Size**: ~15-20 MB

## 🐛 Troubleshooting

### Installation Issues
- Ensure you have enough storage space (min. 50MB free)
- Enable "Install from Unknown Sources" in settings
- Try rebooting your device and reinstalling

### App Not Opening
- Clear app cache and data
- Ensure you have internet connection for web content
- Check Android version compatibility (6.0+)

### Build Issues
```bash
flutter clean
flutter pub get
flutter build apk --release
```

## 📞 Support

For issues or questions, refer to the detailed README.md in the project directory.

## 📝 License

© 2025 UniKalkulus. All rights reserved.

---

**Happy Learning! 📚✨**
