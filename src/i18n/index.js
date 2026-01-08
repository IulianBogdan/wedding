import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import axios from 'axios';
import en from './locales/en.json';
import ro from './locales/ro.json';

// Function to detect user's country and return appropriate language
const detectUserLanguage = async () => {
  // Check if user has manually set a language preference
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    return savedLanguage;
  }

  try {
    // Get user's IP location
    const response = await axios.get('https://ipapi.co/json/');
    const countryCode = response.data.country_code;

    // If user is in Romania, use Romanian, otherwise English
    return countryCode === 'RO' ? 'ro' : 'en';
  } catch (error) {
    console.warn('Failed to detect user location:', error);
    // Fallback to English if detection fails
    return 'en';
  }
};

// Initialize i18n with detected language
const initializeI18n = async () => {
  const detectedLanguage = await detectUserLanguage();

  await i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        ro: { translation: ro }
      },
      lng: detectedLanguage,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false
      }
    });

  return i18n;
};

// Export a promise that resolves to the initialized i18n
export default initializeI18n();

