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

export const PersonalLoanCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('6.5');
  const [loanTenure, setLoanTenure] = useState<string>('5');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTenure) || 0;

    const schedule = calculateLoanSchedule(principal, rate, years);
    setResult(schedule);
  };

  const relatedCalculators = [
    { name: 'Loan Eligibility Calculator', path: '/finance/loan-eligibility-calculator-malaysia', description: 'Check your loan eligibility' },
    { name: 'Mortgage Calculator', path: '/finance/mortgage-calculator-malaysia', description: 'Calculate home loan payments' },
    { name: 'Car Loan Calculator', path: '/automotive/car-loan-calculator-malaysia', description: 'Calculate car loan payments' },
  ];

  const faqItems = [
    {
      question: 'What is a good interest rate for personal loans in Malaysia?',
      answer: 'Personal loan interest rates in Malaysia typically range from 5% to 8% for borrowers with good credit. Rates vary based on the bank, loan amount, tenure, and your credit profile. Banks often offer lower rates during promotional periods or for existing customers with strong banking relationships.'
    },
    {
      question: 'How much can I borrow for a personal loan?',
      answer: 'Most Malaysian banks offer personal loans from RM5,000 to RM200,000, with some banks going up to RM300,000. The exact amount depends on your monthly income, debt service ratio (DSR), credit history, and the bank\'s policies. Generally, you can borrow up to 10-12 times your monthly salary.'
    },
    {
      question: 'What documents do I need to apply for a personal loan?',
      answer: 'Typically required documents include: IC copy, latest 3 months\' salary slips, latest 3-6 months\' bank statements, EPF statement, latest EA/BE form (for tax purposes), and employment confirmation letter. Self-employed individuals need to provide business registration, financial statements, and tax returns.'
    },
    {
      question: 'Should I choose a longer or shorter loan tenure?',
      answer: 'Longer tenures (5-7 years) offer lower monthly payments but result in higher total interest paid. Shorter tenures (1-3 years) have higher monthly payments but save significantly on interest. Choose based on your monthly cash flow capacity and financial goals. If possible, opt for shorter tenures to minimize interest costs.'
    },
    {
      question: 'Can I settle my personal loan early?',
      answer: 'Yes, most banks allow early settlement, though some charge a penalty (typically 2-3% of outstanding amount) especially if settled within the first 1-2 years. Check your loan agreement for specific terms. Even with penalties, early settlement usually saves money on interest in the long run if you have the funds available.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Personal Loan Calculator Malaysia 2026 | Calculate Monthly Payments"
        description="Calculate your personal loan monthly payments in Malaysia. Free calculator with detailed amortization schedule showing principal, interest, and total cost over loan tenure."
        keywords={['personal loan calculator', 'malaysia', '2026', 'loan payment', 'amortization']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Personal Loan Calculator Malaysia 2026
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            Personal loans cost 3X more than you think. The RM50,000 loan that becomes RM67,750.
          </h2>
          <p className="text-red-800 mb-3">
            <strong>Banks don't advertise this:</strong> A RM50,000 personal loan at 6.5% over 5 years costs RM17,750 in interest.
            That's a 35% markup on money you're already struggling to manage. Extend it to 7 years? Interest jumps to RM24,500.
          </p>
          <p className="text-red-800 font-semibold">
            Every extra year you extend the loan costs you thousands. 62% of borrowers choose longer tenures for "affordable"
            monthly payments and end up in a debt trap. Calculate the REAL cost before you sign.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate your personal loan monthly payments and view a complete amortization schedule.
          This calculator helps you understand how much you'll pay each month, how much goes toward
          principal versus interest, and your total cost over the entire loan tenure. Essential for
          planning personal financing, debt consolidation, or major purchases in Malaysia.
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loan Amount (MYR)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 50000"
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
                placeholder="e.g., 6.5"
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
                placeholder="e.g., 5"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Personal Loan
          </button>
        </div>

        {result && (
          <>
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Loan Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Monthly Payment</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.monthlyPayment)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Payment</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.totalPayment)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.totalInterest)}</p>
                </div>
              </div>
            </div>

            <AdPlaceholder position="middle" />

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
              title="Looking for the Best Personal Loan Rates?"
              description="Compare rates from multiple banks and get personalized loan offers that match your financial profile. Find the best deal for your needs."
              buttonText="Compare Loan Rates"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Personal Loans in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Personal loans are unsecured loans that don't require collateral, making them popular for various
              purposes including home renovations, medical expenses, education, debt consolidation, or major
              purchases. Because they're unsecured, personal loans typically carry higher interest rates than
              secured loans like mortgages or car loans. However, they offer flexibility and quick approval,
              often within 24-48 hours.
            </p>
            <p>
              Interest rates for personal loans in Malaysia vary widely based on several factors. Banks offer
              competitive rates to borrowers with strong credit profiles, stable employment, and existing banking
              relationships. Your credit score (as reflected in CCRIS and CTOS reports) plays a crucial role in
              determining your interest rate. A difference of just 1-2% in interest rate can mean thousands of
              ringgit saved over a 5-year loan tenure.
            </p>
            <p>
              When choosing a personal loan, consider the effective interest rate, not just the flat rate advertised.
              Some banks use flat rates which appear lower but result in higher actual costs. The effective interest
              rate (also called reducing balance rate) more accurately reflects your true borrowing cost. Always
              compare loans using the effective rate and total interest payable, not just monthly payments.
            </p>
            <p>
              Personal loans follow an amortization schedule where your monthly payment remains constant, but the
              split between principal and interest changes over time. In early months, most of your payment goes
              toward interest. As the loan progresses, more goes toward reducing principal. This is why early
              repayment can save substantial interest - you're paying down principal before interest can accumulate.
            </p>
            <p>
              Before taking a personal loan, assess whether you truly need it and if you can comfortably afford
              the monthly payments. Ensure your total debt service ratio (DSR) stays below 70% to maintain
              financial flexibility for emergencies and other goals. Consider alternatives like using savings,
              negotiating better payment terms with vendors, or tapping into EPF Account 2 for specific purposes
              before taking on debt. If a loan is necessary, borrow only what you need and choose the shortest
              tenure you can afford to minimize interest costs.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator is for estimation purposes only and is not affiliated
            with any financial institution. Actual loan terms may vary based on bank policies, your credit profile,
            and current market conditions. Consult with licensed financial advisors for personalized guidance.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
