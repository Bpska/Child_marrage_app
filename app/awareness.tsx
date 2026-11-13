import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';
import SectionCard from '@/components/SectionCard';
import HelplineButton from '@/components/HelplineButton';

export default function AwarenessScreen() {
  const { language } = useLanguage();
  const t = content.awareness;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.header[language]}
        themeColor={Colors.awareness}
        rightIcon="information-circle-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Banner */}
        <View style={styles.introCard}>
          <Ionicons name="sparkles" size={24} color={Colors.awareness} style={{ marginBottom: 6 }} />
          <Text style={styles.introText}>{t.intro[language]}</Text>
        </View>

        {/* 1. Legal Definition */}
        <SectionCard
          title={t.definitionTitle[language]}
          icon="shield-checkmark"
          iconColor={Colors.awareness}
        >
          <Text style={styles.paragraph}>{t.definitionBody[language]}</Text>
          <View style={styles.ageBadgeRow}>
            <View style={styles.ageBadge}>
              <Text style={styles.ageBadgeNumber}>୧୮ / 18</Text>
              <Text style={styles.ageBadgeLabel}>
                {language === 'odia' ? 'ଝିଅଙ୍କ ସର୍ବନିମ୍ନ ବୟସ' : 'Minimum Age for Girls'}
              </Text>
            </View>
            <View style={[styles.ageBadge, { backgroundColor: '#EDE7F6' }]}>
              <Text style={[styles.ageBadgeNumber, { color: '#6A1B9A' }]}>୨୧ / 21</Text>
              <Text style={styles.ageBadgeLabel}>
                {language === 'odia' ? 'ପୁଅଙ୍କ ସର୍ବନିମ୍ନ ବୟସ' : 'Minimum Age for Boys'}
              </Text>
            </View>
          </View>
        </SectionCard>

        {/* Illustrative Context Placeholder Card */}
        <View style={styles.illustrationCard}>
          <View style={styles.illustrationGraphic}>
            <Ionicons name="people" size={48} color={Colors.awareness} />
            <Ionicons name="close-circle" size={26} color={Colors.danger} style={styles.dangerOverlay} />
          </View>
          <Text style={styles.illustrationCaption}>
            {language === 'odia'
              ? 'ଶିଶୁ ବୟସରେ ବିବାହ ନୁହେଁ, ବରଂ ଶିକ୍ଷା ଓ ଖେଳକୁଦ ହିଁ କିଶୋରୀଙ୍କ ପ୍ରକୃତ ଅଧିକାର।'
              : 'Say NO to premature marriage ceremonies. Childhood, study, and play belong to our daughters.'}
          </Text>
        </View>

        {/* 2. Health Risks */}
        <SectionCard
          title={t.healthTitle[language]}
          icon="medkit-outline"
          iconColor="#E53935"
        >
          {t.healthBullets.map((item, idx) => (
            <View key={idx} style={styles.bulletItem}>
              <View style={styles.dangerDot} />
              <Text style={styles.bulletText}>{item[language]}</Text>
            </View>
          ))}
        </SectionCard>

        {/* 3. Social Impact */}
        <SectionCard
          title={t.socialTitle[language]}
          icon="globe-outline"
          iconColor={Colors.rightsLaws}
        >
          <Text style={styles.paragraph}>{t.socialBody[language]}</Text>
        </SectionCard>

        {/* 4. Warning Signs */}
        <SectionCard
          title={t.warningTitle[language]}
          icon="warning-outline"
          iconColor={Colors.warning}
          variant="warning"
        >
          {t.warningBullets.map((item, idx) => (
            <View key={idx} style={styles.bulletItem}>
              <Ionicons name="alert-circle" size={18} color="#D97706" style={{ marginRight: 8, marginTop: 2 }} />
              <Text style={styles.bulletText}>{item[language]}</Text>
            </View>
          ))}
        </SectionCard>

        {/* Helpline CTA Strip */}
        <View style={styles.helplineWrapper}>
          <HelplineButton
            number="1098"
            label={language === 'odia' ? 'ଚାଇଲ୍ଡଲାଇନ୍ (୨୪x୭ ମାଗଣା)' : 'Childline 1098 (24x7 Free)'}
            sublabel={language === 'odia' ? 'ବାଲ୍ୟ ବିବାହ ଘଟଣା ଜଣାନ୍ତୁ' : 'Report or stop child marriage'}
            themeColor={Colors.awareness}
            icon="call"
          />
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
    paddingBottom: 40,
  },
  introCard: {
    backgroundColor: '#EBF4FF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  introText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#1E3A8A',
    fontWeight: '600',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  ageBadgeRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 12,
  },
  ageBadge: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  ageBadgeNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1565C0',
  },
  ageBadgeLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#374151',
    marginTop: 4,
    textAlign: 'center',
  },
  illustrationCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  illustrationGraphic: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    position: 'relative',
    borderWidth: 2,
    borderColor: '#BAE6FD',
  },
  dangerOverlay: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  illustrationCaption: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 20,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  dangerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginTop: 8,
    marginRight: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textSecondary,
  },
  helplineWrapper: {
    marginHorizontal: 16,
    marginTop: 6,
  },
});

