import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = {
  slug: 'net-salary-calculator',
  title: 'Net Salary Calculator Malaysia 2026',
  metaTitle: 'Net Salary Calculator Malaysia | After Deduction Salary Calculator 2026',
  metaDescription: 'Calculate net salary after EPF, SOCSO, EIS, and income tax deductions. Get accurate breakdown of statutory deductions.',
  h1: 'Net Salary Calculator Malaysia 2026',
  subtitle: 'Comprehensive Breakdown of All Statutory Deductions',
  keywords: ['net salary calculator', 'salary after deduction', 'statutory deductions malaysia'],
  calculationType: 'netSalary'
};

const faqs = [
  {
    question: 'What is net salary?',
    answer: 'Net salary is your take-home pay after all statutory deductions (EPF, SOCSO, EIS, income tax) are subtracted from your gross salary.'
  },
  {
    question: 'How do I calculate my net salary?',
    answer: 'Start with gross salary, subtract 11% EPF, SOCSO contribution, EIS contribution, and monthly PCB tax. The result is your net salary.'
  },
  {
    question: 'What deductions are mandatory in Malaysia?',
    answer: 'Mandatory deductions include EPF (11% employee), SOCSO (up to RM79.50), EIS (up to RM7.90), and PCB income tax.'
  },
  {
    question: 'Can I increase my net salary?',
    answer: 'You can increase net salary by reducing PCB through submitting TP1 form with tax reliefs, negotiating salary increases, or optimizing compensation structure.'
  },
  {
    question: 'Is net salary the same as take-home pay?',
    answer: 'Yes, net salary and take-home pay refer to the same amount - your salary after all deductions.'
  }
];

const educationalContent = {
  whatIsIt: 'Net salary is the actual amount you receive in your bank account after all mandatory statutory deductions. It\'s your usable income for expenses, savings, and investments.',
  howItWorks: 'Gross salary minus EPF (11%), minus SOCSO, minus EIS, minus PCB tax equals net salary. Each deduction is calculated based on official government rates for 2026.',
  whoNeedsIt: 'Anyone planning a budget, comparing job offers, negotiating salaries, or wanting to understand where their money goes each month.',
  keyBenefits: [
    'Know exact monthly take-home amount',
    'Understand all statutory deductions clearly',
    'Compare job offers on net salary basis',
    'Plan realistic monthly budgets',
    'Identify opportunities to optimize deductions',
    'Verify payslip accuracy'
  ]
};

export const NetSalaryCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const renderCalculator = (onCalculate: (result: CalculationResult) => void) => {
    const [grossSalary, setGrossSalary] = useState('');

    const calculate = () => {
      const salary = parseFloat(grossSalary) || 0;
      const epf = salary * 0.11;
      const socso = salary <= 4000 ? Math.min(salary * 0.005, 19.75) : 19.75;
      const eis = Math.min(salary * 0.002, 7.90);
      const annualIncome = salary * 12;
      const chargeableIncome = Math.max(0, annualIncome - (epf * 12) - 9000);
      const annualTax = calculateProgressiveTax(chargeableIncome);
      const monthlyPCB = annualTax / 12;
      const netSalary = salary - epf - socso - eis - monthlyPCB;

      onCalculate({
        mainValue: netSalary,
        breakdown: [
          { label: 'Gross Monthly Salary', value: salary },
          { label: 'EPF (11%)', value: -epf },
          { label: 'SOCSO', value: -socso },
          { label: 'EIS', value: -eis },
          { label: 'PCB Tax', value: -monthlyPCB },
          { label: 'Total Deductions', value: -(epf + socso + eis + monthlyPCB) },
          { label: 'Net Salary (Take-Home)', value: netSalary }
        ],
        insights: [
          `You take home ${((netSalary / salary) * 100).toFixed(1)}% of gross salary`,
          `Annual net income: RM${(netSalary * 12).toFixed(2)}`,
          `Your employer also contributes RM${(salary * 0.12).toFixed(2)} to your EPF`,
          monthlyPCB > 1000 ? 'Consider tax relief optimization to reduce PCB' : 'Your tax deductions are moderate'
        ]
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
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
            onBlur={calculate}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            placeholder="e.g., 7000"
          />
        </div>
        <button
          onClick={calculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
        >
          Calculate Net Salary
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
