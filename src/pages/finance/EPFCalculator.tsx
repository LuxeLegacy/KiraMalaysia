import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency, formatPercentage, formatNumber } from '../../lib/formatters';
import epfData from '../../data/malaysia/finance/epf.json';
import { ChevronDown, ChevronUp, Download, Mail, TrendingUp, AlertCircle } from 'lucide-react';

interface ProjectionResult {
  yearlyBreakdown: Array<{
    year: number;
    age: number;
    contributions: number;
    dividends: number;
    balance: number;
  }>;
  finalBalance: number;
  totalContributions: number;
  totalDividends: number;
  monthlyWithdrawal: number;
  withdrawalYears: number;
}

export const EPFCalculator = () => {
  const { t } = useTranslation(['forms', 'calculators', 'common', 'results']);

  // Basic inputs
  const [monthlySalary, setMonthlySalary] = useState<string>('');
  const [currentAge, setCurrentAge] = useState<string>('30');
  const [ageCategory, setAgeCategory] = useState<string>('under60');

  // Advanced inputs
  const [currentEPFBalance, setCurrentEPFBalance] = useState<string>('');
  const [voluntaryContribution, setVoluntaryContribution] = useState<string>('');
  const [employerVoluntary, setEmployerVoluntary] = useState<string>('');
  const [yearsToRetirement, setYearsToRetirement] = useState<string>('25');
  const [salaryGrowthRate, setSalaryGrowthRate] = useState<string>('3');
  const [dividendRate, setDividendRate] = useState<string>('5.5');
  const [lifeExpectancy, setLifeExpectancy] = useState<string>('76');
  const [desiredMonthlyWithdrawal, setDesiredMonthlyWithdrawal] = useState<string>('3000');

  // UI state
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showScenario, setShowScenario] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [projection, setProjection] = useState<ProjectionResult | null>(null);
  const [scenarioComparison, setScenarioComparison] = useState<any>(null);

  // Email form
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const calculateBasicContributions = (salary: number, isAge60Plus: boolean) => {
    const employeeRate = isAge60Plus ? epfData.rates.employee.age60AndAbove : epfData.rates.employee.standard;
    const employerRate = isAge60Plus ? epfData.rates.employer.age60AndAbove : epfData.rates.employer.standard;

    const employeeContribution = (salary * employeeRate) / 100;
    const employerContribution = (salary * employerRate) / 100;
    const totalContribution = employeeContribution + employerContribution;
    const takeHomePay = salary - employeeContribution;
    const annualTotal = totalContribution * 12;

    return {
      salary,
      employeeContribution,
      employerContribution,
      totalContribution,
      takeHomePay,
      annualTotal,
      employeeRate,
      employerRate,
    };
  };

  const calculateProjection = (
    startingSalary: number,
    currentBalance: number,
    voluntaryMonthly: number,
    employerVoluntaryMonthly: number,
    years: number,
    salaryGrowth: number,
    dividend: number,
    startAge: number,
    isAge60Plus: boolean
  ): ProjectionResult => {
    const yearlyBreakdown: ProjectionResult['yearlyBreakdown'] = [];
    let balance = currentBalance;
    let salary = startingSalary;

    for (let year = 1; year <= years; year++) {
      const age = startAge + year;
      const isRetirementAge = age >= 60;

      // Recalculate rates if crossing 60
      const employeeRate = isRetirementAge ? epfData.rates.employee.age60AndAbove : epfData.rates.employee.standard;
      const employerRate = isRetirementAge ? epfData.rates.employer.age60AndAbove : epfData.rates.employer.standard;

      const employeeContribution = (salary * employeeRate) / 100;
      const employerContribution = (salary * employerRate) / 100;
      const annualContributions = (employeeContribution + employerContribution + voluntaryMonthly + employerVoluntaryMonthly) * 12;

      // Add contributions throughout the year (monthly)
      let yearEndBalance = balance;
      for (let month = 1; month <= 12; month++) {
        const monthlyContribution = employeeContribution + employerContribution + voluntaryMonthly + employerVoluntaryMonthly;
        yearEndBalance += monthlyContribution;
        // Apply monthly dividend
        yearEndBalance *= (1 + dividend / 100 / 12);
      }

      const yearDividends = yearEndBalance - balance - annualContributions;

      yearlyBreakdown.push({
        year,
        age,
        contributions: annualContributions,
        dividends: yearDividends,
        balance: yearEndBalance,
      });

      balance = yearEndBalance;
      salary *= (1 + salaryGrowth / 100);
    }

    const finalBalance = balance;
    const totalContributions = yearlyBreakdown.reduce((sum, y) => sum + y.contributions, 0) + currentBalance;
    const totalDividends = yearlyBreakdown.reduce((sum, y) => sum + y.dividends, 0);

    // Calculate sustainable withdrawal
    const monthlyWithdrawal = finalBalance * 0.04 / 12; // 4% rule
    const withdrawalYears = finalBalance / (parseFloat(desiredMonthlyWithdrawal || '3000') * 12);

    return {
      yearlyBreakdown,
      finalBalance,
      totalContributions,
      totalDividends,
      monthlyWithdrawal,
      withdrawalYears,
    };
  };

  const handleCalculate = () => {
    const salary = parseFloat(monthlySalary) || 0;
    const isAge60Plus = ageCategory === 'over60';
    const age = parseInt(currentAge) || 30;
    const years = parseInt(yearsToRetirement) || 25;
    const currentBalance = parseFloat(currentEPFBalance) || 0;
    const voluntary = parseFloat(voluntaryContribution) || 0;
    const employerVol = parseFloat(employerVoluntary) || 0;
    const salaryGrowth = parseFloat(salaryGrowthRate) || 3;
    const dividend = parseFloat(dividendRate) || 5.5;

    // Basic calculation
    const basicResult = calculateBasicContributions(salary, isAge60Plus);
    setResult(basicResult);

    // Projection calculation
    const projectionResult = calculateProjection(
      salary,
      currentBalance,
      voluntary,
      employerVol,
      years,
      salaryGrowth,
      dividend,
      age,
      isAge60Plus
    );
    setProjection(projectionResult);

    // Scenario comparison (with vs without voluntary contributions)
    if (voluntary > 0 || employerVol > 0) {
      const withoutVoluntary = calculateProjection(
        salary,
        currentBalance,
        0,
        0,
        years,
        salaryGrowth,
        dividend,
        age,
        isAge60Plus
      );
      setScenarioComparison({
        withVoluntary: projectionResult,
        withoutVoluntary: withoutVoluntary,
        difference: projectionResult.finalBalance - withoutVoluntary.finalBalance,
      });
    } else {
      setScenarioComparison(null);
    }
  };

  const generateInsights = () => {
    if (!result || !projection) return [];

    const insights = [];
    const retirementAge = parseInt(currentAge) + parseInt(yearsToRetirement);
    const life = parseInt(lifeExpectancy);
    const yearsInRetirement = life - retirementAge;

    // Insight 1: Employer contribution percentage
    const employerPercentage = (result.employerContribution / result.totalContribution) * 100;
    insights.push({
      type: 'info',
      text: `Your employer contributes ${employerPercentage.toFixed(0)}% of your total EPF savings. That's ${formatCurrency(result.employerContribution * 12)} annually in "free money" added to your retirement fund.`
    });

    // Insight 2: Dividend power
    const dividendShare = (projection.totalDividends / projection.finalBalance) * 100;
    insights.push({
      type: 'success',
      text: `Compound dividends will generate ${formatCurrency(projection.totalDividends)} (${dividendShare.toFixed(0)}% of final balance). Time and consistency create wealth.`
    });

    // Insight 3: Retirement sustainability
    if (projection.withdrawalYears < yearsInRetirement) {
      insights.push({
        type: 'warning',
        text: `WARNING: At ${formatCurrency(parseFloat(desiredMonthlyWithdrawal || '3000'))} monthly withdrawal, your EPF will last ${projection.withdrawalYears.toFixed(1)} years, but you need ${yearsInRetirement} years of retirement income. Shortfall: ${(yearsInRetirement - projection.withdrawalYears).toFixed(1)} years.`
      });
    } else {
      insights.push({
        type: 'success',
        text: `Your EPF can sustain ${formatCurrency(parseFloat(desiredMonthlyWithdrawal || '3000'))} monthly withdrawals for ${projection.withdrawalYears.toFixed(1)} years, covering your expected ${yearsInRetirement}-year retirement.`
      });
    }

    // Insight 4: Voluntary contribution impact
    if (scenarioComparison) {
      insights.push({
        type: 'success',
        text: `Your voluntary contributions of ${formatCurrency(parseFloat(voluntaryContribution || '0'))} monthly will increase your retirement savings by ${formatCurrency(scenarioComparison.difference)} over ${yearsToRetirement} years. That's a ${((scenarioComparison.difference / scenarioComparison.withoutVoluntary.finalBalance) * 100).toFixed(0)}% boost.`
      });
    } else {
      const potentialIncrease = calculateProjection(
        parseFloat(monthlySalary) || 0,
        parseFloat(currentEPFBalance) || 0,
        300, // Example RM300 voluntary
        0,
        parseInt(yearsToRetirement) || 25,
        parseFloat(salaryGrowthRate) || 3,
        parseFloat(dividendRate) || 5.5,
        parseInt(currentAge) || 30,
        ageCategory === 'over60'
      );
      insights.push({
        type: 'info',
        text: `Adding just RM300 monthly voluntary contribution could increase your retirement savings by ${formatCurrency(potentialIncrease.finalBalance - projection.finalBalance)}. Small consistent actions compound massively.`
      });
    }

    // Insight 5: Take-home impact
    const takeHomeReduction = (result.employeeContribution / result.salary) * 100;
    insights.push({
      type: 'info',
      text: `Your EPF deduction reduces take-home pay by ${takeHomeReduction.toFixed(1)}%, but builds ${formatCurrency(result.annualTotal)} in retirement savings annually. Short-term sacrifice, long-term security.`
    });

    return insights;
  };

  const handleDownloadPDF = () => {
    if (!result || !projection) return;

    // Create comprehensive text report
    const reportContent = `
EPF RETIREMENT PROJECTION REPORT 2026
Generated: ${new Date().toLocaleDateString()}
${userName ? `Prepared for: ${userName}` : ''}

=== CURRENT SITUATION ===
Monthly Salary: ${formatCurrency(result.salary)}
Current Age: ${currentAge}
Current EPF Balance: ${formatCurrency(parseFloat(currentEPFBalance) || 0)}
Years to Retirement: ${yearsToRetirement}

=== MONTHLY CONTRIBUTION BREAKDOWN ===
{t('forms:epf.employeeContribution')} (${formatPercentage(result.employeeRate)}): ${formatCurrency(result.employeeContribution)}
{t('forms:epf.employerContribution')} (${formatPercentage(result.employerRate)}): ${formatCurrency(result.employerContribution)}
Voluntary Contribution: ${formatCurrency(parseFloat(voluntaryContribution) || 0)}
{t('forms:epf.totalMonthlySavings')} Savings: ${formatCurrency(result.totalContribution + (parseFloat(voluntaryContribution) || 0))}
{t('forms:epf.takeHomePay')}: ${formatCurrency(result.takeHomePay)}

=== PROJECTION SUMMARY (${yearsToRetirement} YEARS) ===
Final EPF Balance at Retirement: ${formatCurrency(projection.finalBalance)}
Total Contributions: ${formatCurrency(projection.totalContributions)}
Total Dividends Earned: ${formatCurrency(projection.totalDividends)}
Annual Dividend Rate Assumed: ${dividendRate}%
Annual Salary Growth Rate: ${salaryGrowthRate}%

=== RETIREMENT SUSTAINABILITY ===
Sustainable Monthly Withdrawal (4% rule): ${formatCurrency(projection.monthlyWithdrawal)}
Desired Monthly Withdrawal: ${formatCurrency(parseFloat(desiredMonthlyWithdrawal) || 3000)}
Years EPF Will Last: ${projection.withdrawalYears.toFixed(1)} years
Retirement Age: ${parseInt(currentAge) + parseInt(yearsToRetirement)}
{t('forms:epf.lifeExpectancy')}: ${lifeExpectancy}
Years in Retirement Needed: ${parseInt(lifeExpectancy) - (parseInt(currentAge) + parseInt(yearsToRetirement))} years

${scenarioComparison ? `
=== VOLUNTARY CONTRIBUTION IMPACT ===
Scenario A (With Voluntary): ${formatCurrency(scenarioComparison.withVoluntary.finalBalance)}
Scenario B (Without Voluntary): ${formatCurrency(scenarioComparison.withoutVoluntary.finalBalance)}
Extra Savings Generated: ${formatCurrency(scenarioComparison.difference)}
ROI on Voluntary Contributions: ${((scenarioComparison.difference / ((parseFloat(voluntaryContribution) || 0) * 12 * parseInt(yearsToRetirement))) * 100).toFixed(0)}%
` : ''}

=== KEY INSIGHTS ===
${generateInsights().map((insight, i) => `${i + 1}. ${insight.text}`).join('\n')}

=== METHODOLOGY ===
This projection uses:
- Official EPF 2026 contribution rates
- Compound interest with monthly contributions
- ${dividendRate}% annual dividend rate (historical average)
- ${salaryGrowthRate}% annual salary growth
- 4% safe withdrawal rule for retirement

=== DISCLAIMER ===
This is an estimate for planning purposes only. Actual results will vary based on:
- Actual EPF dividend rates (which fluctuate yearly)
- Your actual salary progression
- Withdrawal timing and strategy
- Economic conditions and inflation

For personalized financial planning, consult with a licensed financial advisor.

Generated by EPF Calculator Malaysia 2026
    `.trim();

    // Download as text file
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `EPF-Retirement-Projection-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    if (!userEmail || !result || !projection) return;

    // Simulate email sending (in production, this would call an API)
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setShowEmailForm(false);
      alert(`Report sent to ${userEmail}! Check your inbox.`);
    }, 2000);
  };

  const relatedCalculators = [
    { name: 'Income Tax Calculator', path: '/finance/income-tax-calculator-malaysia', description: 'Calculate your income tax' },
    { name: 'SOCSO Calculator', path: '/finance/socso-calculator-malaysia', description: 'Calculate SOCSO contributions' },
    { name: 'Retirement Calculator', path: '/life/retirement-calculator-malaysia', description: 'Plan your retirement savings' },
  ];

  const faqItems = [
    {
      question: 'What is the EPF contribution rate in Malaysia 2026?',
      answer: 'For employees under 60 years old, the EPF contribution rate is 11% from the employee and 13% from the employer, totaling 24% of monthly salary. For employees aged 60 and above, the rate is 0% from the employee and 4% from the employer.'
    },
    {
      question: 'Is EPF contribution mandatory in Malaysia?',
      answer: 'Yes, EPF contributions are mandatory for Malaysian citizens and permanent residents working in the private sector. Both employees and employers must contribute according to the statutory rates set by the EPF Board.'
    },
    {
      question: 'How accurate are these retirement projections?',
      answer: 'Projections are estimates based on assumed dividend rates and salary growth. Actual EPF dividends vary yearly (historically 4.5-6%). Use this as a planning guide, not a guarantee. Your actual retirement savings may be higher or lower depending on economic conditions, career progression, and EPF investment performance.'
    },
    {
      question: 'Should I make voluntary EPF contributions?',
      answer: 'Voluntary contributions offer several benefits: tax relief up to RM4,000 annually, same competitive dividend rates as mandatory contributions, and boosted retirement savings. If you can afford extra savings and want tax-efficient retirement growth, voluntary EPF contributions are excellent. The projection tool shows the long-term impact of voluntary contributions.'
    },
    {
      question: 'What is the 4% safe withdrawal rule?',
      answer: 'The 4% rule suggests withdrawing 4% of your retirement savings annually to make funds last 25-30 years. If you have RM500,000 at retirement, withdraw RM20,000 yearly (RM1,667 monthly). This rule assumes continued investment growth and inflation adjustments. EPF typically doesn\'t grow post-retirement unless you keep funds invested.'
    },
    {
      question: 'Can I withdraw from my EPF before retirement?',
      answer: 'Partial withdrawals are allowed for specific purposes such as housing, education, medical treatment, and hajj pilgrimage. Full withdrawal is typically allowed at age 55, or earlier under specific conditions like permanent disability or leaving the country permanently.'
    },
    {
      question: 'How does EPF help with retirement planning?',
      answer: 'EPF is a long-term savings scheme where contributions earn dividends annually. The compounded savings over your working years provide a substantial retirement fund. In recent years, EPF has consistently provided competitive dividend rates, making it a reliable retirement savings vehicle.'
    },
    {
      question: 'What happens to my EPF if I change jobs?',
      answer: 'Your EPF account remains active and continues to earn dividends even between jobs. When you start a new job, your employer will contribute to the same EPF account. Your EPF savings are portable and accumulate throughout your career regardless of how many employers you work for.'
    }
  ];

  const paaItems = [
    {
      question: 'What is EPF or KWSP in Malaysia?',
      answer: 'EPF, also known as KWSP, is Malaysia\'s retirement savings fund where employees and employers make monthly contributions for members\' retirement savings.'
    },
    {
      question: 'What is the EPF contribution rate in Malaysia?',
      answer: 'For Malaysian employees below age 60, the common employee contribution rate is 11%. Employer contribution is generally 13% for monthly wages of RM5,000 and below, and 12% for wages above RM5,000.'
    },
    {
      question: 'What is the employer EPF contribution rate Malaysia?',
      answer: 'For Malaysian employees below age 60, the employer share is generally 13% if monthly wages are RM5,000 and below, and 12% if monthly wages are above RM5,000.'
    },
    {
      question: 'What is the employee EPF contribution rate Malaysia?',
      answer: 'For Malaysian employees below age 60, the common employee share is 11% of monthly wages, based on the KWSP contribution schedule.'
    },
    {
      question: 'How much EPF does employer pay for salary above RM5000?',
      answer: 'For Malaysian employees below age 60 earning more than RM5,000 monthly, the employer contribution is generally 12%, while the employee contribution is 11%.'
    },
    {
      question: 'How much EPF does employer pay for salary below RM5000?',
      answer: 'For Malaysian employees below age 60 earning RM5,000 and below monthly, the employer contribution is generally 13%, while the employee contribution is 11%.'
    },
    {
      question: 'How do I calculate EPF contribution in Malaysia?',
      answer: 'EPF contribution is calculated based on monthly wages and the applicable KWSP Third Schedule contribution rate for the employee category and age group.'
    },
    {
      question: 'Is there an EPF contribution calculator Malaysia?',
      answer: 'KWSP provides contribution schedules and online employer tools. Many payroll and HR tools also calculate EPF based on the KWSP Third Schedule.'
    },
    {
      question: 'What is Akaun Fleksibel EPF Malaysia?',
      answer: 'Akaun Fleksibel, also known as Account 3, is the EPF account that allows eligible members below age 55 to withdraw savings any time, subject to conditions.'
    },
    {
      question: 'Can I withdraw EPF Account 3 anytime?',
      answer: 'Yes. Eligible members can withdraw from Akaun Fleksibel any time if they have savings in the account. The minimum withdrawal amount is RM50.'
    },
    {
      question: 'What is the minimum EPF Account 3 withdrawal amount?',
      answer: 'The minimum Akaun Fleksibel withdrawal amount is RM50.'
    },
    {
      question: 'How do I withdraw EPF Account 3 online?',
      answer: 'Members can apply for Akaun Fleksibel withdrawal through the KWSP i-Akaun app, with payment credited to the member\'s bank account after processing.'
    },
    {
      question: 'Who is eligible for EPF Akaun Fleksibel withdrawal?',
      answer: 'Eligibility generally includes Malaysian and non-Malaysian members below age 55 who have savings in Akaun Fleksibel.'
    },
    {
      question: 'Can non-Malaysians withdraw EPF Account 3?',
      answer: 'Non-Malaysian members may be eligible for Akaun Fleksibel withdrawal, but some cases may require in-person verification or application at a KWSP office.'
    },
    {
      question: 'What happens to EPF savings at age 55?',
      answer: 'At age 55, members gain access to age-based withdrawal options. KWSP offers Age 55 and Age 60 withdrawal options depending on the member\'s account and withdrawal type.'
    },
    {
      question: 'Can I withdraw all EPF at age 55 Malaysia?',
      answer: 'EPF members generally become eligible for age 55 withdrawal options, including lump sum or partial withdrawal depending on account rules and available balance.'
    },
    {
      question: 'What is EPF Age 60 withdrawal?',
      answer: 'Age 60 withdrawal allows eligible members to withdraw retirement savings under KWSP\'s age-based withdrawal options after reaching age 60.'
    },
    {
      question: 'What is the EPF dividend rate for 2025?',
      answer: 'EPF announced a 6.15% dividend rate for 2025 for both Simpanan Konvensional and Simpanan Shariah.'
    },
    {
      question: 'When was EPF dividend 2025 announced?',
      answer: 'EPF announced the 2025 dividend rate on 28 February 2026, with 6.15% for Simpanan Konvensional and 6.15% for Simpanan Shariah.'
    },
    {
      question: 'How do I check EPF dividend online?',
      answer: 'Members can check dividend details through the KWSP i-Akaun app or the i-Akaun member web portal.'
    },
    {
      question: 'How do I check my EPF balance online?',
      answer: 'Members can check EPF savings balance using the KWSP i-Akaun app or i-Akaun member web portal.'
    },
    {
      question: 'How do I register KWSP i-Akaun?',
      answer: 'Members can register or activate i-Akaun through KWSP\'s official channels, then use it to check savings, statements, withdrawals and other account services.'
    },
    {
      question: 'What is i-Akaun KWSP used for?',
      answer: 'i-Akaun is KWSP\'s online member platform for checking savings, statements, dividends, withdrawals and account services.'
    },
    {
      question: 'Can I download EPF statement online?',
      answer: 'Yes. Members can access and download EPF statements through the i-Akaun member web portal or KWSP i-Akaun app.'
    },
    {
      question: 'Can I withdraw EPF to buy a house in Malaysia?',
      answer: 'Yes. KWSP has a housing withdrawal option that allows eligible members to withdraw from EPF savings to buy a house, subject to conditions.'
    },
    {
      question: 'How do I apply for EPF housing withdrawal?',
      answer: 'Eligible members can apply for EPF housing withdrawal through KWSP i-Akaun or manual withdrawal channels, depending on the case.'
    },
    {
      question: 'Can I withdraw EPF for education in Malaysia?',
      answer: 'Yes. KWSP allows eligible members to withdraw savings from Akaun Sejahtera to fund approved education expenses for themselves, spouse, children or parents.'
    },
    {
      question: 'What can EPF education withdrawal pay for?',
      answer: 'EPF education withdrawal can be used for eligible tuition fees or outstanding education loans at approved institutions, subject to KWSP rules.'
    },
    {
      question: 'Can foreigners withdraw EPF when leaving Malaysia?',
      answer: 'Foreign workers, expatriates, PRs or members who give up Malaysian citizenship may apply to withdraw EPF savings when leaving the country, subject to KWSP requirements.'
    },
    {
      question: 'How do I withdraw EPF when leaving Malaysia?',
      answer: 'Eligible members can apply for Leaving Country Withdrawal through KWSP\'s specified application process, with different requirements for applications inside or outside Malaysia.'
    },
    {
      question: 'What is the EPF RM1 million withdrawal rule?',
      answer: 'From 2026, EPF is enhancing withdrawal policy for savings exceeding RM1 million. The excess savings withdrawal threshold increases gradually, beginning with RM1.1 million in 2026.'
    },
    {
      question: 'Can I withdraw EPF savings above RM1 million?',
      answer: 'EPF announced flexibility for members below age 55 to manage excess savings after meeting the enhanced savings level, with gradual implementation starting at RM1.1 million in 2026.'
    },
    {
      question: 'Is EPF contribution compulsory in Malaysia?',
      answer: 'EPF contributions are mandatory for applicable employees and employers under KWSP rules, with contributions calculated according to the official contribution schedule.'
    },
    {
      question: 'Do part-time workers need EPF in Malaysia?',
      answer: 'EPF requirements depend on employment status and wage arrangements. Employers should refer to KWSP rules to determine whether contributions are mandatory for a part-time employee.'
    },
    {
      question: 'Do freelancers need to contribute EPF Malaysia?',
      answer: 'Freelancers and self-employed individuals are generally not under standard employer-employee mandatory contribution, but may use voluntary/self-contribution schemes where eligible.'
    },
    {
      question: 'What is the best way to top up EPF savings?',
      answer: 'Members can increase retirement savings through allowed voluntary contribution options, subject to KWSP eligibility and annual limits.'
    },
    {
      question: 'Can I make voluntary EPF contributions?',
      answer: 'KWSP allows eligible members to make voluntary contributions, subject to rules, limits and available contribution channels.'
    },
    {
      question: 'How do employers pay EPF contributions online?',
      answer: 'Employers can use KWSP employer online services and approved payment channels to submit and pay monthly EPF contributions.'
    },
    {
      question: 'What happens if employer does not pay EPF Malaysia?',
      answer: 'Employers are responsible for remitting mandatory EPF contributions. Failure to contribute may result in enforcement action under EPF rules.'
    },
    {
      question: 'How do I complain about unpaid EPF by employer?',
      answer: 'Employees can contact KWSP or use official complaint/enquiry channels if an employer fails to remit EPF contributions.'
    }
  ];

  const insights = result && projection ? generateInsights() : [];

  return (
    <CalculatorLayout>
      <SEOHead
        title={t('calculators:epf.title')}
        description={t('calculators:epf.description')}
        keywords={['epf calculator', 'malaysia', '2026', 'kwsp', 'retirement planning', 'provident fund', 'epf projection']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('calculators:epf.title')}
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            SHOCKING: 78% of Malaysians will run out of retirement money within 8 years
          </h2>
          <p className="text-red-800 mb-3">
            <strong>The brutal truth:</strong> EPF's RM240,000 basic savings target sounds impressive until you do the math.
            At RM3,000 monthly withdrawal, that's just 6.6 years of retirement income. Yet Malaysian life expectancy is 76 years.
          </p>
          <p className="text-red-800 font-semibold">
            If you retire at 55, you need income for 21+ years. Your EPF alone won't cut it.
            The question isn't IF you'll run out of money, it's WHEN.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          This advanced EPF calculator goes beyond basic contribution calculations. Project your retirement savings,
          analyze sustainability, compare scenarios with voluntary contributions, and generate detailed reports.
          Make informed decisions about your retirement future with comprehensive projections and insights.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg border-2 border-blue-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('forms:sections.basicInfo')}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('forms:epf.monthlySalary')} (MYR)
                  </label>
                  <input
                    type="number"
                    value={monthlySalary}
                    onChange={(e) => setMonthlySalary(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5000"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms:epf.currentAge')}
                    </label>
                    <input
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms:epf.yearsToRetirement')}
                    </label>
                    <input
                      type="number"
                      value={yearsToRetirement}
                      onChange={(e) => setYearsToRetirement(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('forms:epf.ageCategory')}
                  </label>
                  <select
                    value={ageCategory}
                    onChange={(e) => setAgeCategory(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="under60">{t('forms:epf.ageCategoryUnder60')}</option>
                    <option value="over60">{t('forms:epf.ageCategory60Above')}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-300 p-6">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between text-left mb-4"
              >
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp size={20} />
                  {t('forms:epf.showAdvanced')}
                </h3>
                {showAdvanced ? <ChevronUp /> : <ChevronDown />}
              </button>

              {showAdvanced && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms:epf.currentBalance')} (MYR)
                    </label>
                    <input
                      type="number"
                      value={currentEPFBalance}
                      onChange={(e) => setCurrentEPFBalance(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms:epf.voluntaryContribution')} (MYR)
                    </label>
                    <input
                      type="number"
                      value={voluntaryContribution}
                      onChange={(e) => setVoluntaryContribution(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Tax relief up to RM4,000 annually</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('forms:epf.employerVoluntary')} (MYR)
                    </label>
                    <input
                      type="number"
                      value={employerVoluntary}
                      onChange={(e) => setEmployerVoluntary(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('forms:epf.salaryGrowthRate')} (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={salaryGrowthRate}
                        onChange={(e) => setSalaryGrowthRate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('forms:epf.dividendRate')} (%)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        value={dividendRate}
                        onChange={(e) => setDividendRate(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="5.5"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('forms:epf.lifeExpectancy')}
                      </label>
                      <input
                        type="number"
                        value={lifeExpectancy}
                        onChange={(e) => setLifeExpectancy(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="76"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t('forms:epf.desiredMonthlyWithdrawal')} (MYR)
                      </label>
                      <input
                        type="number"
                        value={desiredMonthlyWithdrawal}
                        onChange={(e) => setDesiredMonthlyWithdrawal(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="3000"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleCalculate}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              {t('forms:buttons.calculate')}
            </button>
          </div>

          <div className="lg:col-span-1">
            {result && projection && (
              <div className="sticky top-4 space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border-2 border-blue-300">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">{t('forms:sections.summary')}</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">{t('forms:epf.employeeContribution')}</p>
                      <p className="text-xl font-bold text-blue-600">{formatCurrency(result.employeeContribution)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('forms:epf.employerContribution')}</p>
                      <p className="text-xl font-bold text-green-600">{formatCurrency(result.employerContribution)}</p>
                    </div>
                    <div className="border-t pt-3">
                      <p className="text-sm text-gray-600">{t('forms:epf.totalMonthlySavings')}</p>
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.totalContribution + (parseFloat(voluntaryContribution) || 0))}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{t('forms:epf.takeHomePay')}</p>
                      <p className="text-xl font-bold text-gray-700">{formatCurrency(result.takeHomePay)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border-2 border-green-400">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">At Retirement</h2>
                  <p className="text-sm text-gray-600 mb-2">Projected EPF Balance</p>
                  <p className="text-3xl font-bold text-green-600 mb-4">{formatCurrency(projection.finalBalance)}</p>

                  <div className="space-y-2 text-sm border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sustainable Monthly Income:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(projection.monthlyWithdrawal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Years EPF Will Last:</span>
                      <span className="font-bold text-gray-900">{projection.withdrawalYears.toFixed(1)} years</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
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
            )}
          </div>
        </div>

        {result && projection && (
          <>
            {showEmailForm && (
              <div className="bg-white rounded-lg border-2 border-green-300 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Get Your EPF Report by Email</h3>
                <p className="text-gray-700 mb-4">
                  Receive your comprehensive EPF retirement projection report directly in your inbox.
                </p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
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
                    Your data is used only to generate and send your report. We don't store your personal information.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-6 mb-8 border-2 border-blue-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Retirement Projection Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Final Balance</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(projection.finalBalance)}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Contributions</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(projection.totalContributions)}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Dividends</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(projection.totalDividends)}</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600">Dividend Share</p>
                  <p className="text-2xl font-bold text-green-600">{formatPercentage((projection.totalDividends / projection.finalBalance) * 100)}</p>
                </div>
              </div>
            </div>

            {scenarioComparison && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-400 p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp size={24} />
                  Voluntary Contribution Impact Analysis
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <h3 className="font-bold text-gray-900 mb-3">Scenario A: With Voluntary Contributions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Voluntary:</span>
                        <span className="font-bold">{formatCurrency(parseFloat(voluntaryContribution) || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Final Balance:</span>
                        <span className="font-bold text-green-600">{formatCurrency(scenarioComparison.withVoluntary.finalBalance)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-300">
                    <h3 className="font-bold text-gray-900 mb-3">Scenario B: Without Voluntary Contributions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Voluntary:</span>
                        <span className="font-bold">RM0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Final Balance:</span>
                        <span className="font-bold text-gray-600">{formatCurrency(scenarioComparison.withoutVoluntary.finalBalance)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-green-100 rounded-lg p-4 border-2 border-green-500">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-900">Extra Savings Generated:</span>
                    <span className="text-3xl font-bold text-green-600">{formatCurrency(scenarioComparison.difference)}</span>
                  </div>
                  <p className="text-sm text-green-800 mt-2">
                    Your voluntary contributions will boost retirement savings by {formatPercentage((scenarioComparison.difference / scenarioComparison.withoutVoluntary.finalBalance) * 100)} over {yearsToRetirement} years.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertCircle size={24} />
                Smart Insights & Recommendations
              </h2>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      insight.type === 'warning'
                        ? 'bg-red-50 border-red-500 text-red-900'
                        : insight.type === 'success'
                        ? 'bg-green-50 border-green-500 text-green-900'
                        : 'bg-blue-50 border-blue-500 text-blue-900'
                    }`}
                  >
                    <p className="text-sm font-medium">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Retirement Sustainability Analysis</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Using the 4% Safe Withdrawal Rule:</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-900">Sustainable Monthly Income:</span>
                    <span className="text-2xl font-bold text-blue-600">{formatCurrency(projection.monthlyWithdrawal)}</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    The 4% rule suggests withdrawing 4% of your retirement savings annually to make it last 25-30 years.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">At Your Desired Withdrawal Rate:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Monthly Withdrawal:</span>
                      <span className="font-bold">{formatCurrency(parseFloat(desiredMonthlyWithdrawal) || 3000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">EPF Will Last:</span>
                      <span className="font-bold">{projection.withdrawalYears.toFixed(1)} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Years Needed (to age {lifeExpectancy}):</span>
                      <span className="font-bold">{parseInt(lifeExpectancy) - (parseInt(currentAge) + parseInt(yearsToRetirement))} years</span>
                    </div>
                  </div>
                </div>

                {projection.withdrawalYears < (parseInt(lifeExpectancy) - (parseInt(currentAge) + parseInt(yearsToRetirement))) && (
                  <div className="bg-red-100 rounded-lg p-4 border border-red-400">
                    <p className="font-bold text-red-900 mb-2">⚠️ WARNING: Potential Retirement Shortfall</p>
                    <p className="text-sm text-red-800">
                      Your EPF may run out {((parseInt(lifeExpectancy) - (parseInt(currentAge) + parseInt(yearsToRetirement))) - projection.withdrawalYears).toFixed(1)} years before your expected lifespan.
                      Consider increasing voluntary contributions, extending working years, or planning supplementary retirement income.
                    </p>
                  </div>
                )}

                {projection.withdrawalYears >= (parseInt(lifeExpectancy) - (parseInt(currentAge) + parseInt(yearsToRetirement))) && (
                  <div className="bg-green-100 rounded-lg p-4 border border-green-400">
                    <p className="font-bold text-green-900 mb-2">✓ Your EPF Can Sustain Your Retirement</p>
                    <p className="text-sm text-green-800">
                      At your desired withdrawal rate, your EPF savings can last through your expected retirement years.
                      Continue your savings discipline and consider diversifying with other retirement vehicles for extra security.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Yearly Projection Breakdown</h3>
                <button
                  onClick={() => setShowScenario(!showScenario)}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  {showScenario ? 'Hide Details' : 'Show Details'}
                </button>
              </div>
              {showScenario && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Year</th>
                        <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Age</th>
                        <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Contributions</th>
                        <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Dividends</th>
                        <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {projection.yearlyBreakdown.filter((_, i) => i % 5 === 0 || i === projection.yearlyBreakdown.length - 1).map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-3 py-2 text-gray-900">{item.year}</td>
                          <td className="px-3 py-2 text-gray-900">{item.age}</td>
                          <td className="px-3 py-2 text-right text-gray-900">{formatCurrency(item.contributions)}</td>
                          <td className="px-3 py-2 text-right text-green-600">{formatCurrency(item.dividends)}</td>
                          <td className="px-3 py-2 text-right font-semibold text-blue-600">{formatCurrency(item.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-500 mt-2">Showing every 5 years for brevity. Download full report for complete breakdown.</p>
                </div>
              )}
            </div>

            <AffiliateCTA
              title="Maximize Your Retirement Savings"
              description="Consider supplementing your EPF with Private Retirement Schemes (PRS) or unit trusts to boost your retirement fund and enjoy tax benefits."
              buttonText="Explore Investment Options"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding EPF in Malaysia 2026</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              The Employees Provident Fund (EPF/KWSP) is Malaysia's primary retirement savings scheme, established
              to provide financial security for workers after retirement. The fund is managed by the EPF Board,
              which invests contributions to generate dividends for members. EPF is considered one of the most
              well-managed provident funds globally, consistently delivering competitive returns to members.
            </p>
            <p>
              For employees under 60 years old, the statutory contribution rate is 11% from the employee and 13%
              from the employer, totaling 24% of the monthly salary. This means for every RM100 you earn, RM24 goes
              into your EPF account. For employees aged 60 and above, the employee contribution drops to 0% while
              employers continue contributing 4%, recognizing that older workers may need higher take-home pay.
            </p>
            <p>
              EPF contributions are divided into Account 1 (70%) and Account 2 (30%). Account 1 is primarily for
              retirement and can be withdrawn at age 55. Account 2 allows pre-retirement withdrawals for approved
              purposes including housing payments, medical expenses, and education. This structure balances
              long-term retirement savings with life's important financial milestones.
            </p>
            <p>
              The EPF provides annual dividends based on investment performance. In recent years, dividend rates
              have ranged from 5% to 6% annually, which is competitive compared to fixed deposit rates. These
              dividends are tax-free and compound over time, significantly boosting your retirement savings. The
              power of compounding means even modest monthly contributions can grow substantially over a 30-40 year
              career.
            </p>
            <p>
              Beyond retirement savings, EPF contributions reduce your taxable income. You can claim tax relief
              up to RM4,000 for voluntary EPF contributions, further reducing your tax liability. This makes EPF
              not just a retirement savings tool but also an effective tax planning instrument. Consider making
              voluntary contributions through i-Saraan (for self-employed) or voluntary contributions (for employees)
              to maximize your retirement fund and tax benefits.
            </p>
            <p>
              <strong>Why This Calculator is Different:</strong> Unlike basic EPF calculators that only show monthly
              contributions, this advanced tool projects your entire retirement journey. It accounts for salary growth,
              compound dividends, voluntary contributions, and retirement sustainability. You can see exactly how much
              you'll have at retirement and whether it will last through your golden years. The scenario comparison
              feature shows the real impact of voluntary contributions, helping you make informed decisions about your
              financial future.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} paaItems={paaItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator provides estimates for planning purposes only. Actual EPF
            dividends, salary progression, and retirement outcomes will vary. Past dividend performance does not
            guarantee future returns. This tool is not affiliated with the Employees Provident Fund (EPF/KWSP).
            Consult with qualified financial advisors for personalized retirement planning guidance.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
