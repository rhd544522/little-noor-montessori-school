import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TRANSLATIONS, LanguageCode, TranslationSchema } from '../translations/translations';

interface LanguageContextType {
  language: LanguageCode;
  currentLanguage: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationSchema;
  getNestedTranslation: (path: string) => string;
}

const STORAGE_KEY = 'littlenoor_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (saved && (saved === 'en' || saved === 'gu' || saved === 'hi')) {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Active translation dictionary with fallback to English
  const activeT = TRANSLATIONS[language] || TRANSLATIONS.en;

  const getNestedTranslation = (path: string): string => {
    const keys = path.split('.');
    let current: any = activeT;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English
        let fallback: any = TRANSLATIONS.en;
        for (const fbKey of keys) {
          if (fallback && typeof fallback === 'object' && fbKey in fallback) {
            fallback = fallback[fbKey];
          } else {
            return path;
          }
        }
        return typeof fallback === 'string' ? fallback : path;
      }
    }
    return typeof current === 'string' ? current : path;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        currentLanguage: language,
        setLanguage,
        t: activeT,
        getNestedTranslation,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
