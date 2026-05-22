import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = {
  slug: 'take-home-pay-calculator',
  title: 'Take Home Pay Calculator Malaysia 2026',
  metaTitle: 'Take Home Pay Calculator Malaysia | Net Salary After Tax Calculator 2026',
  metaDescription: 'Calculate your actual take-home pay after EPF, SOCSO, EIS, and PCB deductions. See your real monthly net salary in Malaysia.',
  h1: 'Take Home Pay Calculator Malaysia 2026',
  subtitle: 'See Your Real Monthly Net Salary After All Deductions',
  keywords: ['take home pay calculator', 'net salary malaysia', 'after tax salary', 'monthly take home'],
  calculationType: 'takeHome'
};

const faqs = [
  {
    question: 'What is included in take-home pay calculation?',
    answer: 'Take-home pay is your gross salary minus all statutory deductions: EPF employee contribution (11%), SOCSO, EIS, and monthly PCB tax deductions. It\'s the actual amount credited to your bank account.'
  },
  {
    question: 'Why is my take-home pay lower than expected?',
    answer: 'Statutory deductions reduce your gross salary significantly. EPF alone takes 11%, and PCB tax can be 3-25% depending on income. SOCSO and EIS add smaller amounts. For a RM10,000 salary, take-home is typically RM7,500-RM8,500.'
  },
  {
    question: 'Can I increase my take-home pay legally?',
    answer: 'You can optimize tax reliefs to reduce PCB, negotiate salary increases, or restructure compensation with tax-efficient allowances. However, EPF, SOCSO, and EIS are mandatory and cannot be reduced.'
  },
  {
    question: 'How accurate is this calculator?',
    answer: 'This calculator uses official 2026 rates for EPF, SOCSO, EIS, and LHDN PCB tables. Results are accurate within RM10-50 depending on your specific tax relief situation.'
  },
  {
    question: 'Should I focus on gross or take-home when comparing job offers?',
    answer: 'Always compare take-home pay, not gross salary. A RM12,000 gross offer may have lower take-home than RM11,500 gross with better benefits due to different deduction structures.'
  }
];

const educationalContent = {
  whatIsIt: 'Take-home pay is the actual net amount you receive in your bank account after all mandatory deductions from your gross salary. It includes deductions for EPF, SOCSO, EIS, and income tax (PCB).',
  howItWorks: 'From your gross monthly salary, 11% goes to EPF, amounts varying by salary go to SOCSO (up to RM79.50) and EIS (up to RM7.90), and PCB is calculated based on annualized income. The remainder is your take-home pay.',
  whoNeedsIt: 'Anyone evaluating job offers, planning monthly budgets, negotiating salaries, or wanting to understand where their money goes. Essential for financial planning and realistic expense management.',
  keyBenefits: [
    'Know exact amount in your bank account monthly',
    'Compare job offers accurately on take-home basis',
    'Budget realistically with actual net income',
    'Understand impact of all statutory deductions',
    'Plan salary negotiations with real targets',
    'Identify where your gross salary actually goes'
  ]
};

export const TakeHomePayCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const renderCalculator = (onCalculate: (result: CalculationResult) => void) => {
    const [monthlySalary, setMonthlySalary] = useState('');

    const calculateTakeHome = () => {
      const salary = parseFloat(monthlySalary) || 0;

      const epf = salary * 0.11;
      const socso = salary <= 30 ? 0.10 : salary <= 50 ? 0.20 : salary <= 4000 ? Math.min(salary * 0.005, 19.75) : 19.75;
      const eis = Math.min(salary * 0.002, 7.90);

      const annualIncome = salary * 12;
      const chargeableIncome = Math.max(0, annualIncome - 9000);
      const annualTax = calculateProgressiveTax(chargeableIncome);
      const monthlyPCB = annualTax / 12;

      const totalDeductions = epf + socso + eis + monthlyPCB;
      const takeHome = salary - totalDeductions;

      onCalculate({
        mainValue: takeHome,
        breakdown: [
          { label: 'Gross Monthly Salary', value: salary },
          { label: 'EPF (11%)', value: -epf },
          { label: 'SOCSO', value: -socso },
          { label: 'EIS', value: -eis },
          { label: 'PCB Tax', value: -monthlyPCB },
          { label: 'Total Deductions', value: -totalDeductions },
          { label: 'Take-Home Pay', value: takeHome }
        ],
        insights: [
          `You keep ${salary > 0 ? ((takeHome / salary) * 100).toFixed(1) : 0}% of your gross salary`,
          `Annual take-home: RM${(takeHome * 12).toFixed(2)}`,
          `EPF also gets 12-13% employer contribution (RM${(salary * 0.12).toFixed(2)}) that grows your retirement fund`,
          totalDeductions > salary * 0.25 ? 'Your deductions exceed 25% - consider tax relief optimization' : 'Your deduction rate is healthy',
          monthlyPCB > 1000 ? 'Significant monthly tax - ensure you claim all eligible reliefs' : ''
        ].filter(Boolean)
      });
    };

    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Gross Salary (RM)
          </label>
          <input
            type="number"
            value={monthlySalary}
            onChange={(e) => {
              setMonthlySalary(e.target.value);
            }}
            onBlur={calculateTakeHome}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 8000"
          />
          <p className="text-sm text-gray-600 mt-1">Your gross monthly salary before any deductions</p>
        </div>

        <button
          onClick={calculateTakeHome}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
        >
          Calculate Take-Home Pay
        </button>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> This calculator assumes standard employee EPF rate (11%), SOCSO, EIS, and basic tax relief of RM9,000. Your actual take-home may vary slightly based on additional tax reliefs claimed.
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
