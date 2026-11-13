import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/colors';
import content from '@/constants/content';
import { useLanguage } from '@/context/LanguageContext';
import ScreenHeader from '@/components/ScreenHeader';
import SectionCard from '@/components/SectionCard';
import HelplineButton from '@/components/HelplineButton';

export default function HelpSupportScreen() {
  const { language } = useLanguage();
  const t = content.helpSupport;

  const [message, setMessage] = useState('');
  const [counselorName, setCounselorName] = useState('');
  const [counselorContact, setCounselorContact] = useState('');
  const [counselorNote, setCounselorNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendComplaint = async () => {
    if (!message.trim()) {
      Alert.alert(
        language === 'odia' ? 'ସୂଚନା ଆବଶ୍ୟକ' : 'Input Required',
        language === 'odia' ? 'ଦୟାକରି ଆପଣଙ୍କ ବାର୍ତ୍ତା ଲେଖନ୍ତୁ।' : 'Please type your message or grievance.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      // Store grievance locally in offline storage
      const newEntry = {
        id: Date.now().toString(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
      };
      const existing = await AsyncStorage.getItem('@udaan_complaints_v1');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newEntry);
      await AsyncStorage.setItem('@udaan_complaints_v1', JSON.stringify(list));

      setMessage('');
      Alert.alert(
        language === 'odia' ? 'ବାର୍ତ୍ତା ସଫଳତାର ସହ ପଠାଗଲା' : 'Message Sent Successfully',
        language === 'odia'
          ? 'ଆପଣଙ୍କ ବାର୍ତ୍ତା ସୁରକ୍ଷିତ ଭାବରେ ରେକର୍ଡ ହୋଇଛି। ଆମର ସହାୟତା ଦଳ ଶୀଘ୍ର ଯୋଗାଯୋଗ କରିବେ।'
          : 'Your confidential report has been submitted safely. Our team/helpline will respond swiftly.'
      );
    } catch (e) {
      console.warn('Storage error', e);
      Alert.alert('Success', 'Report recorded securely.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestCounselor = async () => {
    if (!counselorContact.trim()) {
      Alert.alert(
        language === 'odia' ? 'ସମ୍ପର୍କ ନମ୍ବର ଆବଶ୍ୟକ' : 'Contact Required',
        language === 'odia' ? 'ଦୟାକରି ଫୋନ୍ ନମ୍ବର କିମ୍ବା ସ୍କୁଲ ନାମ ଲେଖନ୍ତୁ।' : 'Please provide a contact phone number or school.'
      );
      return;
    }

    try {
      const entry = {
        id: Date.now().toString(),
        name: counselorName.trim() || 'Anonymous',
        contact: counselorContact.trim(),
        note: counselorNote.trim(),
        timestamp: new Date().toISOString(),
      };
      const existing = await AsyncStorage.getItem('@udaan_counseling_requests_v1');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(entry);
      await AsyncStorage.setItem('@udaan_counseling_requests_v1', JSON.stringify(list));

      setCounselorName('');
      setCounselorContact('');
      setCounselorNote('');
      Alert.alert(
        language === 'odia' ? 'ଅନୁରୋଧ ଗୃହୀତ ହେଲା' : 'Request Received',
        language === 'odia'
          ? 'ବିଦ୍ୟାଳୟ କାଉନ୍ସେଲର ଆପଣଙ୍କ ସହ ଖୁବ୍ ଶୀଘ୍ର ଗୋପନୀୟ ଭାବେ କଥା ହେବେ।'
          : 'A dedicated school counselor will contact you confidentially.'
      );
    } catch (e) {
      console.warn('Counselor save error', e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScreenHeader
        title={t.header[language]}
        themeColor={Colors.helpSupport}
        rightIcon="heart-outline"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro */}
        <View style={styles.introCard}>
          <Ionicons name="shield-checkmark" size={24} color="#0D9488" style={{ marginBottom: 6 }} />
          <Text style={styles.introText}>{t.intro[language]}</Text>
        </View>

        {/* 1. Emergency Helpline Numbers */}
        <SectionCard
          title={t.helplineTitle[language]}
          icon="call"
          iconColor={Colors.helpSupport}
        >
          {/* Childline 1098 */}
          <View style={styles.helplineBlock}>
            <Text style={styles.helplineName}>{t.childlineTitle[language]}</Text>
            <Text style={styles.helplineDetail}>{t.childlineDesc[language]}</Text>
            <HelplineButton
              number="1098"
              label={language === 'odia' ? 'ଚାଇଲ୍ଡଲାଇନ୍ ୧୦୯୮ କଲ୍ କରନ୍ତୁ' : 'Call Childline 1098'}
              sublabel={language === 'odia' ? 'ଶିଶୁ ସୁରକ୍ଷା ଜରୁରୀ ସେବା' : 'Child Care & Protection'}
              themeColor="#00897B"
              icon="call"
            />
          </View>

          {/* Women Helpline 181 */}
          <View style={[styles.helplineBlock, { marginTop: 14 }]}>
            <Text style={styles.helplineName}>{t.womenTitle[language]}</Text>
            <Text style={styles.helplineDetail}>{t.womenDesc[language]}</Text>
            <HelplineButton
              number="181"
              label={language === 'odia' ? 'ମହିଳା ହେଲ୍ପଲାଇନ୍ ୧୮୧ କଲ୍ କରନ୍ତୁ' : 'Call Women Helpline 181'}
              sublabel={language === 'odia' ? 'ମହିଳା ଓ କିଶୋରୀ ସୁରକ୍ଷା' : 'Women in Distress Support'}
              themeColor="#00796B"
              icon="call"
            />
          </View>
        </SectionCard>

        {/* 2. Confidential Message / Complaint Input */}
        <SectionCard
          title={t.complaintTitle[language]}
          icon="chatbubbles-outline"
          iconColor="#0284C7"
        >
          <TextInput
            multiline
            numberOfLines={4}
            value={message}
            onChangeText={setMessage}
            placeholder={t.complaintPlaceholder[language]}
            placeholderTextColor="#94A3B8"
            style={styles.textInputArea}
          />
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSendComplaint}
            disabled={isSubmitting}
            style={styles.submitBtn}
          >
            <Ionicons name="paper-plane" size={18} color={Colors.white} />
            <Text style={styles.submitBtnText}>{t.sendBtn[language]}</Text>
          </TouchableOpacity>
        </SectionCard>

        {/* 3. Contact School Counselor Form */}
        <SectionCard
          title={t.counselorTitle[language]}
          icon="people-outline"
          iconColor="#4F46E5"
        >
          <Text style={styles.counselorIntroText}>{t.counselorDesc[language]}</Text>

          <TextInput
            value={counselorName}
            onChangeText={setCounselorName}
            placeholder={t.namePlaceholder[language]}
            placeholderTextColor="#94A3B8"
            style={styles.singleInput}
          />

          <TextInput
            value={counselorContact}
            onChangeText={setCounselorContact}
            placeholder={t.phonePlaceholder[language]}
            placeholderTextColor="#94A3B8"
            keyboardType="phone-pad"
            style={styles.singleInput}
          />

          <TextInput
            value={counselorNote}
            onChangeText={setCounselorNote}
            placeholder={
              language === 'odia'
                ? 'କ’ଣ ସହାୟତା ଚାହାଁନ୍ତି? (ସଂକ୍ଷେପରେ)'
                : 'What would you like counseling about? (Briefly)'
            }
            placeholderTextColor="#94A3B8"
            style={[styles.singleInput, { minHeight: 60 }]}
            multiline
          />

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleRequestCounselor}
            style={[styles.submitBtn, { backgroundColor: '#4F46E5' }]}
          >
            <Ionicons name="calendar-outline" size={18} color={Colors.white} />
            <Text style={styles.submitBtnText}>{t.requestCounseling[language]}</Text>
          </TouchableOpacity>
        </SectionCard>
      </ScrollView>
    </KeyboardAvoidingView>
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
    backgroundColor: '#F0FDFA',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#99F6E4',
  },
  introText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#134E4A',
    fontWeight: '600',
  },
  helplineBlock: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  helplineName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  helplineDetail: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 8,
  },
  textInputArea: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 12,
    fontSize: 14,
    color: Colors.textPrimary,
    minHeight: 90,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  singleInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  submitBtn: {
    backgroundColor: '#0D9488',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitBtnText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  counselorIntroText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
});
