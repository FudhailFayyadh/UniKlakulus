# UniKalkulus Expo Setup Guide

## Quick Setup Instructions

Follow these steps to get your Expo mobile app running:

### Step 1: Install Dependencies

Open a terminal in the `expo-mobile-build` folder and run:

```bash
npm install
```

### Step 2: Prepare Assets

You need to add image assets to the `assets/` folder. The easiest way:

**Option A: Copy from Flutter build**
```bash
# Copy the icon from Flutter assets
copy ..\mobile-build\splash_screen_test\assets\image\icon-unikalkulus.jpg assets\icon-unikalkulus.png
```

**Option B: Use online tools**
1. Go to https://www.iloveimg.com/resize-image
2. Upload `../mobile-build/splash_screen_test/assets/image/icon-unikalkulus.jpg`
3. Create these sizes:
   - **icon.png**: 1024x1024
   - **adaptive-icon.png**: 1024x1024
   - **splash.png**: 2048x2048
   - **favicon.png**: 48x48
   - **icon-unikalkulus.png**: 512x512
4. Save all files to the `assets/` folder

### Step 3: Start Development Server

```bash
npm start
```

This will:
- Start the Expo development server
- Show a QR code
- Display options for running on Android/iOS

### Step 4: Run on Device/Emulator

**Option A: Physical Device**
1. Install "Expo Go" app from Play Store (Android) or App Store (iOS)
2. Scan the QR code shown in terminal
3. App will load on your device

**Option B: Android Emulator**
1. Install Android Studio
2. Set up an Android emulator
3. Press `a` in the terminal

**Option C: iOS Simulator** (macOS only)
1. Install Xcode
2. Press `i` in the terminal

### Step 5: Test the App

The app will show:
1. **Splash Screen** (3 seconds) - Blue gradient with logo
2. **Login Screen** - Email/password authentication
3. **Home Screen** - Learning materials and quiz

## Troubleshooting

### "Module not found" errors
```bash
npm install
```

### Assets not loading
Make sure all required images are in the `assets/` folder

### Expo Go connection issues
- Make sure your phone and computer are on the same Wi-Fi network
- Try restarting the Expo server

### Firebase errors
- Firebase is pre-configured
- Check your internet connection
- Verify Firebase project is active at https://console.firebase.google.com

## Building for Production

### Android APK (for testing):
```bash
npx expo build:android -t apk
```

### For Google Play Store:
```bash
npx expo build:android -t app-bundle
```

### For iOS (requires Apple Developer account):
```bash
npx expo build:ios
```

## Next Steps

1. ✅ Install dependencies
2. ✅ Add assets to `assets/` folder
3. ✅ Run `npm start`
4. ✅ Test on device/emulator
5. 🚀 Customize and enhance!

## Need Help?

- Expo Documentation: https://docs.expo.dev
- React Native Docs: https://reactnative.dev
- Firebase Docs: https://firebase.google.com/docs

Enjoy building with UniKalkulus! 📐📱
