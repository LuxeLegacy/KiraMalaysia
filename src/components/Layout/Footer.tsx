import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation(['common', 'home']);

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">{t('common:navigation.finance')}</h3>
            <ul className="space-y-2">
              <li><Link to="/finance/income-tax-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.finance.incomeTax.name')}</Link></li>
              <li><Link to="/finance/epf-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.finance.epf.name')}</Link></li>
              <li><Link to="/finance/socso-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.finance.socso.name')}</Link></li>
              <li><Link to="/finance/mortgage-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.finance.mortgage.name')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('common:navigation.property')}</h3>
            <ul className="space-y-2">
              <li><Link to="/property/stamp-duty-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.property.stampDuty.name')}</Link></li>
              <li><Link to="/property/rpgt-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.property.rpgt.name')}</Link></li>
              <li><Link to="/property/rental-yield-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.property.rentalYield.name')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('common:navigation.automotive')}</h3>
            <ul className="space-y-2">
              <li><Link to="/automotive/car-loan-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.automotive.carLoan.name')}</Link></li>
              <li><Link to="/automotive/road-tax-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.automotive.roadTax.name')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('common:navigation.life')}</h3>
            <ul className="space-y-2">
              <li><Link to="/life/retirement-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.life.retirement.name')}</Link></li>
              <li><Link to="/life/inflation-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.life.inflation.name')}</Link></li>
              <li><Link to="/life/net-worth-calculator-malaysia" className="hover:text-white transition-colors">{t('home:calculators.life.netWorth.name')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-6">
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/methodology" className="hover:text-white transition-colors">Methodology</Link></li>
                <li><Link to="/reference-tables" className="hover:text-white transition-colors">Reference Tables</Link></li>
                <li><Link to="/tax-filing-guide" className="hover:text-white transition-colors">Tax Filing Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3 text-sm">Official Sources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.hasil.gov.my" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LHDN Malaysia</a></li>
                <li><a href="https://www.kwsp.gov.my" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">KWSP/EPF</a></li>
                <li><a href="https://www.perkeso.gov.my" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">PERKESO/SOCSO</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 text-center text-sm">
            <p className="mb-2">{t('common:footer.copyright').replace('2026', currentYear.toString())}</p>
            <p className="text-gray-500 mb-3">
              {t('common:footer.disclaimer')}
            </p>
            <p className="text-xs text-gray-600">
              Not affiliated with any Malaysian government agency. For official information, please visit LHDN, KWSP, or PERKESO websites.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
