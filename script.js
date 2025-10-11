const quizData = [
  {
    question: "Apa hasil dari limit berikut: $\\lim_{x \\to 2} (3x + 1)$?",
    options: ["5", "6", "7", "8"],
    correct: 2
  },
  {
    question: "Turunan dari $f(x) = x^3$ adalah:",
    options: ["$2x^2$", "$3x^2$", "$x^2$", "$4x^3$"],
    correct: 1
  },
  {
    question: "Integral dari $\\int 2x dx$ adalah:",
    options: ["$x^2 + C$", "$2x^2 + C$", "$x^2/2 + C$", "$2x + C$"],
    correct: 0
  },
  {
    question: "Apa definisi limit?",
    options: [
      "Nilai yang didekati fungsi saat x mendekati suatu titik",
      "Nilai maksimum fungsi",
      "Nilai minimum fungsi", 
      "Titik potong dengan sumbu y"
    ],
    correct: 0
  },
  {
    question: "Turunan dari $f(x) = \\sin(x)$ adalah:",
    options: ["$-\\cos(x)$", "$\\cos(x)$", "$\\tan(x)$", "$-\\sin(x)$"],
    correct: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let questionAnswered = false;
let quizCompleted = false;
let quizInProgress = false;
let quizStartTime = null;

// Fungsi untuk navigasi halaman
function showPage(pageName) {
  // Cek autentikasi saat buka quiz
  if (pageName === 'quiz') {
    if (typeof currentUser === 'undefined' || !currentUser) {
      if (typeof showAuthModal === 'function') {
        showAuthModal();
        if (typeof showInfoMessage === 'function') {
          showInfoMessage('Silakan masuk terlebih dahulu untuk mengakses quiz');
        } else {
          alert('Silakan masuk terlebih dahulu untuk mengakses quiz');
        }
      }
      return;
    }
  }

  // Sembunyikan semua page
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));

  // Tampilkan page terpilih
  const selectedPage = document.getElementById(pageName);
  if (selectedPage) selectedPage.classList.add('active');

  // Mulai quiz otomatis saat masuk halaman quiz (jika belum mulai/selesai)
  if (pageName === 'quiz') {
    if (!quizInProgress && !quizCompleted) {
      initializeQuiz();
    } else {
      // Pastikan info total pertanyaan dan skor selalu sync
      const totalSpan = document.getElementById('total-questions');
      if (totalSpan) totalSpan.textContent = quizData.length;
      const scoreSpan = document.getElementById('score');
      if (scoreSpan) scoreSpan.textContent = score;
    }
  }

  // Track section view
  if (typeof currentUser !== 'undefined' && currentUser && typeof trackSectionView === 'function') {
    trackSectionView(pageName);
  }
}

// Scroll to section function
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
  
  // Track section viewing for authenticated users
  if (typeof currentUser !== 'undefined' && currentUser && typeof trackSectionView === 'function') {
    trackSectionView(sectionId);
  }
}

// Initialize quiz
function initializeQuiz() {
  if (typeof currentUser === 'undefined' || !currentUser) {
    if (typeof showAuthModal === 'function') showAuthModal();
    else alert('Silakan masuk terlebih dahulu');
    return;
  }

  quizStartTime = Date.now();
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  questionAnswered = false;
  quizCompleted = false;
  quizInProgress = true;

  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";

  // Set total pertanyaan di header quiz
  const totalSpan = document.getElementById('total-questions');
  if (totalSpan) totalSpan.textContent = quizData.length;

  updateNavigationLock(true);
  loadQuestion();
}

// Helper: hitung ulang skor dari jawaban yang sudah ada
function recalcScore() {
  score = userAnswers.reduce((acc, ans, i) => acc + (ans === quizData[i]?.correct ? 1 : 0), 0);
  const scoreSpan = document.getElementById('score');
  if (scoreSpan) scoreSpan.textContent = score;
}

// Load current question
function loadQuestion() {
  if (currentQuestionIndex >= quizData.length) return;

  const currentQuestion = quizData[currentQuestionIndex];

  // Update header quiz (nomor & total)
  const qNum = document.getElementById("question-number");
  if (qNum) qNum.textContent = currentQuestionIndex + 1;
  const totalSpan = document.getElementById('total-questions');
  if (totalSpan) totalSpan.textContent = quizData.length;

  // Isi teks pertanyaan
  document.getElementById("question-text").innerHTML = currentQuestion.question;

  // Render opsi
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.innerHTML = `
      <input type="radio" id="option${index}" name="quiz-option" value="${index}">
      <label for="option${index}">${option}</label>
    `;
    optionElement.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(optionElement);
  });

  // Tandai jika sudah pernah dijawab
  if (typeof userAnswers[currentQuestionIndex] !== 'undefined') {
    selectAnswer(userAnswers[currentQuestionIndex]);
  } else {
    questionAnswered = false;
  }

  // Update skor di header
  recalcScore();

  // Atur state tombol navigasi
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const submitBtn = document.getElementById("submit-btn");

  if (prevBtn) prevBtn.disabled = currentQuestionIndex === 0;

  if (currentQuestionIndex === quizData.length - 1) {
    if (nextBtn) nextBtn.style.display = "none";
    if (submitBtn) submitBtn.style.display = "inline-block";
  } else {
    if (nextBtn) nextBtn.style.display = "inline-block";
    if (submitBtn) submitBtn.style.display = "none";
  }

  // Render ulang MathJax
  if (typeof MathJax !== 'undefined') {
    MathJax.typesetPromise();
  }
}

// Next question (dipanggil tombol "Selanjutnya")
function nextQuestion() {
  if (!questionAnswered) {
    alert("Silakan pilih jawaban terlebih dahulu!");
    return;
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correct) {
    // Tambah skor hanya sekali untuk pertanyaan ini
    // Agar tidak double, kita hitung ulang saja
    recalcScore();
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

// Tombol "Sebelumnya" (opsional)
function previousQuestion() {
  if (currentQuestionIndex === 0) return;
  currentQuestionIndex--;
  loadQuestion();
}

// Select answer
function selectAnswer(selectedIndex) {
  const options = document.querySelectorAll('.option');
  options.forEach((option, index) => {
    option.classList.toggle('selected', index === selectedIndex);
  });

  const radioButton = document.getElementById(`option${selectedIndex}`);
  if (radioButton) radioButton.checked = true;

  userAnswers[currentQuestionIndex] = selectedIndex;
  questionAnswered = true;
}

// Submit (tombol "Selesai")
function submitQuiz() {
  if (!questionAnswered) {
    alert("Silakan pilih jawaban terlebih dahulu!");
    return;
  }
  // Pastikan skor final akurat
  recalcScore();
  showResults();
}

// Show final results
function showResults() {
  const timeSpent = Date.now() - quizStartTime || 0;
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

  // Hide quiz, show results
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";

  quizCompleted = true;
  quizInProgress = false;
  updateNavigationLock(false);

  // Track quiz attempt for authenticated users
  if (typeof currentUser !== 'undefined' && currentUser && typeof trackQuizAttempt === 'function') {
    const quizAttemptData = {
      score: score,
      total: quizData.length,
      percentage: percentage,
      timeSpent: Math.round(timeSpent / 1000), // in seconds
      answers: userAnswers.map((answer, index) => ({
        questionIndex: index,
        userAnswer: answer,
        correctAnswer: quizData[index].correct,
        isCorrect: answer === quizData[index].correct
      }))
    };
    
    trackQuizAttempt(quizAttemptData);
  }
}

// Reset quiz
function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  questionAnswered = false;
  quizCompleted = false;
  quizInProgress = false;
  
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "none";
  
  updateNavigationLock(false);
}

// Update navigation lock during quiz
function updateNavigationLock(locked) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (locked) {
      link.style.pointerEvents = 'none';
      link.style.opacity = '0.5';
    } else {
      link.style.pointerEvents = 'auto';
      link.style.opacity = '1';
    }
  });
}

// Show quiz lock notice
function showQuizLockNotice() {
  alert("Selesaikan quiz terlebih dahulu sebelum berpindah halaman!");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  showPage("materi");
  document.documentElement.style.scrollBehavior = 'smooth';
});
