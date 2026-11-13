import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import Colors from '@/constants/colors';
import { useLanguage } from '@/context/LanguageContext';

interface HelplineButtonProps {
  number: string;
  label: string;
  sublabel?: string;
  themeColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export const HelplineButton: React.FC<HelplineButtonProps> = ({
  number,
  label,
  sublabel,
  themeColor = Colors.primary,
  icon = 'call',
}) => {
  const { language } = useLanguage();

  const handleCall = async () => {
    const url = `tel:${number}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported || Platform.OS === 'android') {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          language === 'odia' ? 'କଲ୍ ବିଫଳ' : 'Call Failed',
          language === 'odia'
            ? `ଡାଏଲ୍ କରିପାରିଲୁ ନାହିଁ। ଦୟାକରି ସିଧାସଳଖ ${number} ଡାଏଲ୍ କରନ୍ତୁ।`
            : `Unable to open dialer. Please dial ${number} manually.`
        );
      }
    } catch (err) {
      console.warn('Call error', err);
      // Fallback direct open attempt
      Linking.openURL(url).catch(() => {
        Alert.alert('Phone Dial', `Please call ${number}`);
      });
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handleCall}
      style={[styles.button, { backgroundColor: themeColor }]}
      accessibilityRole="button"
      accessibilityLabel={`Call ${label} on ${number}`}
    >
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={22} color={themeColor} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.labelText}>{label}</Text>
        {sublabel ? <Text style={styles.sublabelText}>{sublabel}</Text> : null}
      </View>
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginVertical: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 4,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textBox: {
    flex: 1,
  },
  labelText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  sublabelText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    marginTop: 2,
  },
  numberBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  numberText: {
    color: Colors.white,
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default HelplineButton;

