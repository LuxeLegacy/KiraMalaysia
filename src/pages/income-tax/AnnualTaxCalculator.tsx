import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = {
  slug: 'annual-tax-calculator',
  title: 'Annual Tax Calculator Malaysia 2026',
  metaTitle: 'Annual Income Tax Calculator Malaysia 2026 | Free LHDN Tax Estimator',
  metaDescription: 'Calculate your complete annual income tax for 2026. Includes PCB, reliefs, rebates, and refund estimates. Updated with latest LHDN tax rates.',
  h1: 'Annual Income Tax Calculator Malaysia 2026',
  subtitle: 'Calculate Your Complete Year Tax Liability with Monthly Breakdown',
  keywords: ['annual tax calculator malaysia', 'yearly income tax', 'LHDN annual tax', 'full year tax estimate'],
  calculationType: 'annual'
};

const faqs = [
  {
    question: 'How is annual income tax calculated in Malaysia?',
    answer: 'Annual income tax is calculated using progressive tax rates ranging from 0% to 30%. Your total annual income is reduced by tax reliefs and deductions, then tax is calculated based on which tax bracket your chargeable income falls into.'
  },
  {
    question: 'What tax reliefs can I claim to reduce my annual tax?',
    answer: 'Common tax reliefs include individual relief (RM9,000), EPF contributions (up to RM4,000), life insurance (up to RM3,000), medical expenses for parents (up to RM8,000), lifestyle expenses (up to RM2,500), and many others totaling potentially over RM30,000 in reliefs.'
  },
  {
    question: 'When should I calculate my annual income tax?',
    answer: 'Calculate your annual tax before year-end (November/December) to optimize tax reliefs, when changing jobs, receiving bonuses, or planning major purchases that qualify for tax relief.'
  },
  {
    question: 'What is the difference between annual tax and monthly PCB?',
    answer: 'PCB (Potongan Cukai Bulanan) is an estimate of your annual tax divided by 12 months. Your actual annual tax may differ based on actual income, bonuses, and tax reliefs claimed. The difference results in either a refund or additional tax payable.'
  },
  {
    question: 'Can I get a tax refund if my PCB is higher than annual tax?',
    answer: 'Yes, if your total PCB deductions exceed your actual annual tax liability, LHDN will refund the difference. Most Malaysians who claim all eligible reliefs receive refunds averaging RM2,000-RM5,000.'
  }
];

const educationalContent = {
  whatIsIt: 'Annual income tax is the total tax you owe for the entire year based on your total income from all sources. In Malaysia, it uses a progressive tax system where higher income portions are taxed at higher rates, ranging from 0% to 30%.',
  howItWorks: 'Your total annual income is first reduced by approved tax reliefs and deductions. The remaining chargeable income is then taxed according to progressive tax brackets. Each bracket of income is taxed at its corresponding rate, not your entire income.',
  whoNeedsIt: 'Every Malaysian earning above the tax threshold (RM34,000 for residents) should calculate annual tax. It is essential for year-end tax planning, verifying PCB deductions, preparing for tax filing, and optimizing tax reliefs.',
  keyBenefits: [
    'Calculate exact annual tax liability for 2026',
    'Compare with PCB to find refund or additional payment',
    'Optimize tax reliefs before year-end',
    'Plan for tax filing season ahead',
    'Avoid surprise tax bills or missing refunds',
    'Make informed financial decisions based on tax impact'
  ]
};

export const AnnualTaxCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const renderCalculator = (onCalculate: (result: CalculationResult) => void) => {
    const [annualIncome, setAnnualIncome] = useState('');
    const [reliefs, setReliefs] = useState('9000');
    const [pcbPaid, setPcbPaid] = useState('');

    const calculateTax = () => {
      const income = parseFloat(annualIncome) || 0;
      const totalReliefs = parseFloat(reliefs) || 0;
      const pcb = parseFloat(pcbPaid) || 0;

      const chargeableIncome = Math.max(0, income - totalReliefs);
      const taxLiability = calculateProgressiveTax(chargeableIncome);
      const refundOrPayable = pcb - taxLiability;

      onCalculate({
        mainValue: taxLiability,
        breakdown: [
          { label: 'Gross Annual Income', value: income },
          { label: 'Tax Reliefs', value: -totalReliefs },
          { label: 'Chargeable Income', value: chargeableIncome },
          { label: 'Tax Liability', value: taxLiability },
          { label: 'PCB Paid', value: pcb },
          { label: refundOrPayable >= 0 ? 'Tax Refund' : 'Additional Tax Payable', value: Math.abs(refundOrPayable) }
        ],
        insights: [
          `Your effective tax rate is ${income > 0 ? ((taxLiability / income) * 100).toFixed(2) : 0}%`,
          `Monthly average tax: ${(taxLiability / 12).toFixed(2)}`,
          refundOrPayable > 0
            ? `You're owed a refund of RM${refundOrPayable.toFixed(2)}`
            : refundOrPayable < 0
            ? `You need to pay additional RM${Math.abs(refundOrPayable).toFixed(2)}`
            : 'Your PCB matches your tax liability exactly',
          chargeableIncome > 0 && chargeableIncome <= 35000 ? 'You\'re in the lowest tax bracket (0-3%)' : '',
          totalReliefs < 20000 ? 'Consider maximizing more tax reliefs to reduce tax' : ''
        ].filter(Boolean)
      });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Gross Income (RM)
          </label>
          <input
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 120000"
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
          <p className="text-sm text-gray-600 mt-1">Individual relief: RM9,000 + other eligible reliefs</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Total PCB Paid This Year (RM)
          </label>
          <input
            type="number"
            value={pcbPaid}
            onChange={(e) => setPcbPaid(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 8500"
          />
          <p className="text-sm text-gray-600 mt-1">Sum of all monthly PCB deductions from your payslips</p>
        </div>

        <button
          onClick={calculateTax}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
        >
          Calculate Annual Tax
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
