import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency } from '../../lib/formatters';

export const NetWorthCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  // Assets
  const [cashSavings, setCashSavings] = useState<string>('');
  const [investments, setInvestments] = useState<string>('');
  const [epf, setEpf] = useState<string>('');
  const [property, setProperty] = useState<string>('');
  const [vehicles, setVehicles] = useState<string>('');
  const [otherAssets, setOtherAssets] = useState<string>('');

  // Liabilities
  const [homeLoan, setHomeLoan] = useState<string>('');
  const [carLoan, setCarLoan] = useState<string>('');
  const [personalLoans, setPersonalLoans] = useState<string>('');
  const [creditCards, setCreditCards] = useState<string>('');
  const [otherDebts, setOtherDebts] = useState<string>('');

  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    // Calculate total assets
    const cash = parseFloat(cashSavings) || 0;
    const invest = parseFloat(investments) || 0;
    const epfAmount = parseFloat(epf) || 0;
    const propertyValue = parseFloat(property) || 0;
    const vehicleValue = parseFloat(vehicles) || 0;
    const otherAsset = parseFloat(otherAssets) || 0;

    const totalAssets = cash + invest + epfAmount + propertyValue + vehicleValue + otherAsset;

    // Calculate total liabilities
    const homeDebt = parseFloat(homeLoan) || 0;
    const carDebt = parseFloat(carLoan) || 0;
    const personalDebt = parseFloat(personalLoans) || 0;
    const creditDebt = parseFloat(creditCards) || 0;
    const otherDebt = parseFloat(otherDebts) || 0;

    const totalLiabilities = homeDebt + carDebt + personalDebt + creditDebt + otherDebt;

    // Calculate net worth
    const netWorth = totalAssets - totalLiabilities;

    const assetBreakdown = [
      { category: 'Cash & Savings', amount: cash },
      { category: 'Investments', amount: invest },
      { category: 'EPF', amount: epfAmount },
      { category: 'Property', amount: propertyValue },
      { category: 'Vehicles', amount: vehicleValue },
      { category: 'Other Assets', amount: otherAsset },
    ].filter(item => item.amount > 0);

    const liabilityBreakdown = [
      { category: 'Home Loan', amount: homeDebt },
      { category: 'Car Loan', amount: carDebt },
      { category: 'Personal Loans', amount: personalDebt },
      { category: 'Credit Cards', amount: creditDebt },
      { category: 'Other Debts', amount: otherDebt },
    ].filter(item => item.amount > 0);

    setResult({
      totalAssets,
      totalLiabilities,
      netWorth,
      assetBreakdown,
      liabilityBreakdown,
      debtToAssetRatio: totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0,
    });
  };

  const relatedCalculators = [
    { name: 'Retirement Calculator', path: '/life/retirement-calculator-malaysia', description: 'Plan your retirement savings' },
    { name: 'EPF Calculator', path: '/finance/epf-calculator-malaysia', description: 'Calculate EPF contributions' },
    { name: 'Loan Eligibility Calculator', path: '/finance/loan-eligibility-calculator-malaysia', description: 'Check loan eligibility' },
  ];

  const faqItems = [
    {
      question: 'What is net worth and why is it important?',
      answer: 'Net worth is the difference between what you own (assets) and what you owe (liabilities). It\'s the most comprehensive measure of your financial health, showing your true wealth at a point in time. Unlike income which shows earning power, net worth shows wealth accumulation. Tracking net worth over time reveals if you\'re building wealth or sliding into debt.'
    },
    {
      question: 'What should I include in assets?',
      answer: 'Include all items of significant value: cash and savings accounts, investments (stocks, unit trusts, bonds), EPF accounts, property at current market value, vehicles at current resale value, business ownership, valuable collectibles, and insurance cash value. Don\'t include personal items like clothes or furniture unless valuable.'
    },
    {
      question: 'Should I include my home and car in net worth?',
      answer: 'Yes, include them at current market value, not purchase price. Your home and car are assets even though they\'re necessities. However, also include any outstanding loans against them as liabilities. The net amount (value minus loan) represents your equity and contributes to net worth. Remember vehicles depreciate while property typically appreciates.'
    },
    {
      question: 'What is a good net worth for my age in Malaysia?',
      answer: 'There\'s no universal standard, but a rough guideline is: by age 30, aim for 1x your annual salary; age 40: 3-4x annual salary; age 50: 6-8x annual salary; age 60: 10-12x annual salary. However, this varies greatly based on income, family situation, and life stage. Focus on positive trajectory - increasing net worth year over year matters more than comparing to others.'
    },
    {
      question: 'How can I increase my net worth?',
      answer: 'Four main strategies: 1) Increase income through career advancement or side businesses, 2) Reduce expenses and save more, 3) Invest savings in appreciating assets (stocks, property, business), and 4) Pay down high-interest debt aggressively. The combination of earning more, spending less, investing wisely, and reducing debt compounds wealth growth over time.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Net Worth Calculator Malaysia 2026 | Calculate Your Wealth"
        description="Calculate your net worth in Malaysia by adding assets and subtracting liabilities. Free calculator showing total wealth with detailed asset and debt breakdown."
        keywords={['net worth calculator', 'malaysia', '2026', 'wealth calculator', 'financial health']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Net Worth Calculator Malaysia 2026
        </h1>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-blue-900 mb-3">
            56% of Malaysians have NEGATIVE net worth. Are you building wealth or drowning in debt?
          </h2>
          <p className="text-blue-800 mb-3">
            <strong>The brutal truth about wealth:</strong> High income means nothing if you owe more than you own.
            You could earn RM10,000/month and have negative net worth because of car loans, personal loans, and credit cards.
          </p>
          <p className="text-blue-800 font-semibold">
            Real wealth = Assets minus Debts. Calculate it now. If it's negative or stagnant year-over-year,
            you're NOT building wealth, you're treading water. Use this calculator to face reality.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate your net worth by totaling your assets and subtracting your liabilities. Net worth is
          the most comprehensive measure of financial health, showing your true wealth at any point in time.
          Use this calculator to understand your current financial position and track wealth growth over time.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Assets (What You Own)</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cash & Savings (MYR)
              </label>
              <input
                type="number"
                value={cashSavings}
                onChange={(e) => setCashSavings(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investments (MYR)
              </label>
              <input
                type="number"
                value={investments}
                onChange={(e) => setInvestments(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 100000"
              />
              <p className="text-sm text-gray-500 mt-1">Stocks, unit trusts, bonds, etc.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                EPF Balance (MYR)
              </label>
              <input
                type="number"
                value={epf}
                onChange={(e) => setEpf(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 150000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Value (MYR)
              </label>
              <input
                type="number"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 500000"
              />
              <p className="text-sm text-gray-500 mt-1">Current market value of all properties</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Value (MYR)
              </label>
              <input
                type="number"
                value={vehicles}
                onChange={(e) => setVehicles(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 40000"
              />
              <p className="text-sm text-gray-500 mt-1">Current resale value</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Assets (MYR)
              </label>
              <input
                type="number"
                value={otherAssets}
                onChange={(e) => setOtherAssets(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 20000"
              />
              <p className="text-sm text-gray-500 mt-1">Business, jewelry, collectibles, etc.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4 mt-8">Liabilities (What You Owe)</h3>
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Loan Balance (MYR)
              </label>
              <input
                type="number"
                value={homeLoan}
                onChange={(e) => setHomeLoan(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 300000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Loan Balance (MYR)
              </label>
              <input
                type="number"
                value={carLoan}
                onChange={(e) => setCarLoan(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 50000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal Loan Balance (MYR)
              </label>
              <input
                type="number"
                value={personalLoans}
                onChange={(e) => setPersonalLoans(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 20000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Card Debt (MYR)
              </label>
              <input
                type="number"
                value={creditCards}
                onChange={(e) => setCreditCards(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 5000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Other Debts (MYR)
              </label>
              <input
                type="number"
                value={otherDebts}
                onChange={(e) => setOtherDebts(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 10000"
              />
              <p className="text-sm text-gray-500 mt-1">Education loans, business loans, etc.</p>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Net Worth
          </button>
        </div>

        {result && (
          <>
            <div className={`rounded-lg p-6 mb-8 border-2 ${
              result.netWorth >= 0
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Net Worth</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Assets</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.totalAssets)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Liabilities</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(result.totalLiabilities)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Debt-to-Asset Ratio</p>
                  <p className="text-xl font-bold text-gray-900">{result.debtToAssetRatio.toFixed(1)}%</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-blue-300">
                <p className="text-sm text-gray-600 mb-1">Net Worth</p>
                <p className={`text-4xl font-bold ${
                  result.netWorth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatCurrency(result.netWorth)}
                </p>
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Asset Breakdown</h3>
                <div className="space-y-3">
                  {result.assetBreakdown.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{item.category}</span>
                      <span className="text-sm font-semibold text-green-600">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-900">Total Assets</span>
                    <span className="text-lg font-bold text-green-600">{formatCurrency(result.totalAssets)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Liability Breakdown</h3>
                <div className="space-y-3">
                  {result.liabilityBreakdown.length > 0 ? (
                    <>
                      {result.liabilityBreakdown.map((item: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm text-gray-700">{item.category}</span>
                          <span className="text-sm font-semibold text-red-600">{formatCurrency(item.amount)}</span>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-900">Total Liabilities</span>
                        <span className="text-lg font-bold text-red-600">{formatCurrency(result.totalLiabilities)}</span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No liabilities recorded</p>
                  )}
                </div>
              </div>
            </div>

            <div className={`rounded-lg p-6 mb-8 border ${
              result.netWorth >= 0 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
            }`}>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Financial Health Assessment</h3>
              <div className="space-y-3 text-sm text-gray-700">
                {result.netWorth > 0 && (
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Positive net worth of {formatCurrency(result.netWorth)} - You own more than you owe.</span>
                  </div>
                )}
                {result.netWorth < 0 && (
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-2">!</span>
                    <span>Negative net worth of {formatCurrency(Math.abs(result.netWorth))} - Your debts exceed your assets. Focus on debt reduction and asset building.</span>
                  </div>
                )}
                {result.debtToAssetRatio <= 30 && (
                  <div className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Excellent debt-to-asset ratio of {result.debtToAssetRatio.toFixed(1)}% - Your debt is well-managed relative to your assets.</span>
                  </div>
                )}
                {result.debtToAssetRatio > 30 && result.debtToAssetRatio <= 50 && (
                  <div className="flex items-start">
                    <span className="text-blue-600 mr-2">i</span>
                    <span>Moderate debt-to-asset ratio of {result.debtToAssetRatio.toFixed(1)}% - Consider accelerating debt repayment to improve financial flexibility.</span>
                  </div>
                )}
                {result.debtToAssetRatio > 50 && (
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-2">!</span>
                    <span>High debt-to-asset ratio of {result.debtToAssetRatio.toFixed(1)}% - Prioritize debt reduction to reduce financial risk.</span>
                  </div>
                )}
                <div className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Track your net worth quarterly or annually to monitor financial progress and adjust strategies.</span>
                </div>
              </div>
            </div>

            <AffiliateCTA
              title="Grow Your Net Worth Faster"
              description="Work with certified financial planners to develop a comprehensive wealth-building strategy including investment allocation, debt management, and tax optimization."
              buttonText="Find Financial Advisors"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Net Worth</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Net worth is the most comprehensive measure of financial health, representing your true wealth at any
              point in time. The formula is simple: Assets (what you own) minus Liabilities (what you owe) equals Net
              Worth. Unlike income which measures earning power, net worth measures wealth accumulation. You could have
              high income but negative net worth if you spend and borrow more than you save. Conversely, you could have
              modest income but substantial net worth through disciplined saving and smart investing over time.
            </p>
            <p>
              Assets include everything of significant value you own: liquid assets (cash, savings, investments that
              can be quickly converted to cash), retirement accounts (EPF, PRS, foreign retirement accounts), real
              estate (at current market value, not purchase price), vehicles (at current resale value, not purchase
              price), business ownership interests, and other valuable items (jewelry, art, collectibles). Don't
              include personal items of modest value like clothing or basic furniture - focus on items with significant
              monetary worth.
            </p>
            <p>
              Liabilities encompass all your debts and financial obligations: home mortgages, car loans, personal loans,
              credit card balances, student loans, business debts, and any other money you owe. Use current outstanding
              balances, not original loan amounts. For example, if you borrowed RM400,000 for your home but have paid
              it down to RM300,000, include RM300,000 as the liability. The difference between your property's current
              value and the remaining loan is your home equity, which contributes to net worth.
            </p>
            <p>
              Net worth benchmarks vary, but a rough guideline by age in Malaysia: by 30, aim for at least 1x your
              annual salary; by 40, aim for 3-4x; by 50, aim for 6-8x; by 60, aim for 10-12x your annual salary. These
              are general targets that vary based on income level, family situation, career stage, and personal
              circumstances. What matters most is trajectory - your net worth should generally increase year over year
              (adjusted for inflation). Flat or declining net worth suggests spending exceeds income plus investment
              returns, requiring lifestyle or budget adjustments.
            </p>
            <p>
              To increase net worth, focus on four levers: 1) Increase income through career advancement, skills
              development, or side businesses, 2) Reduce expenses and save more through budgeting and lifestyle
              optimization, 3) Invest saved money in appreciating assets (stocks, real estate, business) rather than
              keeping it all in cash or low-yield accounts, and 4) Pay down high-interest debt aggressively,
              particularly credit cards and personal loans. The combination of earning more, spending less, investing
              wisely, and managing debt strategically compounds wealth growth over time. Calculate your net worth
              annually (or quarterly if you're aggressive about wealth building) to track progress, identify trends,
              and adjust your financial strategy accordingly.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator provides a snapshot of your net worth based on values you
            provide. Asset values (especially property and vehicles) are estimates and may differ from actual market
            values. Net worth is one measure of financial health but doesn't reflect income, cash flow, or liquidity.
            Use this as a planning tool alongside other financial metrics. Consult with financial advisors for
            comprehensive financial planning.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
