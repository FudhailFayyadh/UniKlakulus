# 🚀 Quick Start Guide - UniKalkulus Expo Mobile App

## ⚡ 5-Minute Setup

### Step 1: Navigate to Project
```bash
cd expo-mobile-build
```

### Step 2: Run Setup Script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

**Or manually:**
```bash
npm install
```

### Step 3: Add Assets (Optional for testing)
You can run the app without assets, but the splash screen logo won't show.

To add assets quickly:
1. Copy `../mobile-build/splash_screen_test/assets/image/icon-unikalkulus.jpg`
2. Rename to `icon-unikalkulus.png`
3. Place in `assets/` folder

### Step 4: Start App
```bash
npm start
```

### Step 5: View on Device
1. Install **Expo Go** from your app store
2. Scan the QR code
3. Enjoy! 🎉

---

## 📱 What You'll See

### 1. Splash Screen (3 seconds)
- Beautiful blue gradient
- UniKalkulus logo
- Loading indicator

### 2. Login Screen
- Email/password login
- Registration option
- Google Sign-In ready

### 3. Home Screen
- Learning materials (Limit, Turunan, Integral)
- Quiz section
- User profile

---

## 🎯 Features

✅ **Matching Flutter Design** - Same blue gradient and splash timing
✅ **Firebase Integration** - Same as web version
✅ **Responsive Layout** - Works on all screen sizes
✅ **Professional UI** - Clean, modern design
✅ **Navigation** - Smooth screen transitions
✅ **Authentication** - Login/Register ready

---

## 🛠️ Development Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run android` | Run on Android emulator |
| `npm run ios` | Run on iOS simulator (macOS) |
| `npm run web` | Run in web browser |

---

## 📚 Documentation

- **[README.md](README.md)** - Full documentation
- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[COMPARISON.md](COMPARISON.md)** - Flutter vs Expo comparison
- **[PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)** - File structure guide

---

## ⚠️ Troubleshooting

**Can't install dependencies?**
```bash
npm cache clean --force
npm install
```

**Expo won't start?**
```bash
npx expo start --clear
```

**Can't connect to device?**
- Make sure phone and computer are on same WiFi
- Check firewall settings

---

## 🎨 Customization

### Change Splash Screen Colors
Edit `screens/SplashScreen.js`:
```javascript
colors={['#2196F3', '#1976D2']} // Change these colors
```

### Change App Name
Edit `app.json`:
```json
"name": "Your App Name"
```

### Add More Screens
Create new file in `screens/` folder and add to navigation in `App.js`

---

## 🚀 Build for Production

### Android APK
```bash
npx expo build:android -t apk
```

### Android App Bundle
```bash
npx expo build:android -t app-bundle
```

### iOS
```bash
npx expo build:ios
```

---

## 💡 Pro Tips

1. **Fast Refresh** - Code changes appear instantly while developing
2. **Developer Menu** - Shake device or press `m` in terminal
3. **Debugging** - Use `console.log()` and view in terminal
4. **Assets** - Use PNG for transparency, JPG for photos
5. **Testing** - Test on real device for best experience

---

## 🆘 Need Help?

- **Expo Docs:** https://docs.expo.dev
- **React Native:** https://reactnative.dev
- **Firebase:** https://firebase.google.com/docs

---

## ✨ What's Next?

1. ✅ Test the app on your device
2. 🎨 Customize colors and branding
3. 📝 Add more learning content
4. 🧠 Implement quiz functionality
5. 📊 Add progress tracking
6. 🌙 Add dark mode
7. 🔔 Add push notifications
8. 📱 Publish to app stores!

---

**Enjoy building your UniKalkulus mobile app! 📐📱✨**

Made with ❤️ using Expo and React Native
