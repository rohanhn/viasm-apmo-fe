/* eslint-disable import/extensions */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './lang/en.json';
import vi from './lang/vi.json';

i18n.use(initReactI18next).init({
  resources: {
    vi: { translation: vi },
    en: { translation: en },
  },
  lng:
    typeof window !== 'undefined'
      ? localStorage.getItem('language') || 'vi'
      : 'vi',
  fallbackLng: 'vi',
  interpolation: { escapeValue: false },
});

export default i18n;
