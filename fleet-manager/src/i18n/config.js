// React imports
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  resources: {
    en: {
      translations: require('./locales/en/translations.json'),
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
