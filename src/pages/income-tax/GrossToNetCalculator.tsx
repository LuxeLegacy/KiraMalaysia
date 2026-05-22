import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = {
  slug: 'gross-to-net-calculator',
  title: 'Gross to Net Salary Calculator Malaysia 2026',
  metaTitle: 'Gross to Net Calculator Malaysia | Salary Conversion Calculator 2026',
  metaDescription: 'Convert gross salary to net take-home pay. Calculate reverse: what gross salary do you need for your target net income?',
  h1: 'Gross to Net Salary Calculator Malaysia 2026',
  subtitle: 'Convert Between Gross and Net Salary Instantly',
  keywords: ['gross to net calculator', 'salary conversion malaysia', 'gross net difference'],
  calculationType: 'grossToNet'
};

const faqs = [
  {
    question: 'What is the difference between gross and net salary?',
    answer: 'Gross salary is your total salary before deductions. Net salary is what you actually receive after EPF, SOCSO, EIS, and tax deductions.'
  },
  {
    question: 'How much less is net salary compared to gross?',
    answer: 'Typically, net salary is 70-85% of gross salary depending on your income level. Higher earners face higher tax rates, so the gap is larger.'
  },
  {
    question: 'Can I negotiate based on net salary?',
    answer: 'Always negotiate based on gross salary as that\'s the standard. However, know your target net salary to ensure the gross offer meets your actual needs.'
  },
  {
    question: 'What gross salary do I need for RM6,000 net?',
    answer: 'Use the reverse calculator mode. Typically, you need RM7,500-RM8,000 gross to achieve RM6,000 net, depending on tax reliefs.'
  },
  {
    question: 'Why do job ads show gross salary?',
    answer: 'Employers advertise gross salary as the standard practice. Net salary varies by individual tax reliefs, making gross the fair comparison point.'
  }
];

const educationalContent = {
  whatIsIt: 'A gross to net calculator converts between your advertised salary (gross) and actual take-home pay (net). It can work both ways: gross to net or net to gross.',
  howItWorks: 'Enter gross salary to see net, or enter target net to find required gross. The calculator applies all statutory deductions (EPF, SOCSO, EIS, PCB) to show the relationship.',
  whoNeedsIt: 'Job seekers comparing offers, salary negotiators, HR professionals setting compensation, anyone budgeting or planning based on actual take-home pay.',
  keyBenefits: [
    'Convert gross offers to real take-home instantly',
    'Find required gross for target net salary',
    'Compare multiple job offers accurately',
    'Understand full impact of deductions',
    'Negotiate salaries with confidence',
    'Plan budgets based on actual income'
  ]
};

export const GrossToNetCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const renderCalculator = (onCalculate: (result: CalculationResult) => void) => {
    const [mode, setMode] = useState<'grossToNet' | 'netToGross'>('grossToNet');
    const [grossSalary, setGrossSalary] = useState('');
    const [netSalary, setNetSalary] = useState('');

    const calculateGrossToNet = () => {
      const salary = parseFloat(grossSalary) || 0;
      const epf = salary * 0.11;
      const socso = salary <= 4000 ? Math.min(salary * 0.005, 19.75) : 19.75;
      const eis = Math.min(salary * 0.002, 7.90);
      const annualIncome = salary * 12;
      const chargeableIncome = Math.max(0, annualIncome - (epf * 12) - 9000);
      const annualTax = calculateProgressiveTax(chargeableIncome);
      const monthlyPCB = annualTax / 12;
      const net = salary - epf - socso - eis - monthlyPCB;

      onCalculate({
        mainValue: net,
        breakdown: [
          { label: 'Gross Salary', value: salary },
          { label: 'EPF (11%)', value: -epf },
          { label: 'SOCSO', value: -socso },
          { label: 'EIS', value: -eis },
          { label: 'PCB Tax', value: -monthlyPCB },
          { label: 'Net Salary', value: net }
        ],
        insights: [
          `Difference: RM${(salary - net).toFixed(2)} (${(((salary - net) / salary) * 100).toFixed(1)}% deducted)`,
          `You take home ${((net / salary) * 100).toFixed(1)}% of gross`,
          `Annual net: RM${(net * 12).toFixed(2)}`
        ]
      });
    };

    const calculateNetToGross = () => {
      const targetNet = parseFloat(netSalary) || 0;
      let estimatedGross = targetNet / 0.75;

      for (let i = 0; i < 20; i++) {
        const epf = estimatedGross * 0.11;
        const socso = estimatedGross <= 4000 ? Math.min(estimatedGross * 0.005, 19.75) : 19.75;
        const eis = Math.min(estimatedGross * 0.002, 7.90);
        const annualIncome = estimatedGross * 12;
        const chargeableIncome = Math.max(0, annualIncome - (epf * 12) - 9000);
        const annualTax = calculateProgressiveTax(chargeableIncome);
        const monthlyPCB = annualTax / 12;
        const calculatedNet = estimatedGross - epf - socso - eis - monthlyPCB;

        if (Math.abs(calculatedNet - targetNet) < 1) break;
        estimatedGross += (targetNet - calculatedNet);
      }

      const epf = estimatedGross * 0.11;
      const socso = estimatedGross <= 4000 ? Math.min(estimatedGross * 0.005, 19.75) : 19.75;
      const eis = Math.min(estimatedGross * 0.002, 7.90);
      const annualIncome = estimatedGross * 12;
      const chargeableIncome = Math.max(0, annualIncome - (epf * 12) - 9000);
      const annualTax = calculateProgressiveTax(chargeableIncome);
      const monthlyPCB = annualTax / 12;

      onCalculate({
        mainValue: estimatedGross,
        breakdown: [
          { label: 'Target Net Salary', value: targetNet },
          { label: 'Required Gross Salary', value: estimatedGross },
          { label: 'EPF (11%)', value: -epf },
          { label: 'SOCSO', value: -socso },
          { label: 'EIS', value: -eis },
          { label: 'PCB Tax', value: -monthlyPCB }
        ],
        insights: [
          `You need RM${estimatedGross.toFixed(2)} gross for RM${targetNet.toFixed(2)} net`,
          `Deductions total: RM${(epf + socso + eis + monthlyPCB).toFixed(2)}`,
          `That's ${(((estimatedGross - targetNet) / estimatedGross) * 100).toFixed(1)}% in deductions`
        ]
      });
    };

    return (
      <div className="space-y-6">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setMode('grossToNet')}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${
              mode === 'grossToNet' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700'
            }`}
          >
            Gross → Net
          </button>
          <button
            onClick={() => setMode('netToGross')}
            className={`flex-1 py-2 rounded-md font-medium transition-colors ${
              mode === 'netToGross' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-700'
            }`}
          >
            Net → Gross
          </button>
        </div>

        {mode === 'grossToNet' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gross Monthly Salary (RM)
            </label>
            <input
              type="number"
              value={grossSalary}
              onChange={(e) => setGrossSalary(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="e.g., 8000"
            />
            <button
              onClick={calculateGrossToNet}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
            >
              Calculate Net Salary
            </button>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Net Salary (RM)
            </label>
            <input
              type="number"
              value={netSalary}
              onChange={(e) => setNetSalary(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              placeholder="e.g., 6000"
            />
            <button
              onClick={calculateNetToGross}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg shadow-lg"
            >
              Calculate Required Gross
            </button>
          </div>
        )}
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
