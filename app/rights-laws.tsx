import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';
import SectionCard from '@/components/SectionCard';
import HelplineButton from '@/components/HelplineButton';

export default function RightsLawsScreen() {
  const { language } = useLanguage();
  const t = content.rightsLaws;

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.header[language]}
        themeColor={Colors.rightsLaws}
        rightIcon="scale-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Quote Callout */}
        <SectionCard variant="quote">
          <Ionicons name="chatbubble-ellipses" size={24} color={Colors.rightsLaws} style={{ marginBottom: 6 }} />
          <Text style={styles.quoteText}>{t.quote[language]}</Text>
        </SectionCard>

        {/* 1. Legal Age for Marriage */}
        <SectionCard
          title={t.legalAgeTitle[language]}
          icon="calendar-outline"
          iconColor={Colors.rightsLaws}
        >
          <View style={styles.legalBoxRow}>
            <View style={styles.legalBox}>
              <Ionicons name="woman" size={28} color="#C2185B" />
              <Text style={styles.legalAgeHighlight}>୧୮ ବର୍ଷ / 18</Text>
              <Text style={styles.legalAgeSub}>{t.legalAgeGirl[language]}</Text>
            </View>
            <View style={[styles.legalBox, { borderColor: '#90CAF9' }]}>
              <Ionicons name="man" size={28} color="#1565C0" />
              <Text style={[styles.legalAgeHighlight, { color: '#1565C0' }]}>୨୧ ବର୍ଷ / 21</Text>
              <Text style={styles.legalAgeSub}>{t.legalAgeBoy[language]}</Text>
            </View>
          </View>
        </SectionCard>

        {/* Warning Callout Box */}
        <SectionCard variant="warning">
          <View style={styles.warningHeader}>
            <Ionicons name="warning" size={22} color="#DC2626" />
            <Text style={styles.warningTitleText}>
              {language === 'odia' ? 'ବେଆଇନ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ ସତର୍କତା' : 'Strict Legal Warning'}
            </Text>
          </View>
          <Text style={styles.warningBodyText}>{t.warningCallout[language]}</Text>
        </SectionCard>

        {/* 2. PCMA Act Summary */}
        <SectionCard
          title={t.actTitle[language]}
          icon="document-text-outline"
          iconColor={Colors.rightsLaws}
        >
          <Text style={styles.paragraph}>{t.actBody[language]}</Text>
        </SectionCard>

        {/* 3. Rights of Girls (Icon list) */}
        <SectionCard
          title={t.rightsListTitle[language]}
          icon="ribbon-outline"
          iconColor="#0D9488"
        >
          {t.rights.map((right, idx) => (
            <View key={idx} style={styles.rightItem}>
              <View style={styles.rightIconWrap}>
                <Ionicons name="shield-checkmark" size={18} color="#0D9488" />
              </View>
              <View style={styles.rightContent}>
                <Text style={styles.rightTitle}>{right.title[language]}</Text>
                <Text style={styles.rightDesc}>{right.desc[language]}</Text>
              </View>
            </View>
          ))}
        </SectionCard>

        {/* 4. Punishment for Child Marriage */}
        <SectionCard
          title={t.punishmentTitle[language]}
          icon="alert-circle-outline"
          iconColor="#B91C1C"
        >
          <Text style={styles.paragraph}>{t.punishmentBody[language]}</Text>
          <View style={styles.punishmentPillRow}>
            <View style={styles.punishmentPill}>
              <Text style={styles.punishmentPillTitle}>୨ ବର୍ଷ ଜେଲ୍ / 2 Yrs Jail</Text>
            </View>
            <View style={styles.punishmentPill}>
              <Text style={styles.punishmentPillTitle}>₹୧,୦୦,୦୦୦ ଜୋରିମାନା / Fine</Text>
            </View>
          </View>
        </SectionCard>

        {/* Helpline CTA Strip */}
        <View style={styles.helplineWrapper}>
          <HelplineButton
            number="1098"
            label={language === 'odia' ? 'ଆଇନଗତ ସହାୟତା ପାଇଁ ଚାଇଲ୍ଡଲାଇନ୍' : 'Legal Help via Childline'}
            sublabel={language === 'odia' ? '୨୪x୭ ଗୋପନୀୟ ଓ ମାଗଣା' : '24x7 Free & Confidential'}
            themeColor={Colors.rightsLaws}
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
  quoteText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#312E81',
    fontStyle: 'italic',
    lineHeight: 24,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  legalBoxRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  legalBox: {
    flex: 1,
    backgroundColor: '#FFF0F5',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F8BBD0',
  },
  legalAgeHighlight: {
    fontSize: 18,
    fontWeight: '900',
    color: '#C2185B',
    marginTop: 6,
    marginBottom: 4,
  },
  legalAgeSub: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4B5563',
    textAlign: 'center',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 8,
  },
  warningTitleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#DC2626',
  },
  warningBodyText: {
    fontSize: 13,
    lineHeight: 21,
    color: '#7F1D1D',
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  rightIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  rightContent: {
    flex: 1,
  },
  rightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  rightDesc: {
    fontSize: 13,
    color: '#4B5563',
    lineHeight: 19,
  },
  punishmentPillRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  punishmentPill: {
    flex: 1,
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    alignItems: 'center',
  },
  punishmentPillTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#991B1B',
    textAlign: 'center',
  },
  helplineWrapper: {
    marginHorizontal: 16,
    marginTop: 6,
  },
});

