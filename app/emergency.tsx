import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';
import SectionCard from '@/components/SectionCard';
import HelplineButton from '@/components/HelplineButton';

export default function EmergencyScreen() {
  const { language } = useLanguage();
  const t = content.emergency;
  const [isLocating, setIsLocating] = useState(false);

  const handleShareLocation = async () => {
    setIsLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          language === 'odia' ? 'ଅନୁମତି ଆବଶ୍ୟକ' : 'Permission Required',
          language === 'odia'
            ? 'ଜରୁରୀ ସ୍ଥାନ ସେୟାର୍ ପାଇଁ ଲୋକେସନ୍ ଅନୁମତି ଦିଅନ୍ତୁ।'
            : 'Please grant location permission to share your emergency coordinates.'
        );
        setIsLocating(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      const mapUrl = `https://maps.google.com/?q=${lat},${lon}`;
      const messageBody =
        language === 'odia'
          ? `ଜରୁରୀ ସହାୟତା ଆବଶ୍ୟକ! ମୁଁ ଏବେ ବିପଦରେ ଅଛି। ମୋର ଲାଇଭ୍ ଲୋକେସନ୍: ${mapUrl}`
          : `EMERGENCY ALERT! I need urgent help. My current live location is: ${mapUrl}`;

      // Open SMS with pre-filled message
      const smsUrl = Platform.OS === 'ios'
        ? `sms:&body=${encodeURIComponent(messageBody)}`
        : `sms:?body=${encodeURIComponent(messageBody)}`;

      const canOpen = await Linking.canOpenURL(smsUrl);
      if (canOpen) {
        await Linking.openURL(smsUrl);
      } else {
        // Fallback WhatsApp or generic URL
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(messageBody)}`;
        await Linking.openURL(waUrl);
      }
    } catch (err) {
      console.warn('Location error', err);
      Alert.alert(
        language === 'odia' ? 'ତ୍ରୁଟି' : 'Error',
        language === 'odia'
          ? 'ଲୋକେସନ୍ ନେବାରେ ଅସୁବିଧା ହେଲା। ଦୟାକରି ସିଧାସଳଖ ୧୦୦ ବା ୧୦୯୮ କଲ୍ କରନ୍ତୁ।'
          : 'Could not fetch GPS location. Please call 100 or 1098 directly.'
      );
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        title={t.header[language]}
        themeColor={Colors.emergency}
        rightIcon="warning-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Warning Banner */}
        <View style={styles.alertBanner}>
          <Ionicons name="alert-circle" size={26} color="#DC2626" />
          <Text style={styles.alertBannerText}>{t.warningBanner[language]}</Text>
        </View>

        {/* 1. Direct Emergency Call Targets */}
        <SectionCard
          title={language === 'odia' ? 'ତୁରନ୍ତ ଡାଏଲ୍ କରନ୍ତୁ' : 'Direct Emergency Helplines'}
          icon="call"
          iconColor={Colors.emergency}
        >
          {/* Police 100 */}
          <HelplineButton
            number="100"
            label={t.callPolice[language]}
            sublabel={language === 'odia' ? 'ନିକଟସ୍ଥ ପୋଲିସ ଷ୍ଟେସନ୍ ଓ PCR' : 'Immediate Police Response'}
            themeColor="#DC2626"
            icon="shield-outline"
          />

          {/* Childline 1098 */}
          <HelplineButton
            number="1098"
            label={t.callChildline[language]}
            sublabel={language === 'odia' ? 'ବାଲ୍ୟ ବିବାହ ବିରୋଧୀ ଟୋଲ୍ ଫ୍ରି ସହାୟତା' : 'Toll-free Child Protection'}
            themeColor="#B91C1C"
            icon="people-outline"
          />

          {/* Women Helpline 181 */}
          <HelplineButton
            number="181"
            label={t.callWomenHelpline[language]}
            sublabel={language === 'odia' ? 'ମହିଳା ଓ କିଶୋରୀ ସୁରକ୍ଷା' : 'Women Distress & Violence Support'}
            themeColor="#991B1B"
            icon="heart-outline"
          />

          {/* Ambulance 108 */}
          <HelplineButton
            number="108"
            label={t.callAmbulance[language]}
            sublabel={language === 'odia' ? 'ଜରୁରୀକାଳୀନ ଡାକ୍ତରୀ ଆମ୍ବୁଲାନ୍ସ' : 'Medical Emergency Ambulance'}
            themeColor="#7F1D1D"
            icon="medkit-outline"
          />
        </SectionCard>

        {/* 2. Share My Location Button */}
        <SectionCard
          title={t.locationSectionTitle[language]}
          icon="navigate-circle-outline"
          iconColor="#0284C7"
        >
          <Text style={styles.locationHelpText}>{t.locationDescription[language]}</Text>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleShareLocation}
            disabled={isLocating}
            style={styles.locationButton}
          >
            {isLocating ? (
              <ActivityIndicator color={Colors.white} size="small" />
            ) : (
              <>
                <Ionicons name="location" size={24} color={Colors.white} />
                <Text style={styles.locationButtonText}>
                  {language === 'odia' ? 'ଏବେ ଲୋକେସନ୍ ସେୟାର୍ କରନ୍ତୁ' : 'Share My Live Location Now'}
                </Text>
              </>
            )}
          </TouchableOpacity>
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
  alertBanner: {
    backgroundColor: '#FEE2E2',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    gap: 10,
  },
  alertBannerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#991B1B',
    lineHeight: 20,
  },
  locationHelpText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 14,
  },
  locationButton: {
    backgroundColor: '#0284C7',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  locationButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
});

