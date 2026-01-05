# 📱 UniKalkulus Mobile - Screen Flow

## Navigation Structure

```
┌─────────────────────────────────────┐
│         App Root (_layout.js)       │
│         📱 Stack Navigator          │
└──────────────┬──────────────────────┘
               │
               ├─── 🏠 Home (index.js)
               │     │
               │     ├─→ Login Button → 🔐 Login Screen
               │     ├─→ Material Cards → 📚 Material Screen
               │     └─→ Quiz Button → 🧠 Quiz Screen
               │
               ├─── 🔐 Login (login.js)
               │     │
               │     ├─→ Email/Password Login
               │     ├─→ Register New Account
               │     └─→ Success → Back to Home (logged in)
               │
               ├─── 📚 Material (material.js)
               │     │
               │     ├─→ Limit Section
               │     ├─→ Derivative Section
               │     ├─→ Integral Section
               │     └─→ Quiz Button → 🧠 Quiz Screen
               │
               ├─── 🧠 Quiz (quiz.js)
               │     │
               │     ├─→ Question Display
               │     ├─→ Answer Options
               │     ├─→ Explanation
               │     ├─→ Next Question
               │     └─→ Results Screen
               │
               └─── 👤 Profile (profile.js)
                     │
                     ├─→ User Info
                     ├─→ Statistics
                     ├─→ Quiz History
                     ├─→ Navigation Menu
                     └─→ Logout Button
```

## Screen Descriptions

### 🏠 Home Screen (index.js)
**Purpose:** Landing page and main navigation hub

**Elements:**
- Hero section with welcome message
- Login/Register button (if not logged in)
- User welcome card (if logged in)
- Three feature cards:
  - Limit concept
  - Derivative & Differentiation
  - Integral & Antiderivative
- Quiz button
- Footer

**User Actions:**
- Tap "Masuk/Daftar" → Goes to Login screen
- Tap feature card → Goes to Material screen with specific section
- Tap "Mulai Quiz" → Goes to Quiz screen
- Tap "Lihat Profil" → Goes to Profile screen (if logged in)

---

### 🔐 Login Screen (login.js)
**Purpose:** User authentication

**Elements:**
- Header with emoji and title
- Toggle between Login/Register
- Input fields:
  - Name (register only)
  - Email
  - Password
- Submit button
- Switch form link
- Back button

**User Actions:**
- Enter credentials and tap "Masuk" or "Daftar"
- Toggle between login and register forms
- Tap back arrow to return to home

**Firebase Integration:**
- Creates user account with Firebase Auth
- Stores user profile in Firestore
- Persists login with AsyncStorage

---

### 📚 Material Screen (material.js)
**Purpose:** Display educational content

**Elements:**
- Colored header with icon
- Section title
- Content sections:
  - Subtitle
  - Explanation text
  - Formulas and examples
- Navigation buttons (Limit, Turunan, Integral)
- Quiz button at bottom

**User Actions:**
- Scroll to read content
- Tap navigation buttons to switch topics
- Tap "Uji Pemahaman" → Goes to Quiz

**Content Sections:**
1. **Limit** - Definition, theorems, infinity limits
2. **Derivative** - Definition, rules, chain rule, trig functions
3. **Integral** - Indefinite integrals, definite integrals, basic rules

---

### 🧠 Quiz Screen (quiz.js)
**Purpose:** Interactive quiz with scoring

**Elements:**
- Progress header (question number, score)
- Progress bar
- Question text
- Four answer options (A, B, C, D)
- Explanation section (after answering)
- Next button (after answering)
- Login prompt (if not logged in)
- Results screen (after completion)

**User Actions:**
- Read question
- Tap answer option
- Read explanation
- Tap "Lanjut" for next question
- View final score
- Tap "Ulangi Quiz" to restart

**Quiz Features:**
- 15 questions from quizData.js
- Multiple choice (4 options each)
- Instant feedback (correct/wrong)
- Detailed explanations
- Score calculation
- Progress tracking

**Visual Feedback:**
- Correct answer → Green background
- Wrong answer → Red background
- Explanation → Yellow background
- Progress bar fills as you advance

**Firebase Integration:**
- Saves quiz attempts to Firestore (logged in users)
- Stores score, percentage, and timestamp
- Accessible in profile history

---

### 👤 Profile Screen (profile.js)
**Purpose:** User profile and statistics

**Elements:**
- Blue header with avatar
- User name and email
- Statistics cards:
  - Total quizzes completed
  - Average score percentage
- Quiz history section (last 5 attempts)
- Settings/navigation menu
- Logout button
- Footer with version

**User Actions:**
- View personal stats
- Check quiz history
- Navigate to other screens
- Tap "Logout" → Returns to home (logged out)

**Quiz History Items:**
- Score (e.g., "12/15")
- Date
- Percentage badge (colored by performance)
  - Green: 80%+
  - Yellow: 60-79%
  - Red: <60%

**Firebase Integration:**
- Loads user data from Firestore
- Displays progress.quizAttempts array
- Shows real-time statistics

---

## Color Scheme

| Element | Color | Usage |
|---------|-------|-------|
| Primary | `#2196F3` | Headers, buttons, links |
| Success | `#4CAF50` | Quiz button, correct answers |
| Error | `#F44336` | Logout, wrong answers |
| Warning | `#FBC02D` | Explanations, alerts |
| Background | `#f8f9fa` | Page backgrounds |
| White | `#ffffff` | Cards, containers |
| Text Dark | `#000000` | Headings |
| Text Medium | `#333333` | Body text |
| Text Light | `#666666` | Subtitles |

---

## Typography

| Style | Font Size | Weight | Usage |
|-------|-----------|--------|-------|
| Hero Title | 28px | bold | Main headings |
| Section Title | 24px | bold | Section headers |
| Card Title | 20px | bold | Card headings |
| Body Large | 18px | normal | Important text |
| Body | 16px | normal | Regular text |
| Small | 14px | normal | Captions, labels |
| Tiny | 12px | normal | Footer text |

---

## Touch Targets

All interactive elements follow mobile best practices:
- **Minimum size:** 44x44 pixels
- **Padding:** 12-20px for comfortable tapping
- **Spacing:** 8-12px between elements
- **Feedback:** Visual state changes on press

---

## Responsive Behavior

- All screens use `ScrollView` for vertical scrolling
- Content adapts to different screen sizes
- Safe area insets respected on iOS
- Keyboard avoidance on input screens
- Proper handling of landscape/portrait

---

## Navigation Flow Examples

### First-time User
```
Home → Login (Register) → Home (Logged in) → Material → Quiz → Profile
```

### Returning User
```
Home (Auto-logged in) → Quiz → Results → Profile
```

### Learning Flow
```
Home → Material (Limit) → Material (Turunan) → Material (Integral) → Quiz
```

### Quiz Flow
```
Quiz Start → Question 1 → ... → Question 15 → Results → Restart or Home
```

---

## Data Flow

### Authentication
```
Login Screen
    ↓ (signInWithEmailAndPassword)
Firebase Auth
    ↓ (onAuthStateChanged)
All Screens (user state updated)
    ↓ (user object available)
Profile, Quiz (load user data)
```

### Quiz Progress
```
Quiz Screen
    ↓ (user answers question)
Local State (score, current question)
    ↓ (quiz complete)
Firebase Firestore
    ↓ (save to users/{uid}/progress/quizAttempts)
Profile Screen (displays history)
```

### User Profile
```
Profile Screen
    ↓ (getDoc)
Firebase Firestore
    ↓ (users/{uid})
Display user data
    ↓ (calculate stats)
Show quiz history & average score
```

---

This structure ensures a smooth, intuitive mobile experience! 📱✨
