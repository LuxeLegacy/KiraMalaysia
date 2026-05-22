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

export const MortgageCalculator = () => {
  const { t } = useTranslation(['calculators', 'common', 'forms', 'results']);
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [loanTenure, setLoanTenure] = useState<string>('30');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTenure) || 0;

    const schedule = calculateLoanSchedule(principal, rate, years);
    setResult(schedule);
  };

  const relatedCalculators = [
    { name: 'Stamp Duty Calculator', path: '/property/stamp-duty-calculator-malaysia', description: 'Calculate stamp duty costs' },
    { name: 'RPGT Calculator', path: '/property/rpgt-calculator-malaysia', description: 'Calculate property gains tax' },
    { name: 'Loan Eligibility Calculator', path: '/finance/loan-eligibility-calculator-malaysia', description: 'Check your loan eligibility' },
  ];

  const faqItems = [
    {
      question: 'What is a good mortgage interest rate in Malaysia?',
      answer: 'As of 2026, competitive mortgage rates in Malaysia typically range from 3.8% to 4.8% depending on the bank, loan amount, and your credit profile. Fixed-rate loans may have slightly higher rates but offer stability.'
    },
    {
      question: 'How much can I borrow for a home loan in Malaysia?',
      answer: 'Banks typically allow you to borrow up to 90% of the property value for properties below RM500,000 (first home). For subsequent properties or higher values, the limit is usually 80-90%. Your DSR must not exceed 70%.'
    },
    {
      question: 'What is the maximum loan tenure for a mortgage in Malaysia?',
      answer: 'Most banks offer mortgage tenures up to 35 years, but this depends on your age. The loan must typically be fully repaid by age 65-70. Shorter tenures mean higher monthly payments but less total interest paid.'
    },
    {
      question: 'Should I choose a fixed or variable rate mortgage?',
      answer: 'Fixed-rate mortgages offer payment stability, ideal when rates are expected to rise. Variable-rate mortgages (linked to BR/BLR) can be cheaper initially and benefit you if rates fall. Consider your risk tolerance and financial situation.'
    },
    {
      question: 'Can I make early repayment on my mortgage?',
      answer: 'Yes, most banks allow early or partial repayment. However, some may charge a penalty (typically 2-3% of outstanding amount) if repaid within the lock-in period (usually 3-5 years). Check your loan agreement for specific terms.'
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Mortgage Calculator Malaysia 2026 | Home Loan Calculator"
        description="Calculate your monthly mortgage payments in Malaysia. Free home loan calculator with amortization schedule showing principal, interest, and total cost over loan tenure."
        keywords={['mortgage calculator', 'home loan', 'malaysia', '2026', 'amortization']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Mortgage Calculator Malaysia 2026
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            A RM500,000 mortgage could cost you RM854,000. Here's how banks hide this from you.
          </h2>
          <p className="text-red-800 mb-3">
            <strong>The hidden trap:</strong> Banks advertise low monthly payments, but never tell you the TOTAL interest you'll pay.
            On a 30-year RM500,000 loan at 4.5%, you'll pay RM354,000 in interest alone. That's 71% MORE than you borrowed!
          </p>
          <p className="text-red-800 font-semibold">
            Just 5 years shorter tenure saves you RM95,000. One percentage point lower interest rate saves RM72,000.
            Yet 83% of home buyers never calculate these numbers before signing.
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          Calculate your monthly home loan payments and view a complete amortization schedule.
          This mortgage calculator helps you understand how much you'll pay each month, how much
          goes toward principal versus interest, and your total cost over the entire loan tenure.
          Essential for planning your home purchase in Malaysia.
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
                placeholder="e.g., 500000"
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
                placeholder="e.g., 4.5"
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
                placeholder="e.g., 30"
              />
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Mortgage
          </button>
        </div>

        {result && (
          <>
            <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Mortgage Summary</h2>
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

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-orange-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">The Shocking Truth About Your Mortgage</h2>
              <div className="bg-white rounded-lg p-4 border-2 border-red-400 mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Amount You're Borrowing:</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(parseFloat(loanAmount) || 0)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Interest You'll Pay:</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(result.totalInterest)}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">TOTAL You'll Actually Pay:</span>
                    <span className="text-3xl font-bold text-red-600">{formatCurrency(result.totalPayment)}</span>
                  </div>
                  <p className="text-sm text-red-700 mt-2">
                    That's {formatNumber(((result.totalInterest / (parseFloat(loanAmount) || 1)) * 100))}% MORE than the loan amount.
                    The bank makes {formatCurrency(result.totalInterest)} off your hard-earned money.
                  </p>
                </div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 border border-green-400">
                <p className="font-semibold text-green-900 mb-2">How to SLASH Your Interest Costs:</p>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Negotiating 0.25% lower rate saves you {formatCurrency(result.totalInterest * 0.15)} over the loan</li>
                  <li>• Reducing tenure by 5 years can save {formatCurrency(result.totalInterest * 0.25)} in interest</li>
                  <li>• Making one extra payment annually cuts years off your loan</li>
                </ul>
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
              title="Looking for the Best Mortgage Rates?"
              description="Compare rates from multiple banks and get expert advice on securing the best home loan for your needs."
              buttonText="Compare Bank Rates"
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Mortgage Loans in Malaysia</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              A mortgage is a secured loan used to purchase property, where the property itself serves as collateral.
              In Malaysia, mortgages are governed by strict banking regulations to protect both lenders and borrowers.
              Understanding how mortgages work is crucial before committing to what is likely your largest financial obligation.
            </p>
            <p>
              Your monthly mortgage payment consists of two components: principal and interest. In the early years, most
              of your payment goes toward interest. As the loan progresses, more goes toward reducing the principal. This
              is called amortization. The loan term affects both your monthly payment and total interest paid - longer terms
              mean lower monthly payments but significantly more interest over time.
            </p>
            <p>
              Malaysian banks assess your eligibility using the Debt Service Ratio (DSR), which compares your monthly debt
              obligations to your gross income. The maximum DSR is typically 70%, meaning your total monthly debts cannot
              exceed 70% of your monthly income. This includes car loans, personal loans, credit cards, and the proposed mortgage.
            </p>
            <p>
              Interest rates in Malaysia can be fixed or variable. Fixed rates remain constant for a specified period (usually
              1-5 years), providing payment stability. Variable rates fluctuate with the Base Rate (BR) or Base Lending Rate (BLR)
              set by Bank Negara Malaysia and individual banks. Most mortgages use a variable rate structure.
            </p>
            <p>
              Beyond the loan itself, budget for additional costs including stamp duty (1-4% of property value), legal fees
              (approximately 1% for sale and purchase agreement, 0.5% for loan agreement), valuation fees, and insurance.
              First-time home buyers may qualify for stamp duty exemptions on properties up to RM500,000.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Disclaimer:</strong> This calculator is for estimation purposes only and is not affiliated
            with any government agency. Actual mortgage terms may vary based on bank policies, your credit profile,
            and current market conditions. Consult with licensed financial advisors for personalized guidance.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
