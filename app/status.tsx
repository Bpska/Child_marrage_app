import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';
import SectionCard from '@/components/SectionCard';

export default function StatusScreen() {
  const { language } = useLanguage();
  const t = content.status;

  const [stats, setStats] = useState({
    helplinesDialed: 1,
    modulesCompleted: 3,
    savedNotes: 2,
  });

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('@udaan_user_stats_v1');
        if (saved) {
          setStats(JSON.parse(saved));
        }
      } catch (e) {
        console.warn('Stats fetch error', e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.header[language]}
        themeColor={Colors.status}
        rightIcon="stats-chart-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro */}
        <View style={styles.introCard}>
          <Ionicons name="ribbon-outline" size={24} color="#059669" style={{ marginBottom: 6 }} />
          <Text style={styles.introText}>{t.intro[language]}</Text>
        </View>

        {/* Big Overall Progress Dial Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>{t.overallScore[language]}</Text>
          <View style={styles.scoreDial}>
            <Text style={styles.scorePercent}>82%</Text>
            <Text style={styles.scoreSub}>
              {language === 'odia' ? 'ସଚେତନ ଓ ସଶକ୍ତ' : 'Aware & Empowered'}
            </Text>
          </View>
          <Text style={styles.scoreAdvice}>
            {language === 'odia'
              ? 'ଉତ୍କୃଷ୍ଟ! ଆପଣ ସମସ୍ତ ମୁଖ୍ୟ ଆଇନ ଓ ସହାୟତା ବ୍ୟବସ୍ଥା ବିଷୟରେ ଜ୍ଞାନ ଅର୍ଜନ କରିଛନ୍ତି।'
              : 'Great job! You have explored critical legal shields and welfare schemes.'}
          </Text>
        </View>

        {/* Module-by-module Progress Bars */}
        <SectionCard
          title={language === 'odia' ? 'ଅଧ୍ୟାୟ ପ୍ରଗତି' : 'Learning Milestones'}
          icon="checkmark-done-circle-outline"
          iconColor={Colors.status}
        >
          {t.modules.map((m) => (
            <View key={m.id} style={styles.progressRow}>
              <View style={styles.progressHeader}>
                <Text style={styles.moduleName}>{m.name[language]}</Text>
                <Text style={styles.modulePercentText}>{m.progress}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${m.progress}%` }]} />
              </View>
            </View>
          ))}
        </SectionCard>

        {/* Activity Log */}
        <SectionCard
          title={t.activityLogTitle[language]}
          icon="time-outline"
          iconColor="#0D9488"
        >
          {t.activities.map((act, idx) => (
            <View key={idx} style={styles.activityItem}>
              <View style={styles.activityBullet} />
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{act.title[language]}</Text>
                <Text style={styles.activityTime}>{act.time[language]}</Text>
              </View>
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
    backgroundColor: '#ECFDF5',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  introText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#065F46',
    fontWeight: '600',
  },
  scoreCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  scoreLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 14,
  },
  scoreDial: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0FDF4',
    borderWidth: 6,
    borderColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  scorePercent: {
    fontSize: 32,
    fontWeight: '900',
    color: '#047857',
  },
  scoreSub: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  scoreAdvice: {
    fontSize: 13,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 20,
  },
  progressRow: {
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  moduleName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  modulePercentText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.status,
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.status,
    borderRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  activityBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginTop: 6,
    marginRight: 10,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  activityTime: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
});

