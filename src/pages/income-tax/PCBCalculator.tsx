import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = {
  slug: 'pcb-calculator',
  title: 'PCB Calculator Malaysia 2026',
  metaTitle: 'PCB Calculator Malaysia 2026 | Monthly Tax Deduction Calculator LHDN',
  metaDescription: 'Calculate monthly PCB (Potongan Cukai Bulanan) deductions accurately. Verify your employer\'s tax deductions with official LHDN rates.',
  h1: 'PCB Calculator Malaysia 2026',
  subtitle: 'Calculate Monthly Tax Deductions (Potongan Cukai Bulanan)',
  keywords: ['pcb calculator malaysia', 'monthly tax deduction', 'potongan cukai bulanan', 'employer tax'],
  calculationType: 'pcb'
};

const faqs = [
  {
    question: 'What is PCB in Malaysia?',
    answer: 'PCB (Potongan Cukai Bulanan) is the monthly tax deduction system where employers deduct estimated income tax from your salary each month and remit it to LHDN on your behalf. It\'s an advance payment of your annual tax liability.'
  },
  {
    question: 'How is PCB calculated monthly?',
    answer: 'PCB is calculated by annualizing your monthly income (multiplying by 12), applying EPF deduction, calculating annual tax using progressive rates, then dividing by 12 for monthly deduction amount.'
  },
  {
    question: 'Can my employer reduce my PCB deduction?',
    answer: 'Yes, if you have significant tax reliefs (insurance, education, medical), submit the TP1 form to your employer with proof. They can adjust PCB to reduce monthly deductions, increasing your monthly take-home.'
  },
  {
    question: 'What if my PCB is too high or too low?',
    answer: 'If PCB is too high, you\'ll get a refund when filing taxes. If too low, you\'ll need to pay the difference. It\'s better to have slightly higher PCB than face a large payment during tax filing.'
  },
  {
    question: 'Does PCB include all my tax reliefs automatically?',
    answer: 'No, PCB calculation typically only includes EPF deduction. Other reliefs like insurance, medical, lifestyle require you to submit TP1 form to employer for adjustment. Otherwise, claim during annual tax filing for refund.'
  }
];

const educationalContent = {
  whatIsIt: 'PCB (Potongan Cukai Bulanan) is Malaysia\'s monthly tax deduction system. It\'s an estimate of your annual tax liability divided into 12 monthly deductions by your employer, ensuring you pay tax throughout the year rather than a lump sum.',
  howItWorks: 'Employers calculate PCB by taking your monthly income, annualizing it, deducting EPF and basic reliefs, calculating tax using LHDN rates, then dividing by 12. This amount is deducted from your salary and remitted to LHDN monthly.',
  whoNeedsIt: 'All employed Malaysians earning above the tax threshold. Use this calculator to verify your payslip PCB deductions, plan monthly cash flow, understand tax impact of salary changes, or evaluate job offers accurately.',
  keyBenefits: [
    'Verify your employer\'s PCB calculations are correct',
    'Understand monthly tax deductions clearly',
    'Plan monthly budget with accurate net salary',
    'Identify if you need to submit TP1 for adjustment',
    'Compare PCB across different salary levels',
    'Avoid surprise tax bills during annual filing'
  ]
};

export const PCBCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const renderCalculator = (onCalculate: (result: CalculationResult) => void) => {
    const [monthlySalary, setMonthlySalary] = useState('');
    const [monthlyEPF, setMonthlyEPF] = useState('');

    const calculatePCB = () => {
      const salary = parseFloat(monthlySalary) || 0;
      const epf = parseFloat(monthlyEPF) || salary * 0.11;

      const annualIncome = salary * 12;
      const annualEPF = epf * 12;
      const chargeableIncome = Math.max(0, annualIncome - annualEPF - 9000);

      const annualTax = calculateProgressiveTax(chargeableIncome);
      const monthlyPCB = annualTax / 12;

      onCalculate({
        mainValue: monthlyPCB,
        breakdown: [
          { label: 'Monthly Gross Salary', value: salary },
          { label: 'Annual Gross Income', value: annualIncome },
          { label: 'Annual EPF Deduction', value: -annualEPF },
          { label: 'Individual Relief', value: -9000 },
          { label: 'Chargeable Income', value: chargeableIncome },
          { label: 'Annual Tax Liability', value: annualTax },
          { label: 'Monthly PCB', value: monthlyPCB }
        ],
        insights: [
          `PCB is ${salary > 0 ? ((monthlyPCB / salary) * 100).toFixed(2) : 0}% of your gross salary`,
          `Annual PCB total: RM${(monthlyPCB * 12).toFixed(2)}`,
          `After-EPF and PCB, you take home: RM${(salary - epf - monthlyPCB).toFixed(2)}`,
          monthlyPCB > 1500 ? 'Consider submitting TP1 form with tax reliefs to reduce PCB' : '',
          annualTax < 1000 ? 'Your annual tax is low - you\'re in a lower tax bracket' : ''
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
            onChange={(e) => setMonthlySalary(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 8000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly EPF Contribution (RM)
          </label>
          <input
            type="number"
            value={monthlyEPF}
            onChange={(e) => setMonthlyEPF(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="Auto-calculated at 11%"
          />
          <p className="text-sm text-gray-600 mt-1">Leave blank for automatic 11% calculation</p>
        </div>

        <button
          onClick={calculatePCB}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
        >
          Calculate Monthly PCB
        </button>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-sm text-gray-700">
            <strong>Tip:</strong> If you have additional tax reliefs (insurance, medical, education), submit TP1 form to your employer to reduce monthly PCB deductions and increase take-home pay now instead of waiting for refund.
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
