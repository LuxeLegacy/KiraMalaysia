import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

export const InflationCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [currentAmount, setCurrentAmount] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [inflationRate, setInflationRate] = useState<string>('3');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const current = parseFloat(currentAmount) || 0;
    const numYears = parseFloat(years) || 0;
    const rate = parseFloat(inflationRate) || 0;

    const futureValue = current * Math.pow(1 + rate / 100, numYears);
    const totalInflation = futureValue - current;
    const purchasingPowerLoss = (totalInflation / futureValue) * 100;

    // Generate yearly breakdown
    const breakdown = [];
    for (let year = 1; year <= Math.min(numYears, 10); year++) {
      const value = current * Math.pow(1 + rate / 100, year);
      breakdown.push({
        year,
        value,
        inflation: value - current,
      });
    }

    setResult({
      currentAmount: current,
      years: numYears,
      inflationRate: rate,
      futureValue,
      totalInflation,
      purchasingPowerLoss,
      breakdown,
    });
  };

  const relatedCalculators = [
    { name: 'Retirement Calculator', path: '/life/retirement-calculator-malaysia', description: 'Plan your retirement savings' },
    { name: 'Net Worth Calculator', path: '/life/net-worth-calculator-malaysia', description: 'Calculate your net worth' },
    { name: 'Income Tax Calculator', path: '/finance/income-tax-calculator-malaysia', description: 'Calculate your income tax' },
  ];

  const faqItems = [
    {
      question: 'What is inflation and how does it affect me?',
      answer: 'Inflation is the rate at which prices of goods and services increase over time, reducing the purchasing power of money. If inflation is 3% annually, something that costs RM100 today will cost RM103 next year. Over time, inflation significantly erodes the value of money, which is why keeping all savings in cash or low-interest accounts can result in losing purchasing power.'
    },
    {
      question: 'What is the current inflation rate in Malaysia?',
      answer: 'Malaysia\'s inflation rate typically ranges from 2% to 4% annually, though it can be higher during economic challenges. Bank Negara Malaysia (the central bank) targets to keep inflation moderate and stable. For long-term planning, financial advisors often use 3% as a conservative estimate, though actual rates vary year to year.'
    },
    {
      question: 'How does inflation affect retirement planning?',
      answer: 'Inflation is critical in retirement planning because it erodes the purchasing power of your savings over decades. If you need RM3,000 monthly today, at 3% inflation, you\'ll need RM4,868 monthly in 20 years for the same lifestyle. This is why retirement savings must grow faster than inflation through investments, not just sit in low-yield accounts.'
    },
    {
      question: 'How can I protect my savings from inflation?',
      answer: 'Protect against inflation by investing in assets that historically outpace inflation: stocks and equity funds (long-term average 7-10% returns), real estate (appreciates over time and provides rental income), REITs, bonds (especially inflation-linked bonds), and dividend-paying investments. Diversification across multiple asset classes provides the best inflation protection.'
    },
    {
      question: 'Why do banks offer interest rates below inflation?',
      answer: 'Savings accounts and fixed deposits often offer interest below inflation because they provide safety and liquidity. Banks use your deposits to lend at higher rates. The trade-off is security versus returns. For long-term wealth building, you need investments with returns exceeding inflation, accepting some risk for higher growth potential.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Inflation Calculator Malaysia 2026 | Calculate Future Value"
        description="Calculate the impact of inflation on your money in Malaysia. Free calculator showing future value, purchasing power loss, and inflation adjustment over time."
        keywords={['inflation calculator', 'malaysia', '2026', 'purchasing power', 'future value']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Inflation Calculator Malaysia 2026
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            Your RM100,000 savings becomes RM74,409 in 10 years. Inflation is stealing your money.
          </h2>
          <p className="text-red-800 mb-3">
            <strong>The silent wealth killer:</strong> At 3% inflation, money loses 26% of its value in 10 years.
            That RM100k in fixed deposit earning 2.5%? You're LOSING 0.5% purchasing power annually. You're getting poorer while "saving."
          </p>
          <p className="text-red-800 font-semibold">
            81% of Malaysians keep savings in banks below inflation rates, slowly getting poorer every year.
            Calculate how much purchasing power you're losing right now. Then invest accordingly.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate how inflation affects the value of your money over time in Malaysia. This inflation
          calculator shows the future cost of goods and services, helping you understand how much you'll
          need to maintain your purchasing power. Essential for long-term financial planning, retirement
          preparation, and investment decisions.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Amount (MYR)
              </label>
              <input
                type="number"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 100000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Amount in today's money (current value or cost)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Years
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Inflation Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                value={inflationRate}
                onChange={(e) => setInflationRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 3"
              />
              <p className="text-sm text-gray-500 mt-1">
                Malaysia's typical inflation: 2-4% annually
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Inflation Impact
          </button>
        </div>

        {result && (
          <>
            <div className="bg-red-50 rounded-lg p-6 mb-8 border border-red-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Inflation Impact Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Today's Value</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.currentAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Future Value ({result.years} years)</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(result.futureValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Inflation Impact</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(result.totalInflation)}</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-white rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>What this means:</strong> To buy what costs {formatCurrency(result.currentAmount)} today,
                  you'll need {formatCurrency(result.futureValue)} in {result.years} years. That's an increase
                  of {formatPercentage((result.futureValue / result.currentAmount - 1) * 100)}.
                </p>
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Detailed Calculation</h3>
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
                      <td className="px-4 py-3 text-sm text-gray-900">Current Amount (Today's Money)</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(result.currentAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Time Period</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{result.years} years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Annual Inflation Rate</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatPercentage(result.inflationRate)}</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Future Value (Inflated Amount)</td>
                      <td className="px-4 py-3 text-sm font-bold text-red-600 text-right">{formatCurrency(result.futureValue)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Total Inflation Increase</td>
                      <td className="px-4 py-3 text-sm font-bold text-red-600 text-right">+{formatCurrency(result.totalInflation)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Percentage Increase</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                        {formatPercentage((result.futureValue / result.currentAmount - 1) * 100)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {result.breakdown.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Year-by-Year Breakdown (First {Math.min(result.years, 10)} Years)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Year</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Future Value</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Cumulative Inflation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {result.breakdown.map((item: any) => (
                        <tr key={item.year}>
                          <td className="px-4 py-3 text-sm text-gray-900">Year {item.year}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.value)}</td>
                          <td className="px-4 py-3 text-sm text-red-600 text-right">+{formatCurrency(item.inflation)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {result.years > 10 && (
                  <p className="text-sm text-gray-500 mt-4">
                    Showing first 10 years. Final value after {result.years} years: {formatCurrency(result.futureValue)}
                  </p>
                )}
              </div>
            )}

            <div className="bg-yellow-50 rounded-lg p-6 mb-8 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Real-World Examples</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-900">Monthly Expenses:</p>
                  <p>If you spend RM3,000 monthly today, at {result.inflationRate}% inflation, you'll need
                  approximately {formatCurrency(3000 * Math.pow(1 + result.inflationRate / 100, result.years))} monthly
                  in {result.years} years for the same lifestyle.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Salary Requirement:</p>
                  <p>A salary of RM60,000 annually today would need to be approximately{' '}
                  {formatCurrency(60000 * Math.pow(1 + result.inflationRate / 100, result.years))} in {result.years} years
                  to maintain the same purchasing power.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Investment Returns Needed:</p>
                  <p>To maintain purchasing power, your investments must earn at least {formatPercentage(result.inflationRate)} annually
                  just to break even. To actually grow wealth, you need returns significantly above the inflation rate.</p>
                </div>
              </div>
            </div>

            <AffiliateCTA
              title="Beat Inflation with Smart Investing"
              description="Protect your wealth from inflation by investing in assets that historically outpace inflation. Consult with investment advisors to build an inflation-resistant portfolio."
              buttonText="Find Investment Advisors"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Inflation in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Inflation is the sustained increase in the general price level of goods and services over time. It's
              measured by tracking a basket of common consumer goods and services, with the Consumer Price Index (CPI)
              being the primary measure in Malaysia. While some inflation is normal and even healthy for economic growth,
              high inflation erodes purchasing power - the amount of goods and services your money can buy decreases.
              Bank Negara Malaysia, the central bank, aims to keep inflation moderate and predictable to support
              economic stability.
            </p>
            <p>
              Malaysia's inflation rate has historically averaged 2-4% annually, though it can spike during global
              commodity price increases (oil, food), currency depreciation, or supply chain disruptions. For instance,
              in 2022, inflation rose above 3% due to global supply issues and rising energy costs. Understanding
              inflation is crucial for financial planning - if you assume 3% annual inflation, prices roughly double
              every 24 years. This means retirement planning must account for significantly higher living costs decades
              in the future.
            </p>
            <p>
              The corrosive effect of inflation on savings is why keeping all money in cash or low-yield savings accounts
              is problematic for long-term wealth. If your savings earn 2% interest but inflation is 3%, you're actually
              losing 1% purchasing power annually despite the nominal increase in your account balance. This is called
              "real return" (nominal return minus inflation). To actually grow wealth, your investments must consistently
              earn returns above the inflation rate.
            </p>
            <p>
              Different asset classes offer varying inflation protection. Cash and traditional savings accounts typically
              lose to inflation. Fixed deposits and bonds may keep pace with low inflation but struggle during high
              inflation periods. Stocks and equity funds have historically provided returns well above inflation over
              long periods (7-10% average), though with higher volatility. Real estate tends to appreciate with or above
              inflation and provides rental income. Commodities like gold can hedge against inflation but don't provide
              regular income. A diversified portfolio balances these assets based on your risk tolerance and time horizon.
            </p>
            <p>
              Inflation considerations are critical in major financial decisions. When planning for children's education,
              remember university fees inflate faster than general inflation. In retirement planning, you need savings
              to generate income that keeps pace with inflation for 20-30 years. When negotiating salary, factor in
              inflation - a 2% raise when inflation is 3% is actually a 1% pay cut in real terms. When borrowing, fixed
              interest rates protect you from rising rates during high inflation, while inflation actually reduces the
              real burden of fixed debt over time. Understanding inflation transforms it from an invisible wealth eroder
              into a manageable factor in comprehensive financial planning.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator provides estimates based on constant inflation rates. Actual
            inflation varies year to year and across different goods and services. Past inflation rates do not guarantee
            future rates. Use these projections as general guidelines for financial planning, not precise predictions.
            Consult with financial advisors for personalized planning.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
