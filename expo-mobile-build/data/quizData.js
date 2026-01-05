export const quizData = [
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
    question: "Turunan dari f(x) = x·sin(x) menggunakan aturan perkalian adalah:",
    options: ["sin(x) + x·cos(x)", "x·cos(x)", "sin(x)", "cos(x) + x·sin(x)"],
    correct: 0,
    explanation: "Gunakan aturan perkalian: (u·v)' = u'·v + u·v'. Di sini u = x (u' = 1) dan v = sin(x) (v' = cos(x)). Jadi f'(x) = 1·sin(x) + x·cos(x) = sin(x) + x·cos(x)."
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
    question: "Hasil integral dari e^x dx adalah:",
    options: ["e^x·x + C", "e^(x+1) + C", "x·e^x + C", "e^x + C"],
    correct: 3,
    explanation: "∫e^x dx = e^x + C. Fungsi eksponensial e^x adalah fungsi yang turunannya sama dengan dirinya sendiri."
  },
  {
    question: "Turunan dari f(x) = √x adalah:",
    options: ["1/(2√x)", "2√x", "1/√x", "√x/2"],
    correct: 0,
    explanation: "f(x) = √x = x^(1/2). Menggunakan aturan pangkat: f'(x) = (1/2)·x^(-1/2) = 1/(2√x)."
  }
];
