import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency } from '../../lib/formatters';

export const ZakatCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [cashSavings, setCashSavings] = useState<string>('');
  const [goldSilver, setGoldSilver] = useState<string>('');
  const [investments, setInvestments] = useState<string>('');
  const [businessAssets, setBusinessAssets] = useState<string>('');
  const [debts, setDebts] = useState<string>('');
  const [result, setResult] = useState<any>(null);

  const ZAKAT_RATE = 2.5; // 2.5% of eligible wealth
  const NISAB_VALUE = 20000; // Approximate nisab value in MYR (based on 85g gold at ~RM235/g)

  const handleCalculate = () => {
    const cash = parseFloat(cashSavings) || 0;
    const gold = parseFloat(goldSilver) || 0;
    const investment = parseFloat(investments) || 0;
    const business = parseFloat(businessAssets) || 0;
    const debt = parseFloat(debts) || 0;

    const totalAssets = cash + gold + investment + business;
    const netWealth = totalAssets - debt;
    const zakatPayable = netWealth >= NISAB_VALUE ? (netWealth * ZAKAT_RATE) / 100 : 0;
    const isEligible = netWealth >= NISAB_VALUE;

    setResult({
      cashSavings: cash,
      goldSilver: gold,
      investments: investment,
      businessAssets: business,
      totalAssets,
      debts: debt,
      netWealth,
      nisabValue: NISAB_VALUE,
      zakatPayable,
      isEligible,
      breakdown: [
        { category: 'Cash & Savings', amount: cash },
        { category: 'Gold & Silver', amount: gold },
        { category: 'Investments', amount: investment },
        { category: 'Business Assets', amount: business },
      ].filter(item => item.amount > 0),
    });
  };

  const relatedCalculators = [
    { name: 'Income Tax Calculator', path: '/finance/income-tax-calculator-malaysia', description: 'Calculate your income tax' },
    { name: 'EPF Calculator', path: '/finance/epf-calculator-malaysia', description: 'Calculate EPF contributions' },
    { name: 'Net Worth Calculator', path: '/life/net-worth-calculator-malaysia', description: 'Calculate your net worth' },
  ];

  const faqItems = [
    {
      question: 'What is Zakat and who must pay it?',
      answer: 'Zakat is one of the five pillars of Islam, an obligatory charitable contribution on wealth. Muslims who possess wealth above the nisab threshold (approximately RM20,000) for one lunar year must pay 2.5% of their eligible wealth annually. It purifies wealth and supports the community\'s needy.'
    },
    {
      question: 'What is nisab and how is it calculated?',
      answer: 'Nisab is the minimum threshold of wealth that makes Zakat obligatory. It\'s equivalent to 85 grams of gold or 595 grams of silver. In Malaysia, using the gold standard at approximately RM235/gram, nisab is around RM20,000. If your zakatable wealth exceeds this for one full lunar year, Zakat is obligatory.'
    },
    {
      question: 'What types of wealth are subject to Zakat?',
      answer: 'Zakatable wealth includes cash, savings, gold and silver jewelry (above 85g gold/595g silver), business inventory and profits, investment portfolios (stocks, unit trusts, shares), agricultural produce, and livestock. Personal use items like homes, cars, and necessary jewelry are exempt.'
    },
    {
      question: 'Can I deduct my debts before calculating Zakat?',
      answer: 'Yes, immediate debts due within the Zakat year can be deducted from your total wealth before calculating Zakat. This includes credit card debts, personal loans due, and outstanding bills. However, long-term debts like mortgages are typically not deducted as the property itself is not zakatable.'
    },
    {
      question: 'Where should I pay my Zakat in Malaysia?',
      answer: 'Zakat can be paid through state Islamic Religious Councils (MAIN, MAIK, MAIWP, etc.) via online portals, banks, or authorized collection centers. Many employers also offer salary deduction schemes. Zakat paid through official channels in Malaysia is tax-deductible, reducing your income tax liability.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Zakat Calculator Malaysia 2026 | Calculate Zakat on Wealth"
        description="Calculate your Zakat obligation in Malaysia for 2026. Free Islamic finance calculator showing Zakat payable on cash, gold, investments, and business assets with nisab threshold."
        keywords={['zakat calculator', 'malaysia', '2026', 'islamic finance', 'zakat harta']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Zakat Calculator Malaysia 2026
        </h1>

        <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-green-900 mb-3">
            Fulfill your Islamic obligation AND reduce income tax. Zakat is a double benefit.
          </h2>
          <p className="text-green-800 mb-3">
            <strong>The blessing with financial benefit:</strong> Pay Zakat through official channels in Malaysia,
            and it's tax-deductible ringgit-for-ringgit. Pay RM2,000 in Zakat? Reduce your income tax by RM2,000.
          </p>
          <p className="text-green-800 font-semibold">
            Many Muslims underpay Zakat because they don't calculate all zakatable assets (investments, business assets, gold).
            Use this calculator to ensure you're fulfilling your obligation accurately. Purify your wealth properly.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate your Zakat obligation on wealth (Zakat Harta) in Malaysia. Zakat is an Islamic obligation
          requiring Muslims to contribute 2.5% of their eligible wealth annually to support the community.
          This calculator helps determine if your wealth exceeds the nisab threshold and calculates your
          Zakat payable based on cash, savings, gold, investments, and business assets.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
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
              <p className="text-sm text-gray-500 mt-1">
                Include all cash, bank accounts, EPF Account 2, fixed deposits
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gold & Silver (MYR)
              </label>
              <input
                type="number"
                value={goldSilver}
                onChange={(e) => setGoldSilver(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 15000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Current market value of gold and silver (exclude jewelry for personal use)
              </p>
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
                placeholder="e.g., 30000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Stocks, unit trusts, shares, investment accounts
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Assets (MYR)
              </label>
              <input
                type="number"
                value={businessAssets}
                onChange={(e) => setBusinessAssets(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 0"
              />
              <p className="text-sm text-gray-500 mt-1">
                Business inventory, profits, receivables (exclude fixed assets)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Immediate Debts (MYR)
              </label>
              <input
                type="number"
                value={debts}
                onChange={(e) => setDebts(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 5000"
              />
              <p className="text-sm text-gray-500 mt-1">
                Debts due within the year (credit cards, personal loans)
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Zakat
          </button>
        </div>

        {result && (
          <>
            <div className={`rounded-lg p-6 mb-8 border ${
              result.isEligible
                ? 'bg-blue-50 border-blue-200'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Zakat Summary</h2>
              {!result.isEligible && (
                <div className="mb-4 p-3 bg-gray-100 rounded-lg">
                  <p className="text-gray-800 font-semibold">
                    Your wealth is below nisab threshold
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    Zakat is not obligatory when wealth is below {formatCurrency(result.nisabValue)}
                  </p>
                </div>
              )}
              {result.isEligible && (
                <div className="mb-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    Your wealth exceeds nisab threshold
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Zakat is obligatory. Please fulfill this important Islamic obligation.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Net Zakatable Wealth</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.netWealth)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Nisab Threshold</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.nisabValue)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Zakat Payable (2.5%)</p>
                  <p className={`text-2xl font-bold ${result.isEligible ? 'text-blue-600' : 'text-gray-400'}`}>
                    {formatCurrency(result.zakatPayable)}
                  </p>
                </div>
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Wealth Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.breakdown.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.category}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Total Assets</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">{formatCurrency(result.totalAssets)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Less: Immediate Debts</td>
                      <td className="px-4 py-3 text-sm text-red-600 text-right">-{formatCurrency(result.debts)}</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Net Zakatable Wealth</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600 text-right">{formatCurrency(result.netWealth)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Zakat Rate</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">2.5%</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Zakat Payable</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(result.zakatPayable)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {result.isEligible && (
              <div className="bg-green-50 rounded-lg p-6 mb-8 border border-green-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Important Reminders</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Zakat is payable once your wealth has been above nisab for one complete lunar year (haul)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Pay Zakat to your state Islamic Religious Council (MAIN/MAIK/MAIWP) or authorized agents</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Zakat payments in Malaysia are tax-deductible, reducing your income tax liability</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Keep payment receipts for tax relief claims and spiritual record-keeping</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Consult Islamic scholars if you have questions about specific assets or circumstances</span>
                  </li>
                </ul>
              </div>
            )}

            <AffiliateCTA
              title="Need Islamic Finance Guidance?"
              description="Consult with certified Islamic finance advisors and scholars for personalized guidance on Zakat calculation, Shariah-compliant investments, and wealth management."
              buttonText="Find Islamic Finance Experts"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Zakat in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Zakat is one of the five pillars of Islam, an obligatory act of worship through wealth purification
              and community support. The word "Zakat" means purification and growth - giving Zakat purifies your
              wealth and allows it to grow with blessings. It's distinct from optional charity (sadaqah) as it's
              mandatory for Muslims who meet specific criteria. In Malaysia, Zakat is administered by state Islamic
              Religious Councils under the authority of Sultans and state governments.
            </p>
            <p>
              The nisab is the minimum threshold that makes Zakat obligatory, set at the value of 85 grams of gold
              or 595 grams of silver. Using the gold standard (as practiced in Malaysia), with gold at approximately
              RM235 per gram, the nisab is around RM20,000. If your zakatable wealth meets or exceeds nisab for one
              complete lunar year (haul), you must pay 2.5% of that wealth as Zakat. The lunar year consideration is
              important - if your wealth drops below nisab during the year, the count resets when it rises above again.
            </p>
            <p>
              Zakatable wealth includes all productive and growing assets: cash in hand and bank accounts, savings
              and fixed deposits, gold and silver (excluding reasonable jewelry for personal use), business inventory
              and trading goods, investment portfolios including stocks and unit trusts, agricultural produce, and
              livestock. Assets not subject to Zakat include your primary residence, personal vehicles, household
              items, tools of trade, and jewelry for personal adornment within reasonable limits (generally up to
              85g gold for women).
            </p>
            <p>
              In calculating Zakat, you may deduct immediate debts due within the Zakat year, such as credit card
              balances, personal loans, and outstanding bills. However, opinions differ on long-term debts like
              mortgages. Many scholars exclude mortgages from deductions since the property securing the debt is
              itself not zakatable. For complex situations involving business ownership, rental properties, or
              substantial investments, consult with Islamic scholars or certified Islamic finance advisors for
              accurate calculation according to your madhab (school of thought).
            </p>
            <p>
              Paying Zakat in Malaysia offers additional benefits beyond religious obligation. Zakat paid through
              official state Islamic councils is fully tax-deductible, reducing your taxable income for income tax
              purposes. Many banks and employers offer convenient salary deduction schemes for automatic Zakat payment.
              Online payment portals make the process simple and provide instant receipts. Zakat funds in Malaysia
              support eight categories of recipients (asnaf) as specified in the Quran: the poor, needy, Zakat
              administrators, new Muslims, slaves seeking freedom (historically), debtors, those in the path of Allah,
              and travelers in need. Your Zakat directly improves lives in your community while fulfilling this
              fundamental Islamic obligation.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator provides basic Zakat estimation based on general Shafi'i
            methodology commonly practiced in Malaysia. Different schools of thought may have varying rulings on
            specific assets and deductions. For authoritative guidance, consult certified Islamic scholars or your
            state Islamic Religious Council. This calculator is not affiliated with any religious authority.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
