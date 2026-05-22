import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enCalculators from './locales/en/calculators.json';
import enForms from './locales/en/forms.json';
import enResults from './locales/en/results.json';

import msCommon from './locales/ms/common.json';
import msHome from './locales/ms/home.json';
import msCalculators from './locales/ms/calculators.json';
import msForms from './locales/ms/forms.json';
import msResults from './locales/ms/results.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        calculators: enCalculators,
        forms: enForms,
        results: enResults,
      },
      ms: {
        common: msCommon,
        home: msHome,
        calculators: msCalculators,
        forms: msForms,
        results: msResults,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
