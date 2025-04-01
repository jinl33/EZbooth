// src/components/LanguageToggle.tsx
import React from 'react';
import { useLanguage, useTranslation } from '../LanguageContext';
import icon from '../images/globe.svg';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLanguage);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center py-1.5 hover:bg-gray-30 -ml-8"
      title={t("언어 변경")}
    >
      <img 
        src={icon} 
        alt="Language" 
        className="w-4 h-4 mr-2" 
      />
      <span className={`mr-1.3 text-sm ${language === 'ko' ? 'font-semibold text-[#1662ef]' : 'text-gray-400'}`}>
        Ko
      </span>
      <span className="mx-0.5 text-gray-300">/</span>
      <span className={`ml-1.3 text-sm ${language === 'en' ? 'font-semibold text-[#1662ef]' : 'text-gray-400'}`}>
        En
      </span>
    </button>
  );
};

export default LanguageToggle;