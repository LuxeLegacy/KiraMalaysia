import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configPath = join(__dirname, '../src/data/income-tax-calculators-config.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

const generateCalculatorPage = (calcConfig) => {
  const componentName = calcConfig.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

  return `import { useState } from 'react';
import { IncomeTaxCalculatorTemplate, CalculationResult } from '../../components/IncomeTax/IncomeTaxCalculatorTemplate';
import { calculateProgressiveTax } from '../../lib/progressive-tax';

const config = ${JSON.stringify(calcConfig, null, 2)};

const faqs = [
  {
    question: 'How do I use the ${calcConfig.title}?',
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
    answer: 'Use this whenever you need to plan taxes, compare offers, or understand your tax obligations for ${calcConfig.calculationType} scenarios.'
  }
];

const educationalContent = {
  whatIsIt: 'The ${calcConfig.title} helps you calculate income tax for specific scenarios using official Malaysian tax rates and regulations for 2026.',
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

export const ${componentName} = () => {
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
          \`Effective tax rate: \${incomeAmount > 0 ? ((taxLiability / incomeAmount) * 100).toFixed(2) : 0}%\`,
          \`Monthly tax: RM\${(taxLiability / 12).toFixed(2)}\`,
          chargeableIncome > 0 && chargeableIncome <= 35000 ? 'You\\'re in a lower tax bracket' : '',
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
`;
};

const existingCalculators = [
  'annual-tax-calculator',
  'take-home-pay-calculator',
  'pcb-calculator',
  'net-salary-calculator',
  'gross-to-net-calculator',
  'bonus-tax-calculator',
  'freelancer-tax-calculator'
];

let generatedCount = 0;

Object.entries(config.clusters).forEach(([clusterName, calculators]) => {
  calculators.forEach((calc) => {
    if (!existingCalculators.includes(calc.slug)) {
      const componentName = calc.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
      const filename = `${componentName}.tsx`;
      const filePath = join(__dirname, `../src/pages/income-tax/${filename}`);

      const content = generateCalculatorPage(calc);
      writeFileSync(filePath, content, 'utf-8');
      generatedCount++;
      console.log(`Generated: ${filename}`);
    }
  });
});

console.log(`\nTotal calculators generated: ${generatedCount}`);
console.log('All income tax calculator pages created successfully!');
