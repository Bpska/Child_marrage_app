import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LanguageProvider } from '@/context/LanguageContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#F5F7FA' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="awareness" />
          <Stack.Screen name="parent-corner" />
          <Stack.Screen name="rights-laws" />
          <Stack.Screen name="audio-video/index" />
          <Stack.Screen name="audio-video/video" />
          <Stack.Screen name="audio-video/audio" />
          <Stack.Screen name="help-support" />
          <Stack.Screen name="success-story" />
          <Stack.Screen name="status" />
          <Stack.Screen name="emergency" />
          <Stack.Screen
            name="sos"
            options={{
              presentation: 'modal',
              animation: 'fade_from_bottom',
            }}
          />
        </Stack>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}

