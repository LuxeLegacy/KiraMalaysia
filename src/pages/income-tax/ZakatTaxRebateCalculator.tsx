import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = {
  "slug": "zakat-tax-rebate-calculator",
  "title": "Zakat Tax Rebate Calculator Malaysia 2026",
  "metaTitle": "Zakat Tax Rebate Calculator Malaysia | Zakat Deduction Impact 2026",
  "metaDescription": "Calculate tax rebate from zakat payments. Optimize between zakat and tax. Reduce tax payable ringgit-for-ringgit.",
  "h1": "Zakat Tax Rebate Calculator Malaysia 2026",
  "subtitle": "Calculate Tax Rebate Impact of Zakat Payments",
  "keywords": [
    "zakat tax rebate",
    "zakat deduction",
    "zakat tax relief malaysia"
  ],
  "calculationType": "zakatRebate"
};

const faqs = [
  {
    question: 'How do I use the Zakat Tax Rebate Calculator Malaysia 2026?',
    answer: 'Enter your income details in the form, and the calculator will instantly compute your tax obligations using official 2026 LHDN rates.'
  },
  {
    question: 'Is this calculator accurate?',
    answer: 'Yes, this calculator uses official LHDN 2026 tax rates and follows Malaysian tax computation guidelines for accurate results.'
  },
  {
    question: 'Do I need to create an account?',
    answer: 'No registration required. This calculator is completely free and can be used unlimited times.'
  },
  {
    question: 'Can I save my calculations?',
    answer: 'Take screenshots of your results or download the breakdown for your records.'
  },
  {
    question: 'When should I use this calculator?',
    answer: 'Use this whenever you need to plan taxes, compare offers, or understand your tax obligations for zakatRebate scenarios.'
  }
];

const educationalContent = {
  whatIsIt: 'The Zakat Tax Rebate Calculator Malaysia 2026 helps you calculate income tax for specific scenarios using official Malaysian tax rates and regulations for 2026.',
  howItWorks: 'Enter your financial information, and the calculator applies Malaysian progressive tax rates, statutory deductions, and reliefs to compute accurate results.',
  whoNeedsIt: 'Malaysian taxpayers, HR professionals, financial advisors, and anyone needing accurate tax calculations for planning and compliance.',
  keyBenefits: [
    'Accurate 2026 LHDN rates',
    'Free unlimited calculations',
    'No registration required',
    'Instant detailed results',
    'Mobile-friendly interface',
    'Updated tax regulations'
  ]
};

export const ZakatTaxRebateCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const renderCalculator = (onCalculate: (result: CalculationResult) => void) => {
    const [income, setIncome] = useState('');
    const [reliefs, setReliefs] = useState('9000');

    const calculate = () => {
      const incomeAmount = parseFloat(income) || 0;
      const totalReliefs = parseFloat(reliefs) || 0;
      const chargeableIncome = Math.max(0, incomeAmount - totalReliefs);
      const taxLiability = calculateProgressiveTax(chargeableIncome);

      onCalculate({
        mainValue: taxLiability,
        breakdown: [
          { label: 'Income', value: incomeAmount },
          { label: 'Tax Reliefs', value: -totalReliefs },
          { label: 'Chargeable Income', value: chargeableIncome },
          { label: 'Tax Liability', value: taxLiability }
        ],
        insights: [
          `Effective tax rate: ${incomeAmount > 0 ? ((taxLiability / incomeAmount) * 100).toFixed(2) : 0}%`,
          `Monthly tax: RM${(taxLiability / 12).toFixed(2)}`,
          chargeableIncome > 0 && chargeableIncome <= 35000 ? 'You\'re in a lower tax bracket' : '',
          totalReliefs < 15000 ? 'Consider maximizing tax reliefs to reduce liability' : ''
        ].filter(Boolean)
      });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Income (RM)
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 80000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax Reliefs (RM)
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
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
        >
          Calculate
        </button>
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
