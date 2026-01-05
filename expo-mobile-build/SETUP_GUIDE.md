# Setup Guide - UniKalkulus Mobile

## 🚀 Quick Start Guide

### Step 1: Install Node.js
Download and install Node.js from https://nodejs.org/ (LTS version recommended)

### Step 2: Install Dependencies

Open terminal/command prompt in the `expo-mobile-build` folder and run:

```bash
npm install
```

This will install all required packages including:
- Expo SDK
- React Native
- Firebase
- Expo Router
- And all other dependencies

### Step 3: Start Development Server

```bash
npm start
```

This will start the Expo development server and show a QR code.

### Step 4: Test on Your Device

#### Option A: Using Expo Go App (Easiest)
1. Install "Expo Go" app from Play Store (Android) or App Store (iOS)
2. Scan the QR code shown in terminal
3. App will load on your device!

#### Option B: Using Android Emulator
1. Install Android Studio
2. Set up Android Virtual Device (AVD)
3. Press `a` in the terminal after running `npm start`

#### Option C: Using iOS Simulator (Mac only)
1. Install Xcode from Mac App Store
2. Press `i` in the terminal after running `npm start`

## 📱 Building Production APK

### Using EAS Build (Recommended)

1. **Install EAS CLI**
```bash
npm install -g eas-cli
```

2. **Create Expo Account**
- Go to https://expo.dev/signup
- Create a free account

3. **Login to EAS**
```bash
eas login
```

4. **Build APK**
```bash
eas build --platform android --profile preview
```

5. **Download APK**
- Wait for build to complete (5-15 minutes)
- Download APK from the link provided
- Install on Android device

### Using Local Build (Alternative)

For local builds without EAS:

```bash
# Install expo-dev-client
npx expo install expo-dev-client

# Create development build
npx expo run:android
```

## 🔥 Firebase Setup (Already Configured)

The app is already configured with Firebase! If you want to use your own Firebase project:

1. Go to https://console.firebase.google.com/
2. Create a new project
3. Enable Authentication > Email/Password
4. Create Firestore Database
5. Copy your config to `config/firebase.js`

## 📝 Testing Checklist

- [ ] Home screen loads correctly
- [ ] Can navigate to Login screen
- [ ] Can register new account
- [ ] Can login with email/password
- [ ] Can view learning materials (Limit, Turunan, Integral)
- [ ] Can take quiz
- [ ] Quiz scoring works
- [ ] Can view profile
- [ ] Can logout

## 🎨 Customization

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name",
    "slug": "your-app-slug"
  }
}
```

### Change Colors
Main colors used in the app:
- Primary: `#2196F3` (blue)
- Success: `#4CAF50` (green)
- Error: `#F44336` (red)
- Background: `#f8f9fa` (light gray)

## 🐛 Common Issues

### "Cannot find module"
```bash
rm -rf node_modules
npm install
```

### "Expo Go app doesn't load"
- Check internet connection
- Make sure phone and computer are on same WiFi
- Try clearing Expo Go cache

### "Firebase error"
- Check internet connection
- Verify Firebase config is correct
- Ensure Firebase services are enabled

### Build fails
```bash
# Clear cache
npx expo start --clear
```

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [Expo Router Docs](https://expo.github.io/router/)

## 💡 Development Tips

1. **Hot Reload**: Shake device or press `r` in terminal to reload
2. **Debug Menu**: Shake device or Cmd+D (iOS) / Cmd+M (Android)
3. **Console Logs**: Check terminal for console.log outputs
4. **Network Errors**: Use Chrome DevTools for debugging

## 🎯 Next Steps

After basic setup:
1. Test all features thoroughly
2. Customize colors and branding
3. Add your own content/questions
4. Build production APK
5. Deploy to Play Store/App Store

---

Need help? Check the main README.md or create an issue!
