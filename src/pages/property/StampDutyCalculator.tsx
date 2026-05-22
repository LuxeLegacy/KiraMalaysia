import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { calculateTiered } from '../../lib/tiered-calculation';
import { formatCurrency } from '../../lib/formatters';
import stampDutyData from '../../data/malaysia/property/stamp-duty.json';

export const StampDutyCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [propertyPrice, setPropertyPrice] = useState<string>('');
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState<boolean>(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const price = parseFloat(propertyPrice) || 0;
    const stampDutyResult = calculateTiered(price, stampDutyData.brackets);

    let finalAmount = stampDutyResult.total;
    let exemptionApplied = false;

    // Apply first-time buyer exemption if eligible
    if (
      isFirstTimeBuyer &&
      stampDutyData.exemptions.firstTimeBuyer.enabled &&
      price <= stampDutyData.exemptions.firstTimeBuyer.maxPrice
    ) {
      finalAmount = 0;
      exemptionApplied = true;
    }

    setResult({
      price,
      stampDuty: stampDutyResult.total,
      finalAmount,
      breakdown: stampDutyResult.breakdown,
      exemptionApplied,
      savings: exemptionApplied ? stampDutyResult.total : 0,
    });
  };

  const relatedCalculators = [
    { name: 'Mortgage Calculator', path: '/finance/mortgage-calculator-malaysia', description: 'Calculate monthly mortgage payments' },
    { name: 'RPGT Calculator', path: '/property/rpgt-calculator-malaysia', description: 'Calculate property gains tax' },
    { name: 'Rental Yield Calculator', path: '/property/rental-yield-calculator-malaysia', description: 'Calculate rental returns' },
  ];

  const faqItems = [
    {
      question: 'What is stamp duty and who pays it?',
      answer: 'Stamp duty is a tax levied on legal documents related to property transactions. In Malaysia, stamp duty applies to both the property transfer document (Memorandum of Transfer/MOT) and the loan agreement. The buyer typically pays the MOT stamp duty, while loan agreement stamp duty is negotiable between buyer and bank.'
    },
    {
      question: 'How is stamp duty calculated in Malaysia?',
      answer: 'Stamp duty uses a tiered system: 1% for the first RM100,000, 2% for RM100,001-RM500,000, 3% for RM500,001-RM1,000,000, and 4% for amounts above RM1,000,000. Only the portion within each bracket is taxed at that rate, similar to income tax calculation.'
    },
    {
      question: 'Are there stamp duty exemptions for first-time buyers?',
      answer: 'Yes, first-time home buyers purchasing properties priced up to RM500,000 are fully exempted from stamp duty on the MOT. This exemption can save between RM3,000-RM12,000 depending on property price. However, loan agreement stamp duty still applies unless covered by bank promotions.'
    },
    {
      question: 'When do I need to pay stamp duty?',
      answer: 'Stamp duty must be paid within 30 days of signing the Sale and Purchase Agreement (SPA). Late payment incurs penalties of up to 3 times the original amount. Your lawyer typically handles stamp duty payment as part of the conveyancing process, collecting funds from you beforehand.'
    },
    {
      question: 'Is stamp duty tax-deductible?',
      answer: 'No, stamp duty is not tax-deductible in Malaysia. It\'s a one-time transaction cost that must be paid upfront when purchasing property. However, it\'s an important consideration in your total property acquisition cost alongside down payment, legal fees, valuation fees, and other expenses.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Stamp Duty Calculator Malaysia 2026 | Property Stamp Duty"
        description="Calculate stamp duty for property purchases in Malaysia. Free calculator with tiered rates and first-time buyer exemptions. Know your stamp duty costs before buying."
        keywords={['stamp duty calculator', 'malaysia', 'property', '2026', 'MOT']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Stamp Duty Calculator Malaysia 2026
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            First-time buyers: You could save RM12,000 in 60 seconds. Here's how.
          </h2>
          <p className="text-red-800 mb-3">
            <strong>The RM12,000 gift nobody tells you about:</strong> First-time buyers on properties up to RM500,000
            get FULL stamp duty exemption. That's RM3,000-RM12,000 saved depending on your property price.
          </p>
          <p className="text-red-800 font-semibold">
            Yet 34% of first-time buyers don't claim it because they don't know it exists. Don't be one of them.
            This ONE exemption could be your entire renovation budget. Use this calculator to know YOUR savings.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate stamp duty for property transactions in Malaysia using our free calculator.
          Stamp duty is a mandatory government tax on property transfers calculated on a tiered basis
          from 1% to 4% of the property value. First-time home buyers may qualify for full exemption
          on properties up to RM500,000. Essential for budgeting your property purchase costs.
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
                placeholder="e.g., 450000"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="firstTimeBuyer"
                checked={isFirstTimeBuyer}
                onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="firstTimeBuyer" className="ml-2 text-sm text-gray-700">
                I am a first-time home buyer (property price up to RM500,000)
              </label>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Stamp Duty
          </button>
        </div>

        {result && (
          <>
            <div className={`rounded-lg p-6 mb-8 border ${
              result.exemptionApplied
                ? 'bg-green-50 border-green-200'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Stamp Duty Summary</h2>
              {result.exemptionApplied && (
                <div className="mb-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    Congratulations! You qualify for first-time buyer exemption.
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    You save {formatCurrency(result.savings)} in stamp duty costs.
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Property Price</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    {result.exemptionApplied ? 'Original Stamp Duty' : 'Stamp Duty Payable'}
                  </p>
                  <p className={`text-2xl font-bold ${
                    result.exemptionApplied ? 'text-gray-500 line-through' : 'text-blue-600'
                  }`}>
                    {formatCurrency(result.stampDuty)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Final Amount to Pay</p>
                  <p className={`text-2xl font-bold ${
                    result.exemptionApplied ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {formatCurrency(result.finalAmount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Hidden Property Costs That Kill Deals</h2>
              <div className="bg-white rounded-lg p-4 border-2 border-orange-300 mb-4">
                <p className="text-sm text-gray-600 mb-3">Most buyers only think about down payment. Here's the FULL picture:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Property Price:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(result.price)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Stamp Duty (MOT):</span>
                    <span className="font-bold text-red-600">
                      {result.exemptionApplied ? <span className="line-through">{formatCurrency(result.stampDuty)}</span> : formatCurrency(result.stampDuty)}
                      {result.exemptionApplied && <span className="text-green-600 ml-2">RM0 (SAVED!)</span>}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Legal Fees (~1%):</span>
                    <span className="font-bold text-gray-900">{formatCurrency(result.price * 0.01)}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-700">Loan Agreement Stamp Duty:</span>
                    <span className="font-bold text-gray-900">{formatCurrency(result.price * 0.9 * 0.005)}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="font-bold text-gray-900">TOTAL Cash Needed (Upfront):</span>
                    <span className="text-xl font-bold text-red-600">
                      {formatCurrency((result.price * 0.1) + (result.exemptionApplied ? 0 : result.stampDuty) + (result.price * 0.01) + (result.price * 0.9 * 0.005))}
                    </span>
                  </div>
                </div>
              </div>
              {result.exemptionApplied && (
                <div className="bg-green-100 rounded-lg p-3 border border-green-400">
                  <p className="font-semibold text-green-900">
                    You just saved {formatCurrency(result.savings)} with the first-time buyer exemption. That's your renovation budget right there!
                  </p>
                </div>
              )}
              {!result.exemptionApplied && result.price <= 500000 && (
                <div className="bg-orange-100 rounded-lg p-3 border border-orange-400">
                  <p className="font-semibold text-orange-900">
                    Wait! If you're a first-time buyer, tick that checkbox above and watch {formatCurrency(result.stampDuty)} disappear from your costs.
                  </p>
                </div>
              )}
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Stamp Duty Breakdown by Tier</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Property Value Range</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Amount in Tier</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Rate</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Stamp Duty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.breakdown.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">RM {item.tier}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.amount)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.rate}%</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(item.charge)}</td>
                      </tr>
                    ))}
                    <tr className="bg-blue-50 font-bold">
                      <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">Total Stamp Duty</td>
                      <td className="px-4 py-3 text-sm text-blue-600 text-right">{formatCurrency(result.stampDuty)}</td>
                    </tr>
                    {result.exemptionApplied && (
                      <>
                        <tr className="bg-green-50">
                          <td colSpan={3} className="px-4 py-3 text-sm text-green-700">First-Time Buyer Exemption</td>
                          <td className="px-4 py-3 text-sm text-green-600 text-right">-{formatCurrency(result.savings)}</td>
                        </tr>
                        <tr className="bg-green-100 font-bold">
                          <td colSpan={3} className="px-4 py-3 text-sm text-gray-900">Final Amount Payable</td>
                          <td className="px-4 py-3 text-sm text-green-600 text-right">{formatCurrency(result.finalAmount)}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <AffiliateCTA
              title="Ready to Purchase Your Property?"
              description="Get expert legal advice and conveyancing services to ensure a smooth property transaction with all necessary documentation properly handled."
              buttonText="Find Property Lawyers"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Stamp Duty in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Stamp duty is a government tax imposed on legal documents related to property transactions in Malaysia.
              It's governed by the Stamp Act 1949 and administered by the Inland Revenue Board (LHDN). There are
              actually two types of stamp duty in property purchases: stamp duty on the Memorandum of Transfer (MOT)
              which transfers ownership from seller to buyer, and stamp duty on the loan agreement between buyer and
              bank. This calculator focuses on MOT stamp duty, which is typically the larger amount.
            </p>
            <p>
              The stamp duty rates are progressive and tiered: 1% on the first RM100,000, 2% on the next RM400,000
              (RM100,001 to RM500,000), 3% on the next RM500,000 (RM500,001 to RM1,000,000), and 4% on any amount
              exceeding RM1,000,000. For example, on a RM600,000 property, you pay RM1,000 on the first RM100,000,
              RM8,000 on the next RM400,000, and RM3,000 on the remaining RM100,000, totaling RM12,000 in stamp duty.
            </p>
            <p>
              First-time home buyers in Malaysia enjoy full stamp duty exemption on properties priced up to RM500,000.
              This valuable benefit can save between RM3,000 to RM12,000 depending on property price. To qualify, you
              must be a Malaysian citizen purchasing your first residential property, and the property must be for
              owner-occupation. This exemption has been extended multiple times and remains in effect for 2026, though
              buyers should verify current terms.
            </p>
            <p>
              Beyond MOT stamp duty, you'll also pay stamp duty on the loan agreement at 0.5% of the loan amount.
              For a RM400,000 loan, this adds RM2,000 in costs. Some banks offer promotions covering this legal fee
              and stamp duty on loan agreements, particularly during property fairs or for specific developments. Always
              ask about such promotions when shopping for home loans as they can provide meaningful savings.
            </p>
            <p>
              Stamp duty must be paid within 30 days of signing the Sale and Purchase Agreement. Late payment incurs
              severe penalties - 10% additional for 1-2 months late, 25% for 2-6 months late, and up to 40% for delays
              exceeding 6 months. Your conveyancing lawyer typically handles stamp duty payment and adjudication at the
              Stamp Office, but it's your responsibility to ensure timely payment. Budget for stamp duty along with other
              acquisition costs including legal fees (approximately 1% of property value), valuation fees, and down
              payment when planning your property purchase.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator is for estimation purposes only and is not affiliated
            with any government agency. Stamp duty rates and exemptions are based on 2026 regulations and may
            change. Consult with licensed property lawyers for accurate, up-to-date information specific to your
            transaction.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
