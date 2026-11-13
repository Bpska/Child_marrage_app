import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';

export default function SOSScreen() {
  const insets = useSafeAreaInsets();
  const { language } = useLanguage();
  const t = content.sos;
  const [isLocating, setIsLocating] = useState(false);

  const dialNumber = async (number: string) => {
    const url = `tel:${number}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert('Phone Dial', `Please call ${number}`);
    }
  };

  const handleShareLocation = async () => {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          language === 'odia' ? 'ଅନୁମତି ଆବଶ୍ୟକ' : 'Permission Needed',
          language === 'odia'
            ? 'ଜରୁରୀ ସ୍ଥାନ ପଠାଇବା ପାଇଁ ଲୋକେସନ୍ ଅନୁମତି ଆବଶ୍ୟକ।'
            : 'Location permission needed to share coordinates.'
        );
        setIsLocating(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const mapUrl = `https://maps.google.com/?q=${loc.coords.latitude},${loc.coords.longitude}`;
      const msg =
        language === 'odia'
          ? `ଜରୁରୀ ସହାୟତା ଆବଶ୍ୟକ! ମୁଁ ଏବେ ବିପଦରେ ଅଛି। ମୋର ଲାଇଭ୍ ଲୋକେସନ୍: ${mapUrl}`
          : `EMERGENCY ALERT! I am in danger. My live GPS location: ${mapUrl}`;

      const smsUrl = Platform.OS === 'ios'
        ? `sms:&body=${encodeURIComponent(msg)}`
        : `sms:?body=${encodeURIComponent(msg)}`;

      const canOpen = await Linking.canOpenURL(smsUrl);
      if (canOpen) {
        await Linking.openURL(smsUrl);
      } else {
        await Linking.openURL(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`);
      }
    } catch (e) {
      console.warn('SOS loc err', e);
      Alert.alert(
        language === 'odia' ? 'ସତର୍କତା' : 'Alert',
        language === 'odia'
          ? 'ଲୋକେସନ୍ ନେଇପାରିଲୁ ନାହିଁ। ଦୟାକରି ତୁରନ୍ତ ୧୦୯୮ କିମ୍ବା ୧୦୦ କଲ୍ କରନ୍ତୁ।'
          : 'Could not fetch GPS. Please call 1098 or 100 immediately.'
      );
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10, paddingBottom: insets.bottom + 16 }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Warning Icon Badge */}
        <View style={styles.alertHeader}>
          <View style={styles.sirenPulseCircle}>
            <MaterialCommunityIcons name="alarm-light" size={60} color="#DC2626" />
          </View>
          <Text style={styles.dangerAlertTitle}>{t.dangerAlert[language]}</Text>
          <Text style={styles.dangerAlertSub}>{t.dangerSubtext[language]}</Text>
        </View>

        {/* 3 High-contrast Action Buttons */}
        <View style={styles.actionsContainer}>
          {/* Action 1: Call Childline 1098 */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => dialNumber('1098')}
            style={[styles.sosActionButton, { backgroundColor: '#DC2626' }]}
            accessibilityRole="button"
          >
            <View style={styles.actionIconWrap}>
              <Ionicons name="call" size={28} color="#DC2626" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionButtonTitle}>{t.actionChildline[language]}</Text>
              <Text style={styles.actionButtonSub}>
                {language === 'odia' ? 'ଶିଶୁ ସୁରକ୍ଷା ଓ ବାଲ୍ୟ ବିବାହ ରୋକିବା' : 'Childline 24/7 Free Helpline'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Action 2: Call Police 100 */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => dialNumber('100')}
            style={[styles.sosActionButton, { backgroundColor: '#B91C1C' }]}
            accessibilityRole="button"
          >
            <View style={styles.actionIconWrap}>
              <MaterialCommunityIcons name="police-badge" size={30} color="#B91C1C" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionButtonTitle}>{t.actionPolice[language]}</Text>
              <Text style={styles.actionButtonSub}>
                {language === 'odia' ? 'ତୁରନ୍ତ ପୋଲିସ ହସ୍ତକ୍ଷେପ' : 'Emergency Police PCR response'}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Action 3: Share Live Location */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleShareLocation}
            disabled={isLocating}
            style={[styles.sosActionButton, { backgroundColor: '#0284C7' }]}
            accessibilityRole="button"
          >
            <View style={styles.actionIconWrap}>
              {isLocating ? (
                <ActivityIndicator size="small" color="#0284C7" />
              ) : (
                <Ionicons name="navigate-circle" size={30} color="#0284C7" />
              )}
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.actionButtonTitle}>{t.actionLocation[language]}</Text>
              <Text style={styles.actionButtonSub}>
                {language === 'odia' ? 'ଏସଏମଏସ / ହ୍ୱାଟ୍ସଆପ୍ ମାଧ୍ୟମରେ' : 'Instant SMS/WhatsApp coordinates'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Cancel / Safe Return Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.back()}
          style={styles.cancelSafeButton}
        >
          <Ionicons name="checkmark-circle" size={20} color="#15803D" />
          <Text style={styles.cancelSafeText}>{t.cancelSafe[language]}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  alertHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  sirenPulseCircle: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: '#FEE2E2',
    borderWidth: 4,
    borderColor: '#F87171',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  dangerAlertTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#991B1B',
    textAlign: 'center',
    marginBottom: 6,
  },
  dangerAlertSub: {
    fontSize: 14,
    color: '#7F1D1D',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  actionsContainer: {
    width: '100%',
    gap: 14,
    marginBottom: 26,
  },
  sosActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 18,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  actionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  actionTextWrap: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 2,
  },
  actionButtonSub: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '600',
  },
  cancelSafeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#86EFAC',
    gap: 8,
  },
  cancelSafeText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#15803D',
  },
});

