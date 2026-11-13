import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';

export default function SuccessStoryScreen() {
  const { language } = useLanguage();
  const t = content.successStory;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.header[language]}
        themeColor={Colors.successStory}
        rightIcon="trophy-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Card */}
        <View style={styles.introCard}>
          <Ionicons name="sparkles" size={24} color="#D97706" style={{ marginBottom: 6 }} />
          <Text style={styles.introText}>{t.intro[language]}</Text>
        </View>

        {/* 3 Inspiring Stories */}
        {t.stories.map((story) => (
          <View key={story.id} style={styles.storyCard}>
            {/* Story Card Header with avatar & tag */}
            <View style={styles.cardHeaderRow}>
              <View style={styles.avatarWrap}>
                <Ionicons
                  name={
                    story.avatar === 'school'
                      ? 'school'
                      : story.avatar === 'trophy'
                      ? 'medal'
                      : 'people'
                  }
                  size={26}
                  color="#B45309"
                />
              </View>
              <View style={styles.headerInfo}>
                <View style={styles.tagBadge}>
                  <Text style={styles.tagText}>{story.tag[language]}</Text>
                </View>
                <Text style={styles.storyName}>{story.name[language]}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-sharp" size={12} color="#9CA3AF" />
                  <Text style={styles.locationText}>{story.location[language]}</Text>
                </View>
              </View>
            </View>

            {/* Story Narrative */}
            <Text style={styles.storyBodyText}>{story.body[language]}</Text>

            {/* Bottom Highlighted Quote */}
            <View style={styles.quoteBox}>
              <Ionicons name="chatbubble-ellipses" size={18} color="#D97706" style={{ marginRight: 8 }} />
              <Text style={styles.quoteText}>{story.quote[language]}</Text>
            </View>
          </View>
        ))}
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
    paddingBottom: 40,
  },
  introCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  introText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#92400E',
    fontWeight: '600',
  },
  storyCard: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  tagBadge: {
    backgroundColor: '#FFFBEB',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 3,
  },
  tagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
  },
  storyName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  locationText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  storyBodyText: {
    fontSize: 14,
    lineHeight: 23,
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  quoteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  quoteText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#78350F',
    fontStyle: 'italic',
  },
});

