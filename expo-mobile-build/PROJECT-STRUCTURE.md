# 📱 UniKalkulus Expo Mobile Build - Complete Project Structure

## 📁 Full Directory Structure

```
expo-mobile-build/
│
├── 📄 App.js                          # Main app entry point with navigation
├── 📄 app.json                        # Expo configuration (app name, icons, splash)
├── 📄 package.json                    # Dependencies and scripts
├── 📄 babel.config.js                 # Babel configuration
├── 📄 .gitignore                      # Git ignore rules
│
├── 📄 README.md                       # Main documentation
├── 📄 SETUP.md                        # Setup instructions
├── 📄 COMPARISON.md                   # Flutter vs Expo comparison
│
├── 📂 assets/                         # App assets (icons, images)
│   ├── 📄 README.md                   # Asset requirements
│   ├── 📄 .placeholder                # Placeholder file
│   ├── 🖼️ icon.png                   # App icon (1024x1024) - TO ADD
│   ├── 🖼️ adaptive-icon.png          # Android icon (1024x1024) - TO ADD
│   ├── 🖼️ splash.png                 # Splash screen (2048x2048) - TO ADD
│   ├── 🖼️ favicon.png                # Web favicon (48x48) - TO ADD
│   └── 🖼️ icon-unikalkulus.png       # Logo for splash (512x512) - TO ADD
│
├── 📂 screens/                        # App screens
│   ├── 📄 SplashScreen.js             # Splash screen with gradient & logo
│   ├── 📄 LoginScreen.js              # Login/Register screen
│   └── 📄 HomeScreen.js               # Main content screen
│
└── 📂 config/                         # Configuration files
    └── 📄 firebase.js                 # Firebase configuration
```

## 📝 File Descriptions

### Root Files

#### `App.js`
Main application component that handles:
- Navigation setup
- Splash screen timing
- User authentication state
- Screen routing

#### `app.json`
Expo configuration including:
- App name and slug
- Icon and splash screen paths
- Platform-specific settings (iOS/Android)
- Bundle identifiers

#### `package.json`
Project dependencies:
- React Native and Expo core
- Navigation libraries
- Firebase SDK
- UI components (LinearGradient, WebView, etc.)

### Screens

#### `screens/SplashScreen.js`
**Splash screen matching Flutter version:**
- Blue gradient background (#2196F3 → #1976D2)
- UniKalkulus logo
- App title and subtitle
- Loading spinner
- 3-second auto-transition

**Key Components:**
```javascript
- LinearGradient (gradient background)
- Image (logo)
- Text (title, subtitle)
- ActivityIndicator (loading)
```

#### `screens/LoginScreen.js`
**Authentication screen with:**
- Login/Register toggle
- Email/password inputs
- Google Sign-In button (ready)
- Form validation
- Responsive layout

**Features:**
- Toggle between login and registration
- Keyboard-aware scrolling
- Input validation
- Loading states

#### `screens/HomeScreen.js`
**Main content screen featuring:**
- Header with user profile
- Tab navigation (Materi/Quiz)
- Learning material sections:
  - Limit
  - Turunan (Derivative)
  - Integral
- Quiz section
- Logout functionality

**Layout:**
- SafeAreaView for notch/status bar
- ScrollView for content
- Card-based material display
- Tab switching

### Config

#### `config/firebase.js`
Firebase initialization:
- Firebase app initialization
- Auth service export
- Firestore database export
- Same config as web version

## 🎨 Splash Screen Details

### Visual Design
```
┌─────────────────────────────┐
│                             │
│   [Blue Gradient Background] │
│                             │
│     ┌─────────────┐         │
│     │             │         │
│     │    LOGO     │         │
│     │             │         │
│     └─────────────┘         │
│                             │
│      UniKalkulus            │
│  Platform Pembelajaran      │
│       Kalkulus              │
│                             │
│      ⚪ Loading...          │
│                             │
└─────────────────────────────┘
```

### Technical Specs
- **Duration:** 3000ms (3 seconds)
- **Gradient:** Top to bottom
- **Colors:** 
  - Start: #2196F3 (Material Blue)
  - End: #1976D2 (Dark Blue)
- **Logo Size:** 120x120 px
- **Font:** System default, bold
- **Transition:** Smooth navigation to Login/Home

## 🔄 App Flow

```
1. App Launch
   ↓
2. SplashScreen (3s)
   ↓
3. Check Auth State
   ↓
   ├─ Not Logged In → LoginScreen
   │                      ↓
   │                  Login Success
   │                      ↓
   └─ Logged In ────→ HomeScreen
                         ↓
                    Logout → LoginScreen
```

## 🚀 Quick Start Commands

```bash
# Navigate to project
cd expo-mobile-build

# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web
```

## 📦 Required Setup Steps

1. ✅ Project structure created
2. ⚠️ Add assets to `assets/` folder
3. ⚠️ Run `npm install`
4. ⚠️ Test on device/emulator
5. 🚀 Build for production

## 🎯 Feature Checklist

### Implemented ✅
- [x] Splash screen with gradient
- [x] Logo display
- [x] Navigation setup
- [x] Login/Register screens
- [x] Home screen with materials
- [x] Firebase configuration
- [x] User authentication flow
- [x] Tab navigation
- [x] Responsive layout

### To Implement 📋
- [ ] Copy/add image assets
- [ ] Complete Google Sign-In
- [ ] Implement quiz functionality
- [ ] Add MathJax rendering
- [ ] Progress tracking
- [ ] Offline mode
- [ ] Dark theme
- [ ] Push notifications

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| Android | ✅ Ready | Build with `expo build:android` |
| iOS | ✅ Ready | Build with `expo build:ios` |
| Web | ✅ Ready | Run with `npm run web` |

## 🔗 Related Documentation

- [README.md](README.md) - Main project documentation
- [SETUP.md](SETUP.md) - Setup instructions
- [COMPARISON.md](COMPARISON.md) - Flutter vs Expo comparison
- [assets/README.md](assets/README.md) - Asset requirements

## 💡 Tips

1. **Testing:** Use Expo Go app for quick testing on physical devices
2. **Debugging:** Press `m` in terminal to open developer menu
3. **Reloading:** Shake device or press `Cmd+R` / `Ctrl+R` to reload
4. **Assets:** Ensure all images are in correct formats and sizes
5. **Firebase:** Test authentication in development mode first

## 🆘 Troubleshooting

### Common Issues

**"Cannot find module"**
```bash
npm install
```

**Assets not loading**
- Check file paths in code
- Verify assets are in `assets/` folder
- Restart Expo server

**Firebase connection error**
- Check internet connection
- Verify Firebase config in `config/firebase.js`
- Check Firebase console for project status

**Build errors**
- Clear cache: `expo start -c`
- Delete `node_modules` and reinstall

---

**🎉 Your Expo mobile build is ready! Follow the setup instructions and start developing!**
