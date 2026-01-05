import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { WebView } from 'react-native-webview';

const materialContent = {
  limit: {
    title: 'Konsep Limit',
    icon: 'lim',
    videos: [
      {
        title: 'Video Pembelajaran Limit Part 1',
        videoId: 'Da98JQ9EYP8',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Limit Part 2',
        videoId: 'Tyl_q08WFFs',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Limit Part 3',
        videoId: 'TzYhPTtx_Gs',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
    ],
    sections: [
      {
        subtitle: 'Pengertian Limit',
        content: `Limit adalah nilai yang didekati suatu fungsi ketika variabel bebasnya mendekati suatu nilai tertentu.

Notasi: lim(x→c) f(x) = L

Artinya: Ketika x mendekati c, nilai f(x) mendekati L.`,
      },
      {
        subtitle: 'Teorema Limit',
        content: `1. Limit Konstan: lim(x→c) k = k
2. Limit Identitas: lim(x→c) x = c
3. Limit Penjumlahan: lim(x→c) [f(x) + g(x)] = lim(x→c) f(x) + lim(x→c) g(x)
4. Limit Perkalian: lim(x→c) [f(x) · g(x)] = lim(x→c) f(x) · lim(x→c) g(x)`,
      },
      {
        subtitle: 'Limit Tak Hingga',
        content: `Limit ketika x menuju tak hingga:
- lim(x→∞) 1/x = 0
- lim(x→∞) c/x^n = 0 (untuk n > 0)

Untuk fungsi rasional:
Bagi pembilang dan penyebut dengan pangkat tertinggi x.`,
      },
    ],
  },
  derivative: {
    title: 'Turunan & Diferensiasi',
    icon: 'd/dx',
    videos: [
      {
        title: 'Video Pembelajaran Turunan Part 1',
        videoId: 'InBfYmE_g_o',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Turunan Part 2',
        videoId: '-X0KC2r7eQ0',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Turunan Part 3',
        videoId: 'QeR8TqIGG64',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Turunan Part 4',
        videoId: 'JXc_CA2tuPA',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Turunan Part 5',
        videoId: '6idN0oRflRw',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
    ],
    sections: [
      {
        subtitle: 'Definisi Turunan',
        content: `Turunan adalah laju perubahan suatu fungsi terhadap variabelnya.

f'(x) = lim(h→0) [f(x+h) - f(x)]/h

Notasi: f'(x), dy/dx, df/dx, Df(x)`,
      },
      {
        subtitle: 'Aturan Turunan Dasar',
        content: `1. Aturan Pangkat: d/dx(x^n) = n·x^(n-1)
2. Aturan Konstan: d/dx(c) = 0
3. Aturan Perkalian Konstan: d/dx(c·f(x)) = c·f'(x)
4. Aturan Penjumlahan: d/dx[f(x) + g(x)] = f'(x) + g'(x)`,
      },
      {
        subtitle: 'Aturan Rantai',
        content: `Untuk fungsi komposisi:
d/dx[f(g(x))] = f'(g(x)) · g'(x)

Contoh:
d/dx[sin(x²)] = cos(x²) · 2x = 2x·cos(x²)`,
      },
      {
        subtitle: 'Turunan Fungsi Trigonometri',
        content: `d/dx(sin x) = cos x
d/dx(cos x) = -sin x
d/dx(tan x) = sec² x
d/dx(cot x) = -csc² x`,
      },
    ],
  },
  integral: {
    title: 'Integral & Antiturunan',
    icon: '∫',
    videos: [
      {
        title: 'Video Pembelajaran Integral Part 1',
        videoId: 'Aj3qM5UsWAM',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Integral Part 2',
        videoId: 'ZIhtM6fwoGw',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Integral Part 3',
        videoId: 'unvg41k9G0Y',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Integral Part 4',
        videoId: '6aumweXEWRs',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
      {
        title: 'Video Pembelajaran Integral Part 5',
        videoId: 'RtwecqeufhU',
        credit: 'TPB Santuy',
        channelUrl: 'https://www.youtube.com/@tpbsantuy',
      },
    ],
    sections: [
      {
        subtitle: 'Integral Tak Tentu',
        content: `Integral tak tentu adalah kebalikan dari turunan (antiturunan).

∫f(x)dx = F(x) + C

dimana F'(x) = f(x) dan C adalah konstanta integrasi.`,
      },
      {
        subtitle: 'Aturan Integral Dasar',
        content: `1. ∫x^n dx = (1/(n+1))·x^(n+1) + C (n ≠ -1)
2. ∫k dx = kx + C
3. ∫[f(x) + g(x)]dx = ∫f(x)dx + ∫g(x)dx
4. ∫k·f(x)dx = k·∫f(x)dx`,
      },
      {
        subtitle: 'Integral Tentu',
        content: `Integral tentu menghitung luas di bawah kurva:

∫[a,b] f(x)dx = F(b) - F(a)

Dimana F(x) adalah antiturunan dari f(x).`,
      },
      {
        subtitle: 'Integral Trigonometri',
        content: `∫sin x dx = -cos x + C
∫cos x dx = sin x + C
∫sec² x dx = tan x + C
∫1/x dx = ln|x| + C`,
      },
    ],
  },
};

export default function Material() {
  const params = useLocalSearchParams();
  const section = params.section || 'limit';
  const content = materialContent[section] || materialContent.limit;
  const [expandedVideo, setExpandedVideo] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{content.icon}</Text>
        </View>
        <Text style={styles.title}>{content.title}</Text>
      </View>

      {/* Video Section */}
      {content.videos && content.videos.length > 0 && (
        <View style={styles.videosSection}>
          <Text style={styles.videosTitle}>📹 Video Pembelajaran</Text>
          {content.videos.map((video, index) => (
            <View key={index} style={styles.videoItem}>
              <TouchableOpacity
                style={styles.videoHeader}
                onPress={() => setExpandedVideo(expandedVideo === index ? null : index)}
              >
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoToggle}>
                  {expandedVideo === index ? '▼' : '▶'}
                </Text>
              </TouchableOpacity>
              
              {expandedVideo === index && (
                <View style={styles.videoContainer}>
                  <WebView
                    style={styles.video}
                    source={{
                      uri: `https://www.youtube.com/embed/${video.videoId}`,
                    }}
                    allowsFullscreenVideo
                    javaScriptEnabled
                  />
                  <Text style={styles.videoCredit}>
                    Video pembelajaran dari{' '}
                    <Text style={styles.channelLink}>{video.credit}</Text>
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {content.sections.map((item, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      ))}

      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/material?section=limit')}
        >
          <Text style={styles.navButtonText}>📊 Limit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/material?section=derivative')}
        >
          <Text style={styles.navButtonText}>📈 Turunan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push('/material?section=integral')}
        >
          <Text style={styles.navButtonText}>∫ Integral</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.quizButton}
        onPress={() => router.push('/quiz')}
      >
        <Text style={styles.quizButtonText}>🧠 Uji Pemahaman dengan Quiz</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#201b2e',
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#201b2e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  navigation: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  navButton: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#201b2e',
  },
  quizButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quizButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  videosSection: {
    margin: 16,
    marginTop: 8,
  },
  videosTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  videoItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
  },
  videoToggle: {
    fontSize: 16,
    color: '#201b2e',
    marginLeft: 8,
  },
  videoContainer: {
    padding: 16,
  },
  video: {
    width: '100%',
    height: 220,
    backgroundColor: '#000',
    borderRadius: 8,
    marginBottom: 8,
  },
  videoCredit: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  channelLink: {
    color: '#201b2e',
    fontWeight: '600',
  },
});
