import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';

export default function AudioVideoChooserScreen() {
  const { language } = useLanguage();
  const t = content.audioVideo;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.header[language]}
        themeColor={Colors.audioVideo}
        rightIcon="film-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.introCard}>
          <Ionicons name="sparkles" size={24} color={Colors.audioVideo} style={{ marginBottom: 6 }} />
          <Text style={styles.introText}>{t.intro[language]}</Text>
        </View>

        {/* Video Learning Card */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => router.push('/audio-video/video')}
          style={[styles.bigChooserCard, { borderColor: '#FED7AA' }]}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#7C3AED' }]}>
            <MaterialCommunityIcons name="video" size={36} color={Colors.white} />
          </View>
          <View style={styles.cardTextContent}>
            <View style={styles.tagBadge}>
              <Text style={styles.tagText}>{language === 'odia' ? 'ଭିଡିଓ ପାଠ' : 'VIDEO LESSONS'}</Text>
            </View>
            <Text style={styles.cardTitle}>{t.videoChooserTitle[language]}</Text>
            <Text style={styles.cardDesc}>{t.videoChooserDesc[language]}</Text>
          </View>
          <View style={styles.arrowIcon}>
            <Ionicons name="arrow-forward-circle" size={32} color="#7C3AED" />
          </View>
        </TouchableOpacity>

        {/* Audio Learning Card */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => router.push('/audio-video/audio')}
          style={[styles.bigChooserCard, { borderColor: '#99F6E4' }]}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#0D9488' }]}>
            <MaterialCommunityIcons name="headphones" size={34} color={Colors.white} />
          </View>
          <View style={styles.cardTextContent}>
            <View style={[styles.tagBadge, { backgroundColor: '#CCFBF1' }]}>
              <Text style={[styles.tagText, { color: '#0F766E' }]}>
                {language === 'odia' ? 'ଅଡିଓ ପାଠ' : 'AUDIO PODCASTS'}
              </Text>
            </View>
            <Text style={styles.cardTitle}>{t.audioChooserTitle[language]}</Text>
            <Text style={styles.cardDesc}>{t.audioChooserDesc[language]}</Text>
          </View>
          <View style={styles.arrowIcon}>
            <Ionicons name="arrow-forward-circle" size={32} color="#0D9488" />
          </View>
        </TouchableOpacity>

        {/* Info card */}
        <View style={styles.infoNote}>
          <Ionicons name="information-circle-outline" size={20} color="#6B7280" />
          <Text style={styles.infoNoteText}>
            {language === 'odia'
              ? 'ଏହି ପାଠଗୁଡ଼ିକ ବିନା ଇଣ୍ଟରନେଟ୍ ବା କମ୍ ଡାଟାରେ ସହଜରେ ଶୁଣି ଓ ଦେଖିପାରିବେ।'
              : 'All media lessons are optimized for low-bandwidth usage and offline awareness.'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  introCard: {
    backgroundColor: '#FFF7ED',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  introText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#9A3412',
    fontWeight: '600',
  },
  bigChooserCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    borderWidth: 1.5,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cardTextContent: {
    flex: 1,
  },
  tagBadge: {
    backgroundColor: '#EDE9FE',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6D28D9',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginTop: 8,
  },
  infoNoteText: {
    flex: 1,
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
  },
});

