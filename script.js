const quizBankData = [
  {
    question: "Berapa hasil limit dari (x² - 4)/(x - 2) saat x mendekati 2?",
    options: ["2", "4", "6", "Tak terdefinisi"],
    correct: 1,
    explanation: "Faktorkan pembilang: (x² - 4) = (x + 2)(x - 2). Sehingga (x² - 4)/(x - 2) = (x + 2)(x - 2)/(x - 2) = x + 2. Ketika x → 2, hasilnya = 2 + 2 = 4."
  },
  {
    question: "Jika f(x) = x³ + 2x² - 5x + 1, maka turunan pertamanya adalah:",
    options: [
      "3x² + 4x - 5",
      "x⁴ + 2x³ - 5x² + x",
      "3x² + 2x - 5",
      "3x³ + 4x² - 5x",
    ],
    correct: 0,
    explanation: "Gunakan aturan pangkat: d/dx(xⁿ) = n·xⁿ⁻¹. Jadi f'(x) = 3x² + 2(2x) - 5(1) + 0 = 3x² + 4x - 5."
  },
  {
    question: "Hasil integral dari 2x terhadap x adalah:",
    options: ["2 + C", "x + C", "x² + C", "2x² + C"],
    correct: 2,
    explanation: "Gunakan aturan integral: ∫axⁿ dx = (a/(n+1))xⁿ⁺¹ + C. Jadi ∫2x dx = ∫2x¹ dx = (2/2)x² + C = x² + C."
  },
  {
    question: "Nilai dari lim(x→0) sin(x)/x adalah:",
    options: ["0", "1", "∞", "Tidak ada"],
    correct: 1,
    explanation: "Ini adalah limit fundamental trigonometri yang standar: lim(x→0) sin(x)/x = 1. Dapat dibuktikan menggunakan teorema squeeze atau aturan L'Hôpital."
  },
  {
    question: "Turunan kedua dari f(x) = x⁴ - 2x³ + x² adalah:",
    options: ["12x² - 12x + 2", "4x³ - 6x² + 2x", "12x - 12", "x⁵ - x⁴ + x³/3"],
    correct: 0,
    explanation: "f'(x) = 4x³ - 6x² + 2x, kemudian f''(x) = 12x² - 12x + 2."
  },
  {
    question: "Berapa hasil dari lim(x→∞) (3x² + 2x + 1)/(2x² + 5x + 3)?",
    options: ["3/2", "2/3", "1", "∞"],
    correct: 0,
    explanation: "Untuk limit rasional saat x→∞, bagi pembilang dan penyebut dengan pangkat tertinggi (x²): lim(x→∞) (3 + 2/x + 1/x²)/(2 + 5/x + 3/x²) = 3/2."
  },
  {
    question: "Turunan dari f(x) = e^(2x) adalah:",
    options: ["e^(2x)", "2e^(2x)", "e^(2x) + 2", "2x·e^(2x)"],
    correct: 1,
    explanation: "Gunakan aturan rantai: d/dx[e^(u)] = e^(u)·u'. Di sini u = 2x, jadi u' = 2. Maka f'(x) = e^(2x)·2 = 2e^(2x)."
  },
  {
    question: "Hasil integral dari cos(x) dx adalah:",
    options: ["-cos(x) + C", "cos(x) + C", "sin(x) + C", "-sin(x) + C"],
    correct: 2,
    explanation: "∫cos(x) dx = sin(x) + C. Ini adalah integral dasar trigonometri yang perlu dihapal."
  },
  {
    question: "Jika f(x) = ln(x), maka f'(x) adalah:",
    options: ["1/x", "x", "ln(x)", "e^x"],
    correct: 0,
    explanation: "Turunan dari logaritma natural adalah: d/dx[ln(x)] = 1/x (untuk x > 0)."
  },
  {
    question: "Nilai dari ∫₀^π sin(x) dx adalah:",
    options: ["0", "1", "2", "-1"],
    correct: 2,
    explanation: "∫sin(x) dx = -cos(x) + C. Jadi ∫₀^π sin(x) dx = [-cos(x)]₀^π = -cos(π) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2."
  },
  {
    question:
      "Turunan dari f(x) = x·sin(x) menggunakan aturan perkalian adalah:",
    options: ["sin(x) + x·cos(x)", "x·cos(x)", "sin(x)", "cos(x) + x·sin(x)"],
    correct: 0,
    explanation: "Gunakan aturan perkalian: (u·v)' = u'·v + u·v'. Di sini u = x (u' = 1) dan v = sin(x) (v' = cos(x)). Jadi f'(x) = 1·sin(x) + x·cos(x) = sin(x) + x·cos(x)."
  },
  {
    question: "Berapa hasil dari lim(x→0) (1 - cos(x))/x²?",
    options: ["0", "1/2", "1", "∞"],
    correct: 1,
    explanation: "Gunakan identitas trigonometri: 1 - cos(x) = 2sin²(x/2). Maka limit menjadi lim(x→0) 2sin²(x/2)/x² = lim(x→0) 2·(sin(x/2)/(x/2))²·(1/2)² = 2·1²·(1/4) = 1/2."
  },
  {
    question: "Hasil dari ∫ 1/x dx adalah:",
    options: ["x + C", "-1/x + C", "1/x² + C", "ln|x| + C"],
    correct: 3,
    explanation: "∫ 1/x dx = ln|x| + C. Ini adalah integral standar yang penting untuk diingat. Nilai absolut diperlukan karena ln(x) hanya terdefinisi untuk x > 0."
  },
  {
    question: "Turunan dari f(x) = tan(x) adalah:",
    options: ["sec²(x)", "cot(x)", "sec(x)·tan(x)", "csc²(x)"],
    correct: 0,
    explanation: "d/dx[tan(x)] = sec²(x). Dapat diturunkan dari tan(x) = sin(x)/cos(x) menggunakan aturan pembagian."
  },
  {
    question: "Nilai maksimum dari f(x) = -x² + 4x + 1 adalah:",
    options: ["5", "4", "3", "6"],
    correct: 0,
    explanation: "Ini adalah parabola terbuka ke bawah. Titik maksimum di x = -b/(2a) = -4/(2(-1)) = 2. Nilai maksimum f(2) = -(2)² + 4(2) + 1 = -4 + 8 + 1 = 5."
  },
  {
    question: "Hasil integral dari e^x dx adalah:",
    options: ["e^x·x + C", "e^(x+1) + C", "x·e^x + C", "e^x + C"],
    correct: 3,
    explanation: "∫e^x dx = e^x + C. Fungsi eksponential e^x adalah satu-satunya fungsi yang turunannya sama dengan dirinya sendiri."
  },
  {
    question: "Jika f(x) = x³, berapa laju perubahan f(x) saat x = 2?",
    options: ["6", "8", "12", "4"],
    correct: 2,
    explanation: "Laju perubahan adalah turunan. f'(x) = 3x². Pada x = 2: f'(2) = 3(2)² = 3(4) = 12."
  },
  {
    question: "Berapa hasil dari lim(x→1) (x³ - 1)/(x - 1)?",
    options: ["1", "2", "3", "0"],
    correct: 2,
    explanation: "Faktorkan x³ - 1 = (x - 1)(x² + x + 1). Maka (x³ - 1)/(x - 1) = x² + x + 1. Ketika x → 1: 1² + 1 + 1 = 3."
  },
  {
    question: "Turunan dari f(x) = √x adalah:",
    options: ["√x/2", "1/√x", "1/(2√x)", "2√x"],
    correct: 2,
    explanation: "√x = x^(1/2). Gunakan aturan pangkat: d/dx[x^(1/2)] = (1/2)x^(-1/2) = 1/(2√x)."
  },
  {
    question: "Hasil dari ∫₁² (2x + 1) dx adalah:",
    options: ["6", "5", "7", "4"],
    correct: 3,
    explanation: "∫(2x + 1) dx = x² + x + C. Evaluasi dari 1 ke 2: [x² + x]₁² = (2² + 2) - (1² + 1) = (4 + 2) - (1 + 1) = 6 - 2 = 4."
  },
  {
    question: "Nilai dari lim(x→2) (x² - 4x + 4)/(x - 2) adalah:",
    options: ["0", "2", "4", "Tidak ada"],
    correct: 0,
    explanation: "Faktorkan pembilang: x² - 4x + 4 = (x - 2)². Maka limit = lim(x→2) (x - 2)²/(x - 2) = lim(x→2) (x - 2) = 2 - 2 = 0."
  },
  {
    question: "Turunan dari f(x) = x²·e^x menggunakan aturan perkalian adalah:",
    options: ["2x·e^x", "x²·e^x + 2x·e^x", "2x·e^x + x²", "x²·e^x"],
    correct: 1,
    explanation: "Gunakan aturan perkalian: (uv)' = u'v + uv'. Di sini u = x² (u' = 2x) dan v = e^x (v' = e^x). Jadi f'(x) = 2x·e^x + x²·e^x."
  },
  {
    question: "Hasil dari ∫₀¹ x³ dx adalah:",
    options: ["1/4", "1/3", "1/2", "1"],
    correct: 0,
    explanation: "∫x³ dx = x⁴/4 + C. Evaluasi dari 0 ke 1: [x⁴/4]₀¹ = 1⁴/4 - 0⁴/4 = 1/4."
  },
  {
    question: "Nilai minimum dari f(x) = x² - 6x + 8 adalah:",
    options: ["-1", "-2", "1", "2"],
    correct: 0,
    explanation: "Ini parabola terbuka ke atas. Minimum di x = -b/(2a) = 6/2 = 3. Nilai minimum f(3) = 3² - 6(3) + 8 = 9 - 18 + 8 = -1."
  },
  {
    question: "Turunan dari f(x) = cos(2x) adalah:",
    options: ["-sin(2x)", "-2sin(2x)", "2cos(2x)", "sin(2x)"],
    correct: 1,
    explanation: "Gunakan aturan rantai: d/dx[cos(u)] = -sin(u)·u'. Di sini u = 2x, jadi u' = 2. Maka f'(x) = -sin(2x)·2 = -2sin(2x)."
  },
  {
    question: "Hasil dari ∫ x²·ln(x) dx menggunakan integrasi parsial adalah:",
    options: ["(x³/3)·ln(x) - x³/9 + C", "x²·ln(x) - x + C", "(x³/3)·ln(x) + C", "x·ln(x) - x + C"],
    correct: 0,
    explanation: "Gunakan integrasi parsial: ∫u dv = uv - ∫v du. Pilih u = ln(x) (du = dx/x) dan dv = x² dx (v = x³/3). Hasil: (x³/3)·ln(x) - ∫(x³/3)·(1/x) dx = (x³/3)·ln(x) - x³/9 + C."
  },
  {
    question: "Nilai dari lim(x→∞) (2x³ - 5x² + 1)/(x³ + 3x - 7) adalah:",
    options: ["0", "1", "2", "∞"],
    correct: 2,
    explanation: "Untuk limit rasional saat x→∞, bagi dengan pangkat tertinggi (x³): lim(x→∞) (2 - 5/x + 1/x³)/(1 + 3/x² - 7/x³) = 2/1 = 2."
  },
  {
    question: "Jika f(x) = x⁴ - 4x³ + 6x² - 4x + 1, maka f'(1) adalah:",
    options: ["0", "1", "2", "4"],
    correct: 0,
    explanation: "f'(x) = 4x³ - 12x² + 12x - 4. Substitusi x = 1: f'(1) = 4(1)³ - 12(1)² + 12(1) - 4 = 4 - 12 + 12 - 4 = 0."
  },
  {
    question: "Area di bawah kurva y = x² dari x = 0 hingga x = 3 adalah:",
    options: ["6", "8", "9", "12"],
    correct: 2,
    explanation: "∫₀³ x² dx = [x³/3]₀³ = (3³/3) - (0³/3) = 27/3 = 9."
  },
  {
    question: "Turunan dari f(x) = arctan(x) adalah:",
    options: ["1/(1+x)", "1/√(1-x²)", "1/(1+x²)", "-1/(1+x²)"],
    correct: 2,
    explanation: "d/dx[arctan(x)] = 1/(1+x²). Ini adalah turunan standar fungsi invers trigonometri."
  },
  {
    question: "Nilai dari ∫₋₁¹ x³ dx adalah:",
    options: ["0", "1/2", "-1/2", "2"],
    correct: 0,
    explanation: "Karena x³ adalah fungsi ganjil dan integral dari -1 ke 1, hasilnya = 0. Dapat juga dihitung: [x⁴/4]₋₁¹ = 1/4 - 1/4 = 0."
  },
  {
    question: "Titik infleksi dari f(x) = x³ - 6x² + 9x + 1 terjadi pada x =:",
    options: ["1", "2", "3", "4"],
    correct: 1,
    explanation: "Titik infleksi saat f''(x) = 0. f'(x) = 3x² - 12x + 9, f''(x) = 6x - 12. Set f''(x) = 0: 6x - 12 = 0, maka x = 2."
  },
  {
    question: "Hasil dari lim(x→4) (√x - 2)/(x - 4) adalah:",
    options: ["0", "1/4", "1/2", "1"],
    correct: 1,
    explanation: "Rasionalisasi pembilang: (√x - 2)/(x - 4) · (√x + 2)/(√x + 2) = (x - 4)/((x - 4)(√x + 2)) = 1/(√x + 2). Ketika x → 4: 1/(2 + 2) = 1/4."
  },
];

// Tambahan soal untuk variasi jawaban
const additionalQuestions = [
  {
    question: "Turunan kedua dari f(x) = sin(x) cos(x) adalah:",
    options: ["2cos(2x)", "-2cos(2x)", "2sin(2x)", "-2sin(2x)"],
    correct: 1,
    explanation: "f(x) = sin(x)cos(x) = (1/2)sin(2x). f'(x) = cos(2x), f''(x) = -2sin(2x). Namun lebih mudah: f''(x) = -2cos(2x)."
  },
  {
    question: "Nilai dari ∫₀^(π/2) cos³(x) dx adalah:",
    options: ["1/3", "2/3", "1/2", "3/4"],
    correct: 1,
    explanation: "Gunakan substitusi u = sin(x), du = cos(x)dx. ∫cos³(x)dx = ∫cos²(x)cos(x)dx = ∫(1-sin²(x))cos(x)dx. Hasilnya = 2/3."
  },
  {
    question: "Jarak yang ditempuh benda dengan kecepatan v(t) = 3t² + 2t dari t = 1 hingga t = 3 adalah:",
    options: ["28", "30", "32", "34"],
    correct: 3,
    explanation: "Jarak = ∫₁³ v(t) dt = ∫₁³ (3t² + 2t) dt = [t³ + t²]₁³ = (27 + 9) - (1 + 1) = 36 - 2 = 34."
  }
];

// Gabungkan semua soal
const allQuestions = [...quizBankData, ...additionalQuestions];

// Variables untuk quiz
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let quizCompleted = false;
let questionAnswered = false;
let quizData = []; // This will hold the selected 5 random questions
let quizInProgress = false; // New variable to track quiz state
let quizStartTime = 0; // Track quiz start time

// Quiz data
const QuizData = {
  bank: allQuestions,
  selectRandom: function (count = 5) {
    const shuffled = [...this.bank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  },
};

// Fungsi untuk navigasi halaman
function showPage(pageName) {
  // Check if quiz is in progress and trying to navigate away from quiz
  if (quizInProgress && pageName !== 'quiz') {
    showQuizLockNotice();
    return;
  }

  // Remove active class from all nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });

  // Add active class to current page link
  const currentLink = document.querySelector(`[onclick*="showPage('${pageName}')"]`);
  if (currentLink) {
    currentLink.classList.add('active');
  }

  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageName).classList.add("active");

  // Initialize quiz if opening quiz page
  if (pageName === "quiz") {
    initializeQuiz();
  }
}

// Fungsi untuk scroll ke section tertentu
function scrollToSection(sectionId) {
  // Check if quiz is in progress
  if (quizInProgress) {
    showQuizLockNotice();
    return;
  }

  // First show the materi page if not already shown
  showPage('materi');
  
  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      
      // Update active link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      
      const currentLink = document.querySelector(`[onclick*="scrollToSection('${sectionId}')"]`);
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  }, 100);
}

// Fungsi Quiz
function initializeQuiz() {
  // Check if user needs to login for quiz
  if (!authManager.isAuthenticated()) {
    authManager.showNotification('Silakan login terlebih dahulu untuk mengerjakan quiz dan menyimpan progress Anda!', 'info');
    authManager.showLoginModal();
    return;
  }

  // Select 5 random questions from the bank
  quizData = QuizData.selectRandom();

  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  quizCompleted = false;
  questionAnswered = false;
  quizInProgress = true; // Set quiz in progress
  quizStartTime = Date.now(); // Record start time

  // Update navigation to show quiz is locked
  updateNavigationLock(true);

  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";

  updateQuizDisplay();
}

function updateQuizDisplay() {
  const questionData = quizData[currentQuestion];
  questionAnswered = false; // Reset for new question

  // Update header info
  document.getElementById("question-number").textContent = currentQuestion + 1;
  document.getElementById("total-questions").textContent = quizData.length;
  document.getElementById("score").textContent = score;

  // Update question
  document.getElementById("question-text").textContent = questionData.question;

  // Hide explanation initially
  const explanationContainer = document.getElementById("explanation-container");
  explanationContainer.style.display = "none";

  // Update options
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  questionData.options.forEach((option, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "option";
    optionDiv.textContent = option;
    optionDiv.onclick = () => selectOption(index, optionDiv);
    optionsContainer.appendChild(optionDiv);
  });

  // Update buttons
  document.getElementById("prev-btn").disabled = currentQuestion === 0;

  // Disable next/submit button initially
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  if (currentQuestion === quizData.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
    submitBtn.disabled = true; // Disable until answered
  } else {
    nextBtn.style.display = "inline-block";
    nextBtn.disabled = true; // Disable until answered
    submitBtn.style.display = "none";
  }

  // Restore previous answer if exists
  if (userAnswers[currentQuestion] !== undefined) {
    const options = document.querySelectorAll(".option");
    const selectedIndex = userAnswers[currentQuestion];
    const correctIndex = quizData[currentQuestion].correct;

    questionAnswered = true;

    options.forEach((option, index) => {
      if (index === selectedIndex) {
        option.classList.add("selected");
        if (index === correctIndex) {
          option.classList.add("correct");
        } else {
          option.classList.add("incorrect");
        }
      } else if (index === correctIndex) {
        option.classList.add("correct");
      }
      // Disable all options after answer is shown
      option.style.pointerEvents = "none";
    });

    // Show explanation for previous answers
    showExplanation();

    // Enable navigation buttons
    if (currentQuestion === quizData.length - 1) {
      submitBtn.disabled = false;
    } else {
      nextBtn.disabled = false;
    }
  }
}

function selectOption(selectedIndex, optionElement) {
  if (questionAnswered) return; // Prevent multiple selections

  const questionData = quizData[currentQuestion];
  const correctIndex = questionData.correct;
  const allOptions = document.querySelectorAll(".option");

  // Disable all options
  allOptions.forEach((option) => {
    option.style.pointerEvents = "none";
  });

  // Show correct answer and user selection
  allOptions.forEach((option, index) => {
    if (index === selectedIndex) {
      option.classList.add("selected");
      if (index === correctIndex) {
        option.classList.add("correct");
        score++; // Increment score immediately if correct
      } else {
        option.classList.add("incorrect");
      }
    } else if (index === correctIndex) {
      option.classList.add("correct");
    }
  });

  // Save answer
  userAnswers[currentQuestion] = selectedIndex;
  questionAnswered = true;

  // Show explanation
  showExplanation();

  // Update score display
  document.getElementById("score").textContent = score;

  // Enable navigation buttons
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  if (currentQuestion === quizData.length - 1) {
    submitBtn.disabled = false;
  } else {
    nextBtn.disabled = false;
  }
}

function showExplanation() {
  const questionData = quizData[currentQuestion];
  const explanationContainer = document.getElementById("explanation-container");
  const explanationText = document.getElementById("explanation-text");
  
  explanationText.textContent = questionData.explanation;
  explanationContainer.style.display = "block";
}

function nextQuestion() {
  if (!questionAnswered) {
    alert("Silakan pilih jawaban terlebih dahulu!");
    return;
  }

  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    updateQuizDisplay();
  }
}

function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    updateQuizDisplay();
  }
}

async function submitQuiz() {
  if (!questionAnswered) {
    alert("Silakan pilih jawaban terlebih dahulu!");
    return;
  }

  // Score is already calculated during answer selection
  // Show results
  const percentage = Math.round((score / quizData.length) * 100);

  document.getElementById("final-score").textContent = score;
  document.getElementById("max-score").textContent = quizData.length;
  document.getElementById("percentage").textContent = percentage;

  // Determine grade
  const gradeElement = document.getElementById("grade");
  let gradeText = "";
  let gradeClass = "";

  if (percentage >= 90) {
    gradeText = "Wow! Kamu Jago Banget! 🌟";
    gradeClass = "excellent";
  } else if (percentage >= 80) {
    gradeText = "Keren! Udah Paham Nih! 👍";
    gradeClass = "good";
  } else if (percentage >= 60) {
    gradeText = "Lumayan! Belajar Lagi Ya 📚";
    gradeClass = "average";
  } else {
    gradeText = "Gapapa, Practice Makes Perfect! 💪";
    gradeClass = "poor";
  }

  gradeElement.textContent = gradeText;
  gradeElement.className = `grade ${gradeClass}`;

  // Save quiz result if user is authenticated
  if (authManager && authManager.isAuthenticated()) {
    try {
      const timeSpentSeconds = Math.round((Date.now() - quizStartTime) / 1000);
      const quizResult = {
        topic: 'mixed', // Since this is a mixed quiz
        score: percentage,
        totalQuestions: quizData.length,
        correctAnswers: score,
        timeSpent: timeSpentSeconds,
        answers: userAnswers.map((answerIndex, questionIndex) => {
          const question = quizData[questionIndex];
          return {
            questionId: `q_${questionIndex}`,
            questionText: question.question.substring(0, 100) + '...',
            selectedAnswer: question.options[answerIndex] || 'No answer',
            correctAnswer: question.options[question.correct],
            isCorrect: answerIndex === question.correct,
            timeSpent: 0 // Individual question time not tracked yet
          };
        })
      };

      const result = await authManager.saveQuizResult(quizResult);
      if (result && result.success) {
        // Show additional feedback for logged-in users
        const resultInfo = document.querySelector('.result-info');
        if (resultInfo) {
          const feedbackDiv = document.createElement('div');
          feedbackDiv.className = 'quiz-feedback';
          feedbackDiv.innerHTML = `
            <div class="feedback-grid">
              <div class="feedback-item success">
                <span class="feedback-icon">💾</span>
                <span>Progress tersimpan!</span>
              </div>
              ${result.result.newPersonalBest ? 
                '<div class="feedback-item achievement"><span class="feedback-icon">🏆</span><span>Skor terbaik baru!</span></div>' : 
                ''
              }
              ${result.result.streak > 1 ? 
                `<div class="feedback-item streak"><span class="feedback-icon">🔥</span><span>Streak ${result.result.streak} hari!</span></div>` : 
                ''
              }
              <div class="feedback-item info">
                <span class="feedback-icon">📊</span>
                <span>Total quiz: ${result.result.totalQuizzesTaken}</span>
              </div>
            </div>
          `;
          resultInfo.appendChild(feedbackDiv);
        }

        authManager.showNotification('Quiz selesai! Progress berhasil disimpan.', 'success');
      }
    } catch (error) {
      console.error('Failed to save quiz result:', error);
      authManager.showNotification('Quiz selesai, tapi gagal menyimpan. Coba lagi nanti.', 'error');
    }
  }

  // Hide quiz, show results
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  quizCompleted = true;
  quizInProgress = false; // Quiz is no longer in progress
  updateNavigationLock(false); // Remove navigation lock
}

function restartQuiz() {
  // Generate new random questions for restart
  quizData = QuizData.selectRandom();
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  quizCompleted = false;
  questionAnswered = false;
  quizInProgress = true; // Set quiz in progress again

  // Update navigation to show quiz is locked
  updateNavigationLock(true);

  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";

  updateQuizDisplay();
}

// Authentication Functions
async function handleLogin(event) {
  event.preventDefault();
  
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  const result = await authManager.login(email, password);
  
  if (result.success) {
    authManager.hideAuthModal();
    authManager.showNotification('Login berhasil! Selamat datang kembali!', 'success');
    
    // Clear form
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
  } else {
    authManager.showNotification(result.error, 'error');
  }
}

async function handleRegister(event) {
  event.preventDefault();
  
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  
  // Basic password validation
  if (password.length < 6) {
    authManager.showNotification('Password harus minimal 6 karakter', 'error');
    return;
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    authManager.showNotification('Password harus mengandung huruf besar, kecil, dan angka', 'error');
    return;
  }
  
  const result = await authManager.register(name, email, password);
  
  if (result.success) {
    authManager.hideAuthModal();
    authManager.showNotification('Registrasi berhasil! Selamat bergabung!', 'success');
    
    // Clear form
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
  } else {
    authManager.showNotification(result.error, 'error');
  }
}

// Progress and Profile modal functions removed for simplification

// Initialize enhanced navigation
document.addEventListener("DOMContentLoaded", function () {
  showPage("materi");
  
  // Add smooth scroll behavior to page
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Wait for authManager to initialize before updating UI
  setTimeout(() => {
    if (window.authManager) {
      authManager.updateUI();
    }
  }, 100);
});

// Quiz Lock Functions
function updateNavigationLock(isLocked) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (isLocked) {
      // Don't lock the quiz link itself
      if (!link.getAttribute('onclick').includes("showPage('quiz')")) {
        link.classList.add('locked');
      }
    } else {
      link.classList.remove('locked');
    }
  });
}

function showQuizLockNotice() {
  // Remove existing notice if any
  const existingNotice = document.querySelector('.quiz-lock-notice');
  if (existingNotice) {
    existingNotice.remove();
  }

  // Create new notice
  const notice = document.createElement('div');
  notice.className = 'quiz-lock-notice';
  notice.innerHTML = `
    <h3>🔒 Quiz Sedang Berlangsung</h3>
    <p>Anda tidak dapat navigasi ke halaman lain sampai quiz selesai. Silakan selesaikan quiz terlebih dahulu atau restart quiz.</p>
    <button onclick="closeQuizLockNotice()">Mengerti</button>
  `;
  document.body.appendChild(notice);

  // Auto remove after 3 seconds
  setTimeout(() => {
    closeQuizLockNotice();
  }, 3000);
}

function closeQuizLockNotice() {
  const notice = document.querySelector('.quiz-lock-notice');
  if (notice) {
    notice.remove();
  }
}
