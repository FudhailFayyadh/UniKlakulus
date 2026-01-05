# UniKalkulus Mobile - Expo App 📱

Platform Pembelajaran Kalkulus Mobile yang dibangun dengan React Native dan Expo.

## ✨ Fitur

- 🔐 **Autentikasi Firebase** - Login/Register dengan Email
- 📚 **Materi Pembelajaran** - Limit, Turunan, dan Integral
- 🧠 **Quiz Interaktif** - 15 soal kalkulus dengan penjelasan
- 👤 **Profil Pengguna** - Tracking progress dan riwayat quiz
- 📊 **Statistik** - Lihat perkembangan belajar Anda
- 📱 **Mobile-First Design** - UI yang dioptimalkan untuk penggunaan mobile

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js (v14 atau lebih baru)
- npm atau yarn
- Expo Go app di smartphone Anda (untuk testing)
- Android Studio (untuk Android development) atau Xcode (untuk iOS development)

### Instalasi

1. **Install dependencies**
```bash
cd expo-mobile-build
npm install
```

2. **Jalankan aplikasi**
```bash
npm start
```

3. **Testing di Device**
   - Scan QR code dengan Expo Go app (Android/iOS)
   - Atau tekan `a` untuk Android emulator
   - Atau tekan `i` untuk iOS simulator (Mac only)
   - Atau tekan `w` untuk web browser

## 📱 Build APK/IPA

### Build untuk Android (APK)

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login ke Expo account
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### Build untuk iOS (IPA)

```bash
# Build IPA (requires Mac)
eas build --platform ios
```

## 📂 Struktur Folder

```
expo-mobile-build/
├── app/                    # App screens (Expo Router)
│   ├── _layout.js         # Root layout & navigation
│   ├── index.js           # Home screen
│   ├── login.js           # Login/Register screen
│   ├── material.js        # Learning material screen
│   ├── quiz.js            # Quiz screen
│   └── profile.js         # User profile screen
├── config/
│   └── firebase.js        # Firebase configuration
├── data/
│   └── quizData.js        # Quiz questions data
├── assets/                # Images, icons, fonts
├── app.json              # Expo configuration
├── package.json          # Dependencies
└── babel.config.js       # Babel configuration
```

## 🔧 Teknologi yang Digunakan

- **React Native** - Framework mobile development
- **Expo** - Development platform & tooling
- **Expo Router** - File-based routing
- **Firebase** - Authentication & Firestore database
- **AsyncStorage** - Local data persistence

## 🎨 Screens

1. **Home Screen** - Intro dan navigasi utama
2. **Login Screen** - Autentikasi pengguna
3. **Material Screen** - Materi pembelajaran (Limit, Turunan, Integral)
4. **Quiz Screen** - Quiz interaktif dengan scoring
5. **Profile Screen** - Profil pengguna dan statistik

## 🔑 Firebase Configuration

Firebase config sudah tersedia di `config/firebase.js`. Jika ingin menggunakan Firebase project Anda sendiri:

1. Buat project di [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Copy config ke `config/firebase.js`

## 📝 Quiz Features

- ✅ 15 soal kalkulus
- ✅ Multiple choice dengan 4 pilihan
- ✅ Penjelasan untuk setiap jawaban
- ✅ Scoring dan progress tracking
- ✅ Hasil quiz disimpan di Firestore (untuk user yang login)

## 🎯 User Progress Tracking

Data yang disimpan di Firestore untuk setiap user:
- Nama dan email
- Riwayat quiz attempts
- Total waktu belajar
- Persentase completion
- Badges (future feature)

## 🌐 Deployment

### Expo Application Services (EAS)

1. **Setup EAS**
```bash
eas build:configure
```

2. **Build Production APK**
```bash
eas build --platform android --profile production
```

3. **Submit to Play Store**
```bash
eas submit --platform android
```

## 📄 License

© 2026 UniKalkulus - Platform Pembelajaran Kalkulus

## 👥 Developer

Created with ❤️ for better calculus learning experience

---

## 🐛 Troubleshooting

### Error: Module not found
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
```

### Firebase initialization error
- Check your internet connection
- Verify Firebase config in `config/firebase.js`
- Ensure Firebase services are enabled

### Build errors
```bash
# Clear Expo cache
expo start -c
```

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Happy Learning! 🎓**
