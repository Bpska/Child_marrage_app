import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import DashboardButton from '@/components/DashboardButton';
import SOSFloatingButton from '@/components/SOSFloatingButton';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { language, toggleLanguage } = useLanguage();
  const t = content.dashboard;
  const c = content.common;

  const topPadding = Math.max(
    insets.top,
    Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 20
  );

  return (
    <LinearGradient
      colors={['#EAF3FF', '#F5F9FF', '#FFFFFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: topPadding + 8, paddingBottom: insets.bottom + 110 },
        ]}
      >
        {/* Top Header Bar */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoBadge}>
              <MaterialCommunityIcons name="feather" size={26} color={Colors.white} />
            </View>
            <View style={styles.brandTextContainer}>
              <Text style={styles.brandTitle}>UDAAN</Text>
              <Text style={styles.brandSubtitle}>
                {language === 'odia' ? 'ଉଡ଼ାନ୍' : 'Child Rights & Safety'}
              </Text>
            </View>
          </View>

          {/* Language Toggle Pill */}
          <TouchableOpacity
            onPress={toggleLanguage}
            style={styles.languageToggle}
            accessibilityRole="button"
            accessibilityLabel="Switch Language"
          >
            <Ionicons name="language" size={16} color={Colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.languageText}>
              {language === 'odia' ? 'English' : 'ଓଡ଼ିଆ'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Welcome Tagline Banner */}
        <View style={styles.welcomeBanner}>
          <View style={styles.quotePill}>
            <Ionicons name="shield-checkmark" size={16} color="#0D47A1" />
            <Text style={styles.quotePillText}>
              {language === 'odia' ? 'ସୁରକ୍ଷିତ କିଶୋରୀ, ସଶକ୍ତ ଓଡ଼ିଶା' : 'Safe Girls, Stronger Odisha'}
            </Text>
          </View>
          <Text style={styles.welcomeTagline}>
            {c.appTagline[language]}
          </Text>
          <Text style={styles.welcomeSub}>
            {t.welcomeBadge[language]}
          </Text>
        </View>

        {/* 8-Card Grid (2 columns) */}
        <View style={styles.gridContainer}>
          {/* 1. Awareness */}
          <DashboardButton
            title={t.cards.awareness.title[language]}
            subtitle={t.cards.awareness.desc[language]}
            icon="bullhorn-outline"
            color={Colors.awareness}
            onPress={() => router.push('/awareness')}
          />

          {/* 2. Parent Corner */}
          <DashboardButton
            title={t.cards.parentCorner.title[language]}
            subtitle={t.cards.parentCorner.desc[language]}
            icon="account-group-outline"
            color={Colors.parentCorner}
            onPress={() => router.push('/parent-corner')}
          />

          {/* 3. Rights & Laws */}
          <DashboardButton
            title={t.cards.rightsLaws.title[language]}
            subtitle={t.cards.rightsLaws.desc[language]}
            icon="scale-balance"
            color={Colors.rightsLaws}
            onPress={() => router.push('/rights-laws')}
          />

          {/* 4. Audio-Video */}
          <DashboardButton
            title={t.cards.audioVideo.title[language]}
            subtitle={t.cards.audioVideo.desc[language]}
            icon="play-circle-outline"
            color={Colors.audioVideo}
            onPress={() => router.push('/audio-video')}
          />

          {/* 5. Help & Support */}
          <DashboardButton
            title={t.cards.helpSupport.title[language]}
            subtitle={t.cards.helpSupport.desc[language]}
            icon="headset"
            color={Colors.helpSupport}
            onPress={() => router.push('/help-support')}
          />

          {/* 6. Success Story */}
          <DashboardButton
            title={t.cards.successStory.title[language]}
            subtitle={t.cards.successStory.desc[language]}
            icon="trophy-outline"
            color={Colors.successStory}
            textColor="#3E2723"
            onPress={() => router.push('/success-story')}
          />

          {/* 7. Status */}
          <DashboardButton
            title={t.cards.status.title[language]}
            subtitle={t.cards.status.desc[language]}
            icon="chart-line"
            color={Colors.status}
            onPress={() => router.push('/status')}
          />

          {/* 8. Emergency */}
          <DashboardButton
            title={t.cards.emergency.title[language]}
            subtitle={t.cards.emergency.desc[language]}
            icon="alert-octagon-outline"
            color={Colors.emergency}
            onPress={() => router.push('/emergency')}
          />
        </View>

        {/* Quick Help Strip */}
        <View style={styles.quickHelpStrip}>
          <Ionicons name="call" size={18} color={Colors.primary} />
          <Text style={styles.quickHelpText}>
            {language === 'odia'
              ? '୨୪x୭ ମାଗଣା ଚାଇଲ୍ଡଲାଇନ୍ ସହାୟତା: ୧୦୯୮'
              : '24x7 Toll-Free Childline Help: 1098'}
          </Text>
        </View>
      </ScrollView>

      {/* Fixed Sticky Bottom SOS Button */}
      <View style={[styles.fixedBottomContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <SOSFloatingButton
          title="SOS"
          subtitle={
            language === 'odia'
              ? 'ଜରୁରୀ ସହାୟତା ପାଇଁ ଟ୍ୟାପ୍ କରନ୍ତୁ'
              : 'Tap for Urgent Safety SOS'
          }
          onPress={() => router.push('/sos')}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  brandTextContainer: {
    marginLeft: 12,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 1.2,
  },
  brandSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  languageToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D0E1FD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  languageText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  welcomeBanner: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quotePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    gap: 6,
  },
  quotePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D47A1',
  },
  welcomeTagline: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E293B',
    lineHeight: 26,
    marginBottom: 4,
  },
  welcomeSub: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickHelpStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBF4FF',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 16,
    gap: 8,
  },
  quickHelpText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E40AF',
  },
  fixedBottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(226, 232, 240, 0.8)',
  },
});
