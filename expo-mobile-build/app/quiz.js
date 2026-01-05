import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { quizData } from '../data/quizData';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleAnswer = (answerIndex) => {
    if (selectedAnswer !== null) return; // Already answered

    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === quizData[currentQuestion].correct;
    setAnsweredCorrectly(isCorrect);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setAnsweredCorrectly(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const finalScore = score;
    const percentage = Math.round((finalScore / quizData.length) * 100);
    
    setShowResult(true);

    // Save quiz result to Firestore if user is logged in
    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          await updateDoc(userRef, {
            'progress.quizAttempts': arrayUnion({
              score: finalScore,
              total: quizData.length,
              percentage: percentage,
              date: new Date().toISOString(),
            }),
          });
        }
      } catch (error) {
        console.error('Error saving quiz result:', error);
        // Note: Quiz score is shown but not saved to history
        // Check FIRESTORE_RULES.md to configure database permissions
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
    setAnsweredCorrectly(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / quizData.length) * 100);
    let message = '';
    let emoji = '';

    if (percentage >= 80) {
      message = 'Luar biasa! Anda sangat memahami materi!';
      emoji = '🏆';
    } else if (percentage >= 60) {
      message = 'Bagus! Terus tingkatkan pemahaman Anda!';
      emoji = '👍';
    } else {
      message = 'Jangan menyerah! Pelajari materi lagi ya!';
      emoji = '💪';
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{emoji}</Text>
          <Text style={styles.resultTitle}>Quiz Selesai!</Text>
          <Text style={styles.resultScore}>
            {score} / {quizData.length}
          </Text>
          <Text style={styles.resultPercentage}>{percentage}%</Text>
          <Text style={styles.resultMessage}>{message}</Text>

          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>🔄 Ulangi Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Kembali ke Beranda</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          Pertanyaan {currentQuestion + 1} dari {quizData.length}
        </Text>
        <Text style={styles.scoreText}>Skor: {score}</Text>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            { width: `${((currentQuestion + 1) / quizData.length) * 100}%` },
          ]}
        />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => {
          let optionStyle = styles.option;
          
          if (selectedAnswer !== null) {
            if (index === question.correct) {
              optionStyle = [styles.option, styles.optionCorrect];
            } else if (index === selectedAnswer) {
              optionStyle = [styles.option, styles.optionWrong];
            }
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={styles.optionText}>
                {String.fromCharCode(65 + index)}. {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>
            {answeredCorrectly ? '✅ Benar!' : '❌ Salah!'}
          </Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}

      {selectedAnswer !== null && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {currentQuestion < quizData.length - 1
              ? 'Lanjut →'
              : 'Lihat Hasil'}
          </Text>
        </TouchableOpacity>
      )}

      {!user && (
        <View style={styles.loginPrompt}>
          <Text style={styles.loginPromptText}>
            💡 Login untuk menyimpan progress quiz Anda!
          </Text>
          <TouchableOpacity
            style={styles.loginPromptButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginPromptButtonText}>Login Sekarang</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2196F3',
  },
  questionContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#000',
    fontWeight: '500',
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  option: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionWrong: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  explanationContainer: {
    backgroundColor: '#FFF9C4',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FBC02D',
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginPrompt: {
    backgroundColor: '#E3F2FD',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  loginPromptText: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 12,
    textAlign: 'center',
  },
  loginPromptButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  loginPromptButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 32,
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  resultPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  resultMessage: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: '100%',
  },
  backButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
