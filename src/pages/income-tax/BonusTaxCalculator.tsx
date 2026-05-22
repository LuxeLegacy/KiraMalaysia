import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = {
  slug: 'bonus-tax-calculator',
  title: 'Bonus Tax Calculator Malaysia 2026',
  metaTitle: 'Bonus Tax Calculator Malaysia | One-Time Bonus Tax Impact 2026',
  metaDescription: 'Calculate tax on your bonus payment. See how bonuses affect your MTD and annual tax. Most people lose 15-25% to tax.',
  h1: 'Bonus Tax Calculator Malaysia 2026',
  subtitle: 'Calculate Tax Impact of Your Bonus Payment',
  keywords: ['bonus tax calculator', 'bonus income tax', 'annual bonus tax malaysia'],
  calculationType: 'bonus'
};

const faqs = [
  {
    question: 'How much tax do I pay on my bonus in Malaysia?',
    answer: 'Bonuses are added to your annual income and taxed at your marginal tax rate. If you earn RM100,000 annually and receive RM10,000 bonus, the bonus is taxed at the rate applicable to RM100,000-RM110,000 income range, typically 13-21%.'
  },
  {
    question: 'Why is my bonus taxed so heavily?',
    answer: 'Bonuses push your total income into higher tax brackets. Your salary might be taxed at 8%, but bonus income could be taxed at 13-21% because it\'s added on top of your existing income, facing higher marginal rates.'
  },
  {
    question: 'Can I reduce tax on my bonus?',
    answer: 'Time your bonus strategically with tax reliefs. If receiving bonus in December, maximize lifestyle relief, make voluntary EPF contributions, pay insurance premiums that month to offset the additional income.'
  },
  {
    question: 'Is bonus included in PCB calculation?',
    answer: 'Yes, when you receive a bonus, employers must recalculate PCB including the bonus. This often results in higher PCB that month. The excess PCB can be refunded during annual tax filing if you have sufficient reliefs.'
  },
  {
    question: 'Should I take bonus or salary increase?',
    answer: 'From pure tax perspective, spreading income across months is slightly better. RM12,000 spread over 12 months (RM1,000/month raise) faces lower marginal rates than one-time RM12,000 bonus, but the difference is usually small (2-5%).'
  }
];

const educationalContent = {
  whatIsIt: 'Bonus tax is not a separate tax type - it\'s the additional income tax you pay because your bonus increases your total annual income, pushing you into higher tax brackets. The bonus itself is taxed at your marginal tax rate.',
  howItWorks: 'Your annual salary plus bonus equals total income. This combined amount determines your tax bracket. The bonus portion is taxed at the rate applicable to income at that level, which is usually higher than your average rate on regular salary.',
  whoNeedsIt: 'Anyone expecting bonuses (annual, performance, 13th month), planning year-end tax strategy, negotiating compensation packages, or wanting to understand real after-tax value of bonuses.',
  keyBenefits: [
    'Know exact after-tax amount of your bonus',
    'Plan tax relief optimization around bonus timing',
    'Compare bonus vs salary increase offers',
    'Avoid surprise high PCB in bonus month',
    'Budget accurately with net bonus amount',
    'Understand marginal tax impact clearly'
  ]
};

export const BonusTaxCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const renderCalculator = (onCalculate: (result: CalculationResult) => void) => {
    const [annualSalary, setAnnualSalary] = useState('');
    const [bonusAmount, setBonusAmount] = useState('');
    const [reliefs, setReliefs] = useState('9000');

    const calculateBonus = () => {
      const salary = parseFloat(annualSalary) || 0;
      const bonus = parseFloat(bonusAmount) || 0;
      const totalReliefs = parseFloat(reliefs) || 0;

      const incomeWithoutBonus = Math.max(0, salary - totalReliefs);
      const taxWithoutBonus = calculateProgressiveTax(incomeWithoutBonus);

      const incomeWithBonus = Math.max(0, salary + bonus - totalReliefs);
      const taxWithBonus = calculateProgressiveTax(incomeWithBonus);

      const bonusTaxImpact = taxWithBonus - taxWithoutBonus;
      const netBonus = bonus - bonusTaxImpact;
      const effectiveBonusTaxRate = bonus > 0 ? (bonusTaxImpact / bonus) * 100 : 0;

      onCalculate({
        mainValue: netBonus,
        breakdown: [
          { label: 'Gross Bonus Amount', value: bonus },
          { label: 'Tax on Bonus', value: -bonusTaxImpact },
          { label: 'Net Bonus (After Tax)', value: netBonus },
          { label: '---', value: 0 },
          { label: 'Annual Salary', value: salary },
          { label: 'Tax Without Bonus', value: taxWithoutBonus },
          { label: 'Tax With Bonus', value: taxWithBonus },
          { label: 'Additional Tax Due to Bonus', value: bonusTaxImpact }
        ],
        insights: [
          `Your bonus is taxed at effective rate of ${effectiveBonusTaxRate.toFixed(2)}%`,
          `You keep ${bonus > 0 ? ((netBonus / bonus) * 100).toFixed(1) : 0}% of your bonus after tax`,
          `Monthly equivalent: RM${(netBonus / 12).toFixed(2)} per month`,
          effectiveBonusTaxRate > 20 ? 'High tax rate - consider maximizing reliefs when receiving bonus' : 'Moderate tax impact on bonus',
          bonusTaxImpact > 2000 ? 'Significant tax on bonus - plan to use tax reliefs strategically' : ''
        ].filter(Boolean)
      });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Salary (Without Bonus) (RM)
          </label>
          <input
            type="number"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 96000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bonus Amount (RM)
          </label>
          <input
            type="number"
            value={bonusAmount}
            onChange={(e) => setBonusAmount(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 12000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total Tax Reliefs (RM)
          </label>
          <input
            type="number"
            value={reliefs}
            onChange={(e) => setReliefs(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 15000"
          />
        </div>

        <button
          onClick={calculateBonus}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
        >
          Calculate Bonus Tax
        </button>

        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-gray-700">
            <strong>Pro Tip:</strong> When receiving a large bonus, maximize tax reliefs that same year. Make voluntary EPF contributions, pay insurance premiums, complete lifestyle purchases to offset the additional income.
          </p>
        </div>
      </div>
    );
  };

  return (
    <IncomeTaxCalculatorTemplate
      config={config}
      renderCalculator={renderCalculator}
      faqs={faqs}
      educationalContent={educationalContent}
    />
  );
};
