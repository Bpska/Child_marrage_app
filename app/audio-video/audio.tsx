import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';

interface AudioLesson {
  id: string;
  title: { odia: string; english: string };
  speaker: { odia: string; english: string };
  duration: string;
  url: string;
}

const AUDIO_LESSONS: AudioLesson[] = [
  {
    id: '1',
    title: {
      odia: 'ଝିଅଙ୍କ ଅଧିକାର ଓ ସଚେତନତା ବାର୍ତ୍ତା',
      english: 'Message on Girls’ Rights & Legal Autonomy',
    },
    speaker: { odia: 'ଡାକ୍ତର ସୁନିତା ପଟ୍ଟନାୟକ', english: 'Dr. Sunita Patnaik' },
    duration: '0:18',
    url: 'https://actions.google.com/sounds/v1/ambiences/daytime_forest_bonfire.ogg',
  },
  {
    id: '2',
    title: {
      odia: 'ବାଲ୍ୟ ବିବାହ ବିରୋଧରେ ସାମୂହିକ ସ୍ୱର (ରେଡିଓ ନାଟକ)',
      english: 'Voices Against Child Marriage (Radio Drama)',
    },
    speaker: { odia: 'ଓଡ଼ିଶା ରେଡିଓ ନାଟ୍ୟ ଦଳ', english: 'Odisha Radio Theater Group' },
    duration: '0:15',
    url: 'https://actions.google.com/sounds/v1/ambiences/rain_heavy.ogg',
  },
  {
    id: '3',
    title: {
      odia: 'କିଶୋରୀ କାଉନ୍ସେଲିଂ: ମାନସିକ ସ୍ୱାସ୍ଥ୍ୟ ଓ ସାହସ',
      english: 'Adolescent Counseling: Mental Strength & Courage',
    },
    speaker: { odia: 'କାଉନ୍ସେଲର ମିନାକ୍ଷୀ ଦାସ', english: 'Counselor Meenakshi Das' },
    duration: '0:20',
    url: 'https://actions.google.com/sounds/v1/ambiences/waterfall.ogg',
  },
];

export default function AudioLearningScreen() {
  const { language } = useLanguage();
  const t = content.audioVideo;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [activeLesson, setActiveLesson] = useState<AudioLesson>(AUDIO_LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(1);

  useEffect(() => {
    // Configure audio mode
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    }).catch(console.warn);

    return () => {
      if (sound) {
        sound.unloadAsync().catch(console.warn);
      }
    };
  }, [sound]);

  const playLesson = async (lesson: AudioLesson) => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
      }

      setActiveLesson(lesson);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: lesson.url },
        { shouldPlay: true },
        (status) => {
          if (status.isLoaded) {
            setIsPlaying(status.isPlaying);
            setPositionMillis(status.positionMillis || 0);
            setDurationMillis(status.durationMillis || 1);
            if (status.didJustFinish) {
              setIsPlaying(false);
              setPositionMillis(0);
            }
          }
        }
      );

      setSound(newSound);
      setIsPlaying(true);
    } catch (err) {
      console.warn('Audio play error', err);
      Alert.alert('Audio Error', 'Unable to play selected audio stream.');
    }
  };

  const togglePlayPause = async () => {
    if (!sound) {
      await playLesson(activeLesson);
      return;
    }

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const progressPercent = Math.min(100, Math.max(0, (positionMillis / durationMillis) * 100));

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.audioListHeader[language]}
        themeColor="#0D9488"
        rightIcon="musical-notes-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Working Mini Audio Player Card */}
        <View style={styles.nowPlayingCard}>
          <View style={styles.coverArt}>
            <MaterialCommunityIcons name="broadcast" size={38} color="#0D9488" />
          </View>
          <Text style={styles.nowPlayingBadge}>
            {isPlaying
              ? language === 'odia' ? '• ଏବେ ବାଜୁଛି' : '• NOW PLAYING'
              : language === 'odia' ? 'ଅଡିଓ ପ୍ଲେୟାର୍' : 'AUDIO PLAYER'}
          </Text>
          <Text style={styles.nowPlayingTitle} numberOfLines={2}>
            {activeLesson.title[language]}
          </Text>
          <Text style={styles.nowPlayingSpeaker}>{activeLesson.speaker[language]}</Text>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>
                {Math.floor(positionMillis / 1000)}s
              </Text>
              <Text style={styles.timeText}>{activeLesson.duration}</Text>
            </View>
          </View>

          {/* Control Buttons */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              onPress={() => {
                if (sound) sound.setPositionAsync(0);
              }}
              style={styles.subControlBtn}
            >
              <Ionicons name="refresh" size={20} color="#0D9488" />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={togglePlayPause}
              style={styles.mainPlayBtn}
            >
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={32}
                color={Colors.white}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const nextIndex = (AUDIO_LESSONS.findIndex((l) => l.id === activeLesson.id) + 1) % AUDIO_LESSONS.length;
                playLesson(AUDIO_LESSONS[nextIndex]);
              }}
              style={styles.subControlBtn}
            >
              <Ionicons name="play-skip-forward" size={20} color="#0D9488" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Audio Lessons List */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeaderText}>
            {language === 'odia' ? 'ଅଡିଓ ପାଠ୍ୟକ୍ରମ ତାଲିକା' : 'Available Audio Lessons'}
          </Text>
        </View>

        {AUDIO_LESSONS.map((lesson) => {
          const isSelected = lesson.id === activeLesson.id;
          return (
            <TouchableOpacity
              key={lesson.id}
              activeOpacity={0.8}
              onPress={() => playLesson(lesson)}
              style={[styles.audioItem, isSelected && styles.audioItemActive]}
            >
              <View style={[styles.audioIconCircle, isSelected && styles.audioIconActive]}>
                <Ionicons
                  name={isSelected && isPlaying ? 'pause' : 'play'}
                  size={20}
                  color={isSelected ? Colors.white : '#0D9488'}
                />
              </View>
              <View style={styles.audioItemDetails}>
                <Text style={[styles.audioItemTitle, isSelected && styles.audioItemTitleActive]}>
                  {lesson.title[language]}
                </Text>
                <Text style={styles.audioItemSpeaker}>{lesson.speaker[language]}</Text>
              </View>
              <Text style={styles.audioDurationText}>{lesson.duration}</Text>
            </TouchableOpacity>
          );
        })}
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
  nowPlayingCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  coverArt: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#99F6E4',
    marginBottom: 12,
  },
  nowPlayingBadge: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
    letterSpacing: 1,
    marginBottom: 6,
  },
  nowPlayingTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  nowPlayingSpeaker: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 16,
  },
  progressBarTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  timeText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  subControlBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F0FDFA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCFBF1',
  },
  mainPlayBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#0D9488',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  listHeaderRow: {
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  listHeaderText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  audioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  audioItemActive: {
    borderColor: '#0D9488',
    backgroundColor: '#F0FDFA',
  },
  audioIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6FFFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  audioIconActive: {
    backgroundColor: '#0D9488',
  },
  audioItemDetails: {
    flex: 1,
  },
  audioItemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  audioItemTitleActive: {
    color: '#0F766E',
  },
  audioItemSpeaker: {
    fontSize: 12,
    color: '#64748B',
  },
  audioDurationText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
    marginLeft: 8,
  },
});

