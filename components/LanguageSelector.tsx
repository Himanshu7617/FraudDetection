import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TRANSLATIONS, LanguageCode } from '../translations';

const LANGUAGE_NAMES: Record<LanguageCode, string> = {
  en: '🇬🇧 English',
  hi: '🇮🇳 हिंदी',
  ur: '🇵🇰 اردو',
  mr: '🇮🇳 मराठी',
  gu: '🇮🇳 ગુજરાતી',
};

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: LanguageCode[] = ['en', 'hi', 'ur', 'mr', 'gu'];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition-colors flex items-center gap-2"
        title="Change language"
      >
        <span>🌐</span>
        <span className="hidden sm:inline">{LANGUAGE_NAMES[language].split(' ')[1]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 overflow-hidden">
          {languageOptions.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left text-sm font-semibold transition-colors flex items-center gap-2 ${
                language === lang
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-200 hover:bg-slate-700'
              }`}
            >
              <span>{LANGUAGE_NAMES[lang].split(' ')[0]}</span>
              <span>{LANGUAGE_NAMES[lang].split(' ')[1]}</span>
              {language === lang && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
