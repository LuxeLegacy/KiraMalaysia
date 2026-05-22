import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import rpgtData from '../../data/malaysia/property/rpgt.json';

export const RPGTCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [purchasePrice, setPurchasePrice] = useState<string>('');
  const [sellingPrice, setSellingPrice] = useState<string>('');
  const [holdingPeriod, setHoldingPeriod] = useState<string>('');
  const [sellerType, setSellerType] = useState<string>('individual');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const purchase = parseFloat(purchasePrice) || 0;
    const selling = parseFloat(sellingPrice) || 0;
    const years = parseFloat(holdingPeriod) || 0;

    const gain = selling - purchase;

    if (gain <= 0) {
      setResult({
        purchase,
        selling,
        gain: 0,
        rpgt: 0,
        rate: 0,
        years,
        netProceeds: selling,
        hasGain: false,
      });
      return;
    }

    // Find applicable rate based on holding period
    const periods = sellerType === 'company'
      ? rpgtData.holdingPeriods.company
      : rpgtData.holdingPeriods.individual;

    let applicableRate = 0;
    for (const period of periods) {
      if (years >= period.years) {
        if (period.maxYears === null || years < period.maxYears) {
          applicableRate = period.rate;
          break;
        }
      }
    }

    const rpgtAmount = (gain * applicableRate) / 100;
    const netProceeds = selling - rpgtAmount;

    setResult({
      purchase,
      selling,
      gain,
      rpgt: rpgtAmount,
      rate: applicableRate,
      years,
      netProceeds,
      hasGain: true,
      sellerType,
    });
  };

  const relatedCalculators = [
    { name: 'Stamp Duty Calculator', path: '/property/stamp-duty-calculator-malaysia', description: 'Calculate stamp duty costs' },
    { name: 'Rental Yield Calculator', path: '/property/rental-yield-calculator-malaysia', description: 'Calculate rental returns' },
    { name: 'Mortgage Calculator', path: '/finance/mortgage-calculator-malaysia', description: 'Calculate home loan payments' },
  ];

  const faqItems = [
    {
      question: 'What is RPGT and when do I need to pay it?',
      answer: 'Real Property Gains Tax (RPGT) is a capital gains tax on profits from selling property in Malaysia. It applies when you sell a property for more than you paid. The tax rate depends on how long you\'ve held the property, ranging from 30% for properties held less than 3 years to 0% for individuals who hold properties for 6 years or more.'
    },
    {
      question: 'How is the holding period calculated?',
      answer: 'The holding period is calculated from the date you signed the Sale and Purchase Agreement (SPA) for the purchase to the date you sign the SPA for the sale. The period is measured in complete years. For example, if you bought in January 2020 and sold in March 2023, your holding period is 3 years.'
    },
    {
      question: 'Are there any RPGT exemptions?',
      answer: 'Yes, individuals are exempt from RPGT on gains from disposing one private residence once every 5 years, provided the property was not acquired for business purposes. Properties acquired through inheritance are also exempt. For properties held 6 years or longer by individuals, the RPGT rate is 0%, effectively an exemption.'
    },
    {
      question: 'What costs can I deduct from my gains?',
      answer: 'You can deduct the original purchase price, stamp duty paid on purchase, legal fees for purchase and sale, renovation costs (with receipts), real estate agent fees, advertising costs, and valuation fees. Keeping detailed records of all expenses helps minimize your taxable gain and RPGT liability.'
    },
    {
      question: 'What are the RPGT rates for 2026?',
      answer: 'For individuals: 30% if held less than 3 years, 20% for 3-4 years, 15% for 4-5 years, and 0% for 5 years and above. For companies: 30% for less than 3 years, 20% for 3-4 years, 15% for 4-5 years, and 10% for 5 years and above. Companies never reach 0% RPGT rate.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="RPGT Calculator Malaysia 2026 | Real Property Gains Tax"
        description="Calculate RPGT (Real Property Gains Tax) in Malaysia based on property holding period. Free calculator showing tax liability on property sale profits with detailed breakdown."
        keywords={['rpgt calculator', 'malaysia', 'property gains tax', '2026', 'capital gains']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          RPGT Calculator Malaysia 2026
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            Property flippers: That RM100k profit becomes RM70k after RPGT. Here's the timing that matters.
          </h2>
          <p className="text-red-800 mb-3">
            <strong>The flip-killer tax:</strong> Sell within 3 years? Government takes 30% of your profit. That RM100,000 gain
            becomes RM70,000 after RPGT. Hold 3-5 years: 20-15%. Hold 5+ years as individual: 0% RPGT. FREE.
          </p>
          <p className="text-red-800 font-semibold">
            Property investors who don't calculate RPGT lose 15-30% of profits. One extra year of holding can save you
            RM15,000-RM30,000 on a typical RM100k gain. Use this calculator BEFORE you list your property.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate Real Property Gains Tax (RPGT) on property sales in Malaysia. RPGT is a capital
          gains tax imposed on profits from disposing of property. The tax rate varies based on the
          holding period, with lower rates for longer holding periods. Individuals who hold property
          for 6 years or more pay 0% RPGT, while companies have a minimum rate of 10%.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purchase Price (MYR)
              </label>
              <input
                type="number"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 400000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selling Price (MYR)
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 550000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Holding Period (years)
              </label>
              <input
                type="number"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 4"
              />
              <p className="text-sm text-gray-500 mt-1">
                From purchase SPA date to sale SPA date
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seller Type
              </label>
              <select
                value={sellerType}
                onChange={(e) => setSellerType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate RPGT
          </button>
        </div>

        {result && (
          <>
            <div className={`rounded-lg p-6 mb-8 border ${
              !result.hasGain || result.rpgt === 0
                ? 'bg-green-50 border-green-200'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">RPGT Summary</h2>
              {!result.hasGain && (
                <div className="mb-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    No capital gain - No RPGT payable
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Your selling price is not higher than purchase price.
                  </p>
                </div>
              )}
              {result.hasGain && result.rpgt === 0 && (
                <div className="mb-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    No RPGT payable (0% rate)
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    {result.sellerType === 'individual'
                      ? 'Properties held 6+ years by individuals are exempt from RPGT.'
                      : 'RPGT rate applied based on holding period.'}
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Capital Gain</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(result.gain)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">RPGT Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{formatPercentage(result.rate)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">RPGT Payable</p>
                  <p className="text-2xl font-bold text-red-600">{formatCurrency(result.rpgt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Net Proceeds</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.netProceeds)}</p>
                </div>
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction Breakdown</h3>
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
                      <td className="px-4 py-3 text-sm text-gray-900">Original Purchase Price</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(result.purchase)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Selling Price</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(result.selling)}</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Capital Gain</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600 text-right">{formatCurrency(result.gain)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Holding Period</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{result.years} years</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Applicable RPGT Rate ({result.sellerType})</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatPercentage(result.rate)}</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">RPGT Payable</td>
                      <td className="px-4 py-3 text-sm font-bold text-red-600 text-right">{formatCurrency(result.rpgt)}</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Net Proceeds After RPGT</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">{formatCurrency(result.netProceeds)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">RPGT Rate Schedule 2026</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Individual</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>Within 3 years: <span className="font-semibold">30%</span></li>
                    <li>3-4 years: <span className="font-semibold">20%</span></li>
                    <li>4-5 years: <span className="font-semibold">15%</span></li>
                    <li>5 years and above: <span className="font-semibold text-green-600">0%</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Company</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>Within 3 years: <span className="font-semibold">30%</span></li>
                    <li>3-4 years: <span className="font-semibold">20%</span></li>
                    <li>4-5 years: <span className="font-semibold">15%</span></li>
                    <li>5 years and above: <span className="font-semibold">10%</span></li>
                  </ul>
                </div>
              </div>
            </div>

            <AffiliateCTA
              title="Need Help with Property Tax Planning?"
              description="Consult with tax professionals to optimize your RPGT liability and explore legitimate deductions for renovation costs, legal fees, and other expenses."
              buttonText="Find Tax Consultants"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding RPGT in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Real Property Gains Tax (RPGT) is a form of capital gains tax imposed on profits derived from the
              disposal of real property in Malaysia. Introduced in 1976 and administered by the Inland Revenue Board
              (LHDN), RPGT aims to curb speculation in the property market by taxing short-term property flipping
              more heavily than long-term holdings. The tax applies to both Malaysian citizens and foreigners,
              though non-citizens face different rates (typically 30% regardless of holding period).
            </p>
            <p>
              The holding period is crucial in determining your RPGT liability. It's calculated from the date you
              signed the Sale and Purchase Agreement (SPA) for the purchase to the date you sign the SPA for the
              sale. Only complete years count - if you held a property for 3 years and 11 months, you're taxed at
              the 3-4 year rate, not the 4-5 year rate. This makes timing your property sale strategically important
              to minimize RPGT.
            </p>
            <p>
              Individuals who hold property for 6 years or more pay 0% RPGT, effectively exempting long-term property
              owners from this tax. This policy encourages long-term property ownership over speculation. However,
              companies never reach 0% - even after 6 years, companies pay 10% RPGT. This is an important consideration
              when deciding whether to hold investment properties personally or through a corporate entity.
            </p>
            <p>
              When calculating your chargeable gain, you can deduct various acquisition and disposal costs from your
              profit. Allowable deductions include the original purchase price, stamp duty paid on purchase, legal
              fees for both purchase and sale, renovation and improvement costs (with proper receipts and contractor
              invoices), real estate agent commissions, advertising costs, and valuation fees. However, you cannot
              deduct mortgage interest payments or maintenance costs. Keeping detailed records of all property-related
              expenses is essential to minimize your RPGT liability.
            </p>
            <p>
              Important exemptions exist: individuals can claim exemption from RPGT on gains from disposing of one
              private residence once every 5 years, provided it was not acquired for business purposes and was used
              as your primary home. Properties acquired through inheritance or gifts from family members (parents,
              grandparents, spouse, children) are also exempt from RPGT. RPGT must be paid within 60 days of the
              disposal date, with the responsibility typically falling on the seller. Your lawyer handling the sale
              will usually assist with RPGT computation and filing. Failure to pay RPGT on time results in penalties
              and potential legal action.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator provides basic RPGT estimation and is not affiliated
            with any government agency. Actual RPGT may vary based on allowable deductions, exemptions, and
            specific circumstances. Consult with tax professionals or LHDN for accurate tax assessments and
            advice specific to your situation.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
