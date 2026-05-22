import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { formatCurrency } from '../../lib/formatters';
import roadTaxData from '../../data/malaysia/automotive/road-tax.json';

export const RoadTaxCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [engineCapacity, setEngineCapacity] = useState<string>('');
  const [region, setRegion] = useState<string>('peninsular');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const cc = parseFloat(engineCapacity) || 0;

    // Get rates for selected region
    const rates = roadTaxData.rates[region as keyof typeof roadTaxData.rates].saloon;

    // Find applicable rate based on engine capacity
    let roadTax = rates[0].rate; // Default to lowest rate
    for (const rate of rates) {
      if (cc <= rate.cc) {
        roadTax = rate.rate;
        break;
      }
    }

    // If exceeds maximum CC in table, use the highest rate
    if (cc > rates[rates.length - 1].cc) {
      roadTax = rates[rates.length - 1].rate;
    }

    setResult({
      engineCapacity: cc,
      roadTax,
      region,
    });
  };

  const relatedCalculators = [
    { name: 'Car Loan Calculator', path: '/automotive/car-loan-calculator-malaysia', description: 'Calculate car loan payments' },
    { name: 'Loan Eligibility Calculator', path: '/finance/loan-eligibility-calculator-malaysia', description: 'Check your loan eligibility' },
    { name: 'Net Worth Calculator', path: '/life/net-worth-calculator-malaysia', description: 'Calculate your net worth' },
  ];

  const faqItems = [
    {
      question: 'How is road tax calculated in Malaysia?',
      answer: 'Road tax in Malaysia is calculated based on your vehicle\'s engine capacity (CC) and the region where the vehicle is registered. Peninsular Malaysia has higher rates than Sabah and Sarawak. Rates increase progressively with engine capacity, ranging from RM20 for cars up to 1000cc to RM3,500 for cars above 5000cc in Peninsular Malaysia.'
    },
    {
      question: 'When do I need to renew my road tax?',
      answer: 'Road tax must be renewed annually before it expires. The expiry date is shown on your road tax sticker. You can renew up to 90 days before expiry. Driving without valid road tax is an offence that can result in fines up to RM2,000, vehicle impoundment, or court prosecution. Renewal can be done at JPJ, Pos Malaysia, or online via MyEG.'
    },
    {
      question: 'Why is road tax cheaper in Sabah and Sarawak?',
      answer: 'Road tax in Sabah and Sarawak is approximately 40-50% lower than Peninsular Malaysia as part of the Malaysia Agreement that provides certain administrative and financial autonomy to East Malaysian states. This policy makes car ownership more affordable in these regions and recognizes different economic conditions.'
    },
    {
      question: 'Can I transfer road tax to a new owner?',
      answer: 'No, road tax is not transferable between owners. When you sell a vehicle, you can apply for road tax refund for the remaining months (if at least 3 months remain). The new owner must apply for fresh road tax in their name. This ensures proper vehicle registration records and insurance coverage.'
    },
    {
      question: 'Do electric vehicles pay road tax?',
      answer: 'Yes, but electric vehicles (EVs) in Malaysia currently enjoy full road tax exemption until December 31, 2025 as part of government initiatives to promote EV adoption. After this period, EVs may be subject to road tax, though likely at lower rates than conventional vehicles. Check current regulations as policies may be extended or modified.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Road Tax Calculator Malaysia 2026 | Calculate Car Road Tax"
        description="Calculate road tax for cars in Malaysia based on engine capacity. Free calculator showing road tax rates for Peninsular Malaysia, Sabah, and Sarawak for 2026."
        keywords={['road tax calculator', 'malaysia', '2026', 'cukai jalan', 'vehicle tax']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Road Tax Calculator Malaysia 2026
        </h1>

        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-yellow-900 mb-3">
            That 2.5L car? Road tax costs RM3,500 MORE over 10 years than a 1.6L. Do the math first.
          </h2>
          <p className="text-yellow-800 mb-3">
            <strong>Car salesmen hide this:</strong> A 2500cc car pays RM900/year in road tax. A 1600cc car pays RM550/year.
            Over 10 years, that's RM3,500 difference. Add insurance (also based on engine size) and fuel, you're looking at RM50,000+ extra.
          </p>
          <p className="text-yellow-800 font-semibold">
            Everyone focuses on monthly loan payments. Nobody calculates the annual road tax, insurance, and fuel costs.
            Use this calculator to see the TRUE cost of ownership before you sign that hire purchase agreement.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate road tax (cukai jalan) for your car in Malaysia based on engine capacity. Road tax
          rates vary by vehicle engine size (CC) and registration region. Peninsular Malaysia has different
          rates compared to Sabah and Sarawak. Use this calculator to find out your annual road tax cost
          for budgeting your car ownership expenses.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Engine Capacity (CC)
              </label>
              <input
                type="number"
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Check your vehicle registration card (VOC) for engine capacity
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="peninsular">Peninsular Malaysia</option>
                <option value="sabahSarawak">Sabah & Sarawak</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Road Tax
          </button>
        </div>

        {result && (
          <>
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Road Tax Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Engine Capacity</p>
                  <p className="text-2xl font-bold text-gray-900">{result.engineCapacity} CC</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Annual Road Tax</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.roadTax)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Region</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {result.region === 'peninsular' ? 'Peninsular' : 'Sabah & Sarawak'}
                  </p>
                </div>
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cost Breakdown</h3>
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
                      <td className="px-4 py-3 text-sm text-gray-900">Vehicle Engine Capacity</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{result.engineCapacity} CC</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Registration Region</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">
                        {result.region === 'peninsular' ? 'Peninsular Malaysia' : 'Sabah & Sarawak'}
                      </td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Annual Road Tax</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">{formatCurrency(result.roadTax)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Monthly Cost</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(result.roadTax / 12)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Road Tax Rate Schedule (Saloon Cars)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Peninsular Malaysia</h4>
                  <div className="text-sm space-y-1 text-gray-700">
                    {roadTaxData.rates.peninsular.saloon.map((rate, index) => (
                      <div key={index} className="flex justify-between">
                        <span>Up to {rate.cc} CC:</span>
                        <span className="font-semibold">{formatCurrency(rate.rate)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Sabah & Sarawak</h4>
                  <div className="text-sm space-y-1 text-gray-700">
                    {roadTaxData.rates.sabahSarawak.saloon.map((rate, index) => (
                      <div key={index} className="flex justify-between">
                        <span>Up to {rate.cc} CC:</span>
                        <span className="font-semibold">{formatCurrency(rate.rate)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Rates shown are for saloon/sedan private vehicles. Different rates apply for other vehicle types.
              </p>
            </div>

            <AffiliateCTA
              title="Need Car Insurance?"
              description="Road tax renewal requires valid insurance. Compare comprehensive car insurance plans from multiple insurers to find the best coverage and rates."
              buttonText="Compare Insurance"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Road Tax in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Road tax, officially known as "cukai jalan" or motor vehicle license, is an annual fee paid by all
              vehicle owners in Malaysia for the right to use public roads. Administered by the Road Transport
              Department (JPJ), road tax revenue funds road maintenance, traffic management, and transport
              infrastructure development. Every vehicle must display a valid road tax sticker (LKM) on the windscreen,
              and driving without one is a serious offence under the Road Transport Act 1987.
            </p>
            <p>
              The amount of road tax you pay depends primarily on your vehicle's engine capacity measured in cubic
              centimeters (CC or cm³). The progressive rate structure means larger, more powerful vehicles pay
              significantly more - a 1000cc car might pay RM20 annually in Peninsular Malaysia, while a 3000cc car
              pays RM990. This policy discourages ownership of high-capacity vehicles and promotes fuel-efficient
              smaller cars. Engine capacity is listed on your vehicle registration card (VOC/geran kereta).
            </p>
            <p>
              Regional differences exist because Sabah and Sarawak maintain certain administrative autonomy under
              the Malaysia Agreement. Road tax in East Malaysia is approximately 40-50% lower than Peninsular Malaysia
              for equivalent engine capacities. For example, a 2000cc car pays RM360 in Peninsular Malaysia but only
              RM210 in Sabah and Sarawak. This makes car ownership more affordable in these regions and recognizes
              different economic conditions and road infrastructure needs.
            </p>
            <p>
              Road tax must be renewed annually before it expires. You can renew up to 90 days in advance at JPJ
              offices, Pos Malaysia outlets, or online via platforms like MyEG. To renew, you need valid vehicle
              insurance (comprehensive or third-party), your vehicle registration card, and computerized inspection
              (puspakom) certificate if your vehicle is over 3 years old for private vehicles or annually for
              commercial vehicles. The renewal process is straightforward and typically takes minutes if all documents
              are in order.
            </p>
            <p>
              Penalties for driving without valid road tax are severe. First-time offenders face fines up to RM2,000,
              while repeat offenders can face fines up to RM10,000, imprisonment up to one year, or both. Police and
              JPJ conduct regular roadblocks to check vehicle documents, and automatic number plate recognition (ANPR)
              cameras can detect expired road tax. Additionally, your vehicle can be impounded, requiring payment of
              fines, towing fees, and storage charges before release. Always ensure your road tax is renewed on time
              to avoid these complications and maintain legal compliance.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator is for estimation purposes only and is not affiliated
            with JPJ or any government agency. Rates shown are for saloon/sedan private vehicles. Different rates
            apply for other vehicle types (company-registered, taxis, etc.). Verify current rates with JPJ before
            renewal.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
