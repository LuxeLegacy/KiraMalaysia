import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LanguageToggle = () => {
  const { i18n, t } = useTranslation('common');

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ms' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-500 transition-all hover:shadow-md"
      aria-label={t('language.toggle')}
      title={t('language.toggle')}
    >
      <Languages className="w-5 h-5 text-gray-700" />
      <span className="font-semibold text-gray-700">
        {i18n.language === 'en' ? 'BM' : 'EN'}
      </span>
    </button>
  );
};
