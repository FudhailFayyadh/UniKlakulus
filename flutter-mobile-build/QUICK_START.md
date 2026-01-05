# Quick Start Guide - UniKalkulus Mobile App

## 🚀 Build the App (5 Minutes)

### Step 1: Navigate to Project
```bash
cd flutter-mobile-build/splash_screen_test
```

### Step 2: Install Dependencies
```bash
flutter pub get
```

### Step 3: Build APK
```bash
flutter build apk --release
```

### Step 4: Find Your APK
Location: `build/app/outputs/flutter-apk/app-release.apk`

## 📱 Install on Android Device

1. Copy `app-release.apk` to your phone
2. Tap the file on your phone
3. Allow "Install from Unknown Sources" if prompted
4. Follow installation prompts
5. Open the app and enjoy! 🎉

## 🎯 What You Get

✅ **3-Second Splash Screen** with UniKalkulus logo  
✅ **Full Web App** functionality  
✅ **Firebase Auth** (Google & Email login)  
✅ **Learning Materials** (Limit, Derivative, Integral)  
✅ **Interactive Quizzes**  
✅ **Progress Tracking**  

## 🔧 Quick Commands

```bash
# Run on connected device
flutter run

# Build release APK
flutter build apk --release

# Build for Google Play
flutter build appbundle --release

# Check for issues
flutter analyze

# Clean build
flutter clean && flutter pub get

# List devices
flutter devices
```

## 📂 Important Files

- **Main App**: `lib/main.dart`
- **Splash Screen**: `lib/screens/splash_screen.dart`
- **WebView Page**: `lib/screens/home_page.dart`
- **Web Content**: `assets/web/`
- **Configuration**: `pubspec.yaml`

## 🐛 Common Issues

### Build Failed?
```bash
flutter clean
flutter pub get
flutter build apk --release
```

### WebView Not Loading?
- Check internet connection
- Verify assets in `pubspec.yaml`
- Check Android permissions

### Can't Install APK?
- Enable "Install from Unknown Sources"
- Check storage space (need 50MB+)
- Try rebooting device

## 💡 Tips

- **Splash Duration**: Edit `lib/screens/splash_screen.dart` line 14
- **App Name**: Edit `android/app/src/main/AndroidManifest.xml`
- **App Icon**: Replace `assets/image/UniKalkulus.jpg` and run:
  ```bash
  flutter pub run flutter_launcher_icons
  ```

## 📖 Need More Help?

- See `README.md` for full documentation
- See `MIGRATION_SUMMARY.md` for technical details
- See `how-to-install-app-release.md` for installation guide

---

**Happy Building! 🎊**