# 📱 UniKalkulus - Mobile App Version

## Quick Start

Your web application has been converted to a mobile app! Here's how to run it:

### Option 1: Double-click to Start (Windows)
1. Navigate to `expo-mobile-build` folder
2. Double-click `start.bat`
3. Wait for QR code to appear
4. Scan with Expo Go app on your phone

### Option 2: Command Line
```bash
cd expo-mobile-build
npm start
```

## 📖 Full Documentation

All documentation is in the `expo-mobile-build` folder:

- **SETUP_GUIDE.md** - Complete setup instructions
- **README.md** - App features and technical details  
- **MIGRATION_SUMMARY.md** - What changed from web to mobile

## 🎯 What You Need

1. **Node.js** - Download from https://nodejs.org/
2. **Expo Go App** - Download from Play Store or App Store
3. **Same WiFi** - Phone and computer on same network

## 🚀 First Time Setup

```bash
cd expo-mobile-build
npm install
npm start
```

Then scan the QR code with Expo Go app!

## ✨ Features

- ✅ Login/Register with Firebase
- ✅ Learning materials (Limit, Turunan, Integral)
- ✅ Interactive quiz with 15 questions
- ✅ User profile and progress tracking
- ✅ Mobile-optimized UI

## 📱 Build APK

To create an installable APK file:

```bash
npm install -g eas-cli
eas login
eas build --platform android --profile preview
```

## 🆘 Need Help?

Check the documentation files in `expo-mobile-build` folder or open an issue.

---

**Original Web App:** `index.html`, `script.js`, `style.css`  
**Mobile App:** `expo-mobile-build/` folder  

Happy learning! 🎓
