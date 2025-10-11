# UniKalkulus - Platform Pembelajaran Kalkulus

Platform pembelajaran kalkulus interaktif dengan sistem autentikasi dan penyimpanan progress pengguna.

## 🚀 Fitur Utama

### Frontend Features
- ✅ Pembelajaran interaktif materi kalkulus (Limit, Turunan, Integral)
- ✅ Quiz sistem dengan bank soal random
- ✅ Rendering formula matematika dengan MathJax
- ✅ Responsive design untuk semua device
- ✅ Progress tracking dan statistik belajar
- ✅ Authentication sistem (Login/Register)
- ✅ User dashboard dan leaderboard

### Backend Features
- ✅ RESTful API dengan Express.js
- ✅ MongoDB database untuk penyimpanan data
- ✅ JWT Authentication dengan bcrypt
- ✅ Password validation dan security
- ✅ Progress tracking dan quiz history
- ✅ User statistics dan analytics
- ✅ Rate limiting dan CORS protection
- ✅ Google OAuth integration (optional)

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- MathJax untuk rendering formula matematika
- Responsive Grid Layout
- Fetch API untuk komunikasi dengan backend

### Backend
- Node.js + Express.js
- MongoDB + Mongoose ODM
- JWT untuk authentication
- bcryptjs untuk password hashing
- express-validator untuk validasi
- helmet untuk security headers
- cors untuk cross-origin requests

## 📁 Struktur Project

```
UniKalkulus/
├── frontend/                 # Static website files
│   ├── index.html           # Main HTML file
│   ├── style.css            # Main styles
│   ├── auth-styles.css      # Authentication styles
│   ├── script.js            # Main JavaScript
│   ├── auth.js              # Authentication manager
│   ├── config.js            # API configuration
│   └── image.jpg            # Hero image
├── backend/                 # Node.js API server
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── models/             # Database models
│   │   └── User.js         # User model
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── user.js         # User management routes
│   │   └── progress.js     # Progress tracking routes
│   ├── middleware/         # Express middleware
│   │   └── auth.js         # Authentication middleware
│   └── .env.example        # Environment variables template
└── README.md               # This file
```

## 🚀 Setup dan Installation

### Prerequisites
- Node.js (v16 atau lebih baru)
- MongoDB (local atau MongoDB Atlas)
- Git

### Backend Setup

1. **Clone repository dan masuk ke folder backend**
   ```bash
   cd UniKalkulus/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit file `.env` dengan konfigurasi Anda:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/unikalkulus
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Jalankan server development**
   ```bash
   npm run dev
   ```
   
   Server akan berjalan di `http://localhost:5000`

### Frontend Setup

1. **Masuk ke folder frontend**
   ```bash
   cd UniKalkulus/
   ```

2. **Update konfigurasi API**
   Edit file `config.js` dan sesuaikan `BASE_URL`:
   ```javascript
   const API_CONFIG = {
     BASE_URL: 'http://localhost:5000/api', // Untuk development
     // BASE_URL: 'https://your-backend-url.herokuapp.com/api', // Untuk production
   };
   ```

3. **Jalankan dengan live server**
   - Gunakan VS Code Live Server extension, atau
   - Python: `python -m http.server 3000`, atau
   - Node.js: `npx serve -s . -l 3000`

   Frontend akan berjalan di `http://localhost:3000`

## 🌐 Deployment

### Backend Deployment (Railway/Heroku)

#### Railway Deployment
1. **Daftar di Railway.app**
2. **Connect GitHub repository**
3. **Set environment variables di Railway dashboard:**
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/unikalkulus
   JWT_SECRET=your-production-jwt-secret
   FRONTEND_URL=https://your-frontend-domain.netlify.app
   ```
4. **Deploy akan otomatis dari branch main**

#### Heroku Deployment
1. **Install Heroku CLI**
2. **Login ke Heroku**
   ```bash
   heroku login
   ```
3. **Create Heroku app**
   ```bash
   cd backend
   heroku create unikalkulus-api
   ```
4. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-mongodb-atlas-uri
   heroku config:set JWT_SECRET=your-production-secret
   heroku config:set FRONTEND_URL=https://your-frontend.netlify.app
   ```
5. **Deploy**
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Netlify/Vercel)

#### Netlify Deployment
1. **Update `config.js` dengan production backend URL**
   ```javascript
   if (isProduction) {
     API_CONFIG.BASE_URL = 'https://your-backend-url.railway.app/api';
   }
   ```
2. **Push ke GitHub**
3. **Connect repository di Netlify**
4. **Deploy akan otomatis**

#### GitHub Pages Deployment
1. **Update konfigurasi untuk production**
2. **Push ke repository**
3. **Enable GitHub Pages di repository settings**
4. **Set source ke main branch**

### Database Setup (MongoDB Atlas)
1. **Daftar di MongoDB Atlas**
2. **Create cluster baru**
3. **Setup network access (0.0.0.0/0 untuk development)**
4. **Create database user**
5. **Get connection string dan update di environment variables**

## 📝 API Documentation

### Authentication Endpoints
```
POST /api/auth/register     # Register user baru
POST /api/auth/login        # Login user
GET  /api/auth/me           # Get current user
PUT  /api/auth/profile      # Update profile
PUT  /api/auth/change-password # Change password
POST /api/auth/logout       # Logout user
```

### User Management Endpoints
```
GET  /api/user/dashboard    # Get user dashboard
GET  /api/user/quiz-history # Get quiz history
GET  /api/user/leaderboard  # Get leaderboard
POST /api/user/reset-progress # Reset user progress
```

### Progress Tracking Endpoints
```
GET  /api/progress          # Get user progress
PUT  /api/progress/topic    # Update topic progress
POST /api/progress/quiz-result # Save quiz result
GET  /api/progress/analytics # Get detailed analytics
POST /api/progress/study-session # Log study session
```

## 🔒 Security Features

- Password hashing dengan bcrypt (cost factor 12)
- JWT token dengan expiration
- Input validation dan sanitization
- Rate limiting untuk API endpoints
- CORS protection
- Helmet untuk security headers
- Environment variable untuk sensitive data

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/admin),
  progress: {
    limit: { completed, score, timeSpent, lastAccessed },
    derivative: { completed, score, timeSpent, lastAccessed },
    integral: { completed, score, timeSpent, lastAccessed }
  },
  quizResults: [{
    topic: String,
    score: Number,
    totalQuestions: Number,
    correctAnswers: Number,
    timeSpent: Number,
    completedAt: Date,
    answers: [{ questionId, selectedAnswer, isCorrect }]
  }],
  stats: {
    totalQuizzesTaken: Number,
    totalTimeSpent: Number,
    averageScore: Number,
    streakDays: Number
  },
  timestamps: true
}
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration dengan validasi
- [ ] User login dengan email/password
- [ ] Quiz dapat diambil setelah login
- [ ] Progress tersimpan ke database
- [ ] Quiz history ditampilkan
- [ ] Dashboard menampilkan statistik
- [ ] Logout berfungsi dengan benar
- [ ] Responsive design di mobile

### API Testing dengan Postman
1. Import collection dari `backend/postman-collection.json`
2. Set environment variables untuk base URL
3. Test semua endpoints sesuai flow

## 🚨 Troubleshooting

### Common Issues

**CORS Error**
```javascript
// Pastikan CORS dikonfigurasi dengan benar di server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

**MongoDB Connection Error**
- Pastikan MongoDB running (local) atau connection string benar (Atlas)
- Check network access di MongoDB Atlas
- Verify database user credentials

**JWT Token Issues**
- Pastikan JWT_SECRET sama di development dan production
- Check token expiration time
- Verify Authorization header format: `Bearer <token>`

**Frontend API Connection**
- Update `config.js` dengan backend URL yang benar
- Check browser developer tools untuk error network
- Verify HTTPS/HTTP protocol matching

## 📈 Future Enhancements

- [ ] Google OAuth integration
- [ ] Email verification sistem
- [ ] Password reset functionality
- [ ] Real-time leaderboard dengan WebSocket
- [ ] Video pembelajaran terintegrasi
- [ ] Mobile app dengan React Native
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Offline mode dengan Service Worker
- [ ] Push notifications

## 👥 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Support

Jika ada pertanyaan atau issue:
- Create GitHub issue
- Email: support@unikalkulus.com
- Documentation: [docs.unikalkulus.com](https://docs.unikalkulus.com)

---

**UniKalkulus Team** © 2025