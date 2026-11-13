import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useLanguage } from '@/context/LanguageContext';

interface ScreenHeaderProps {
  title: string;
  themeColor?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
  showLanguageToggle?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  themeColor = Colors.primary,
  rightIcon,
  onRightPress,
  showLanguageToggle = true,
}) => {
  const insets = useSafeAreaInsets();
  const { language, toggleLanguage } = useLanguage();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor,
          paddingTop: Math.max(insets.top, Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : 20),
        },
      ]}
    >
      <View style={styles.contentRow}>
        <TouchableOpacity
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <View style={styles.rightActions}>
          {showLanguageToggle && (
            <TouchableOpacity
              onPress={toggleLanguage}
              style={styles.langToggle}
              accessibilityRole="button"
              accessibilityLabel="Toggle Language"
            >
              <Text style={styles.langText}>
                {language === 'odia' ? 'EN' : 'ଓଡ଼'}
              </Text>
            </TouchableOpacity>
          )}

          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.iconButton}
              accessibilityRole="button"
            >
              <Ionicons name={rightIcon} size={22} color={Colors.white} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 19,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.3,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  langToggle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  langText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ScreenHeader;

