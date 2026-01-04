import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

export default function HomeScreen({ user, onLogout }) {
  const [activeSection, setActiveSection] = useState('materi');
  const [searchQuery, setSearchQuery] = useState('');

  const renderMaterialSection = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>📐 UniKalkulus</Text>
        <Text style={styles.heroDescription}>
          Platform Pembelajaran Kalkulus Interaktif
        </Text>
      </View>

      {/* Limit Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Limit</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pengertian Limit</Text>
          <Text style={styles.cardContent}>
            Limit adalah nilai yang didekati oleh fungsi saat variabel inputnya mendekati suatu nilai tertentu.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contoh Limit</Text>
          <Text style={styles.cardContent}>
            lim(x→2) (x² - 4)/(x - 2) = 4
          </Text>
        </View>
      </View>

      {/* Derivative Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📈 Turunan (Derivative)</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pengertian Turunan</Text>
          <Text style={styles.cardContent}>
            Turunan adalah laju perubahan suatu fungsi terhadap variabelnya. Turunan menunjukkan kemiringan atau gradien dari kurva fungsi pada titik tertentu.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Rumus Dasar</Text>
          <Text style={styles.cardContent}>
            f'(x) = lim(h→0) [f(x+h) - f(x)]/h
          </Text>
        </View>
      </View>

      {/* Integral Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>∫ Integral</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Pengertian Integral</Text>
          <Text style={styles.cardContent}>
            Integral adalah operasi matematika yang merupakan kebalikan dari turunan. Integral digunakan untuk menghitung luas daerah di bawah kurva, volume benda putar, dan berbagai aplikasi lainnya.
          </Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Integral Tak Tentu</Text>
          <Text style={styles.cardContent}>
            ∫ x^n dx = (x^(n+1))/(n+1) + C, untuk n ≠ -1
          </Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderQuizSection = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧠 Quiz Kalkulus</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quiz Mode</Text>
          <Text style={styles.cardContent}>
            Uji pemahaman Anda dengan quiz interaktif. Fitur quiz akan segera hadir!
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Mulai Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>📐 UniKalkulus</Text>
          <Text style={styles.headerSubtitle}>Platform Pembelajaran Kalkulus</Text>
        </View>
        {user && (
          <View style={styles.userSection}>
            <Text style={styles.userName}>{user.displayName || 'User'}</Text>
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'materi' && styles.activeTab]}
          onPress={() => setActiveSection('materi')}
        >
          <Text style={[styles.tabText, activeSection === 'materi' && styles.activeTabText]}>
            📚 Materi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeSection === 'quiz' && styles.activeTab]}
          onPress={() => setActiveSection('quiz')}
        >
          <Text style={[styles.tabText, activeSection === 'quiz' && styles.activeTabText]}>
            🧠 Quiz
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeSection === 'materi' ? renderMaterialSection() : renderQuizSection()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  userSection: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '600',
  },
  logoutButton: {
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
  },
  logoutText: {
    fontSize: 12,
    color: '#4A5568',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#667EEA',
  },
  tabText: {
    fontSize: 16,
    color: '#718096',
  },
  activeTabText: {
    color: '#667EEA',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 8,
  },
  heroDescription: {
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#667EEA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
