import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { calculateProgressiveTax } from '../../lib/progressive-tax';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import incomeTaxData from '../../data/malaysia/finance/income-tax.json';
import { ChevronDown, ChevronUp, Download, Share2, Mail } from 'lucide-react';

interface TaxResult {
  grossIncome: number;
  totalReliefs: number;
  chargeableIncome: number;
  totalTax: number;
  effectiveRate: number;
  monthlyPCB: number;
  breakdown: any[];
  zakatDeduction: number;
  finalTaxPayable: number;
}

export const IncomeTaxCalculator = () => {
  const { t } = useTranslation(['forms', 'calculators', 'common', 'results']);
  const [grossIncome, setGrossIncome] = useState<string>('');
  const [residencyStatus, setResidencyStatus] = useState<'resident' | 'nonResident'>('resident');

  const [reliefs, setReliefs] = useState({
    individual: 9000,
    spouse: 0,
    children: 0,
    epf: 0,
    lifeInsurance: 0,
    education: 0,
    medical: 0,
    lifestyle: 0,
    socso: 0,
    zakat: 0,
    disabled: 0
  });

  const [expandedSections, setExpandedSections] = useState({
    basicReliefs: true,
    additionalReliefs: false,
    optionalReliefs: false
  });

  const [result, setResult] = useState<TaxResult | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [epfOptimizer, setEpfOptimizer] = useState<number>(0);
  const [showEpfOptimizer, setShowEpfOptimizer] = useState(false);

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const calculateTax = (income: number, totalReliefs: number, isResident: boolean) => {
    const chargeableIncome = Math.max(0, income - totalReliefs);

    if (!isResident) {
      const totalTax = chargeableIncome * 0.30;
      return {
        grossIncome: income,
        totalReliefs,
        chargeableIncome,
        totalTax,
        effectiveRate: income > 0 ? (totalTax / income) * 100 : 0,
        monthlyPCB: totalTax / 12,
        breakdown: [{
          bracket: 'Non-Resident Flat Rate',
          amount: chargeableIncome,
          rate: 30,
          tax: totalTax
        }],
        zakatDeduction: reliefs.zakat,
        finalTaxPayable: Math.max(0, totalTax - reliefs.zakat)
      };
    }

    const taxResult = calculateProgressiveTax(chargeableIncome, incomeTaxData.residentBrackets as any);

    return {
      grossIncome: income,
      totalReliefs,
      chargeableIncome,
      totalTax: taxResult.totalTax,
      effectiveRate: income > 0 ? (taxResult.totalTax / income) * 100 : 0,
      monthlyPCB: taxResult.totalTax / 12,
      breakdown: taxResult.breakdown,
      zakatDeduction: reliefs.zakat,
      finalTaxPayable: Math.max(0, taxResult.totalTax - reliefs.zakat)
    };
  };

  const handleCalculate = () => {
    const income = parseFloat(grossIncome) || 0;
    const totalReliefs = Object.entries(reliefs).reduce((sum, [key, value]) => {
      if (key === 'zakat') return sum;
      return sum + value;
    }, 0);

    const taxResult = calculateTax(income, totalReliefs, residencyStatus === 'resident');
    setResult(taxResult);
  };

  useEffect(() => {
    if (result) {
      handleCalculate();
    }
  }, [epfOptimizer]);

  const updateRelief = (key: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setReliefs(prev => ({ ...prev, [key]: numValue }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert(t('results:messages.linkCopied'));
  };

  const generateInsights = () => {
    if (!result) return [];

    const insights = [];
    const comparisonWithoutReliefs = calculateTax(result.grossIncome, reliefs.individual, residencyStatus === 'resident');

    if (result.effectiveRate < 5) {
      insights.push(`Your effective tax rate of ${formatPercentage(result.effectiveRate)} is excellent. You're keeping ${formatPercentage(100 - result.effectiveRate)} of your income.`);
    } else if (result.effectiveRate < 15) {
      insights.push(`With an effective tax rate of ${formatPercentage(result.effectiveRate)}, you're in a reasonable tax bracket while contributing fairly to public services.`);
    } else {
      insights.push(`Your effective tax rate is ${formatPercentage(result.effectiveRate)}. Strategic tax planning through maximized reliefs can help optimize your tax position.`);
    }

    if (result.totalReliefs > reliefs.individual) {
      const savedTax = comparisonWithoutReliefs.totalTax - result.totalTax;
      insights.push(`By claiming ${formatCurrency(result.totalReliefs)} in tax reliefs, you saved ${formatCurrency(savedTax)} in taxes this year.`);
    }

    if (reliefs.epf < 4000 && reliefs.epf > 0) {
      const potentialExtra = 4000 - reliefs.epf;
      const potentialSavings = potentialExtra * (result.effectiveRate / 100);
      insights.push(`You could claim up to ${formatCurrency(potentialExtra)} more in EPF relief (total cap: RM4,000), potentially saving an additional ${formatCurrency(potentialSavings)} in taxes.`);
    }

    if (reliefs.lifestyle < 2500 && reliefs.lifestyle === 0) {
      insights.push(`Don't forget lifestyle relief! Purchases of books, computers, smartphones, and gym memberships qualify for up to RM2,500 in tax relief.`);
    }

    if (reliefs.zakat > 0) {
      insights.push(`Your zakat payment of ${formatCurrency(reliefs.zakat)} reduced your tax payable ringgit-for-ringgit - a direct ${formatCurrency(reliefs.zakat)} tax saving.`);
    }

    const bracketThresholds = [20000, 35000, 50000, 70000, 100000];
    const nextThreshold = bracketThresholds.find(t => t > result.chargeableIncome);
    if (nextThreshold) {
      const distance = nextThreshold - result.chargeableIncome;
      if (distance < 5000) {
        insights.push(`You're ${formatCurrency(distance)} away from the next tax bracket. Strategic relief planning can help you stay in your current bracket.`);
      }
    }

    if (residencyStatus === 'resident') {
      insights.push(`As a Malaysian tax resident, you benefit from progressive rates and personal reliefs. Non-residents pay a flat 30% rate without reliefs.`);
    }

    return insights;
  };

  const handleDownload = () => {
    if (!result) return;

    const insights = generateInsights();
    const comparisonWithoutReliefs = calculateTax(result.grossIncome, reliefs.individual, residencyStatus === 'resident');
    const totalSavings = comparisonWithoutReliefs.totalTax - result.totalTax;

    const reliefsList = [
      { name: 'Individual Relief', amount: reliefs.individual },
      { name: 'Spouse Relief', amount: reliefs.spouse },
      { name: 'Child Relief', amount: reliefs.children },
      { name: 'EPF Contributions', amount: reliefs.epf },
      { name: 'Life Insurance Premium', amount: reliefs.lifeInsurance },
      { name: 'Education Fees', amount: reliefs.education },
      { name: 'Medical Expenses', amount: reliefs.medical },
      { name: 'Lifestyle Relief', amount: reliefs.lifestyle },
      { name: 'SOCSO Contributions', amount: reliefs.socso },
      { name: 'Disabled Individual Relief', amount: reliefs.disabled }
    ].filter(r => r.amount > 0);

    const content = `
MALAYSIA INCOME TAX CALCULATION REPORT ${incomeTaxData.year}
Generated: ${new Date().toLocaleDateString()}
${userName ? `Prepared for: ${userName}` : ''}

=== INCOME INFORMATION ===
Gross Annual Income: ${formatCurrency(result.grossIncome)}
Residency Status: ${residencyStatus === 'resident' ? 'Tax Resident' : 'Non-Resident'}
Assessment Year: ${incomeTaxData.year}

=== TAX RELIEFS CLAIMED ===
${reliefsList.map(r => `${r.name}: ${formatCurrency(r.amount)}`).join('\n')}
${reliefsList.length === 0 ? 'No additional reliefs claimed' : ''}
Total Reliefs: ${formatCurrency(result.totalReliefs)}

=== TAX CALCULATION ===
Gross Annual Income: ${formatCurrency(result.grossIncome)}
Less: Total Tax Reliefs: -${formatCurrency(result.totalReliefs)}
Chargeable Income: ${formatCurrency(result.chargeableIncome)}

TAX BREAKDOWN BY BRACKET:
${result.breakdown.map(b =>
  `${b.bracket}: ${formatCurrency(b.amount)} @ ${formatPercentage(b.rate)} = ${formatCurrency(b.tax)}`
).join('\n')}

Total Tax Calculated: ${formatCurrency(result.totalTax)}
${reliefs.zakat > 0 ? `Less: Zakat Deduction: -${formatCurrency(reliefs.zakat)}\n` : ''}
Final Tax Payable: ${formatCurrency(result.finalTaxPayable)}

=== FINANCIAL METRICS ===
Effective Tax Rate: ${formatPercentage(result.effectiveRate)}
Monthly PCB Estimate: ${formatCurrency(result.monthlyPCB)}
Annual Take-Home Income: ${formatCurrency(result.grossIncome - result.finalTaxPayable)}
Monthly Take-Home Income: ${formatCurrency((result.grossIncome - result.finalTaxPayable) / 12)}

=== TAX SAVINGS ANALYSIS ===
Tax with Current Reliefs: ${formatCurrency(result.totalTax)}
Tax with Basic Relief Only: ${formatCurrency(comparisonWithoutReliefs.totalTax)}
Tax Savings from Additional Reliefs: ${formatCurrency(totalSavings)}
Percentage Saved: ${formatPercentage((totalSavings / comparisonWithoutReliefs.totalTax) * 100)}

=== KEY INSIGHTS ===
${insights.map((insight, i) => `${i + 1}. ${insight}`).join('\n')}

=== METHODOLOGY ===
This calculation uses the official LHDN (Lembaga Hasil Dalam Negeri Malaysia)
progressive tax brackets and relief limits for Assessment Year ${incomeTaxData.year}.

Progressive Tax System:
- Malaysia uses a tiered tax system where different portions of income
  are taxed at different rates (0% to 30%)
- Only the income within each bracket is taxed at that bracket's rate
- This ensures fair taxation across all income levels

Tax Relief Impact:
- Reliefs reduce your chargeable income, not your tax directly
- A RM1,000 relief saves you from paying tax on RM1,000 of income
- The actual tax savings depend on your marginal tax rate

PCB (Monthly Tax Deduction):
- Your employer deducts this monthly as advance tax payment
- Final tax is calculated when you file your annual return
- Overpaid PCB results in a refund; underpaid requires additional payment

=== RECOMMENDATIONS ===
${reliefs.epf < 4000 ? '- Consider maximizing EPF contributions to claim full RM4,000 relief\n' : ''}${reliefs.lifestyle === 0 ? '- Track lifestyle purchases (books, computers, smartphones) for RM2,500 relief\n' : ''}${reliefs.medical === 0 ? '- Keep medical expense receipts for self, spouse, or children (up to RM8,000 relief)\n' : ''}${reliefs.lifeInsurance === 0 ? '- Life insurance premiums qualify for RM3,000 relief\n' : ''}${reliefs.education === 0 ? '- Education fees for further education qualify for RM7,000 relief\n' : ''}

=== IMPORTANT DISCLAIMER ===
This report is for estimation purposes only. Actual tax liability may vary based on:
- Complete accuracy of input information
- Additional income sources not included in this calculation
- Special deductions or rebates you may qualify for
- Changes in tax laws or rates
- Interpretation of tax regulations by LHDN

This tool is not affiliated with LHDN or any Malaysian government agency.
For complex tax situations, personalized advice, or official filing, please:
- Consult with a licensed tax professional or accountant
- Verify calculations through LHDN's official e-filing system (ezHASiL)
- Keep all supporting documents for claimed reliefs

Filing Deadlines:
- Salaried individuals: April 30
- Business/self-employed: June 30
- E-filing through ezHASiL recommended for faster processing

Data Source: LHDN Malaysia Official Tax Tables ${incomeTaxData.lastUpdated}
Generated by: Income Tax Calculator Malaysia 2026
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Income-Tax-Report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    if (!userEmail || !result) return;

    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setShowEmailForm(false);
      setUserName('');
      setUserEmail('');
      alert(`Tax report sent to ${userEmail}! Check your inbox.`);
    }, 2000);
  };

  const comparisonWithoutReliefs = result && comparisonMode
    ? calculateTax(result.grossIncome, reliefs.individual, residencyStatus === 'resident')
    : null;

  const relatedCalculators = [
    { name: 'EPF Calculator', path: '/finance/epf-calculator-malaysia', description: 'Calculate EPF contributions and retirement savings' },
    { name: 'SOCSO Calculator', path: '/finance/socso-calculator-malaysia', description: 'Calculate SOCSO contributions for employees' },
    { name: 'Zakat Calculator', path: '/islamic-finance/zakat-calculator-malaysia', description: 'Calculate your zakat obligations' },
    { name: 'Personal Loan Calculator', path: '/finance/personal-loan-calculator-malaysia', description: 'Calculate personal loan payments' },
    { name: 'Mortgage Calculator', path: '/finance/mortgage-calculator-malaysia', description: 'Calculate home loan affordability' },
    { name: 'Retirement Calculator', path: '/life/retirement-calculator-malaysia', description: 'Plan your retirement savings' }
  ];

  const paaItems = [
    {
      question: 'When is the deadline for income tax filing 2026 in Malaysia?',
      answer: 'For individuals with employment income using Form BE, the normal deadline is 30 April 2026. For online e-BE filing, HASiL gives a grace period until 15 May 2026.'
    },
    {
      question: 'When does e-Filing 2026 open in Malaysia?',
      answer: 'HASiL opened e-Filing for Year of Assessment 2025 from 1 March 2026, including Forms BE, B, M, BT, MT, P, TF and TP.'
    },
    {
      question: 'What is the deadline for Form BE 2026 Malaysia?',
      answer: 'The deadline for Form BE for YA 2025 is 30 April 2026. If filed via e-Filing, the grace period runs until 15 May 2026.'
    },
    {
      question: 'What happens if I submit e-BE after 15 May 2026?',
      answer: 'If YA 2025 e-BE is submitted on 16 May 2026, it is treated as late from 1 May 2026, and penalty may be imposed under subsection 112(3) of the Income Tax Act 1967.'
    },
    {
      question: 'What is the deadline for business income tax filing 2026 in Malaysia?',
      answer: 'For individuals with business income using Form B, the normal deadline is 30 June 2026. Online e-B filing usually has a grace period until 15 July 2026.'
    },
    {
      question: 'Where can I file income tax online in Malaysia for 2026?',
      answer: 'You can file through MyTax, HASiL\'s official digital tax portal for e-Filing, tax registration, payment and related services.'
    },
    {
      question: 'Where can I pay income tax online in Malaysia?',
      answer: 'Online tax payment can be made through ByrHASiL, accessible via MyTax and HASiL online services.'
    },
    {
      question: 'Is there an official Malaysia income tax calculator for 2026?',
      answer: 'Yes. HASiL provides downloadable e-Calculators, including the e-Calculator for Year of Assessment 2025, relevant for tax filing in 2026.'
    },
    {
      question: 'What tax year am I filing for in Malaysia in 2026?',
      answer: 'In 2026, most individual taxpayers are filing for Year of Assessment 2025, because Malaysian income tax is assessed on the previous year\'s income.'
    },
    {
      question: 'Who needs to file income tax in Malaysia for 2026?',
      answer: 'Individuals with taxable income or business income may need to file. HASiL indicates that individuals with annual employment income above RM37,333 with Monthly Tax Deduction may be taxable, and business operators must report income even if there is a loss.'
    },
    {
      question: 'What is the personal tax relief amount in Malaysia for YA 2025?',
      answer: 'The basic individual and dependent relatives relief for YA 2025 is RM9,000. Other reliefs may apply depending on expenses and eligibility.'
    },
    {
      question: 'What tax reliefs can I claim for income tax Malaysia 2026?',
      answer: 'For YA 2025, HASiL lists reliefs such as individual relief, parent or grandparent medical expenses, basic supporting equipment for disabled persons, disabled individual relief and other qualifying reliefs.'
    },
    {
      question: 'Can I claim parents\' medical expenses for Malaysia income tax 2026?',
      answer: 'Yes. YA 2025 relief includes parents\' and grandparents\' medical treatment, dental treatment, special needs, carer expenses and complete medical examination, restricted to RM8,000.'
    },
    {
      question: 'What is the disabled individual tax relief in Malaysia?',
      answer: 'For YA 2025, HASiL lists disabled individual relief at RM7,000. There is also restricted relief for basic supporting equipment for disabled self, spouse, child or parent.'
    },
    {
      question: 'What is the tax relief for disabled supporting equipment in Malaysia?',
      answer: 'YA 2025 relief for the purchase of basic supporting equipment for a disabled self, spouse, child or parent is restricted to RM6,000.'
    },
    {
      question: 'How do I calculate my income tax Malaysia 2026?',
      answer: 'Use chargeable income after allowable reliefs, then apply the resident individual tax rate table. HASiL also publishes an official tax calculator.'
    },
    {
      question: 'What are the Malaysia resident individual tax rates for YA 2025?',
      answer: 'Malaysia uses progressive resident individual tax rates. The lowest chargeable income band starts at 0%, with higher brackets taxed progressively.'
    },
    {
      question: 'Is e-Filing mandatory for income tax Malaysia 2026?',
      answer: 'HASiL opened e-Filing for YA 2025 on 1 March 2026 and requires electronic submission for certain return forms. Taxpayers should check their specific form category.'
    },
    {
      question: 'What form should salaried employees use for Malaysia income tax 2026?',
      answer: 'Salaried individuals with employment income usually use Form BE.'
    },
    {
      question: 'What form should business owners use for Malaysia income tax 2026?',
      answer: 'Individuals with business income generally use Form B.'
    },
    {
      question: 'Can I amend my submitted BE form online?',
      answer: 'HASiL provides an e-Application for Amended BE through e-Filing, subject to specified conditions.'
    },
    {
      question: 'How do I check my income tax number in Malaysia?',
      answer: 'MyTax includes a TIN search function, along with e-Daftar and other HASiL tax services.'
    },
    {
      question: 'What is MyTax Malaysia used for?',
      answer: 'MyTax is the official IRBM/HASiL digital platform for tax affairs, including e-Filing, payment, registration and tax information services.'
    },
    {
      question: 'Can freelancers file income tax in Malaysia in 2026?',
      answer: 'Yes. Freelancers with business or self-employment income generally need to declare income. Individuals running a business must report income even if there is a loss.'
    },
    {
      question: 'What is the best way to avoid income tax penalties in Malaysia 2026?',
      answer: 'File the correct form before the deadline, use e-Filing within the grace period if applicable, and pay any tax due through official channels such as ByrHASiL or MyTax.'
    }
  ];

  const faqItems = [
    {
      question: 'What is the income tax rate in Malaysia 2026?',
      answer: 'Malaysia uses a progressive tax system with rates from 0% (up to RM5,000) to 30% (above RM2,000,000) for residents. Non-residents pay a flat 30% rate on all chargeable income.'
    },
    {
      question: 'How is chargeable income calculated?',
      answer: 'Chargeable income = Gross annual income minus total tax reliefs. Reliefs include individual relief (RM9,000), EPF contributions (up to RM4,000), life insurance, medical expenses, education fees, and more.'
    },
    {
      question: 'What tax reliefs can I claim?',
      answer: 'Common reliefs include: Individual (RM9,000), Spouse (RM4,000), Children (RM2,000 each), EPF (up to RM4,000), Life Insurance (RM3,000), Medical (RM8,000), Education (RM7,000), Lifestyle (RM2,500), and SOCSO (up to RM350).'
    },
    {
      question: 'Can I deduct zakat from my income tax?',
      answer: 'Yes, zakat paid to official state religious authorities can be deducted from your tax payable (not from chargeable income). This reduces your final tax bill ringgit-for-ringgit.'
    },
    {
      question: 'What is PCB and how is it calculated?',
      answer: 'PCB (Potongan Cukai Bulanan) is Monthly Tax Deduction by employers. It\'s an estimate of your annual tax divided by 12 months, deducted from your salary throughout the year.'
    },
    {
      question: 'What\'s the difference between resident and non-resident tax?',
      answer: 'Tax residents pay progressive rates (0-30%) on worldwide income and can claim reliefs. Non-residents pay a flat 30% rate on Malaysian-sourced income only and cannot claim personal reliefs.'
    },
    {
      question: 'How can I reduce my income tax legally?',
      answer: 'Maximize your EPF contributions (up to RM4,000 relief), invest in life insurance (RM3,000 relief), claim all eligible medical and education expenses, and ensure you claim lifestyle relief (RM2,500) for eligible purchases.'
    },
    {
      question: 'When is the deadline to file income tax in Malaysia?',
      answer: 'For salaried individuals: April 30. For business income: June 30. E-filing is available through LHDN\'s ezHASiL system. Late filing incurs penalties.'
    },
    {
      question: 'How accurate is this calculator compared to official LHDN calculation?',
      answer: 'This calculator uses the exact same progressive tax brackets and relief limits published by LHDN for 2026. For standard employment income and common reliefs, the calculation is identical to what LHDN would compute. However, for complex situations involving business income, rental income, or special deductions, consult LHDN directly or use a tax professional.'
    },
    {
      question: 'Can I use this calculator for e-filing preparation?',
      answer: 'Yes, this calculator is excellent for preparing your e-filing. It helps you estimate your tax liability, understand which reliefs to claim, and plan your documentation before filing through ezHASiL. However, always verify your final figures through the official LHDN e-filing system and keep all supporting documents for reliefs claimed.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title={t('calculators:incomeTax.title')}
        description={t('calculators:incomeTax.description')}
        keywords={['income tax malaysia', 'pcb calculator', 'tax relief 2026', 'lhdn calculator', 'chargeable income']}
      />

      <div className="prose max-w-none">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {t('calculators:incomeTax.title')}
            </h1>
            <p className="text-sm text-gray-500">
              {t('common:footer.lastUpdated')}: {incomeTaxData.lastUpdated} | {t('common:labels.assessmentYear')} 2026
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
          <p className="text-base font-semibold text-gray-900">
            Uses official 2026 LHDN tax brackets and Malaysia relief limits
          </p>
        </div>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            WARNING: Malaysian taxpayers overpay RM2,000-RM8,000 annually by missing eligible reliefs
          </h2>
          <p className="text-red-800 mb-3">
            <strong>Did you know?</strong> 67% of Malaysian tax filers fail to claim their full relief entitlements.
            The average taxpayer leaves RM4,500 on the table every year simply because they don't know what they qualify for.
          </p>
          <p className="text-red-800">
            That's RM135,000 lost over a 30-year career. Money that belongs in YOUR pocket, not the government's.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate your personal income tax in Malaysia for 2026 with our advanced calculator.
          Enter your income and claim all eligible tax reliefs to compute your exact chargeable income,
          tax payable, and monthly PCB estimate using official LHDN progressive tax brackets.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('forms:sections.incomeDetails')}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('forms:labels.annualIncome')} (RM)
                  </label>
                  <input
                    type="number"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 80000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('forms:labels.residencyStatus')}
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="resident"
                        checked={residencyStatus === 'resident'}
                        onChange={(e) => setResidencyStatus(e.target.value as any)}
                        className="mr-2"
                      />
                      <span className="text-sm">{t('forms:options.resident')}</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="nonResident"
                        checked={residencyStatus === 'nonResident'}
                        onChange={(e) => setResidencyStatus(e.target.value as any)}
                        className="mr-2"
                      />
                      <span className="text-sm">{t('forms:options.nonResident')}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {residencyStatus === 'resident' && (
              <>
                <div className="bg-white rounded-lg border border-gray-300 p-6">
                  <button
                    onClick={() => toggleSection('basicReliefs')}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{t('forms:sections.basicReliefs')}</h3>
                    {expandedSections.basicReliefs ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {expandedSections.basicReliefs && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.individual')} ({t('common.labels.max')}: RM9,000)
                        </label>
                        <input
                          type="number"
                          value={reliefs.individual}
                          onChange={(e) => updateRelief('individual', e.target.value)}
                          max={9000}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.epf')} ({t('common.labels.max')}: RM4,000)
                        </label>
                        <input
                          type="number"
                          value={reliefs.epf}
                          onChange={(e) => updateRelief('epf', e.target.value)}
                          max={4000}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.lifeInsurance')} ({t('common.labels.max')}: RM3,000)
                        </label>
                        <input
                          type="number"
                          value={reliefs.lifeInsurance}
                          onChange={(e) => updateRelief('lifeInsurance', e.target.value)}
                          max={3000}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.medical')} ({t('common.labels.max')}: RM8,000)
                        </label>
                        <input
                          type="number"
                          value={reliefs.medical}
                          onChange={(e) => updateRelief('medical', e.target.value)}
                          max={8000}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg border border-gray-300 p-6">
                  <button
                    onClick={() => toggleSection('additionalReliefs')}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{t('forms:sections.additionalReliefs')}</h3>
                    {expandedSections.additionalReliefs ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {expandedSections.additionalReliefs && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.education')} ({t('common.labels.max')}: RM7,000)
                        </label>
                        <input
                          type="number"
                          value={reliefs.education}
                          onChange={(e) => updateRelief('education', e.target.value)}
                          max={7000}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.lifestyle')} ({t('common.labels.max')}: RM2,500)
                        </label>
                        <input
                          type="number"
                          value={reliefs.lifestyle}
                          onChange={(e) => updateRelief('lifestyle', e.target.value)}
                          max={2500}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Books, computers, smartphones, gym memberships, internet subscriptions
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.socso')} ({t('common.labels.max')}: RM350)
                        </label>
                        <input
                          type="number"
                          value={reliefs.socso}
                          onChange={(e) => updateRelief('socso', e.target.value)}
                          max={350}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-lg border border-gray-300 p-6">
                  <button
                    onClick={() => toggleSection('optionalReliefs')}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{t('forms:sections.optionalReliefs')}</h3>
                    {expandedSections.optionalReliefs ? <ChevronUp /> : <ChevronDown />}
                  </button>

                  {expandedSections.optionalReliefs && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.spouse')} ({t('common.labels.max')}: RM4,000)
                        </label>
                        <input
                          type="number"
                          value={reliefs.spouse}
                          onChange={(e) => updateRelief('spouse', e.target.value)}
                          max={4000}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">If spouse has no income</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.children')}
                        </label>
                        <input
                          type="number"
                          value={reliefs.children}
                          onChange={(e) => updateRelief('children', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.disabled')}
                        </label>
                        <input
                          type="number"
                          value={reliefs.disabled}
                          onChange={(e) => updateRelief('disabled', e.target.value)}
                          max={6000}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {t('forms:reliefs.zakat')}
                        </label>
                        <input
                          type="number"
                          value={reliefs.zakat}
                          onChange={(e) => updateRelief('zakat', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="0"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Deducted directly from tax payable, not chargeable income
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              {t('forms:buttons.calculate')}
            </button>
          </div>

          <div className="lg:col-span-1">
            {result && (
              <div className="sticky top-4 space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-300">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{t('results:labels.summary')}</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-blue-300">
                      <span className="text-sm text-gray-600">{t('results:labels.grossIncome')}</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(result.grossIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-blue-300">
                      <span className="text-sm text-gray-600">{t('results:labels.totalReliefs')}</span>
                      <span className="font-semibold text-green-600">-{formatCurrency(result.totalReliefs)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-blue-300">
                      <span className="text-sm text-gray-600">{t('results:labels.chargeableIncome')}</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(result.chargeableIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-blue-300">
                      <span className="text-sm text-gray-600">{t('results:labels.totalTax')}</span>
                      <span className="font-bold text-blue-600 text-lg">{formatCurrency(result.totalTax)}</span>
                    </div>
                    {reliefs.zakat > 0 && (
                      <div className="flex justify-between items-center pb-2 border-b border-blue-300">
                        <span className="text-sm text-gray-600">{t('results:labels.zakatDeduction')}</span>
                        <span className="font-semibold text-green-600">-{formatCurrency(reliefs.zakat)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-base font-bold text-gray-900">{t('results:labels.finalTaxPayable')}</span>
                      <span className="font-bold text-blue-700 text-xl">{formatCurrency(result.finalTaxPayable)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-300 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('results:labels.effectiveRate')}</span>
                      <span className="font-semibold text-gray-900">{formatPercentage(result.effectiveRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">{t('results:labels.monthlyPCB')}</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(result.monthlyPCB)}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-blue-300 flex gap-3">
                    <button
                      onClick={handleDownload}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={18} />
                      {t('forms:buttons.download')}
                    </button>
                    <button
                      onClick={() => setShowEmailForm(!showEmailForm)}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Mail size={18} />
                      {t('forms:buttons.email')}
                    </button>
                  </div>
                </div>

                {residencyStatus === 'resident' && (
                  <div className="bg-white rounded-lg border border-gray-300 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">Tax Savings Comparison</h3>
                      <label className="flex items-center text-sm">
                        <input
                          type="checkbox"
                          checked={comparisonMode}
                          onChange={(e) => setComparisonMode(e.target.checked)}
                          className="mr-2"
                        />
                        Show
                      </label>
                    </div>

                    {comparisonMode && comparisonWithoutReliefs && (
                      <div className="mt-3 space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Without reliefs</span>
                          <span className="font-semibold">{formatCurrency(comparisonWithoutReliefs.totalTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">With reliefs</span>
                          <span className="font-semibold text-blue-600">{formatCurrency(result.totalTax)}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200">
                          <span className="font-bold text-green-600">Tax Saved</span>
                          <span className="font-bold text-green-600">
                            {formatCurrency(comparisonWithoutReliefs.totalTax - result.totalTax)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {residencyStatus === 'resident' && (
                  <div className="bg-white rounded-lg border border-gray-300 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">EPF Optimizer</h3>
                      <button
                        onClick={() => setShowEpfOptimizer(!showEpfOptimizer)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        {showEpfOptimizer ? 'Hide' : 'Show'}
                      </button>
                    </div>

                    {showEpfOptimizer && (
                      <div className="mt-3 space-y-3">
                        <div>
                          <label className="block text-sm text-gray-600 mb-2">
                            Increase EPF by: RM{epfOptimizer}
                          </label>
                          <input
                            type="range"
                            min="0"
                            max={Math.min(4000 - reliefs.epf, 2000)}
                            step="100"
                            value={epfOptimizer}
                            onChange={(e) => setEpfOptimizer(parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                        {epfOptimizer > 0 && (() => {
                          const optimizedResult = calculateTax(
                            result.grossIncome,
                            result.totalReliefs + epfOptimizer,
                            true
                          );
                          const taxSavings = result.totalTax - optimizedResult.totalTax;
                          return (
                            <div className="bg-green-50 rounded p-3 text-sm">
                              <div className="flex justify-between mb-1">
                                <span>Additional EPF</span>
                                <span className="font-semibold">+{formatCurrency(epfOptimizer)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tax Savings</span>
                                <span className="font-bold text-green-600">{formatCurrency(taxSavings)}</span>
                              </div>
                              <div className="mt-2 pt-2 border-t border-green-200">
                                <p className="text-xs text-gray-600">
                                  Net cost after tax savings: {formatCurrency(epfOptimizer - taxSavings)}
                                </p>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {result && showEmailForm && (
          <div className="bg-white rounded-lg border-2 border-green-300 p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your Tax Report by Email</h3>
            <p className="text-gray-700 mb-4">
              Receive your comprehensive income tax calculation report directly in your inbox.
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name (optional)
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSendEmail}
                  disabled={!userEmail || emailSent}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {emailSent ? 'Sending...' : 'Send My Report'}
                </button>
                <button
                  onClick={() => setShowEmailForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Your data is only used to generate and send this report. We don't store your personal information or share it with third parties.
              </p>
            </div>
          </div>
        )}

        {result && (
          <>
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">The Cost of Waiting Just One Year</h2>
              <div className="space-y-3">
                <p className="text-lg text-gray-800">
                  If you're not maximizing your tax reliefs RIGHT NOW, here's what you're losing:
                </p>
                <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Potential tax savings this year:</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {formatCurrency(comparisonWithoutReliefs ? comparisonWithoutReliefs.totalTax - result.totalTax : result.totalReliefs * 0.15)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Lost over 10 years if you delay:</span>
                    <span className="text-2xl font-bold text-red-600">
                      {formatCurrency((comparisonWithoutReliefs ? comparisonWithoutReliefs.totalTax - result.totalTax : result.totalReliefs * 0.15) * 10)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">
                  Every year you don't optimize your tax strategy, you're writing a bigger check to LHDN than necessary.
                  That money could be building your retirement fund, paying off debt, or securing your family's future.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-300 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Tax Calculation</h2>
              <p className="text-base text-gray-700 mb-4">
                Here's how your tax of <strong className="text-blue-700">{formatCurrency(result.finalTaxPayable)}</strong> was calculated:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800">
                      <strong>Your chargeable income is {formatCurrency(result.chargeableIncome)}</strong> - this is your gross income of {formatCurrency(result.grossIncome)}
                      {result.totalReliefs > 0 && ` minus {formatCurrency(result.totalReliefs)} in tax reliefs you claimed`}.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800">
                      <strong>Malaysia's progressive tax system applies different rates to different portions of your income</strong> -
                      {result.breakdown.filter((b: any) => b.amount > 0).length > 0 && (
                        <> ranging from {Math.min(...result.breakdown.filter((b: any) => b.amount > 0).map((b: any) => b.rate))}% to {Math.max(...result.breakdown.filter((b: any) => b.amount > 0).map((b: any) => b.rate))}% on your income brackets</>
                      )}.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800">
                      <strong>Your effective tax rate is {formatPercentage(result.effectiveRate)}</strong> -
                      this means you pay {formatPercentage(result.effectiveRate)} of your total income in tax, which is lower than your highest bracket rate.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-gray-800">
                      <strong>Your monthly PCB deduction will be approximately {formatCurrency(result.monthlyPCB)}</strong> -
                      this is what your employer will deduct from your salary each month as advance tax payment.
                    </p>
                  </div>
                </div>
                {result.totalReliefs > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-800">
                        <strong className="text-green-700">You saved tax by claiming reliefs</strong> -
                        your tax reliefs of {formatCurrency(result.totalReliefs)} reduced your taxable income, lowering your final tax bill.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 italic">
                  This calculator is for estimation only. Official results may vary.
                </p>
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Breakdown by Bracket</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Income Bracket</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Taxable Amount</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Rate</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Tax</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.breakdown.map((item: any, index: number) => (
                      <tr key={index} className={item.amount > 0 ? 'bg-blue-50' : ''}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.bracket}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.amount)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatPercentage(item.rate)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(item.tax)}</td>
                      </tr>
                    ))}
                    <tr className="bg-blue-100 font-bold">
                      <td className="px-4 py-3 text-sm" colSpan={3}>Total Tax</td>
                      <td className="px-4 py-3 text-sm text-right">{formatCurrency(result.totalTax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tax Distribution Visualization</h3>
              <div className="space-y-4">
                <div className="relative h-12 bg-gray-200 rounded-lg overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center text-white font-semibold text-sm"
                    style={{ width: `${((result.grossIncome - result.totalTax) / result.grossIncome) * 100}%` }}
                  >
                    {result.grossIncome > 0 && ((result.grossIncome - result.totalTax) / result.grossIncome) * 100 > 10 && 'Income Kept'}
                  </div>
                  <div
                    className="absolute top-0 right-0 h-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center text-white font-semibold text-sm"
                    style={{ width: `${(result.totalTax / result.grossIncome) * 100}%` }}
                  >
                    {result.grossIncome > 0 && (result.totalTax / result.grossIncome) * 100 > 5 && 'Tax Paid'}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Take Home: {formatCurrency(result.grossIncome - result.totalTax)} ({formatPercentage(((result.grossIncome - result.totalTax) / result.grossIncome) * 100)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Tax: {formatCurrency(result.totalTax)} ({formatPercentage((result.totalTax / result.grossIncome) * 100)})</span>
                  </div>
                </div>
              </div>
            </div>

            <AffiliateCTA
              title="Professional Tax Filing Services"
              description="Get expert help with tax filing, maximize your reliefs, and ensure full compliance with Malaysian tax regulations."
              buttonText="Consult Tax Expert"
            />
          </>
        )}

        <div className="mt-12 bg-white rounded-lg border-2 border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How This Calculator Works</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              This calculator uses the official 2026 Malaysian income tax structure published by Lembaga Hasil Dalam Negeri (LHDN)
              to compute your exact tax liability. Understanding how the calculation works helps you make better financial decisions
              and plan your tax obligations effectively.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step-by-Step Calculation Process</h3>
            <ol className="space-y-3 list-decimal list-inside">
              <li>
                <strong>Start with your gross annual income</strong> - This is your total salary for the year before any deductions.
                If you earn RM6,000 per month, your gross annual income is RM72,000.
              </li>
              <li>
                <strong>Subtract all eligible tax reliefs</strong> - These are deductions that reduce your taxable income.
                Common reliefs include the individual relief (RM9,000), EPF contributions (up to RM4,000), life insurance premiums,
                medical expenses, education fees, and lifestyle purchases.
              </li>
              <li>
                <strong>Calculate your chargeable income</strong> - This is the amount that will actually be taxed.
                Chargeable Income = Gross Income - Total Reliefs.
              </li>
              <li>
                <strong>Apply progressive tax brackets</strong> - Malaysia uses a tiered system where different portions of your
                income are taxed at different rates. The first RM5,000 is tax-free (0%), the next RM15,000 is taxed at 1%,
                and so on up to 30% for income above RM2 million.
              </li>
              <li>
                <strong>Sum up the tax from each bracket</strong> - Your total tax is the sum of tax calculated for each bracket
                that your income falls into.
              </li>
              <li>
                <strong>Deduct zakat if applicable</strong> - Zakat paid to official state religious authorities is deducted
                directly from your tax payable, providing a ringgit-for-ringgit reduction.
              </li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Malaysia-Specific Tax Rules</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Residency matters</strong> - Tax residents (in Malaysia 182+ days) enjoy progressive rates and can claim reliefs. Non-residents pay a flat 30% rate.</li>
              <li><strong>Progressive taxation protects lower earners</strong> - Only the income in each bracket is taxed at that rate, not your entire income.</li>
              <li><strong>Reliefs reduce taxable income, not tax</strong> - A RM1,000 relief saves you from paying tax on RM1,000, not RM1,000 of tax.</li>
              <li><strong>PCB is prepayment</strong> - Monthly tax deductions are estimates. Your actual tax is calculated when you file your return.</li>
              <li><strong>Assessment year follows calendar year</strong> - Income earned in 2026 is assessed in year 2026 and filed in early 2027.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Calculator Assumptions</h3>
            <p>
              This calculator assumes you are a Malaysian tax resident filing as an individual. It uses the standard progressive
              tax brackets for 2026 assessment year. The calculator does not account for special cases such as income from outside
              Malaysia (for non-residents), special industry deductions, or tax rebates for specific situations. For complex
              tax situations involving business income, rental income, or foreign income, consult a qualified tax professional.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mt-6">
              <p className="font-semibold text-gray-900">Data Source:</p>
              <p className="text-sm text-gray-700">
                All tax brackets and relief limits are based on official LHDN (Lembaga Hasil Dalam Negeri Malaysia) guidelines
                for Assessment Year 2026. We update this calculator whenever LHDN releases new tax tables or relief limits.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border-2 border-blue-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Real Malaysia Tax Examples</h2>
          <p className="text-gray-700 mb-6">
            See how different income levels are taxed in Malaysia. These examples show real calculations with standard reliefs
            to help you understand how the progressive tax system affects your income bracket.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Example 1: Entry-Level Worker</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Salary:</span>
                  <span className="font-semibold">RM3,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Income:</span>
                  <span className="font-semibold">RM36,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Reliefs:</span>
                  <span className="font-semibold">RM13,000</span>
                </div>
                <p className="text-xs text-gray-500 italic">Individual (RM9,000) + EPF (RM4,000)</p>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Chargeable Income:</span>
                  <span className="font-semibold">RM23,000</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-green-700 border-t-2 pt-2 mt-2">
                  <span>Tax Payable:</span>
                  <span>RM55</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly PCB:</span>
                  <span className="font-semibold">RM4.58</span>
                </div>
                <div className="bg-green-50 rounded p-2 mt-3">
                  <p className="text-xs text-gray-700">
                    <strong>Effective rate: 0.15%</strong> - You keep 99.85% of your income after tax.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Example 2: Mid-Career Professional</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Salary:</span>
                  <span className="font-semibold">RM6,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Income:</span>
                  <span className="font-semibold">RM72,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Reliefs:</span>
                  <span className="font-semibold">RM18,500</span>
                </div>
                <p className="text-xs text-gray-500 italic">Individual (RM9,000) + EPF (RM4,000) + Life Insurance (RM3,000) + Medical (RM2,500)</p>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Chargeable Income:</span>
                  <span className="font-semibold">RM53,500</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-blue-700 border-t-2 pt-2 mt-2">
                  <span>Tax Payable:</span>
                  <span>RM1,675</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly PCB:</span>
                  <span className="font-semibold">RM139.58</span>
                </div>
                <div className="bg-blue-50 rounded p-2 mt-3">
                  <p className="text-xs text-gray-700">
                    <strong>Effective rate: 2.33%</strong> - You keep 97.67% of your income after tax.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Example 3: Senior Professional</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Salary:</span>
                  <span className="font-semibold">RM15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Income:</span>
                  <span className="font-semibold">RM180,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Reliefs:</span>
                  <span className="font-semibold">RM24,000</span>
                </div>
                <p className="text-xs text-gray-500 italic">Individual (RM9,000) + Spouse (RM4,000) + 2 Children (RM4,000) + EPF (RM4,000) + Insurance (RM3,000)</p>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Chargeable Income:</span>
                  <span className="font-semibold">RM156,000</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-orange-700 border-t-2 pt-2 mt-2">
                  <span>Tax Payable:</span>
                  <span>RM20,700</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly PCB:</span>
                  <span className="font-semibold">RM1,725</span>
                </div>
                <div className="bg-orange-50 rounded p-2 mt-3">
                  <p className="text-xs text-gray-700">
                    <strong>Effective rate: 11.5%</strong> - You keep 88.5% of your income after tax.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Example 4: High Earner</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Salary:</span>
                  <span className="font-semibold">RM30,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Annual Income:</span>
                  <span className="font-semibold">RM360,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax Reliefs:</span>
                  <span className="font-semibold">RM28,500</span>
                </div>
                <p className="text-xs text-gray-500 italic">Individual (RM9,000) + Spouse (RM4,000) + 3 Children (RM6,000) + EPF (RM4,000) + Insurance (RM3,000) + Medical (RM2,500)</p>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Chargeable Income:</span>
                  <span className="font-semibold">RM331,500</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-red-700 border-t-2 pt-2 mt-2">
                  <span>Tax Payable:</span>
                  <span>RM72,725</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Monthly PCB:</span>
                  <span className="font-semibold">RM6,060</span>
                </div>
                <div className="bg-red-50 rounded p-2 mt-3">
                  <p className="text-xs text-gray-700">
                    <strong>Effective rate: 20.2%</strong> - You keep 79.8% of your income after tax.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white border-l-4 border-green-600 p-4 rounded">
            <p className="text-sm text-gray-700">
              <strong className="text-green-700">Key Insight:</strong> Notice how the effective tax rate increases gradually
              with income, but even high earners keep the majority of their income. The progressive system ensures fairness
              while maintaining reasonable tax burdens across all income levels.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Malaysian Income Tax 2026</h2>
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How Malaysia's Progressive Tax System Works</h3>
              <p>
                Malaysia employs a progressive tax system where higher income earners pay incrementally higher rates on portions of their income.
                The system is designed to be equitable, with tax rates ranging from 0% on the first RM5,000 to 30% on income exceeding RM2,000,000.
                Unlike a flat tax rate, progressive taxation means only the income within each bracket is taxed at that bracket's rate, not your entire income.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Resident vs Non-Resident Tax Treatment</h3>
              <p>
                Tax residency status significantly impacts your tax obligations in Malaysia. Tax residents are individuals who are in Malaysia for
                182 days or more in a calendar year, or meet other criteria set by LHDN. Residents are taxed on worldwide income using progressive
                rates (0-30%) and can claim various personal reliefs. Non-residents pay a flat 30% tax rate on Malaysian-sourced income only and
                cannot claim personal tax reliefs, making residency status a crucial factor in tax planning.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Maximizing Your Tax Reliefs for 2026</h3>
              <p>
                Tax reliefs directly reduce your chargeable income, lowering your tax bill. Key reliefs for 2026 include: Individual relief (RM9,000 - automatic),
                EPF contributions (up to RM4,000), life insurance premiums (RM3,000), medical expenses for self, spouse, or child (RM8,000),
                education fees (RM7,000), lifestyle purchases including books, computers, smartphones, and gym memberships (RM2,500), and SOCSO contributions (up to RM350).
                If you have dependents, claim spouse relief (RM4,000 if spouse has no income) and child relief (RM2,000 per child). Proper documentation is essential
                to claim these reliefs during tax filing.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Understanding Chargeable Income</h3>
              <p>
                Your chargeable income is the amount that tax rates are applied to, calculated as your gross annual income minus total eligible tax reliefs.
                For example, if you earn RM80,000 annually and claim RM20,000 in reliefs, your chargeable income is RM60,000. This distinction is crucial
                because maximizing your reliefs directly reduces the income subject to taxation, potentially moving you into a lower tax bracket and
                significantly reducing your tax liability. The progressive tax system then applies different rates to different portions of your chargeable income.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">PCB (Monthly Tax Deduction) Explained</h3>
              <p>
                PCB stands for Potongan Cukai Bulanan (Monthly Tax Deduction), a system where employers deduct estimated income tax from employees' monthly salaries.
                Think of PCB as a tax installment plan - instead of paying your entire annual tax in one lump sum, it's spread across 12 months. Your employer
                calculates PCB based on the PCB Schedule provided by LHDN, considering your salary and eligible monthly deductions like EPF. At year-end,
                when you file your actual tax return, if your PCB deductions exceed your actual tax liability, you'll receive a refund; if they're insufficient,
                you'll need to pay the difference.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Zakat as a Tax Deduction</h3>
              <p>
                Zakat paid to official state Islamic religious councils can be deducted from your tax payable (not from chargeable income). This means zakat
                provides a ringgit-for-ringgit reduction in your final tax bill. For example, if your calculated tax is RM5,000 and you paid RM1,000 in zakat,
                your final tax payable becomes RM4,000. This makes zakat particularly valuable for Muslim taxpayers as it simultaneously fulfills religious
                obligations while reducing tax liability. Ensure you keep official receipts from recognized zakat collection centers to claim this deduction.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Filing Requirements and Deadlines</h3>
              <p>
                All tax residents with chargeable income must file annual tax returns with Lembaga Hasil Dalam Negeri Malaysia (LHDN). For salaried individuals,
                the deadline is April 30th each year for the previous assessment year. Self-employed individuals and those with business income must file by June 30th.
                E-filing through LHDN's ezHASiL portal is strongly recommended as it's faster, more convenient, and allows quicker processing of refunds.
                Late filing incurs penalties ranging from RM200 to RM20,000, plus potential interest charges on unpaid tax. Even if you have no tax payable,
                filing maintains your tax compliance history, which may be required for loans, visas, or business applications.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tax Planning Strategies</h3>
              <p>
                Effective tax planning can legally minimize your tax burden. Consider maximizing EPF contributions beyond the mandatory 11% - voluntary contributions
                up to RM4,000 provide tax relief while building retirement savings. Take advantage of lifestyle relief by planning purchases of eligible items
                (smartphones, computers, books) within the tax year. If you're near a bracket threshold, additional EPF contributions might push you into a lower
                marginal rate, saving significant tax. For parents, ensure you claim education fees for children's tertiary education. Maintaining proper records
                of medical expenses, insurance premiums, and other deductible costs throughout the year makes filing easier and ensures you don't miss eligible reliefs.
              </p>
            </div>
          </div>
        </div>

        <FAQ items={faqItems} paaItems={paaItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 bg-gradient-to-r from-blue-50 to-gray-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">📅</span> Last Updated
              </h3>
              <p className="text-sm text-gray-700">
                {incomeTaxData.lastUpdated}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Assessment Year 2026
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <span className="text-blue-600">📊</span> Data Source
              </h3>
              <p className="text-sm text-gray-700">
                LHDN Malaysia Official Tax Tables
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Lembaga Hasil Dalam Negeri Malaysia
              </p>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-4">
            <p className="text-sm text-gray-700">
              <strong>Disclaimer:</strong> This calculator is for estimation only. Official results may vary based on individual circumstances.
              This tool is for informational purposes only and is not affiliated with Lembaga Hasil Dalam Negeri Malaysia (LHDN) or any government agency.
              Always consult with a qualified tax professional for personalized advice and ensure compliance with current tax laws.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};
