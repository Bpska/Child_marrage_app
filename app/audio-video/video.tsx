import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';

interface VideoLesson {
  id: string;
  title: { odia: string; english: string };
  duration: string;
  category: { odia: string; english: string };
  url: string;
  description: { odia: string; english: string };
}

const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: '1',
    title: {
      odia: 'ଶିଶୁ ବିବାହ ପ୍ରତିରୋଧ ସଚେତନତା ବାର୍ତ୍ତା',
      english: 'Child Marriage Prevention & Rights Documentary',
    },
    duration: '0:15',
    category: { odia: 'ଡକ୍ୟୁମେଣ୍ଟାରୀ', english: 'Documentary' },
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description: {
      odia: 'କିଶୋରୀମାନଙ୍କ ଶିକ୍ଷା ଓ ଅଧିକାରକୁ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ସରକାରୀ ପଦକ୍ଷେପ।',
      english: 'Insights into collective community vigilance and legal protection for adolescent girls.',
    },
  },
  {
    id: '2',
    title: {
      odia: 'ଝିଅଙ୍କ ସ୍ୱପ୍ନ ଓ ଉଡ଼ାନ୍ – କ୍ଷୁଦ୍ର ଚଳଚ୍ଚିତ୍ର',
      english: 'Dreams of a Daughter – Short Educational Film',
    },
    duration: '0:12',
    category: { odia: 'କ୍ଷୁଦ୍ର ନାଟକ', english: 'Short Story' },
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    description: {
      odia: 'ବାଲ୍ୟବିବାହ ବଦଳରେ ପାଠପଢ଼ା କିପରି ଏକ ଝିଅର ଜୀବନକୁ ଉଜ୍ଜ୍ୱଳ କରିପାରେ।',
      english: 'How supporting education over early marriage transforms family prosperity.',
    },
  },
  {
    id: '3',
    title: {
      odia: 'ପିତାମାତାଙ୍କ ପାଇଁ ପରାମର୍ଶ – ଓଡ଼ିଶା ପ୍ରେକ୍ଷାପଟ',
      english: 'Parental Guidance & Community Dialogues',
    },
    duration: '0:10',
    category: { odia: 'ପରାମର୍ଶ', english: 'Counseling' },
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    description: {
      odia: 'ଝିଅମାନଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ଓ ଶିକ୍ଷାରେ ନିବେଶ କଲେ ପରିବାର କିପରି ସୁରକ୍ଷିତ ରହେ।',
      english: 'Guidance for rural guardians on health risks of underage conception and marriage.',
    },
  },
];

export default function VideoLearningScreen() {
  const { language } = useLanguage();
  const t = content.audioVideo;
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson>(VIDEO_LESSONS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<Video>(null);

  const handleSelectVideo = async (lesson: VideoLesson) => {
    setSelectedVideo(lesson);
    if (videoRef.current) {
      await videoRef.current.unloadAsync();
      await videoRef.current.loadAsync({ uri: lesson.url }, { shouldPlay: true });
      setIsPlaying(true);
    }
  };

  const togglePlayback = async () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      await videoRef.current.pauseAsync();
      setIsPlaying(false);
    } else {
      await videoRef.current.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.videoListHeader[language]}
        themeColor="#7C3AED"
        rightIcon="videocam-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Main Video Player */}
        <View style={styles.playerContainer}>
          <Video
            ref={videoRef}
            style={styles.videoPlayer}
            source={{ uri: selectedVideo.url }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
              if (status.isLoaded) {
                setIsPlaying(status.isPlaying);
              }
            }}
          />
          <View style={styles.playerOverlayBar}>
            <TouchableOpacity onPress={togglePlayback} style={styles.playButtonPill}>
              <Ionicons
                name={isPlaying ? 'pause' : 'play'}
                size={18}
                color={Colors.white}
              />
              <Text style={styles.playButtonText}>
                {isPlaying
                  ? language === 'odia' ? 'ବନ୍ଦ କରନ୍ତୁ' : 'Pause'
                  : language === 'odia' ? 'ଚଲାନ୍ତୁ' : 'Play Now'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.durationBadge}>{selectedVideo.duration}</Text>
          </View>
        </View>

        {/* Selected Video Metadata */}
        <View style={styles.metaCard}>
          <View style={styles.metaBadge}>
            <Text style={styles.metaBadgeText}>{selectedVideo.category[language]}</Text>
          </View>
          <Text style={styles.activeTitle}>{selectedVideo.title[language]}</Text>
          <Text style={styles.activeDesc}>{selectedVideo.description[language]}</Text>
        </View>

        {/* Video Playlist Header */}
        <View style={styles.playlistSectionHeader}>
          <Text style={styles.playlistTitle}>
            {language === 'odia' ? 'ସମସ୍ତ ଭିଡିଓ ତାଲିକା' : 'All Video Lessons'}
          </Text>
          <Text style={styles.playlistCount}>3 {language === 'odia' ? 'ଭିଡିଓ' : 'Videos'}</Text>
        </View>

        {/* Playlist Items */}
        {VIDEO_LESSONS.map((item, index) => {
          const isCurrent = item.id === selectedVideo.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handleSelectVideo(item)}
              style={[styles.lessonCard, isCurrent && styles.lessonCardActive]}
            >
              <View style={[styles.thumbnailPlaceholder, isCurrent && styles.thumbActive]}>
                <Ionicons
                  name={isCurrent && isPlaying ? 'volume-high' : 'play'}
                  size={24}
                  color={isCurrent ? '#7C3AED' : '#6B7280'}
                />
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonCategory}>{item.category[language]}</Text>
                <Text style={[styles.lessonTitle, isCurrent && styles.lessonTitleActive]} numberOfLines={2}>
                  {item.title[language]}
                </Text>
                <View style={styles.lessonFooter}>
                  <Ionicons name="time-outline" size={12} color="#6B7280" />
                  <Text style={styles.lessonDuration}>{item.duration}</Text>
                </View>
              </View>
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
    paddingBottom: 40,
  },
  playerContainer: {
    backgroundColor: '#000000',
    width: '100%',
    height: 220,
    position: 'relative',
  },
  videoPlayer: {
    width: '100%',
    height: '100%',
  },
  playerOverlayBar: {
    position: 'absolute',
    bottom: 8,
    left: 12,
    right: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playButtonPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(124, 58, 237, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  playButtonText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 12,
  },
  durationBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    color: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '700',
  },
  metaCard: {
    backgroundColor: Colors.white,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metaBadge: {
    backgroundColor: '#F3E8FF',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 6,
  },
  metaBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED',
  },
  activeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 22,
    marginBottom: 6,
  },
  activeDesc: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
  },
  playlistSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  playlistCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  lessonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  lessonCardActive: {
    borderColor: '#7C3AED',
    backgroundColor: '#FAF5FF',
  },
  thumbnailPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  thumbActive: {
    backgroundColor: '#EDE9FE',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonCategory: {
    fontSize: 11,
    color: '#7C3AED',
    fontWeight: '700',
    marginBottom: 2,
  },
  lessonTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 18,
    marginBottom: 4,
  },
  lessonTitleActive: {
    color: '#7C3AED',
  },
  lessonFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  lessonDuration: {
    fontSize: 11,
    color: '#6B7280',
  },
});

