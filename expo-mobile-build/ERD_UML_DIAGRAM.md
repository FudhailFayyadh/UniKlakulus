# UniKalkulus Mobile App - ERD & UML Diagram

## Entity Relationship Diagram (ERD)

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER (Firebase Auth)                     │
├─────────────────────────────────────────────────────────────────┤
│ PK  uid: string                                                  │
│     email: string                                                │
│     displayName: string                                          │
│     photoURL: string (optional)                                  │
│     emailVerified: boolean                                       │
│     createdAt: timestamp                                         │
│     lastLoginAt: timestamp                                       │
└─────────────────────────────────────────────────────────────────┘
                              │ 1
                              │
                              │ has
                              │
                              │ 1
┌─────────────────────────────────────────────────────────────────┐
│                    USER_DOCUMENT (Firestore)                     │
├─────────────────────────────────────────────────────────────────┤
│ PK  userId: string (references User.uid)                         │
│     name: string                                                 │
│     email: string                                                │
│     photoURL: string (optional)                                  │
│     createdAt: string (ISO datetime)                             │
│ FK  progress: Progress (embedded)                                │
└─────────────────────────────────────────────────────────────────┘
                              │ 1
                              │
                              │ contains
                              │
                              │ 1
┌─────────────────────────────────────────────────────────────────┐
│                         PROGRESS (Embedded)                      │
├─────────────────────────────────────────────────────────────────┤
│     sectionsViewed: array<string>                                │
│     quizAttempts: array<QuizAttempt>                             │
│     totalTimeSpent: number (minutes)                             │
│     completionPercentage: number (0-100)                         │
│     badges: array<string>                                        │
└─────────────────────────────────────────────────────────────────┘
                              │ 1
                              │
                              │ contains many
                              │
                              │ 0..*
┌─────────────────────────────────────────────────────────────────┐
│                    QUIZ_ATTEMPT (Embedded)                       │
├─────────────────────────────────────────────────────────────────┤
│     score: number                                                │
│     total: number                                                │
│     percentage: number (0-100)                                   │
│     date: string (ISO datetime)                                  │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                      QUIZ_DATA (Static/Client)                   │
├─────────────────────────────────────────────────────────────────┤
│     question: string                                             │
│     options: array<string> [4 items]                             │
│     correct: number (index 0-3)                                  │
│     explanation: string                                          │
└─────────────────────────────────────────────────────────────────┘
```

---

## UML Class Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        «Entity» User                             │
├─────────────────────────────────────────────────────────────────┤
│ - uid: string                                                    │
│ - email: string                                                  │
│ - displayName: string                                            │
│ - photoURL?: string                                              │
│ - emailVerified: boolean                                         │
├─────────────────────────────────────────────────────────────────┤
│ + signInWithEmail(email, password): Promise<User>                │
│ + signInWithGoogle(): Promise<User>                              │
│ + createAccount(email, password, name): Promise<User>            │
│ + signOut(): Promise<void>                                       │
│ + updateProfile(data): Promise<void>                             │
│ + getIdToken(): Promise<string>                                  │
└─────────────────────────────────────────────────────────────────┘
                              △
                              │ extends
                              │
┌─────────────────────────────────────────────────────────────────┐
│                   «Entity» UserDocument                          │
├─────────────────────────────────────────────────────────────────┤
│ - userId: string                                                 │
│ - name: string                                                   │
│ - email: string                                                  │
│ - photoURL?: string                                              │
│ - createdAt: string                                              │
│ - progress: Progress                                             │
├─────────────────────────────────────────────────────────────────┤
│ + loadUserData(uid): Promise<UserDocument>                       │
│ + updateProgress(progress): Promise<void>                        │
│ + addQuizAttempt(attempt): Promise<void>                         │
│ + getQuizHistory(): QuizAttempt[]                                │
│ + getAverageScore(): number                                      │
└─────────────────────────────────────────────────────────────────┘
                              ◇ 1
                              │ has
                              │
┌─────────────────────────────────────────────────────────────────┐
│                    «ValueObject» Progress                        │
├─────────────────────────────────────────────────────────────────┤
│ - sectionsViewed: string[]                                       │
│ - quizAttempts: QuizAttempt[]                                    │
│ - totalTimeSpent: number                                         │
│ - completionPercentage: number                                   │
│ - badges: string[]                                               │
├─────────────────────────────────────────────────────────────────┤
│ + addSectionViewed(section): void                                │
│ + addQuizAttempt(attempt): void                                  │
│ + updateTimeSpent(minutes): void                                 │
│ + calculateCompletion(): number                                  │
│ + addBadge(badge): void                                          │
└─────────────────────────────────────────────────────────────────┘
                              ◇ 0..*
                              │ contains
                              │
┌─────────────────────────────────────────────────────────────────┐
│                  «ValueObject» QuizAttempt                       │
├─────────────────────────────────────────────────────────────────┤
│ - score: number                                                  │
│ - total: number                                                  │
│ - percentage: number                                             │
│ - date: string                                                   │
├─────────────────────────────────────────────────────────────────┤
│ + calculatePercentage(): number                                  │
│ + isPassing(): boolean                                           │
│ + getGrade(): string                                             │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                    «Entity» QuizQuestion                         │
├─────────────────────────────────────────────────────────────────┤
│ - question: string                                               │
│ - options: string[]                                              │
│ - correct: number                                                │
│ - explanation: string                                            │
├─────────────────────────────────────────────────────────────────┤
│ + checkAnswer(index): boolean                                    │
│ + getExplanation(): string                                       │
│ + getCorrectAnswer(): string                                     │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                     «Service» AuthService                        │
├─────────────────────────────────────────────────────────────────┤
│ + signInWithEmail(email, password): Promise<User>                │
│ + signInWithGoogle(): Promise<User>                              │
│ + createAccount(email, password, name): Promise<User>            │
│ + signOut(): Promise<void>                                       │
│ + getCurrentUser(): User | null                                  │
│ + onAuthStateChanged(callback): Unsubscribe                      │
└─────────────────────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────┐
│                   «Service» FirestoreService                     │
├─────────────────────────────────────────────────────────────────┤
│ + getUserDocument(uid): Promise<UserDocument>                    │
│ + createUserDocument(uid, data): Promise<void>                   │
│ + updateUserProgress(uid, progress): Promise<void>               │
│ + addQuizAttempt(uid, attempt): Promise<void>                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.js (Root)                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ contains
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Expo Router (_layout.js)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  index.js      │  │  login.js      │  │  profile.js    │
│  (Home)        │  │  (Auth)        │  │  (User Info)   │
└────────────────┘  └────────────────┘  └────────────────┘
            │                 │                 │
            ▼                 ▼                 ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  material.js   │  │ FirebaseAuth   │  │  Firestore     │
│  (Learning)    │  │ - Email/Pass   │  │  - User Docs   │
└────────────────┘  │ - Google OAuth │  │  - Progress    │
            │       └────────────────┘  └────────────────┘
            ▼
┌────────────────┐
│  quiz.js       │
│  (Assessment)  │
└────────────────┘
            │
            ▼
┌────────────────┐
│  quizData.js   │
│  (Questions)   │
└────────────────┘
```

---

## Data Flow Diagram

```
┌──────────┐         Login/Register          ┌──────────────┐
│          │ ──────────────────────────────> │              │
│   User   │                                  │ Firebase     │
│          │ <────────────────────────────── │ Auth         │
└──────────┘      Auth Token/User Object     └──────────────┘
      │                                              │
      │                                              │
      │ Take Quiz                                    │ Verify Token
      │                                              │
      ▼                                              ▼
┌──────────┐         Quiz Questions          ┌──────────────┐
│          │ ──────────────────────────────> │              │
│  Quiz    │                                  │   Quiz       │
│  Screen  │ <────────────────────────────── │   Data       │
└──────────┘         Show Results            └──────────────┘
      │
      │ Submit Score
      │
      ▼
┌──────────┐       Save Quiz Attempt         ┌──────────────┐
│          │ ──────────────────────────────> │              │
│ Firebase │                                  │  Firestore   │
│ Service  │ <────────────────────────────── │  Database    │
└──────────┘       Confirmation/Error        └──────────────┘
      │
      │
      ▼
┌──────────┐       Load User Data            ┌──────────────┐
│          │ ──────────────────────────────> │              │
│ Profile  │                                  │  Firestore   │
│ Screen   │ <────────────────────────────── │  users/{uid} │
└──────────┘     User Document & Progress    └──────────────┘
```

---

## Firestore Database Structure

```json
{
  "users": {
    "{userId}": {
      "name": "John Doe",
      "email": "john@example.com",
      "photoURL": "https://...",
      "createdAt": "2026-01-05T12:00:00.000Z",
      "progress": {
        "sectionsViewed": ["limit", "derivative", "integral"],
        "quizAttempts": [
          {
            "score": 12,
            "total": 15,
            "percentage": 80,
            "date": "2026-01-05T13:00:00.000Z"
          },
          {
            "score": 14,
            "total": 15,
            "percentage": 93,
            "date": "2026-01-05T14:00:00.000Z"
          }
        ],
        "totalTimeSpent": 120,
        "completionPercentage": 75,
        "badges": ["first-quiz", "high-scorer"]
      }
    }
  }
}
```

---

## Authentication Flow

```
┌────────────────────────────────────────────────────────────────┐
│                     Authentication Flows                        │
└────────────────────────────────────────────────────────────────┘

1. Email/Password Flow:
   User → Enter Email/Password → Firebase Auth → Verify Credentials
   → Generate Auth Token → Load User Document → Redirect to Home

2. Google Sign-In Flow:
   User → Click Google Button → Google Sign-In Dialog
   → Select Account → Google OAuth → Firebase Auth
   → Generate Auth Token → Check/Create User Document → Redirect to Home

3. Registration Flow:
   User → Enter Details → Firebase Auth Create Account
   → Update Profile (displayName) → Create Firestore User Document
   → Initialize Progress → Redirect to Home
```

---

## State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                         App State                                │
├─────────────────────────────────────────────────────────────────┤
│  Global:                                                         │
│  - auth.currentUser (Firebase Auth State)                       │
│                                                                  │
│  Login Screen:                                                   │
│  - isLogin: boolean                                              │
│  - email: string                                                 │
│  - password: string                                              │
│  - name: string                                                  │
│  - loading: boolean                                              │
│                                                                  │
│  Quiz Screen:                                                    │
│  - currentQuestion: number                                       │
│  - selectedAnswer: number | null                                 │
│  - score: number                                                 │
│  - showResult: boolean                                           │
│  - showExplanation: boolean                                      │
│  - user: User | null                                             │
│                                                                  │
│  Profile Screen:                                                 │
│  - user: User | null                                             │
│  - userData: UserDocument | null                                 │
│  - loading: boolean                                              │
└─────────────────────────────────────────────────────────────────┘
```

---

## Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      // Users can only read/write their own document
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## API Integration Points

```
┌─────────────────────────────────────────────────────────────────┐
│                      External Services                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Firebase Authentication                                         │
│  - Endpoint: https://identitytoolkit.googleapis.com              │
│  - Methods: signIn, signUp, signOut, verifyToken                │
│                                                                  │
│  Firebase Firestore                                              │
│  - Endpoint: https://firestore.googleapis.com                    │
│  - Methods: getDoc, setDoc, updateDoc, arrayUnion                │
│                                                                  │
│  Google OAuth                                                    │
│  - Endpoint: https://accounts.google.com/o/oauth2/auth          │
│  - Methods: authorize, getToken, refreshToken                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

This ERD/UML documentation provides a complete overview of the UniKalkulus mobile app data structure and architecture.
