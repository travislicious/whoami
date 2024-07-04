// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // For browser language detection
import fr from './locales/fr.json'
import en from './locales/en.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Enable language det0ection
  .init({
    resources: {
        en: { translation: en},
        fr: { translation: fr},
    },
    fallbackLng: 'en', // Default language if detection fails
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie']
    },
    interpolation: {
      escapeValue: false // React already does escaping
    }
  });

export default i18n;
