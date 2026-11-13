import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'odia' | 'english';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isOdia: boolean;
}

const LANGUAGE_KEY = '@udaan_app_language_v1';

const LanguageContext = createContext<LanguageContextType>({
  language: 'odia',
  setLanguage: () => {},
  toggleLanguage: () => {},
  isOdia: true,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('odia');

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (stored === 'english' || stored === 'odia') {
          setLanguageState(stored);
        }
      } catch (e) {
        console.warn('Failed to load language', e);
      }
    })();
  }, []);

  const setLanguage = async (lang: Language) => {
    try {
      setLanguageState(lang);
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    } catch (e) {
      console.warn('Failed to save language', e);
    }
  };

  const toggleLanguage = () => {
    const nextLang: Language = language === 'odia' ? 'english' : 'odia';
    setLanguage(nextLang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isOdia: language === 'odia',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

