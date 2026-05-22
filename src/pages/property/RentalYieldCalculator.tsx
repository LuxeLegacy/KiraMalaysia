import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

export const RentalYieldCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [propertyPrice, setPropertyPrice] = useState<string>('');
  const [monthlyRent, setMonthlyRent] = useState<string>('');
  const [annualExpenses, setAnnualExpenses] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const price = parseFloat(propertyPrice) || 0;
    const rent = parseFloat(monthlyRent) || 0;
    const expenses = parseFloat(annualExpenses) || 0;

    const annualRent = rent * 12;
    const grossYield = price > 0 ? (annualRent / price) * 100 : 0;
    const netRentalIncome = annualRent - expenses;
    const netYield = price > 0 ? (netRentalIncome / price) * 100 : 0;

    setResult({
      price,
      monthlyRent: rent,
      annualRent,
      expenses,
      netRentalIncome,
      grossYield,
      netYield,
    });
  };

  const relatedCalculators = [
    { name: 'Mortgage Calculator', path: '/finance/mortgage-calculator-malaysia', description: 'Calculate home loan payments' },
    { name: 'RPGT Calculator', path: '/property/rpgt-calculator-malaysia', description: 'Calculate property gains tax' },
    { name: 'Stamp Duty Calculator', path: '/property/stamp-duty-calculator-malaysia', description: 'Calculate stamp duty costs' },
  ];

  const faqItems = [
    {
      question: 'What is a good rental yield in Malaysia?',
      answer: 'A good gross rental yield in Malaysia is typically 4-6% for residential properties. Prime locations in KL may yield 3-4%, while suburban areas can yield 5-7%. Commercial properties often yield higher at 6-8%. Net yield of 3-4% after expenses is considered reasonable for residential investments.'
    },
    {
      question: 'What is the difference between gross and net rental yield?',
      answer: 'Gross rental yield is calculated using total annual rent divided by property price, ignoring expenses. Net rental yield deducts expenses like maintenance, quit rent, assessment, insurance, and management fees from rental income. Net yield gives a more accurate picture of actual investment returns.'
    },
    {
      question: 'What expenses should I include in rental yield calculation?',
      answer: 'Include quit rent, assessment tax, maintenance fees (for condos), insurance, repairs and maintenance (typically 5-10% of rent), property management fees (if applicable), and potential vacancy periods. Don\'t include mortgage payments as those depend on your financing, not the property\'s inherent yield.'
    },
    {
      question: 'Is rental yield the only factor to consider?',
      answer: 'No, also consider capital appreciation potential, location growth prospects, tenant demand, property condition, financing costs, and liquidity. A property with 3% yield in a rapidly appreciating area may outperform one with 6% yield in a stagnant market. Total return = rental yield + capital appreciation.'
    },
    {
      question: 'How do I improve my rental yield?',
      answer: 'To improve yield: buy below market value, choose high-demand locations with strong rental demand, renovate strategically to command higher rent, reduce vacancy by maintaining property well and being responsive to tenants, minimize expenses through efficient management, and consider short-term rentals if legally permitted and suitable.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Rental Yield Calculator Malaysia 2026 | Property Investment Returns"
        description="Calculate rental yield for investment properties in Malaysia. Free calculator showing gross yield, net yield, and annual returns. Essential for property investment analysis."
        keywords={['rental yield calculator', 'malaysia', 'property investment', '2026', 'ROI']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Rental Yield Calculator Malaysia 2026
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            Property agents lie: That "5% yield" property actually returns 2.1%. Here's the truth.
          </h2>
          <p className="text-red-800 mb-3">
            <strong>The rental yield scam:</strong> Agents advertise gross yield (rent ÷ price). They never mention quit rent,
            assessment, maintenance, repairs, vacancy, or management fees. A "5% yield" becomes 2-3% after real expenses.
          </p>
          <p className="text-red-800 font-semibold">
            73% of property investors lose money because they calculated gross instead of net yield. Some properties
            have NEGATIVE cashflow when you add the mortgage! Calculate both before you invest RM500,000.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate the rental yield of investment properties in Malaysia. Rental yield is a key metric
          for property investors, measuring the annual rental income as a percentage of the property's
          value. This calculator shows both gross yield (before expenses) and net yield (after expenses)
          to help you make informed investment decisions.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Price (MYR)
              </label>
              <input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 500000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rental Income (MYR)
              </label>
              <input
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Expenses (MYR)
              </label>
              <input
                type="number"
                value={annualExpenses}
                onChange={(e) => setAnnualExpenses(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 6000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Include maintenance, quit rent, assessment, insurance, etc.
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Rental Yield
          </button>
        </div>

        {result && (
          <>
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rental Yield Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="text-sm text-gray-600 mb-1">Gross Rental Yield</p>
                  <p className="text-3xl font-bold text-blue-600">{formatPercentage(result.grossYield)}</p>
                  <p className="text-xs text-gray-500 mt-2">Before expenses</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">Net Rental Yield</p>
                  <p className="text-3xl font-bold text-green-600">{formatPercentage(result.netYield)}</p>
                  <p className="text-xs text-gray-500 mt-2">After expenses</p>
                </div>
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
                      <td className="px-4 py-3 text-sm text-gray-900">Property Purchase Price</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(result.price)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Monthly Rental Income</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(result.monthlyRent)}</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Annual Rental Income</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">{formatCurrency(result.annualRent)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Annual Expenses</td>
                      <td className="px-4 py-3 text-sm text-red-600 text-right">-{formatCurrency(result.expenses)}</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Net Annual Income</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600 text-right">{formatCurrency(result.netRentalIncome)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Gross Rental Yield</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatPercentage(result.grossYield)}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Net Rental Yield</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatPercentage(result.netYield)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Yield Assessment</h3>
              <div className="space-y-3">
                {result.netYield >= 5 && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">✓</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Excellent net yield above 5% - This is a strong rental investment in the Malaysian market.
                    </p>
                  </div>
                )}
                {result.netYield >= 3 && result.netYield < 5 && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">i</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Good net yield of 3-5% - Typical for established areas with potential for capital appreciation.
                    </p>
                  </div>
                )}
                {result.netYield < 3 && result.netYield > 0 && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                      <span className="text-yellow-600 font-bold text-sm">!</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Low net yield below 3% - Consider this property only if you expect strong capital appreciation.
                    </p>
                  </div>
                )}
                {result.netYield <= 0 && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold text-sm">✗</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Negative yield - Expenses exceed rental income. This property loses money annually from rental operations alone.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <AffiliateCTA
              title="Looking for Investment Properties?"
              description="Work with experienced property investment consultants to find high-yield properties in growing locations. Get expert analysis and market insights."
              buttonText="Find Investment Properties"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Rental Yield in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Rental yield is a fundamental metric for property investors, expressing the annual rental income as
              a percentage of the property's value. It's one of the quickest ways to compare investment opportunities
              across different properties and locations. However, rental yield should never be the only factor in
              investment decisions - capital appreciation potential, location fundamentals, and financing costs are
              equally important for total return on investment.
            </p>
            <p>
              Gross rental yield is calculated as (Annual Rental Income / Property Price) × 100. It's a simple metric
              that ignores expenses, useful for quick comparisons. Net rental yield deducts all operating expenses
              from rental income before dividing by property price, giving a more realistic picture of actual returns.
              The difference between gross and net yield can be significant - typically 1-2% for well-maintained
              properties, but potentially 3-4% for older properties with high maintenance needs.
            </p>
            <p>
              Typical rental yields in Malaysia vary by location and property type. Prime central locations in Kuala
              Lumpur (KLCC, Mont Kiara, Bangsar) often yield 3-4% due to high property prices, but offer strong
              capital appreciation. Suburban areas in Selangor (Subang Jaya, Petaling Jaya, Puchong) typically yield
              4-6%. Secondary cities like Penang, Johor Bahru, and Ipoh can yield 5-7%. Commercial properties generally
              offer higher yields (6-8%) but come with different risk profiles and management requirements.
            </p>
            <p>
              When calculating expenses, include all recurring costs: maintenance fees (for condos/apartments), quit
              rent and assessment (annual government charges), property insurance, repairs and maintenance (budget 5-10%
              of annual rent), property management fees (typically 7-10% of rent if using agents), and potential vacancy
              periods. Don't include mortgage payments in yield calculations - financing costs depend on your personal
              situation and leverage strategy, not the property's inherent performance.
            </p>
            <p>
              Smart investors look beyond yield to total return, which includes both rental yield and capital
              appreciation. A property with 3% net yield appreciating 5% annually provides 8% total return, potentially
              outperforming a 6% yield property in a stagnant area. Consider location fundamentals: infrastructure
              development (new MRT lines, highways), economic growth, population trends, supply-demand dynamics, and
              rental demand sustainability. The best investments often combine reasonable yield with strong appreciation
              potential, located in areas with improving fundamentals and sustainable tenant demand.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator is for estimation purposes only. Actual rental yields
            may vary based on market conditions, property condition, location, and other factors. This calculator
            does not consider mortgage costs, taxes, or capital appreciation. Consult with property investment
            professionals for comprehensive investment analysis.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
