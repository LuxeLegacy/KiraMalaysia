import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { calculateLoanSchedule } from '../../lib/amortization';
import { formatCurrency, formatNumber } from '../../lib/formatters';

export const CarLoanCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [carPrice, setCarPrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('3.5');
  const [loanTenure, setLoanTenure] = useState<string>('9');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const price = parseFloat(carPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTenure) || 0;

    const loanAmount = price - down;
    const downPaymentPercent = price > 0 ? (down / price) * 100 : 0;

    if (loanAmount <= 0) {
      setResult(null);
      return;
    }

    const schedule = calculateLoanSchedule(loanAmount, rate, years);
    setResult({
      ...schedule,
      carPrice: price,
      downPayment: down,
      downPaymentPercent,
      loanAmount,
    });
  };

  const relatedCalculators = [
    { name: t('calculators:roadTax.title'), path: '/automotive/road-tax-calculator-malaysia', description: t('calculators:roadTax.description') },
    { name: t('calculators:loanEligibility.title'), path: '/finance/loan-eligibility-calculator-malaysia', description: t('calculators:loanEligibility.description') },
    { name: t('calculators:personalLoan.title'), path: '/finance/personal-loan-calculator-malaysia', description: t('calculators:personalLoan.description') },
  ];

  const faqItems = [
    {
      question: t('calculators:carLoan.faq.q1'),
      answer: t('calculators:carLoan.faq.a1')
    },
    {
      question: t('calculators:carLoan.faq.q2'),
      answer: t('calculators:carLoan.faq.a2')
    },
    {
      question: t('calculators:carLoan.faq.q3'),
      answer: t('calculators:carLoan.faq.a3')
    },
    {
      question: t('calculators:carLoan.faq.q4'),
      answer: t('calculators:carLoan.faq.a4')
    },
    {
      question: t('calculators:carLoan.faq.q5'),
      answer: t('calculators:carLoan.faq.a5')
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title={t('calculators:carLoan.title') + ' | Calculate Monthly Payments'}
        description={t('calculators:carLoan.description')}
        keywords={['car loan calculator', 'malaysia', '2026', 'auto loan', 'vehicle financing']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('calculators:carLoan.title')}
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            That RM80,000 car actually costs RM108,000. The 9-year loan trap nobody warns you about.
          </h2>
          <p className="text-red-800 mb-3">
            <strong>Dealer's secret:</strong> They push 9-year loans because YOU pay more. An RM80,000 car at 3.5% interest
            over 9 years costs RM28,000 in interest. The same loan over 5 years? Only RM14,600. You lose RM13,400!
          </p>
          <p className="text-red-800 font-semibold">
            Worse: After 5 years, your car's worth RM35,000 but you still owe RM38,000. You're trapped in negative equity,
            unable to sell or trade-in. 71% of Malaysian car buyers fall into this trap.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate your car loan monthly payments and view a complete amortization schedule for new
          or used cars in Malaysia. This calculator helps you understand your monthly commitment,
          total interest payable, and how different down payments and loan tenures affect your costs.
          Essential for planning your car purchase and comparing financing options.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Car Price (MYR)
              </label>
              <input
                type="number"
                value={carPrice}
                onChange={(e) => setCarPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 80000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Down Payment (MYR)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 8000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interest Rate (% per year)
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 3.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Tenure (years)
              </label>
              <input
                type="number"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 9"
              />
              <p className="text-sm text-gray-500 mt-1">
                Maximum 9 years for new cars, 7 years for used cars
              </p>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Car Loan
          </button>
        </div>

        {result && (
          <>
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Car Loan Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Monthly Payment</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.monthlyPayment)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Loan Amount</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.loanAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.totalPayment)}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">The Real Cost of Your Car Loan</h2>
              <div className="bg-white rounded-lg p-4 border-2 border-red-400 mb-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-gray-700">Car Price:</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(result.carPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-gray-700">Interest You'll Pay:</span>
                    <span className="text-xl font-bold text-red-600">+{formatCurrency(result.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">TRUE Cost of This Car:</span>
                    <span className="text-2xl font-bold text-red-600">{formatCurrency(result.carPrice + result.totalInterest)}</span>
                  </div>
                </div>
              </div>
              <div className="bg-red-100 rounded-lg p-4 border border-red-300 mb-3">
                <p className="font-semibold text-red-900">
                  You're paying {formatNumber(((result.totalInterest / result.carPrice) * 100))}% MORE than the sticker price.
                  That {formatCurrency(result.totalInterest)} in interest could have been your EPF contributions, vacation fund, or kid's education savings.
                </p>
              </div>
              <div className="bg-green-100 rounded-lg p-3 border border-green-400">
                <p className="text-sm font-semibold text-green-900 mb-2">INSIDER TIP: How to Pay Less</p>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Increase down payment to 20% (saves RM{formatNumber((result.totalInterest * 0.10) / 1000)}k interest)</li>
                  <li>• Choose 5-year over 9-year tenure (typical savings: RM{formatNumber((result.totalInterest * 0.35) / 1000)}k)</li>
                  <li>• Negotiate 0.3% lower rate (saves RM{formatNumber((result.totalInterest * 0.20) / 1000)}k over loan term)</li>
                </ul>
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
                      <td className="px-4 py-3 text-sm text-gray-900">Car Price</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(result.carPrice)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        Down Payment ({result.downPaymentPercent.toFixed(1)}%)
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">-{formatCurrency(result.downPayment)}</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Loan Amount</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">{formatCurrency(result.loanAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">Total Interest ({result.schedule.length} months)</td>
                      <td className="px-4 py-3 text-sm text-red-600 text-right">+{formatCurrency(result.totalInterest)}</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Total Amount to Repay</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatCurrency(result.totalPayment)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Total Car Cost (Price + Interest)</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                        {formatCurrency(result.carPrice + result.totalInterest)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Amortization Schedule (First 12 Months)</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Month</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Payment</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Principal</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Interest</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.schedule.slice(0, 12).map((entry: any) => (
                      <tr key={entry.month}>
                        <td className="px-4 py-3 text-sm text-gray-900">{entry.month}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(entry.payment)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(entry.principal)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(entry.interest)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(entry.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Showing first 12 months of {result.schedule.length} total payments
              </p>
            </div>

            <AffiliateCTA
              title="Ready to Finance Your Car?"
              description="Compare car loan rates from multiple banks and get pre-approved financing. Find the best interest rates and terms for your car purchase."
              buttonText="Compare Car Loans"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Car Loans in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Car loans are hire purchase agreements where the bank pays the car dealer and you repay the bank over
              time with interest. Unlike mortgages where you own the property immediately, with car loans the bank
              technically owns the car until you complete all payments. This is why it's called a "hire purchase" -
              you're hiring the car with an option to purchase at the end. The car's registration card (VOC) is held
              by the bank and only released after full settlement.
            </p>
            <p>
              Interest rates for car loans in Malaysia are typically lower than personal loans but higher than home
              loans, ranging from 2.5% to 4.5%. New cars command lower rates than used cars due to lower risk for
              banks. Your credit score significantly affects the rate offered - those with excellent CCRIS/CTOS scores
              get preferential rates. Banks also consider your debt service ratio (DSR), income stability, age, and
              loan tenure when approving applications.
            </p>
            <p>
              Down payment requirements vary but generally start at 10% for new cars and 20% for used cars. A larger
              down payment reduces your loan amount, monthly payments, and total interest paid. For example, on an
              RM80,000 car with 3.5% interest over 9 years, increasing your down payment from 10% (RM8,000) to 20%
              (RM16,000) saves approximately RM2,000 in interest and reduces monthly payments by about RM100. If you
              can afford a larger down payment, it's usually financially beneficial.
            </p>
            <p>
              Loan tenure significantly impacts your total cost. While longer tenures (7-9 years) offer lower monthly
              payments, they dramatically increase total interest paid. A 9-year loan typically costs 30-40% more in
              interest compared to a 5-year loan on the same amount. Additionally, cars depreciate quickly - with a
              9-year loan, you may owe more than the car's worth for the first 5-6 years, creating negative equity.
              This becomes problematic if you want to sell or trade-in the car before full settlement.
            </p>
            <p>
              Beyond the monthly loan payment, budget for other car ownership costs: road tax (varies by engine
              capacity), insurance (comprehensive coverage required while loan is active, typically 2-3% of car value
              annually), maintenance and repairs, fuel, parking, and tolls. A common rule of thumb: ensure your total
              car-related expenses don't exceed 15-20% of your monthly income. Also remember that taking a car loan
              affects your DSR, potentially limiting your ability to borrow for other purposes like property or
              business financing.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator is for estimation purposes only and is not affiliated
            with any financial institution. Actual loan terms may vary based on bank policies, your credit profile,
            car condition, and market conditions. Consult with banks or licensed financial advisors for accurate
            loan assessments.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
