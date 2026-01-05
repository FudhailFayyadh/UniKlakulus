import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#201b2e" />
        <Text style={styles.loadingText}>Memuat...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Bersama-sama membuat pembelajaran kalkulus yang lebih baik
          </Text>
          <Text style={styles.heroDescription}>
            Kami ingin membantu Anda memahami konsep-konsep fundamental dalam
            kalkulus dengan cara yang interaktif, mudah dipahami, dan
            menyenangkan untuk semua tingkat kemampuan.
          </Text>
        </View>
      </View>

      {/* Auth Section */}
      {!user ? (
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.loginButtonText}>👤 Masuk / Daftar</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.userCard}>
          <Text style={styles.welcomeText}>
            Selamat datang, {user.displayName || user.email}!
          </Text>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push('/profile')}
          >
            <Text style={styles.profileButtonText}>Lihat Profil</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.sectionTitle}>Dasar Pembelajaran</Text>
        <Text style={styles.introText}>
          Platform Pembelajaran Kalkulus memberikan informasi yang jelas tentang
          konsep-konsep fundamental dalam kalkulus, sehingga memberikan
          pemahaman yang solid untuk perjalanan pembelajaran Anda.
        </Text>
      </View>

      {/* Feature Cards */}
      <View style={styles.featuresGrid}>
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => router.push('/material?section=limit')}
        >
          <View style={styles.featureIcon}>
            <Text style={styles.iconText}>lim</Text>
          </View>
          <Text style={styles.featureTitle}>Konsep Limit</Text>
          <Text style={styles.featureDescription}>
            Temukan konsep fundamental yang digunakan untuk membantu Anda
            memahami dan menguasai perhitungan limit dengan berbagai pendekatan.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.featureCard, styles.featureCardHighlight]}
          onPress={() => router.push('/material?section=derivative')}
        >
          <View style={styles.featureIcon}>
            <Text style={styles.iconText}>d/dx</Text>
          </View>
          <Text style={styles.featureTitle}>Turunan & Diferensiasi</Text>
          <Text style={styles.featureDescription}>
            Pelajari teknik-teknik diferensiasi dan aplikasinya dalam berbagai
            konteks matematika dan kehidupan nyata.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => router.push('/material?section=integral')}
        >
          <View style={styles.featureIcon}>
            <Text style={styles.iconText}>∫</Text>
          </View>
          <Text style={styles.featureTitle}>Integral & Antiturunan</Text>
          <Text style={styles.featureDescription}>
            Baca fitur terbaru dan praktik terbaik terkait konsep integral dan
            penerapannya dalam menghitung luas dan volume.
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quiz Button */}
      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push('/quiz')}
      >
        <Text style={styles.quizButtonText}>🧠 Mulai Quiz</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 UniKalkulus</Text>
        <Text style={styles.footerSubtext}>
          Platform Pembelajaran Kalkulus Interaktif
        </Text>
      </View>
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
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  heroSection: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 16,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 36,
  },
  heroDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  loginButton: {
    backgroundColor: '#201b2e',
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  profileButton: {
    backgroundColor: '#201b2e',
    padding: 12,
    borderRadius: 8,
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  introSection: {
    backgroundColor: '#fff',
    padding: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  introText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  featuresGrid: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  featureCardHighlight: {
    backgroundColor: '#E3F2FD',
    borderWidth: 2,
    borderColor: '#201b2e',
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#201b2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  quizButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 24,
    padding: 18,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
  },
});
