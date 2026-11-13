import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';

interface SOSFloatingButtonProps {
  onPress: () => void;
  title?: string;
  subtitle?: string;
}

export const SOSFloatingButton: React.FC<SOSFloatingButtonProps> = ({
  onPress,
  title = 'SOS',
  subtitle = 'ଜରୁରୀ ସହାୟତା / Emergency Help',
}) => {
  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.04, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.0, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      {/* Outer pulsating aura */}
      <Animated.View style={[styles.glowRing, glowStyle]} />
      
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.touchable, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Emergency SOS Button"
      >
        <LinearGradient
          colors={Colors.sosGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <View style={styles.contentRow}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="alarm-light" size={32} color={Colors.white} />
            </View>
            <View style={styles.textColumn}>
              <Text style={styles.sosText}>{title}</Text>
              <Text style={styles.subtitleText} numberOfLines={1}>
                {subtitle}
              </Text>
            </View>
            <View style={styles.arrowCircle}>
              <MaterialCommunityIcons name="chevron-right" size={26} color={Colors.white} />
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginVertical: 12,
    position: 'relative',
  },
  glowRing: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 20,
    backgroundColor: '#FF5252',
  },
  touchable: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#B71C1C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  gradient: {
    minHeight: 76,
    paddingHorizontal: 18,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textColumn: {
    flex: 1,
  },
  sosText: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 1.5,
  },
  subtitleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFCDD2',
    marginTop: 2,
  },
  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SOSFloatingButton;

