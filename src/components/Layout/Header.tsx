import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';

export const Header = () => {
  const { t } = useTranslation('common');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center transition-opacity hover:opacity-80">
            <img
              src="/ChatGPT_Image_Mar_1,_2026,_09_53_02_AM copy.png"
              alt="Kira Malaysia - Malaysian Financial Calculators"
              className="h-20 w-auto"
            />
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <a href="https://cal.kiramalaysia.com/finance/income-tax-calculator-malaysia" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('navigation.finance')}
              </a>
              <a href="https://cal.kiramalaysia.com/property/stamp-duty-calculator-malaysia" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('navigation.property')}
              </a>
              <a href="https://cal.kiramalaysia.com/automotive/car-loan-calculator-malaysia" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('navigation.automotive')}
              </a>
              <a href="https://cal.kiramalaysia.com/islamic-finance/zakat-calculator-malaysia" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('navigation.islamic')}
              </a>
              <a href="https://cal.kiramalaysia.com/life/retirement-calculator-malaysia" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600 transition-colors">
                {t('navigation.life')}
              </a>
            </nav>

            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
