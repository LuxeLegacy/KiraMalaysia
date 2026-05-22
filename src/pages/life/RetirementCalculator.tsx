import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency, formatNumber } from '../../lib/formatters';

export const RetirementCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [currentAge, setCurrentAge] = useState<string>('');
  const [retirementAge, setRetirementAge] = useState<string>('60');
  const [currentSavings, setCurrentSavings] = useState<string>('');
  const [monthlyContribution, setMonthlyContribution] = useState<string>('');
  const [expectedReturn, setExpectedReturn] = useState<string>('6');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const age = parseFloat(currentAge) || 0;
    const retAge = parseFloat(retirementAge) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const annualReturn = parseFloat(expectedReturn) || 0;

    const yearsToRetirement = retAge - age;

    if (yearsToRetirement <= 0) {
      setResult(null);
      return;
    }

    const monthlyRate = annualReturn / 100 / 12;
    const months = yearsToRetirement * 12;

    // Future value of current savings
    const futureValueOfSavings = savings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions (annuity)
    let futureValueOfContributions = 0;
    if (monthlyRate > 0) {
      futureValueOfContributions = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    } else {
      futureValueOfContributions = monthly * months;
    }

    const totalAtRetirement = futureValueOfSavings + futureValueOfContributions;
    const totalContributed = savings + (monthly * months);
    const totalGrowth = totalAtRetirement - totalContributed;

    setResult({
      currentAge: age,
      retirementAge: retAge,
      yearsToRetirement,
      currentSavings: savings,
      monthlyContribution: monthly,
      expectedReturn: annualReturn,
      totalContributed,
      totalGrowth,
      totalAtRetirement,
      futureValueOfSavings,
      futureValueOfContributions,
    });
  };

  const relatedCalculators = [
    { name: 'EPF Calculator', path: '/finance/epf-calculator-malaysia', description: 'Calculate EPF contributions' },
    { name: 'Inflation Calculator', path: '/life/inflation-calculator-malaysia', description: 'Calculate inflation impact' },
    { name: 'Net Worth Calculator', path: '/life/net-worth-calculator-malaysia', description: 'Calculate your net worth' },
  ];

  const faqItems = [
    {
      question: 'How much do I need to retire comfortably in Malaysia?',
      answer: 'Financial experts suggest you need 60-80% of your pre-retirement income annually. For someone earning RM5,000 monthly, aim for RM3,000-4,000 monthly in retirement. Using the 25x rule, if you need RM3,500 monthly (RM42,000 annually), you\'d need RM1,050,000 in savings. However, this varies based on lifestyle, health, and whether you have passive income.'
    },
    {
      question: 'Is EPF enough for retirement?',
      answer: 'For many Malaysians, EPF alone is insufficient. The EPF Basic Savings target at age 55 is RM240,000, but studies show this may last only 6-8 years if withdrawn monthly. Consider supplementing with Private Retirement Schemes (PRS), investments, rental income, or continued part-time work. The earlier you start additional savings, the better due to compound growth.'
    },
    {
      question: 'What is a realistic investment return for retirement planning?',
      answer: 'Conservative retirement planning uses 5-6% annual returns, reflecting a mix of EPF (5-6% dividends), fixed deposits (3-4%), and moderate-risk investments. Aggressive portfolios might assume 7-8%, but higher returns come with higher risk. As you near retirement, shift to more conservative investments to protect accumulated wealth.'
    },
    {
      question: 'When should I start saving for retirement?',
      answer: 'Start as early as possible. Due to compound interest, someone who saves RM500 monthly from age 25 to 60 (35 years) at 6% returns will have significantly more than someone who saves RM1,000 monthly from age 40 to 60 (20 years). The power of time in investing cannot be overstated - every year delayed costs significantly more.'
    },
    {
      question: 'Should I withdraw EPF at 55 or leave it to grow?',
      answer: 'If you don\'t need the funds immediately, leaving EPF money invested continues earning dividends (typically 5-6% annually). Many financial advisors recommend withdrawing only what you need annually rather than lump sum withdrawal. This allows remaining funds to grow and provides longevity protection if you live longer than expected.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Retirement Calculator Malaysia 2026 | Plan Your Retirement"
        description="Calculate your retirement savings and future value in Malaysia. Free calculator with compound growth showing how much you'll have at retirement based on current savings and monthly contributions."
        keywords={['retirement calculator', 'malaysia', '2026', 'retirement planning', 'savings']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Retirement Calculator Malaysia 2026
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            Starting retirement savings at 40 instead of 30 costs you RM547,000. Here's the math.
          </h2>
          <p className="text-red-800 mb-3">
            <strong>The compound interest miracle (or disaster):</strong> RM500/month from age 30 becomes RM816,000 at 60.
            The same RM500/month from age 40? Only RM269,000. You lose RM547,000 by waiting 10 years.
          </p>
          <p className="text-red-800 font-semibold">
            Every year you delay is GONE forever. You can't catch up by saving more later.
            Time is more powerful than money in retirement planning. Use this calculator before it's too late.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate how much you'll have at retirement based on your current savings and monthly contributions.
          This retirement calculator uses compound interest to project your future retirement fund value,
          helping you understand if you're on track for a comfortable retirement. Essential for long-term
          financial planning in Malaysia.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Retirement Age
              </label>
              <input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Retirement Savings (MYR)
              </label>
              <input
                type="number"
                value={currentSavings}
                onChange={(e) => setCurrentSavings(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 50000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Include EPF, investments, savings designated for retirement
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Contribution (MYR)
              </label>
              <input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 6"
              />
              <p className="text-sm text-gray-500 mt-1">
                Conservative: 5-6%, Moderate: 7-8%, Aggressive: 9-10%
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Retirement Fund
          </button>
        </div>

        {result && (
          <>
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Retirement Projection</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Years to Retirement</p>
                  <p className="text-2xl font-bold text-gray-900">{result.yearsToRetirement} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Contributed</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.totalContributed)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Investment Growth</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.totalGrowth)}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                <p className="text-sm text-gray-600 mb-1">Total at Retirement (Age {result.retirementAge})</p>
                <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.totalAtRetirement)}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Reality Check: Can You Retire On This?</h2>
              <div className="bg-white rounded-lg p-4 border-2 border-blue-400 mb-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Your projected retirement fund:</p>
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(result.totalAtRetirement)}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600 mb-2">Using 4% safe withdrawal rule:</p>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-700">Annual income:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(result.totalAtRetirement * 0.04)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Monthly income:</span>
                      <span className="text-xl font-bold text-blue-600">{formatCurrency(result.totalAtRetirement * 0.04 / 12)}/month</span>
                    </div>
                  </div>
                </div>
              </div>
              {result.totalAtRetirement * 0.04 / 12 < 3000 && (
                <div className="bg-red-100 rounded-lg p-4 border border-red-400 mb-3">
                  <p className="font-bold text-red-900 mb-2">WARNING: This May Not Be Enough</p>
                  <p className="text-sm text-red-800">
                    Financial experts recommend 60-80% of pre-retirement income. If you need RM3,000+/month in retirement,
                    you're currently SHORT by {formatCurrency((3000 * 12 / 0.04) - result.totalAtRetirement)}.
                    Increase your monthly contributions NOW while time is on your side.
                  </p>
                </div>
              )}
              {result.totalAtRetirement * 0.04 / 12 >= 3000 && result.totalAtRetirement * 0.04 / 12 < 5000 && (
                <div className="bg-yellow-100 rounded-lg p-4 border border-yellow-400 mb-3">
                  <p className="font-bold text-yellow-900 mb-2">You're On Track, But...</p>
                  <p className="text-sm text-yellow-800">
                    {formatCurrency(result.totalAtRetirement * 0.04 / 12)}/month provides basic comfort, but won't cover
                    medical emergencies, inflation, or lifestyle upgrades. Consider increasing contributions by 20-30%
                    to build a safety buffer.
                  </p>
                </div>
              )}
              {result.totalAtRetirement * 0.04 / 12 >= 5000 && (
                <div className="bg-green-100 rounded-lg p-4 border border-green-400 mb-3">
                  <p className="font-bold text-green-900 mb-2">Excellent! You're Building Real Wealth</p>
                  <p className="text-sm text-green-800">
                    {formatCurrency(result.totalAtRetirement * 0.04 / 12)}/month provides comfortable retirement.
                    Stay consistent with your contributions and consider diversifying into property or dividend stocks
                    for additional passive income streams.
                  </p>
                </div>
              )}
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-300">
                <p className="text-sm font-semibold text-blue-900 mb-1">The Power of Starting Early:</p>
                <p className="text-sm text-blue-800">
                  Of your {formatCurrency(result.totalAtRetirement)} retirement fund, {formatCurrency(result.totalGrowth)} ({((result.totalGrowth/result.totalAtRetirement)*100).toFixed(0)}%)
                  is from compound growth. That's FREE MONEY from time and consistency. Start today, not tomorrow.
                </p>
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Current Age</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{result.currentAge} years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Retirement Age</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{result.retirementAge} years</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Years to Retirement</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">{result.yearsToRetirement} years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Current Savings</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(result.currentSavings)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Future Value of Current Savings</td>
                      <td className="px-4 py-3 text-sm text-green-600 text-right">{formatCurrency(result.futureValueOfSavings)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Monthly Contribution</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(result.monthlyContribution)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Total Contributions ({result.yearsToRetirement} years)</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {formatCurrency(result.monthlyContribution * result.yearsToRetirement * 12)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Future Value of Contributions</td>
                      <td className="px-4 py-3 text-sm text-green-600 text-right">{formatCurrency(result.futureValueOfContributions)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Expected Annual Return</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{result.expectedReturn}%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Total Amount Contributed</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(result.totalContributed)}</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Total Investment Growth</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600 text-right">{formatCurrency(result.totalGrowth)}</td>
                    </tr>
                    <tr className="bg-blue-100">
                      <td className="px-4 py-3 text-sm font-bold text-gray-900">Total at Retirement</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">{formatCurrency(result.totalAtRetirement)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mb-8 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Retirement Readiness Assessment</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>Monthly Income at Retirement:</strong> Using the 4% withdrawal rule (considered safe),
                  you could withdraw approximately {formatCurrency(result.totalAtRetirement * 0.04 / 12)} per month
                  without depleting your savings.
                </p>
                <p>
                  <strong>EPF Basic Savings Comparison:</strong> The EPF Basic Savings target at age 55 is RM240,000.
                  Your projected retirement fund of {formatCurrency(result.totalAtRetirement)} is{' '}
                  {result.totalAtRetirement >= 240000
                    ? `${((result.totalAtRetirement / 240000 - 1) * 100).toFixed(0)}% above`
                    : `${((1 - result.totalAtRetirement / 240000) * 100).toFixed(0)}% below`}{' '}
                  this target.
                </p>
                <p>
                  <strong>Power of Compounding:</strong> Of your {formatCurrency(result.totalAtRetirement)} retirement fund,
                  {formatCurrency(result.totalContributed)} ({((result.totalContributed/result.totalAtRetirement)*100).toFixed(0)}%)
                  is from your contributions and {formatCurrency(result.totalGrowth)} ({((result.totalGrowth/result.totalAtRetirement)*100).toFixed(0)}%)
                  is from investment growth. This demonstrates the power of starting early and consistent investing.
                </p>
              </div>
            </div>

            <AffiliateCTA
              title="Need Retirement Planning Guidance?"
              description="Work with certified financial planners to create a comprehensive retirement strategy including investment allocation, tax optimization, and estate planning."
              buttonText="Find Financial Planners"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Retirement Planning in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Retirement planning is arguably the most important financial goal for most people, yet many Malaysians
              are underprepared. The EPF (Employees Provident Fund) forms the foundation of retirement savings, but
              studies consistently show that EPF savings alone are insufficient for most people to maintain their
              pre-retirement lifestyle. The EPF Basic Savings target at age 55 is RM240,000, but this may last only
              6-8 years if withdrawn as monthly income, far short of average life expectancy in the mid-70s.
            </p>
            <p>
              Compound interest is your most powerful ally in retirement planning. When you invest money and earn
              returns, those returns themselves generate additional returns over time. This exponential growth means
              that time is more important than amount in retirement savings. Someone who saves RM500 monthly from age
              25 will accumulate far more than someone who saves RM1,000 monthly from age 40, even though the later
              starter contributes more total money. Every year delayed in starting retirement savings costs significantly
              more in required future contributions.
            </p>
            <p>
              Expected returns significantly impact your retirement projections. Conservative estimates use 5-6%
              annual returns, reflecting EPF dividends (historically 5-6%), fixed deposits (3-4%), and bond funds.
              Moderate portfolios with mixed equities might assume 7-8%, while aggressive all-equity portfolios could
              project 9-10%. However, higher returns come with higher volatility and risk. As you approach retirement,
              gradually shift from growth investments (stocks, equity funds) to income and capital preservation
              (bonds, dividends, fixed deposits) to protect accumulated wealth.
            </p>
            <p>
              The 4% withdrawal rule is a common retirement planning guideline: if you withdraw 4% of your retirement
              savings annually (adjusted for inflation), your savings should last 30+ years. For example, RM1,000,000
              in retirement savings allows RM40,000 annual withdrawal, or approximately RM3,333 monthly. This rule
              assumes a balanced investment portfolio continuing to earn returns in retirement. While not perfect, it
              provides a reasonable estimate for retirement income planning.
            </p>
            <p>
              Beyond EPF, consider diversifying retirement savings through Private Retirement Schemes (PRS) which offer
              tax relief up to RM3,000 annually, Amanah Saham funds, unit trusts, dividend-yielding stocks, rental
              property income, and business ownership. Each has different risk-return profiles, tax treatments, and
              liquidity considerations. A well-diversified retirement portfolio reduces dependence on any single source
              and provides flexibility in drawdown strategies. Start planning early, contribute consistently, invest
              wisely, and review regularly to ensure you're on track for the retirement lifestyle you envision.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator provides estimates based on assumptions about future returns
            and does not account for inflation, taxes, or market volatility. Actual retirement outcomes may differ
            significantly. Past investment performance does not guarantee future results. Consult with licensed
            financial advisors for personalized retirement planning.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
