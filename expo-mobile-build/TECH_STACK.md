# UniKalkulus Mobile App - Tech Stack Documentation

## Frontend

| Komponen | Teknologi / File | Fungsi Utama |
|----------|------------------|--------------|
| Framework Mobile | React Native (Expo SDK 52) | Membangun aplikasi mobile cross-platform dengan JavaScript/React |
| Struktur Routing | expo-router (app/_layout.js, app/index.js, app/login.js, app/material.js, app/quiz.js, app/profile.js) | Navigasi berbasis file-based routing untuk perpindahan antar halaman |
| Tata Letak dan Gaya Visual | StyleSheet (React Native) | Mengatur tampilan antarmuka (warna, tipografi, margin, layout responsif) |
| Interaktivitas Halaman | React Hooks (useState) | Mengelola state komponen seperti login form, quiz answers, video expansion |
| Video Pembelajaran | react-native-webview (WebView) | Menampilkan video YouTube embedded dalam aplikasi |
| Penyimpanan Lokal | @react-native-async-storage/async-storage | Menyimpan data autentikasi dan preferences secara lokal |
| Data Materi Kuis | data/quizData.js | Menyimpan 15 soal kuis kalkulus (limit, turunan, integral) |

## Backend

| Fitur | Teknologi | Deskripsi Implementasi |
|-------|-----------|------------------------|
| Autentikasi Pengguna | Firebase Authentication | Mengelola proses login, registrasi, dan logout menggunakan metode Email/Password |
| Penyimpanan Data Pengguna | Firebase Firestore | Menyimpan data pengguna seperti nama, email, skor kuis, dan progress pembelajaran dalam collection `users/{uid}` |
| Integrasi SDK | config/firebase.js | Menghubungkan front-end dengan Firebase project menggunakan API Key dan konfigurasi Auth serta Firestore |
| Sinkronisasi Data | Firestore Real-time Listener | Memperbarui data progress pengguna secara langsung tanpa perlu memuat ulang halaman |
| Video Content Delivery | YouTube Embed API | Streaming video pembelajaran dari channel TPB Santuy melalui WebView |

## Teknologi yang digunakan

| Komponen | Layanan / Tools | Deskripsi |
|----------|----------------|-----------|
| Hosting Backend | Firebase Cloud | Menyediakan layanan autentikasi dan penyimpanan data berbasis cloud |
| Build Service | EAS Build (Expo Application Services) | Membangun APK/IPA untuk distribusi melalui cloud build |
| Version Control | Git & GitHub | Digunakan untuk manajemen versi dan kolaborasi tim |
| Development Server | Expo Go + Metro Bundler | Testing aplikasi secara real-time di perangkat fisik tanpa build |
| Package Manager | npm | Mengelola dependencies dan packages JavaScript |
| Mobile Platforms | Android & iOS | Target platform untuk distribusi aplikasi |

## Arsitektur Sistem
