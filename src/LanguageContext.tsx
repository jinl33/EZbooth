// src/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import translations, { Language, TranslationDictionary } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage === 'en' ? 'en' : 'ko'; // Default to 'ko' if invalid
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Custom hook for translations that accepts a category
export const useTranslation = (category: keyof typeof translations = 'common') => {
  const { language } = useLanguage();
  
  // Return a translation function that looks up in the specified category
  const t = (key: string): string => {
    // If language is Korean, check for Korean override first, otherwise return the key
    if (language === 'ko') {
      const koTranslations = translations[category].ko as TranslationDictionary | undefined;
      return koTranslations?.[key] || key;
    }
    
    // For English, look in the specified category first
    const categoryTranslations = translations[category].en as TranslationDictionary;
    if (categoryTranslations && key in categoryTranslations) {
      return categoryTranslations[key];
    }
    
    // If not found in the category, look in common translations
    if (category !== 'common') {
      const commonTranslations = translations.common.en as TranslationDictionary;
      if (commonTranslations && key in commonTranslations) {
        return commonTranslations[key];
      }
    }
    
    // If no translation found, return the original key
    return key;
  };
  
  // Function to render HTML from translations
  const renderHTML = (key: string) => {
    const translatedText = t(key);
    return { __html: translatedText };
  };
  
  return { t, language, renderHTML };
};

export default LanguageContext;