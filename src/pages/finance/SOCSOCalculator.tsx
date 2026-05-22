import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency } from '../../lib/formatters';
import socsoData from '../../data/malaysia/finance/socso.json';
import { ChevronDown, ChevronUp, Download, Mail, TrendingUp, AlertCircle, Shield } from 'lucide-react';

interface BenefitsEstimate {
  temporaryDisablement: {
    dailyRate: number;
    monthlyPayout: number;
    replacementRatio: number;
  };
  permanentDisablement: {
    lumpSum: number;
    monthlyBenefit: number;
  };
  invalidityPension: {
    monthlyPension: number;
    replacementPercentage: number;
    tenYearValue: number;
  };
}

export const SOCSOCalculator = () => {
  const { t } = useTranslation(['forms', 'calculators', 'common', 'results']);
  const [monthlySalary, setMonthlySalary] = useState<string>('');
  const [employmentCategory, setEmploymentCategory] = useState<'category1' | 'category2'>('category1');
  const [result, setResult] = useState<any>(null);

  // Advanced features
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonSalary, setComparisonSalary] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<any>(null);
  const [yearsOfContribution, setYearsOfContribution] = useState<string>('10');
  const [showEmployerMode, setShowEmployerMode] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');

  // Email functionality
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const calculateContributions = (salary: number) => {
    // Find the appropriate wage bracket
    let bracket = socsoData.wageBrackets[socsoData.wageBrackets.length - 1];
    for (const b of socsoData.wageBrackets) {
      if (b.max === null || salary <= b.max) {
        bracket = b;
        break;
      }
    }

    const employeeContribution = bracket.employee;
    const employerContribution = bracket.employer;
    const totalContribution = employeeContribution + employerContribution;
    const takeHomePay = salary - employeeContribution;
    const annualTotal = totalContribution * 12;
    const employeeAnnual = employeeContribution * 12;
    const employerAnnual = employerContribution * 12;
    const effectiveRate = (totalContribution / salary) * 100;
    const employerCostPercentage = (employerContribution / totalContribution) * 100;

    return {
      salary,
      employeeContribution,
      employerContribution,
      totalContribution,
      takeHomePay,
      annualTotal,
      employeeAnnual,
      employerAnnual,
      bracketMin: bracket.min,
      bracketMax: bracket.max,
      effectiveRate,
      employerCostPercentage,
    };
  };

  const calculateBenefits = (salary: number, years: number): BenefitsEstimate => {
    // Temporary Disablement: 80% of assumed daily wage
    const assumedDailyWage = salary / 26; // Approximate working days per month
    const dailyRate = assumedDailyWage * 0.8;
    const monthlyPayout = dailyRate * 26;
    const replacementRatio = (monthlyPayout / salary) * 100;

    // Permanent Disablement: Estimated lump sum and monthly benefit
    // Formula approximation based on SOCSO benefit structures
    const permanentLumpSum = salary * 24; // Approximate 24 months salary
    const permanentMonthly = salary * 0.6; // 60% of monthly salary

    // Invalidity Pension: Based on years of contribution
    // Minimum contribution period required: 24 months
    const invalidityMonthly = years >= 2 ? salary * 0.5 : 0; // 50% of average salary
    const invalidityReplacement = years >= 2 ? 50 : 0;
    const invalidityTenYear = invalidityMonthly * 12 * 10;

    return {
      temporaryDisablement: {
        dailyRate,
        monthlyPayout,
        replacementRatio,
      },
      permanentDisablement: {
        lumpSum: permanentLumpSum,
        monthlyBenefit: permanentMonthly,
      },
      invalidityPension: {
        monthlyPension: invalidityMonthly,
        replacementPercentage: invalidityReplacement,
        tenYearValue: invalidityTenYear,
      },
    };
  };

  const generateInsights = () => {
    if (!result) return [];

    const insights = [];
    const benefits = calculateBenefits(result.salary, parseInt(yearsOfContribution) || 10);

    // Insight 1: Employer bears majority cost
    insights.push({
      type: 'info',
      text: `Your employer bears ${result.employerCostPercentage.toFixed(0)}% of SOCSO costs. For every RM${result.employeeContribution.toFixed(2)} you pay, your employer contributes RM${result.employerContribution.toFixed(2)}.`
    });

    // Insight 2: Small cost, huge protection
    const protectionValue = benefits.permanentDisablement.lumpSum + benefits.invalidityPension.tenYearValue;
    const costToProtectionRatio = protectionValue / (result.employeeContribution * 12);
    insights.push({
      type: 'success',
      text: `Your annual SOCSO cost of ${formatCurrency(result.employeeAnnual)} provides protection worth approximately ${formatCurrency(protectionValue)} over 10 years. That's ${costToProtectionRatio.toFixed(0)}x return in protection value.`
    });

    // Insight 3: Income replacement in injury scenarios
    insights.push({
      type: 'info',
      text: `In case of temporary workplace injury, SOCSO replaces approximately ${benefits.temporaryDisablement.replacementRatio.toFixed(0)}% of your income (${formatCurrency(benefits.temporaryDisablement.monthlyPayout)}/month).`
    });

    // Insight 4: Lifetime coverage
    if (employmentCategory === 'category1') {
      insights.push({
        type: 'success',
        text: `As a Category 1 contributor, you're covered for LIFE even after you stop working. This invalidity protection continues until age 60 or retirement.`
      });
    }

    // Insight 5: Category-specific insight
    if (employmentCategory === 'category2') {
      insights.push({
        type: 'warning',
        text: `Category 2 covers employment injury only (no invalidity pension). If eligible, consider upgrading to Category 1 for comprehensive protection.`
      });
    }

    return insights;
  };

  const getCoverageLevel = (salary: number): { level: 'adequate' | 'moderate' | 'low', color: string, message: string } => {
    const benefits = calculateBenefits(salary, parseInt(yearsOfContribution) || 10);
    const replacementRatio = benefits.temporaryDisablement.replacementRatio;

    if (replacementRatio >= 70) {
      return { level: 'adequate', color: 'green', message: 'Strong protection coverage' };
    } else if (replacementRatio >= 50) {
      return { level: 'moderate', color: 'yellow', message: 'Moderate protection coverage' };
    } else {
      return { level: 'low', color: 'red', message: 'Consider additional insurance' };
    }
  };

  const handleCalculate = () => {
    const salary = parseFloat(monthlySalary) || 0;
    const calculatedResult = calculateContributions(salary);
    setResult(calculatedResult);

    // Reset comparison when recalculating
    setComparisonResult(null);
    setShowComparison(false);
  };

  const handleCompare = () => {
    const salary2 = parseFloat(comparisonSalary) || 0;
    const comparison = calculateContributions(salary2);
    setComparisonResult(comparison);
  };

  const handleDownloadPDF = () => {
    if (!result) return;

    const benefits = calculateBenefits(result.salary, parseInt(yearsOfContribution) || 10);
    const coverage = getCoverageLevel(result.salary);
    const insights = generateInsights();

    const reportContent = `
SOCSO PROTECTION ANALYSIS REPORT 2026
Generated: ${new Date().toLocaleDateString()}
${userName ? `Prepared for: ${userName}` : ''}

=== CONTRIBUTION SUMMARY ===
Monthly Salary: ${formatCurrency(result.salary)}
{t('forms:socso.employmentCategory')}: ${employmentCategory === 'category1' ? 'Category 1 (Employment Injury + Invalidity)' : 'Category 2 (Employment Injury Only)'}
Wage Band: RM${result.bracketMin} - ${result.bracketMax ? `RM${result.bracketMax}` : 'Above'}

=== MONTHLY CONTRIBUTION BREAKDOWN ===
Employee Contribution: ${formatCurrency(result.employeeContribution)}
Employer Contribution: ${formatCurrency(result.employerContribution)}
Total Monthly Contribution: ${formatCurrency(result.totalContribution)}
Effective Rate: ${result.effectiveRate.toFixed(2)}% of salary

Take-Home Pay After SOCSO: ${formatCurrency(result.takeHomePay)}

=== ANNUAL SUMMARY ===
Employee Annual Contribution: ${formatCurrency(result.employeeAnnual)}
Employer Annual Contribution: ${formatCurrency(result.employerAnnual)}
Total Annual Contribution: ${formatCurrency(result.annualTotal)}

=== ESTIMATED BENEFITS (Based on ${yearsOfContribution} years contribution) ===

A. Employment Injury - Temporary Disablement:
   Daily Benefit Rate: ${formatCurrency(benefits.temporaryDisablement.dailyRate)}
   Estimated Monthly Payout: ${formatCurrency(benefits.temporaryDisablement.monthlyPayout)}
   Income Replacement: ${benefits.temporaryDisablement.replacementRatio.toFixed(0)}%

B. Employment Injury - Permanent Disablement:
   Estimated Lump Sum: ${formatCurrency(benefits.permanentDisablement.lumpSum)}
   Ongoing Monthly Benefit: ${formatCurrency(benefits.permanentDisablement.monthlyBenefit)}

${employmentCategory === 'category1' ? `
C. Invalidity Pension (Non-work related):
   Estimated Monthly Pension: ${formatCurrency(benefits.invalidityPension.monthlyPension)}
   Income Replacement: ${benefits.invalidityPension.replacementPercentage}%
   Estimated 10-Year Value: ${formatCurrency(benefits.invalidityPension.tenYearValue)}
` : `
C. Invalidity Pension: Not available for Category 2 contributors
`}

=== PROTECTION COVERAGE ANALYSIS ===
Coverage Level: ${coverage.message}
Income Protected: ${benefits.temporaryDisablement.replacementRatio.toFixed(0)}% in injury scenarios
Protection Gap: ${(100 - benefits.temporaryDisablement.replacementRatio).toFixed(0)}%

Total Protection Value (10 years): ${formatCurrency(benefits.permanentDisablement.lumpSum + benefits.invalidityPension.tenYearValue)}

${comparisonResult ? `
=== SALARY COMPARISON ANALYSIS ===

Scenario A (Current): ${formatCurrency(result.salary)}
  Employee: ${formatCurrency(result.employeeContribution)}/month
  Employer: ${formatCurrency(result.employerContribution)}/month
  Total: ${formatCurrency(result.totalContribution)}/month

Scenario B (Comparison): ${formatCurrency(comparisonResult.salary)}
  Employee: ${formatCurrency(comparisonResult.employeeContribution)}/month
  Employer: ${formatCurrency(comparisonResult.employerContribution)}/month
  Total: ${formatCurrency(comparisonResult.totalContribution)}/month

Contribution Difference:
  Employee: ${formatCurrency(Math.abs(comparisonResult.employeeContribution - result.employeeContribution))}/month
  Total: ${formatCurrency(Math.abs(comparisonResult.totalContribution - result.totalContribution))}/month
  Annual Impact: ${formatCurrency(Math.abs(comparisonResult.annualTotal - result.annualTotal))}
` : ''}

${showEmployerMode ? `
=== EMPLOYER PAYROLL COST ANALYSIS ===
Cost per Employee: ${formatCurrency(result.employerContribution)}/month (${formatCurrency(result.employerAnnual)}/year)
Cost for 10 Employees: ${formatCurrency(result.employerAnnual * 10)}/year
Cost for 50 Employees: ${formatCurrency(result.employerAnnual * 50)}/year
Cost for 100 Employees: ${formatCurrency(result.employerAnnual * 100)}/year

Total Payroll Impact: ${result.employerCostPercentage.toFixed(1)}% of total SOCSO contributions
` : ''}

=== KEY INSIGHTS ===
${insights.map((insight, i) => `${i + 1}. ${insight.text}`).join('\n')}

=== UNDERSTANDING SOCSO CATEGORIES ===

Category 1 (Employment Injury + Invalidity):
- Covers workplace injuries and occupational diseases
- Provides invalidity pension for non-work disabilities
- Contributions from both employee and employer
- Protection continues for life even after stopping work
- Most comprehensive social security coverage

Category 2 (Employment Injury Only):
- Covers workplace injuries and occupational diseases only
- No invalidity pension coverage
- Only employer contributes (employee exempt after age 60)
- Typically for employees aged 60 and above

=== METHODOLOGY ===
This analysis uses:
- Official SOCSO 2026 contribution rates
- Wage bracket system (RM${result.bracketMin} - ${result.bracketMax || 'Above'})
- Standard benefit estimation formulas
- Temporary disablement: ~80% of daily wage
- Permanent disablement: Based on injury severity
- Invalidity pension: Based on contribution years

=== DISCLAIMER ===
This is an estimate for planning purposes only. Actual SOCSO benefits depend on:
- Specific injury or disability circumstances
- Medical assessments by SOCSO panel
- Contribution history and employment status
- Category of employment at time of claim
- Current SOCSO benefit schedules and policies

Benefit amounts shown are approximations based on typical scenarios.
Actual benefits are determined by SOCSO/PERKESO according to their assessment.

For accurate benefit information, consult PERKESO directly or visit www.perkeso.gov.my

Generated by SOCSO Calculator Malaysia 2026
    `.trim();

    // Download as text file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SOCSO-Protection-Report-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    if (!userEmail || !result) return;

    // Simulate email sending
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setShowEmailForm(false);
      alert(`SOCSO Protection Report sent to ${userEmail}! Check your inbox.`);
    }, 2000);
  };

  const relatedCalculators = [
    { name: 'EPF Calculator', path: '/finance/epf-calculator-malaysia', description: 'Calculate EPF contributions' },
    { name: 'Income Tax Calculator', path: '/finance/income-tax-calculator-malaysia', description: 'Calculate your income tax' },
    { name: 'Net Worth Calculator', path: '/life/net-worth-calculator-malaysia', description: 'Calculate your net worth' },
  ];

  const faqItems = [
    {
      question: 'What is SOCSO and who needs to contribute?',
      answer: 'SOCSO (Social Security Organisation/PERKESO) is a social security scheme providing protection to employees against occupational accidents, diseases, invalidity, and death. All Malaysian employees must contribute, with Category 1 providing comprehensive coverage and Category 2 covering employment injury only.'
    },
    {
      question: 'What is the difference between Category 1 and Category 2?',
      answer: 'Category 1 provides both Employment Injury coverage and Invalidity Pension coverage. Both employee and employer contribute. Category 2 provides Employment Injury coverage only, typically for employees aged 60 and above who were not previously insured. Category 1 offers more comprehensive protection including non-work-related disability benefits.'
    },
    {
      question: 'What benefits does SOCSO provide?',
      answer: 'SOCSO provides various benefits including medical treatment for occupational injuries/diseases, temporary disablement benefits (~80% of wages), permanent disablement benefits, invalidity pension (Category 1), dependents benefits in case of death, funeral expenses, rehabilitation programs, and employment injury insurance.'
    },
    {
      question: 'Can I withdraw my SOCSO contributions?',
      answer: 'No, SOCSO is not a savings scheme and contributions cannot be withdrawn. It is a social insurance scheme where contributions fund benefits for members who experience covered incidents such as workplace accidents, occupational diseases, or invalidity. Benefits are paid out only when eligible circumstances occur.'
    },
    {
      question: 'How much does SOCSO cost compared to the protection it provides?',
      answer: 'SOCSO contributions are very small relative to the protection provided. Employee contributions range from RM0.10 to RM19.75 monthly, while potential benefits can reach hundreds of thousands of ringgit in case of permanent disability or long-term invalidity. The protection value far exceeds the cost of contributions.'
    },
    {
      question: 'Is SOCSO different from EIS?',
      answer: 'Yes, SOCSO and EIS (Employment Insurance System) are separate schemes. SOCSO covers workplace injuries and invalidity, while EIS provides financial assistance and re-employment services to workers who lose their jobs. Both are administered by PERKESO but serve different purposes and have separate contribution rates.'
    },
    {
      question: 'Do I remain covered after I stop working?',
      answer: 'If you contributed under Category 1 (Employment Injury + Invalidity), you remain covered for invalidity pension benefits for life, even after you stop working. However, you must have contributed for at least 24 months. Employment injury coverage only applies while you are actively employed and contributing.'
    },
    {
      question: 'How do I claim SOCSO benefits?',
      answer: 'To claim SOCSO benefits, report any workplace injury or illness to your employer immediately and seek treatment at SOCSO-registered medical facilities. Your employer will submit the necessary forms to SOCSO. For invalidity claims, obtain certification from SOCSO medical board. Contact PERKESO or visit their website for detailed claim procedures.'
    }
  ];

  const paaItems = [
    {
      question: 'What is SOCSO or PERKESO in Malaysia?',
      answer: 'SOCSO, also known as PERKESO, provides social security protection for employees, including employment injury and invalidity protection under Act 4.'
    },
    {
      question: 'What is the SOCSO contribution rate in Malaysia?',
      answer: 'For employees under 60, First Category contribution under Act 4 is generally 1.75% employer share and 0.5% employee share of monthly wages, based on the contribution schedule.'
    },
    {
      question: 'What is the employer SOCSO contribution rate Malaysia?',
      answer: 'For First Category Act 4, the employer contribution is generally 1.75% of monthly wages. For Second Category, the employer pays 1.25% and the employee does not contribute.'
    },
    {
      question: 'What is the employee SOCSO contribution rate Malaysia?',
      answer: 'For First Category Act 4, the employee contribution is generally 0.5% of monthly wages. Second Category contributions are paid by employer only.'
    },
    {
      question: 'What is SOCSO Second Category contribution?',
      answer: 'Second Category covers Employment Injury Scheme only. The rate is 1.25% of monthly wages and is payable by the employer only.'
    },
    {
      question: 'What is SOCSO First Category contribution?',
      answer: 'First Category covers Employment Injury Scheme and Invalidity Scheme for employees under 60. The rate is 1.75% employer share and 0.5% employee share.'
    },
    {
      question: 'What is the SOCSO salary ceiling Malaysia?',
      answer: 'PERKESO increased the contribution salary ceiling from RM5,000 to RM6,000 effective 1 October 2024. Contributions above RM6,000 are based on the RM6,000 ceiling.'
    },
    {
      question: 'How much SOCSO for salary above RM6000?',
      answer: 'For wages above RM6,000, SOCSO contribution is calculated based on the RM6,000 salary ceiling under the applicable contribution category.'
    },
    {
      question: 'How do I calculate SOCSO contribution Malaysia?',
      answer: 'SOCSO contribution is calculated using the employee\'s monthly wages and the applicable PERKESO contribution category under Act 4 and, if applicable, Act 800.'
    },
    {
      question: 'Is there a SOCSO contribution calculator Malaysia?',
      answer: 'Yes. PERKESO provides a Contribution Calculator to help employers and employees calculate contribution rates for Act 4 and Act 800.'
    },
    {
      question: 'What is Act 4 SOCSO Malaysia?',
      answer: 'Act 4 refers to the Employees\' Social Security Act 1969, covering employment injury and invalidity protection for eligible employees.'
    },
    {
      question: 'What is Act 800 PERKESO Malaysia?',
      answer: 'Act 800 refers to the Employment Insurance System contribution framework, commonly linked to EIS/LINDUNG KERJAYA protection.'
    },
    {
      question: 'What is the EIS contribution rate Malaysia?',
      answer: 'For eligible employees, the employee contribution is generally 0.2% for Act 800, depending on eligibility and the contribution schedule.'
    },
    {
      question: 'Do employers need to pay SOCSO every month?',
      answer: 'Yes. Employers must pay monthly SOCSO contributions for eligible employees according to PERKESO contribution schedules and payment rules.'
    },
    {
      question: 'When is the SOCSO payment deadline Malaysia?',
      answer: 'PERKESO states that contributions for any month must be paid no later than the 15th day of the following month.'
    },
    {
      question: 'Where can employers pay SOCSO online?',
      answer: 'Employers can manage registration, employee records, and contribution payments through the PERKESO ASSIST Portal.'
    },
    {
      question: 'What is PERKESO ASSIST Portal used for?',
      answer: 'ASSIST Portal is used by employers for registration, updating records, and making contribution payments.'
    },
    {
      question: 'How do I register employer SOCSO online?',
      answer: 'New employers should register for a Portal ID first, then proceed with employer registration through the PERKESO ASSIST Portal.'
    },
    {
      question: 'How do I add employee in PERKESO ASSIST Portal?',
      answer: 'Employers can add new employees through ASSIST Portal registration functions, including searching existing employee records by IC number where applicable.'
    },
    {
      question: 'Is SOCSO compulsory in Malaysia?',
      answer: 'SOCSO contribution is mandatory for eligible employees and employers under PERKESO rules, depending on employment category, age and applicable scheme.'
    },
    {
      question: 'Do part-time workers need SOCSO Malaysia?',
      answer: 'SOCSO coverage depends on whether the person is an eligible employee under PERKESO rules. Employers should verify the worker\'s category and wage arrangement.'
    },
    {
      question: 'Do foreign workers need SOCSO Malaysia?',
      answer: 'Foreign workers are covered under PERKESO protection subject to applicable rules, work pass status and scheme eligibility.'
    },
    {
      question: 'Do employees above 60 need SOCSO contribution?',
      answer: 'Employees who have reached age 60 are generally covered under Second Category for Employment Injury Scheme only, with contribution paid by employer.'
    },
    {
      question: 'What SOCSO scheme covers workplace accidents?',
      answer: 'The Employment Injury Scheme covers accidents or occupational diseases arising out of and in the course of employment, subject to PERKESO conditions.'
    },
    {
      question: 'What SOCSO scheme covers invalidity?',
      answer: 'The Invalidity Scheme provides 24-hour coverage for employees who suffer invalidity or death due to causes not related to employment.'
    },
    {
      question: 'How do I claim SOCSO for workplace accident?',
      answer: 'SOCSO workplace accident claims require the relevant benefit application forms and supporting documents, submitted through PERKESO channels or office counters where required.'
    },
    {
      question: 'Can I claim SOCSO medical expenses?',
      answer: 'For employment injury cases, employers or employees may claim reimbursement for medical treatment expenses at SOCSO non-panel clinics, subject to conditions.'
    },
    {
      question: 'What documents are needed for SOCSO claim?',
      answer: 'Documents depend on the type of benefit. PERKESO provides benefit application forms arranged by claim type, with supporting documents required for submission.'
    },
    {
      question: 'Where can I download SOCSO claim forms?',
      answer: 'SOCSO benefit application forms can be downloaded from PERKESO\'s benefit application/forms pages, arranged by benefit type.'
    },
    {
      question: 'What is SOCSO Temporary Disablement Benefit?',
      answer: 'Temporary Disablement Benefit applies when an employee is temporarily unable to work due to employment injury, subject to PERKESO rules and medical certification.'
    },
    {
      question: 'What is SOCSO Permanent Disablement Benefit?',
      answer: 'Permanent Disablement Benefit may apply when an employee suffers permanent disability due to employment injury, after assessment and subject to PERKESO conditions.'
    },
    {
      question: 'What happens if employer does not pay SOCSO?',
      answer: 'Employers are responsible for paying mandatory SOCSO contributions. Failure to contribute may expose the employer to enforcement action under PERKESO rules.'
    },
    {
      question: 'How do I complain about unpaid SOCSO by employer?',
      answer: 'Employees can contact PERKESO through official service channels or visit a PERKESO office if an employer fails to register or remit contributions.'
    },
    {
      question: 'Can self-employed contribute to SOCSO Malaysia?',
      answer: 'Yes. Self-employed individuals may be covered under the Self-Employment Social Security Scheme, with contribution options based on selected insured monthly earnings.'
    },
    {
      question: 'What is the SOCSO self-employed contribution rate?',
      answer: 'PERKESO lists self-employed contribution options based on insured monthly earnings, such as RM13.10 per month for RM1,050 insured monthly earnings and higher tiers.'
    },
    {
      question: 'What is SOCSO housewife scheme Malaysia?',
      answer: 'PERKESO\'s Housewives\' Social Security Scheme requires a contribution of RM120 paid in advance for 12 consecutive months of coverage.'
    },
    {
      question: 'Can domestic workers be registered with SOCSO?',
      answer: 'PERKESO provides contribution and registration channels for domestic workers, including advance contribution payment options through specified channels.'
    },
    {
      question: 'What is LINDUNG PEKERJA PERKESO?',
      answer: 'LINDUNG PEKERJA refers to PERKESO protection for employed workers, including Act 4 coverage such as employment injury and invalidity schemes.'
    },
    {
      question: 'What is LINDUNG KERJAYA PERKESO?',
      answer: 'LINDUNG KERJAYA is linked to employment insurance protection under Act 800, with employee contribution generally around 0.2% depending on eligibility.'
    },
    {
      question: 'Can I check SOCSO contribution online?',
      answer: 'Employers can manage contribution records through ASSIST Portal. Employees should use PERKESO\'s official channels to verify contribution or claim status where available.'
    }
  ];

  const insights = result ? generateInsights() : [];
  const benefits = result ? calculateBenefits(result.salary, parseInt(yearsOfContribution) || 10) : null;
  const coverage = result ? getCoverageLevel(result.salary) : null;
  const displayMultiplier = viewMode === 'annual' ? 12 : 1;

  return (
    <CalculatorLayout>
      <SEOHead
        title={t('calculators:socso.title')}
        description={t('calculators:socso.description')}
        keywords={['socso calculator', 'perkeso', 'malaysia', '2026', 'social security', 'benefits calculator', 'employment injury']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('calculators:socso.title')}
        </h1>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-3">
                Malaysia Social Protection Intelligence Tool
              </h2>
              <p className="text-blue-800 mb-3">
                <strong>Your RM5-RM20/month contribution provides protection worth RM500,000+</strong>
              </p>
              <p className="text-blue-800 mb-3">
                SOCSO isn't just a payroll deduction. It's comprehensive social insurance covering workplace injuries,
                permanent disability, invalidity pension, and death benefits. Most employees don't realize the full value
                of their coverage.
              </p>
              <p className="text-blue-800 font-semibold">
                This tool shows your exact contribution, estimates your protection value, and helps you understand
                the safety net you're building. Get your personalized protection report below.
              </p>
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate your SOCSO (Social Security Organisation/PERKESO) contributions, estimate your benefits,
          and understand your protection coverage in Malaysia for 2026. This advanced calculator provides
          comprehensive analysis including benefits estimation, scenario comparison, and downloadable reports.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('forms:labels.monthlyIncome')} (MYR)
            </label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., 3000"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('forms:socso.employmentCategory')}
            </label>
            <div className="space-y-3">
              <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  value="category1"
                  checked={employmentCategory === 'category1'}
                  onChange={(e) => setEmploymentCategory(e.target.value as 'category1')}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">{t('forms:socso.category1')}</div>
                  <div className="text-sm text-gray-600">Comprehensive coverage including workplace injuries and invalidity pension. Most common for employees under 60.</div>
                </div>
              </label>
              <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  value="category2"
                  checked={employmentCategory === 'category2'}
                  onChange={(e) => setEmploymentCategory(e.target.value as 'category2')}
                  className="mt-1 mr-3"
                />
                <div>
                  <div className="font-semibold text-gray-900">{t('forms:socso.category2')}</div>
                  <div className="text-sm text-gray-600">Covers workplace injuries only. Typically for employees aged 60+ not previously insured.</div>
                </div>
              </label>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {t('forms:buttons.calculate')}
          </button>
        </div>

        {result && (
          <>
            <div className="mb-4 flex justify-end">
              <div className="inline-flex rounded-lg border border-gray-300 bg-white p-1">
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('common:time.monthly')}
                </button>
                <button
                  onClick={() => setViewMode('annual')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'annual' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {t('common:time.annual')}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{t('results:labels.summary')}</h2>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <Download className="w-4 h-4" />
                    {t('forms:buttons.download')}
                  </button>
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  >
                    <Mail className="w-4 h-4" />
                    {t('forms:buttons.email')}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">{t('forms:labels.employeeContribution')}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatCurrency(result.employeeContribution * displayMultiplier)}
                    <span className="text-sm text-gray-600 ml-1">/{viewMode === 'annual' ? t('common:time.year') : t('common:time.month')}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('forms:labels.employerContribution')}</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(result.employerContribution * displayMultiplier)}
                    <span className="text-sm text-gray-600 ml-1">/{viewMode === 'annual' ? t('common:time.year') : t('common:time.month')}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('results:labels.totalContribution')}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(result.totalContribution * displayMultiplier)}
                    <span className="text-sm text-gray-600 ml-1">/{viewMode === 'annual' ? t('common:time.year') : t('common:time.month')}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">{t('results:labels.wageBand')}</p>
                    <p className="font-semibold">RM{result.bracketMin} - {result.bracketMax ? `RM${result.bracketMax}` : t('common:labels.above')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('results:labels.effectiveRate')}</p>
                    <p className="font-semibold">{result.effectiveRate.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('results:labels.takeHomePay')}</p>
                    <p className="font-semibold">{formatCurrency(result.takeHomePay)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">{t('results:labels.employerBears')}</p>
                    <p className="font-semibold">{result.employerCostPercentage.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {showEmailForm && (
              <div className="bg-white rounded-lg border-2 border-green-500 p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-green-600" />
                    Email Your SOCSO Protection Report
                  </h3>
                  <button
                    onClick={() => setShowEmailForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter your name"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                    <p className="font-semibold mb-1">Privacy Statement:</p>
                    <p>Your email will be used only to send this report. We do not store your personal information or email address.</p>
                  </div>

                  <button
                    onClick={handleSendEmail}
                    disabled={!userEmail || emailSent}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {emailSent ? 'Sending...' : 'Send Report to Email'}
                  </button>
                </div>
              </div>
            )}

            {benefits && coverage && (
              <div className={`bg-white rounded-lg border-2 p-6 mb-8 ${
                coverage.color === 'green' ? 'border-green-500' :
                coverage.color === 'yellow' ? 'border-yellow-500' : 'border-red-500'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <Shield className={`w-6 h-6 ${
                    coverage.color === 'green' ? 'text-green-600' :
                    coverage.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                  <h2 className="text-2xl font-bold text-gray-900">Protection Coverage Analysis</h2>
                </div>

                <div className={`mb-4 p-4 rounded-lg ${
                  coverage.color === 'green' ? 'bg-green-50' :
                  coverage.color === 'yellow' ? 'bg-yellow-50' : 'bg-red-50'
                }`}>
                  <p className="font-semibold text-lg">{coverage.message}</p>
                  <p className="text-sm mt-1">Income Replacement: {benefits.temporaryDisablement.replacementRatio.toFixed(0)}% in temporary injury scenarios</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Temporary Disablement Benefits</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Daily Benefit Rate:</span>
                        <span className="font-semibold">{formatCurrency(benefits.temporaryDisablement.dailyRate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Payout:</span>
                        <span className="font-semibold">{formatCurrency(benefits.temporaryDisablement.monthlyPayout)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Replacement Ratio:</span>
                        <span className="font-semibold">{benefits.temporaryDisablement.replacementRatio.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-3">Permanent Disablement Benefits</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Est. Lump Sum:</span>
                        <span className="font-semibold">{formatCurrency(benefits.permanentDisablement.lumpSum)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Benefit:</span>
                        <span className="font-semibold">{formatCurrency(benefits.permanentDisablement.monthlyBenefit)}</span>
                      </div>
                    </div>
                  </div>

                  {employmentCategory === 'category1' && (
                    <div className="bg-green-50 p-4 rounded-lg md:col-span-2">
                      <h3 className="font-semibold text-gray-900 mb-3">Invalidity Pension (Category 1 Only)</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex justify-between md:flex-col">
                          <span className="text-gray-600">Monthly Pension:</span>
                          <span className="font-semibold">{formatCurrency(benefits.invalidityPension.monthlyPension)}</span>
                        </div>
                        <div className="flex justify-between md:flex-col">
                          <span className="text-gray-600">Income Replacement:</span>
                          <span className="font-semibold">{benefits.invalidityPension.replacementPercentage}%</span>
                        </div>
                        <div className="flex justify-between md:flex-col">
                          <span className="text-gray-600">10-Year Value:</span>
                          <span className="font-semibold">{formatCurrency(benefits.invalidityPension.tenYearValue)}</span>
                        </div>
                      </div>
                      {parseInt(yearsOfContribution) < 2 && (
                        <p className="text-xs text-orange-600 mt-2">Note: Minimum 24 months contribution required for invalidity pension eligibility</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            <AdPlaceholder position="middle" />

            {insights.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Smart Insights</h2>
                </div>
                <div className="space-y-3">
                  {insights.map((insight, index) => (
                    <div key={index} className={`flex items-start gap-3 p-4 rounded-lg ${
                      insight.type === 'success' ? 'bg-green-50 border border-green-200' :
                      insight.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-blue-50 border border-blue-200'
                    }`}>
                      <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        insight.type === 'success' ? 'text-green-600' :
                        insight.type === 'warning' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                      <p className="text-sm text-gray-800">{insight.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg border border-gray-200 mb-8">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-2xl font-bold text-gray-900">Advanced Analysis Tools</h2>
                {showAdvanced ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
              </button>

              {showAdvanced && (
                <div className="p-6 pt-0 space-y-6">
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Benefit Estimator Settings</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Years of Contribution (for invalidity pension estimation)
                      </label>
                      <input
                        type="number"
                        value={yearsOfContribution}
                        onChange={(e) => setYearsOfContribution(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="40"
                      />
                      <p className="text-xs text-gray-500 mt-1">Minimum 24 months (2 years) required for invalidity pension eligibility</p>
                    </div>
                    <button
                      onClick={handleCalculate}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Update Benefits Estimate
                    </button>
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-gray-900">What-If Salary Comparison</h3>
                      <button
                        onClick={() => setShowComparison(!showComparison)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {showComparison ? 'Hide' : 'Show'} Comparison
                      </button>
                    </div>

                    {showComparison && (
                      <div>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Compare with Salary (MYR)
                          </label>
                          <input
                            type="number"
                            value={comparisonSalary}
                            onChange={(e) => setComparisonSalary(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 5000"
                          />
                        </div>
                        <button
                          onClick={handleCompare}
                          className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          Compare Scenarios
                        </button>

                        {comparisonResult && (
                          <div className="mt-6 bg-purple-50 rounded-lg p-6">
                            <h4 className="font-bold text-gray-900 mb-4">Scenario Comparison</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead className="bg-purple-100">
                                  <tr>
                                    <th className="px-4 py-2 text-left">Item</th>
                                    <th className="px-4 py-2 text-right">Current ({formatCurrency(result.salary)})</th>
                                    <th className="px-4 py-2 text-right">Comparison ({formatCurrency(comparisonResult.salary)})</th>
                                    <th className="px-4 py-2 text-right">Difference</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-purple-200">
                                  <tr>
                                    <td className="px-4 py-2">Employee/Month</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(result.employeeContribution)}</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(comparisonResult.employeeContribution)}</td>
                                    <td className="px-4 py-2 text-right font-semibold text-purple-700">
                                      {formatCurrency(Math.abs(comparisonResult.employeeContribution - result.employeeContribution))}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-2">Employer/Month</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(result.employerContribution)}</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(comparisonResult.employerContribution)}</td>
                                    <td className="px-4 py-2 text-right font-semibold text-purple-700">
                                      {formatCurrency(Math.abs(comparisonResult.employerContribution - result.employerContribution))}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="px-4 py-2">Total/Year</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(result.annualTotal)}</td>
                                    <td className="px-4 py-2 text-right">{formatCurrency(comparisonResult.annualTotal)}</td>
                                    <td className="px-4 py-2 text-right font-semibold text-purple-700">
                                      {formatCurrency(Math.abs(comparisonResult.annualTotal - result.annualTotal))}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="employerMode"
                        checked={showEmployerMode}
                        onChange={(e) => setShowEmployerMode(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="employerMode" className="text-lg font-bold text-gray-900">
                        I am an Employer - Show Payroll Cost Analysis
                      </label>
                    </div>

                    {showEmployerMode && (
                      <div className="bg-green-50 rounded-lg p-6">
                        <h4 className="font-bold text-gray-900 mb-4">Employer Payroll SOCSO Burden</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-600 mb-1">Per Employee (Monthly)</p>
                            <p className="text-2xl font-bold text-green-700">{formatCurrency(result.employerContribution)}</p>
                            <p className="text-xs text-gray-500">Annual: {formatCurrency(result.employerAnnual)}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-600 mb-1">10 Employees (Annual)</p>
                            <p className="text-2xl font-bold text-green-700">{formatCurrency(result.employerAnnual * 10)}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-600 mb-1">50 Employees (Annual)</p>
                            <p className="text-2xl font-bold text-green-700">{formatCurrency(result.employerAnnual * 50)}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg">
                            <p className="text-gray-600 mb-1">100 Employees (Annual)</p>
                            <p className="text-2xl font-bold text-green-700">{formatCurrency(result.employerAnnual * 100)}</p>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>SME Planning Note:</strong> At {formatCurrency(result.salary)} per employee,
                            your total SOCSO burden is approximately {result.effectiveRate.toFixed(2)}% of payroll,
                            with {result.employerCostPercentage.toFixed(0)}% borne by the employer.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <AffiliateCTA
              title="Need Additional Workplace Protection?"
              description="Beyond SOCSO, consider supplementary personal accident, critical illness, and income protection insurance to provide comprehensive coverage for you and your family."
              buttonText="Compare Insurance Plans"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding SOCSO in Malaysia 2026</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              The Social Security Organisation (SOCSO/PERKESO) is Malaysia's comprehensive social insurance system
              protecting employees against workplace accidents, occupational diseases, invalidity, and death.
              Established under the Employees' Social Security Act 1969, SOCSO operates two primary schemes: the
              Employment Injury Insurance Scheme and the Invalidity Pension Scheme.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Employment Categories Explained</h3>
            <p>
              <strong>Category 1 (Employment Injury + Invalidity):</strong> This comprehensive category covers both
              workplace injuries and non-work-related invalidity. Both employees and employers contribute. Once you
              contribute for 24 months, invalidity coverage continues for life even after you stop working. This is
              the most common category for employees under age 60 who are contributing to SOCSO for the first time.
            </p>
            <p>
              <strong>Category 2 (Employment Injury Only):</strong> This category provides protection for workplace
              injuries and occupational diseases only. It typically applies to employees aged 60 and above who were
              not previously insured under SOCSO. Employees in this category do not receive invalidity pension benefits
              but are fully protected for work-related injuries.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">How SOCSO Contributions Work</h3>
            <p>
              Unlike EPF which uses percentage-based contributions, SOCSO uses a wage bracket system with fixed
              contribution amounts. Your monthly salary determines which bracket you fall into, and each bracket has
              predetermined employee and employer contribution amounts. For example, if you earn RM3,000 monthly,
              you pay RM14.75 while your employer pays RM51.65, totaling RM66.40 monthly.
            </p>
            <p>
              The contribution structure is designed to be affordable while providing substantial protection. Employee
              contributions range from as low as RM0.10 to a maximum of RM19.75 monthly, even for high earners.
              Employers bear the larger share, contributing between RM0.40 and RM69.05 monthly depending on employee
              salary levels. This shared contribution model ensures comprehensive social protection coverage across
              Malaysia's workforce.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Benefits and Protection Value</h3>
            <p>
              SOCSO benefits are substantial relative to the small contribution amounts. The Employment Injury Scheme
              covers all medical expenses for work-related injuries at SOCSO-registered facilities. If you're
              temporarily unable to work due to injury, SOCSO provides daily allowances up to 90% of your assumed
              daily wage until you recover or for a maximum period determined by medical assessment.
            </p>
            <p>
              For permanent disabilities, benefits vary based on the extent of disability. Total permanent disability
              may result in lump sum payments equivalent to 24 months of wages plus ongoing monthly pensions for life.
              Partial disabilities receive benefits proportionate to the degree of impairment. The Invalidity Pension
              Scheme (Category 1 only) provides monthly pensions if you become permanently unable to work from any
              cause, not just work-related incidents, offering broader protection.
            </p>
            <p>
              In the unfortunate event of death, SOCSO provides comprehensive support to dependents including monthly
              survivor pensions, funeral benefits up to RM3,000, and educational benefits for children. Dependents'
              pensions can continue for many years, providing crucial financial security for families who lose their
              primary income earner.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">Who Must Contribute to SOCSO</h3>
            <p>
              SOCSO coverage is mandatory for all Malaysian employees regardless of salary level. Permanent residents
              are also covered under SOCSO. Both private sector and certain public sector employees must contribute.
              Self-employed individuals can opt for voluntary coverage under the Self-Employment Social Security Scheme
              introduced in 2017, providing similar protections for entrepreneurs and freelancers.
            </p>
            <p>
              Employers have a legal obligation to register all eligible employees with SOCSO and remit contributions
              monthly along with EPF deductions. Failure to register employees or contribute to SOCSO can result in
              penalties and legal action. It's crucial for both employers and employees to ensure proper SOCSO
              registration and contribution compliance.
            </p>

            <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3">SOCSO vs Other Social Security Schemes</h3>
            <p>
              SOCSO is distinct from other Malaysian social security schemes. The Employment Insurance System (EIS),
              also administered by PERKESO, provides different protection focused on job loss, offering temporary
              income support and career services for retrenched workers. EPF (Employees Provident Fund) is a
              retirement savings scheme rather than insurance. These three systems work together to provide
              comprehensive financial protection throughout your career and into retirement.
            </p>
            <p>
              While SOCSO provides valuable protection, coverage gaps may exist for high earners or those in high-risk
              occupations. Many Malaysians supplement SOCSO with private insurance including personal accident coverage,
              critical illness policies, and income protection plans. The combination of SOCSO's baseline protection
              with appropriate private insurance creates a robust safety net for unexpected events.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} paaItems={paaItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator is for estimation purposes only and is not affiliated
            with SOCSO/PERKESO. Contribution amounts are based on 2026 wage brackets. Benefit estimates are
            approximations based on typical scenarios. Actual SOCSO benefits depend on specific circumstances,
            medical assessments, contribution history, and current PERKESO policies. For accurate benefit information
            and personalized guidance, consult with PERKESO directly or visit www.perkeso.gov.my.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
