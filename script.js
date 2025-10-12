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
let currentQuestionIndex = 0; // Perbaiki nama variabel
let score = 0;
let userAnswers = [];
let quizCompleted = false;
let questionAnswered = false;
let quizData = []; // This will hold the selected 5 random questions
let quizInProgress = false;
let quizStartTime;

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
  // Cek autentikasi saat buka quiz
  if (pageName === 'quiz') {
    if (typeof currentUser === 'undefined' || !currentUser) {
      if (typeof showAuthModal === 'function') {
        showAuthModal();
        if (typeof showInfoMessage === 'function') {
          showInfoMessage('Silakan masuk terlebih dahulu untuk mengakses quiz');
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
  if (pageName === 'quiz' && !quizInProgress && !quizCompleted) {
    initializeQuiz();
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
    return;
  }

  // Ambil 5 soal random dari bank soal
  quizData = QuizData.selectRandom(5);
  quizStartTime = Date.now();
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = new Array(quizData.length); // Reset jawaban pengguna
  questionAnswered = false;
  quizCompleted = false;
  quizInProgress = true;

  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("result-container").style.display = "none";
  
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

  // Sembunyikan penjelasan di awal
  document.getElementById("explanation-container").style.display = "none";

  // Render opsi
  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";
  currentQuestion.options.forEach((option, index) => {
    const optionElement = document.createElement("div");
    optionElement.className = "option";
    optionElement.innerHTML = `<input type="radio" id="option${index}" name="quiz-option" value="${index}"><label for="option${index}">${option}</label>`;
    optionElement.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(optionElement);
  });

  // Nonaktifkan tombol selanjutnya sampai jawaban dipilih
  document.getElementById('next-btn').disabled = true;
  if (document.getElementById('submit-btn')) {
    document.getElementById('submit-btn').disabled = true;
  }

  // Tandai jika sudah pernah dijawab
  if (typeof userAnswers[currentQuestionIndex] !== 'undefined') {
    // Jika sudah dijawab, tampilkan kembali state jawaban sebelumnya
    showAnswerFeedback(userAnswers[currentQuestionIndex]);
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
  if (nextBtn) nextBtn.style.display = currentQuestionIndex === quizData.length - 1 ? "none" : "inline-block";
  if (submitBtn) submitBtn.style.display = currentQuestionIndex === quizData.length - 1 ? "inline-block" : "none";

  // Render ulang MathJax
  if (typeof MathJax !== 'undefined') {
    MathJax.typesetPromise();
  }
}

// Select answer - dengan feedback langsung
function selectAnswer(selectedIndex) {
  // Jangan lakukan apa-apa jika pertanyaan ini sudah dijawab
  if (questionAnswered) return;

  userAnswers[currentQuestionIndex] = selectedIndex;
  questionAnswered = true;
  
  showAnswerFeedback(selectedIndex);
}

// Fungsi baru untuk menampilkan feedback jawaban
function showAnswerFeedback(selectedIndex) {
  const currentQ = quizData[currentQuestionIndex];
  const options = document.querySelectorAll('.option');
  const explanationContainer = document.getElementById("explanation-container");
  const explanationText = document.getElementById("explanation-text");

  // Nonaktifkan semua opsi setelah satu dipilih
  options.forEach(opt => opt.style.pointerEvents = 'none');

  // Tampilkan penjelasan
  explanationText.innerHTML = currentQ.explanation;
  explanationContainer.style.display = "block";

  // Beri warna pada jawaban
  options.forEach((option, index) => {
    option.classList.remove('selected', 'correct', 'incorrect');
    
    if (index === currentQ.correct) {
      // Jawaban yang benar selalu diberi warna hijau
      option.classList.add('correct');
    } else if (index === selectedIndex && selectedIndex !== currentQ.correct) {
      // Jika pilihan pengguna salah, beri warna merah
      option.classList.add('incorrect');
    }
  });
  
  // Update skor
  recalcScore();

  // Aktifkan tombol selanjutnya/selesai
  document.getElementById('next-btn').disabled = false;
  if (document.getElementById('submit-btn')) {
    document.getElementById('submit-btn').disabled = false;
  }
}

// Next question (dipanggil tombol "Selanjutnya")
function nextQuestion() {
  if (!questionAnswered) {
    alert("Silakan pilih jawaban terlebih dahulu!");
    return;
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

// Submit (tombol "Selesai")
function submitQuiz() {
  if (!questionAnswered) {
    alert("Silakan pilih jawaban terlebih dahulu!");
    return;
  }
  showResults();
}

// Show final results
function showResults() {
  quizCompleted = true;
  quizInProgress = false;
  
  const percentage = Math.round((score / quizData.length) * 100);
  const timeTaken = Math.round((Date.now() - quizStartTime) / 1000);

  document.getElementById("final-score").textContent = score;
  document.getElementById("max-score").textContent = quizData.length;
  document.getElementById("percentage").textContent = percentage;

  // Tentukan grade dan pesan
  let grade, message, progressAdded = false;
  if (percentage >= 90) {
    grade = "A";
    message = "🎉 Luar biasa! Pemahaman Anda sangat baik!";
    progressAdded = true;
  } else if (percentage >= 80) {
    grade = "B";
    message = "👏 Bagus sekali! Anda sudah memahami materi dengan baik.";
    progressAdded = true;
  } else if (percentage >= 70) {
    grade = "C";
    message = "✅ Baik! Anda sudah memahami konsep dasarnya.";
    progressAdded = true;
  } else if (percentage >= 60) {
    grade = "D";
    message = "📚 Cukup, tapi masih perlu belajar lebih giat lagi.";
  } else {
    grade = "E";
    message = "💪 Semangat! Mari belajar lagi dan coba sekali lagi.";
  }

  document.getElementById("grade").innerHTML = `
    <div class="grade-display ${grade.toLowerCase()}">
      <span class="grade-letter">${grade}</span>
      <span class="grade-message">${message}</span>
      ${progressAdded ? '<div class="progress-bonus">🎯 Progress +10% ditambahkan!</div>' : '<div class="no-progress">❌ Nilai minimal 70% untuk menambah progress</div>'}
    </div>
  `;

  // Track quiz attempt dengan kondisi progress
  const quizResult = {
    score: score,
    totalQuestions: quizData.length,
    percentage: percentage,
    grade: grade,
    timeTaken: timeTaken,
    questions: quizData.map((q, index) => ({
      question: q.question,
      userAnswer: userAnswers[index],
      correctAnswer: q.correct,
      isCorrect: userAnswers[index] === q.correct
    })),
    timestamp: new Date().toISOString(),
    progressEligible: progressAdded // Flag untuk menentukan apakah quiz ini menambah progress
  };

  // Simpan hasil dan update progress jika memenuhi syarat
  if (typeof trackQuizAttempt === 'function') {
    trackQuizAttempt(quizResult);
  }

  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
  
  updateNavigationLock(false);
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

// Fungsi baru untuk tombol "Ulangi Quiz"
function restartQuiz() {
  resetQuiz();
  initializeQuiz(); // Langsung mulai quiz baru dengan soal random
}

// Update navigation lock during quiz
function updateNavigationLock(locked) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (locked) {
      link.classList.add('disabled');
    } else {
      link.classList.remove('disabled');
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
