import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';
import SectionCard from '@/components/SectionCard';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ParentCornerScreen() {
  const { language } = useLanguage();
  const t = content.parentCorner;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.header[language]}
        themeColor={Colors.parentCorner}
        rightIcon="heart-circle-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Warm Empathetic Intro */}
        <View style={styles.introCard}>
          <Text style={styles.introEmoji}>👨‍👩‍👧</Text>
          <Text style={styles.introText}>{t.intro[language]}</Text>
        </View>

        {/* 1. Importance of Girls' Education */}
        <SectionCard
          title={t.educationTitle[language]}
          icon="school"
          iconColor={Colors.parentCorner}
        >
          {t.educationBullets.map((item, idx) => (
            <View key={idx} style={styles.bulletRow}>
              <View style={styles.checkIcon}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.parentCorner} />
              </View>
              <Text style={styles.bulletText}>{item[language]}</Text>
            </View>
          ))}
        </SectionCard>

        {/* 2. Government Schemes for Girls (Expandable Accordion) */}
        <SectionCard
          title={t.schemesTitle[language]}
          icon="wallet-outline"
          iconColor="#7B1FA2"
        >
          <Text style={styles.subHint}>
            {language === 'odia'
              ? 'ଅଧିକ ସୂଚନା ପାଇଁ ଯୋଜନା ଉପରେ ଟ୍ୟାପ୍ କରନ୍ତୁ:'
              : 'Tap any scheme below to view financial benefits & details:'}
          </Text>

          {t.schemesList.map((scheme, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <TouchableOpacity
                key={idx}
                activeOpacity={0.8}
                onPress={() => toggleAccordion(idx)}
                style={[
                  styles.schemeItem,
                  isExpanded && styles.schemeItemActive,
                ]}
              >
                <View style={styles.schemeHeader}>
                  <View style={styles.schemeBulletNumber}>
                    <Text style={styles.schemeNumberText}>{idx + 1}</Text>
                  </View>
                  <Text style={styles.schemeTitle}>{scheme.title[language]}</Text>
                  <Ionicons
                    name={isExpanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color={Colors.parentCorner}
                  />
                </View>
                {isExpanded && (
                  <View style={styles.schemeBody}>
                    <Text style={styles.schemeDesc}>{scheme.desc[language]}</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </SectionCard>

        {/* 3. Tips for Positive Parenting (Checklist Card) */}
        <SectionCard
          title={t.parentingTitle[language]}
          icon="heart-outline"
          iconColor="#E91E63"
        >
          {t.parentingTips.map((tip, idx) => (
            <View key={idx} style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <Ionicons name="shield-checkmark" size={18} color="#10B981" />
                <Text style={styles.tipTitleText}>{tip.title[language]}</Text>
              </View>
              <Text style={styles.tipDescText}>{tip.desc[language]}</Text>
            </View>
          ))}
        </SectionCard>
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
    paddingBottom: 40,
  },
  introCard: {
    backgroundColor: '#F3E8FF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E9D5FF',
    alignItems: 'center',
  },
  introEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  introText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#581C87',
    fontWeight: '600',
    textAlign: 'center',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  checkIcon: {
    marginRight: 10,
    marginTop: 1,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  subHint: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  schemeItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  schemeItemActive: {
    backgroundColor: '#FAF5FF',
    borderColor: '#D8B4FE',
  },
  schemeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  schemeBulletNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.parentCorner,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  schemeNumberText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  schemeTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginRight: 6,
  },
  schemeBody: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3E8FF',
  },
  schemeDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: '#4B5563',
  },
  tipCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  tipTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1F2937',
  },
  tipDescText: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
    paddingLeft: 26,
  },
});

