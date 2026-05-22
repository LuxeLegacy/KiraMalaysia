import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = {
  slug: 'freelancer-tax-calculator',
  title: 'Freelancer Tax Calculator Malaysia 2026',
  metaTitle: 'Freelancer Tax Calculator Malaysia | Self-Employed Income Tax 2026',
  metaDescription: 'Calculate freelancer income tax with quarterly provision planning. Essential for self-employed Malaysians.',
  h1: 'Freelancer Tax Calculator Malaysia 2026',
  subtitle: 'Calculate Self-Employed Income Tax with Quarterly Provision',
  keywords: ['freelancer tax calculator', 'self employed tax', 'freelance income tax'],
  calculationType: 'freelancer'
};

const faqs = [
  {
    question: 'How do freelancers pay tax in Malaysia?',
    answer: 'Freelancers must register with LHDN, file annual tax returns (Form B), and estimate their own tax liability. Unlike employees with PCB, freelancers are responsible for setting aside money for tax payments themselves.'
  },
  {
    question: 'What expenses can freelancers deduct?',
    answer: 'Freelancers can deduct business expenses like equipment, software subscriptions, co-working spaces, internet, travel for work, professional development courses, and marketing costs. Keep all receipts.'
  },
  {
    question: 'Do I need to register a business to freelance?',
    answer: 'For individual freelancers earning under RM150,000 annually, business registration is optional. However, you must register as a taxpayer with LHDN once income exceeds the tax threshold (RM34,000 for residents).'
  },
  {
    question: 'How much should I set aside for tax?',
    answer: 'Set aside 10-25% of your gross income depending on your income level. If earning RM60,000/year, set aside 10-15%. If earning RM120,000+, set aside 20-25%. This calculator helps you determine the exact amount.'
  },
  {
    question: 'When do freelancers need to pay tax?',
    answer: 'File annual tax returns by April 30. Tax payment is due by the same deadline. For income over RM150,000, you may need to pay quarterly estimated tax payments (CP500).'
  }
];

const educationalContent = {
  whatIsIt: 'Freelancer tax is income tax on self-employed earnings. Unlike salaried employees, freelancers must calculate their own tax, set aside money monthly/quarterly, and file annual returns themselves without automatic PCB deductions.',
  howItWorks: 'Calculate gross freelance income, deduct allowable business expenses, apply tax reliefs, then calculate tax using progressive rates. Set aside the calculated amount quarterly to avoid cash flow problems when tax is due.',
  whoNeedsIt: 'All self-employed individuals, freelancers, consultants, gig workers, online sellers, content creators, and anyone with non-employment income above RM34,000 annually.',
  keyBenefits: [
    'Calculate exact tax liability for self-employed income',
    'Plan quarterly tax provisions to avoid cash crunch',
    'Understand deductible business expenses',
    'Avoid penalties for late or underpayment',
    'Budget for tax throughout the year',
    'Know exact amount to set aside monthly'
  ]
};

export const FreelancerTaxCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const renderCalculator = (onCalculate: (result: CalculationResult) => void) => {
    const [grossIncome, setGrossIncome] = useState('');
    const [expenses, setExpenses] = useState('');
    const [reliefs, setReliefs] = useState('9000');

    const calculateFreelancerTax = () => {
      const income = parseFloat(grossIncome) || 0;
      const businessExpenses = parseFloat(expenses) || 0;
      const totalReliefs = parseFloat(reliefs) || 0;

      const netIncome = income - businessExpenses;
      const chargeableIncome = Math.max(0, netIncome - totalReliefs);
      const taxLiability = calculateProgressiveTax(chargeableIncome);

      const monthlyProvision = taxLiability / 12;
      const quarterlyProvision = taxLiability / 4;

      onCalculate({
        mainValue: taxLiability,
        breakdown: [
          { label: 'Gross Freelance Income', value: income },
          { label: 'Business Expenses', value: -businessExpenses },
          { label: 'Net Business Income', value: netIncome },
          { label: 'Tax Reliefs', value: -totalReliefs },
          { label: 'Chargeable Income', value: chargeableIncome },
          { label: 'Annual Tax Liability', value: taxLiability },
          { label: 'Monthly Set-Aside', value: monthlyProvision },
          { label: 'Quarterly Set-Aside', value: quarterlyProvision }
        ],
        insights: [
          `Set aside RM${monthlyProvision.toFixed(2)} monthly for tax`,
          `Or save RM${quarterlyProvision.toFixed(2)} every quarter`,
          `Effective tax rate: ${income > 0 ? ((taxLiability / income) * 100).toFixed(2) : 0}% of gross income`,
          `After tax and expenses, you keep RM${(netIncome - taxLiability).toFixed(2)}`,
          businessExpenses / income > 0.5 ? 'High expense ratio - ensure all expenses are legitimate business costs' : 'Healthy expense to income ratio'
        ].filter(Boolean)
      });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Gross Freelance Income (RM)
          </label>
          <input
            type="number"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 80000"
          />
          <p className="text-sm text-gray-600 mt-1">Total income from all freelance projects</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Business Expenses (RM)
          </label>
          <input
            type="number"
            value={expenses}
            onChange={(e) => setExpenses(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 15000"
          />
          <p className="text-sm text-gray-600 mt-1">Equipment, software, internet, workspace, travel, etc.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Personal Tax Reliefs (RM)
          </label>
          <input
            type="number"
            value={reliefs}
            onChange={(e) => setReliefs(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 15000"
          />
          <p className="text-sm text-gray-600 mt-1">Individual, insurance, medical, lifestyle reliefs</p>
        </div>

        <button
          onClick={calculateFreelancerTax}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
        >
          Calculate Freelancer Tax
        </button>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-sm text-gray-700">
            <strong>Important:</strong> Keep detailed records of all income and expenses. Separate a bank account for business use. Save at least the calculated monthly amount to avoid financial stress during tax season.
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
