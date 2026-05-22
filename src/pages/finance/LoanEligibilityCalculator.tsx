import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { AffiliateCTA } from '../../components/Monetization/AffiliateCTA';
import { AdPlaceholder } from '../../components/Monetization/AdPlaceholder';
import { RelatedCalculators } from '../../components/Calculator/RelatedCalculators';
import { FAQ } from '../../components/Calculator/FAQ';
import { calculateDSR } from '../../lib/dsr';
import { formatCurrency, formatPercentage } from '../../lib/formatters';

export const LoanEligibilityCalculator = () => {
  const { t } = useTranslation(['forms', 'calculators', 'common', 'results']);
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [existingCommitments, setExistingCommitments] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [loanTenure, setLoanTenure] = useState<string>('30');
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const commitments = parseFloat(existingCommitments) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseFloat(loanTenure) || 0;

    const dsrResult = calculateDSR(income, commitments, rate, years);
    setResult({
      ...dsrResult,
      income,
      commitments,
      rate,
      years,
    });
  };

  const relatedCalculators = [
    { name: t('calculators:mortgage.title'), path: '/finance/mortgage-calculator-malaysia', description: t('calculators:mortgage.description') },
    { name: t('calculators:personalLoan.title'), path: '/finance/personal-loan-calculator-malaysia', description: t('calculators:personalLoan.description') },
    { name: t('calculators:incomeTax.title'), path: '/finance/income-tax-calculator-malaysia', description: t('calculators:incomeTax.description') },
  ];

  const faqItems = [
    {
      question: t('calculators:faq.loanEligibility.q1'),
      answer: t('calculators:faq.loanEligibility.a1')
    },
    {
      question: t('calculators:faq.loanEligibility.q2'),
      answer: t('calculators:faq.loanEligibility.a2')
    },
    {
      question: t('calculators:faq.loanEligibility.q3'),
      answer: t('calculators:faq.loanEligibility.a3')
    },
    {
      question: t('calculators:faq.loanEligibility.q4'),
      answer: t('calculators:faq.loanEligibility.a4')
    },
    {
      question: t('calculators:faq.loanEligibility.q5'),
      answer: t('calculators:faq.loanEligibility.a5')
    }
  ];

  return (
    <CalculatorLayout>
      <SEOHead
        title="Loan Eligibility Calculator Malaysia 2026 | DSR Calculator"
        description="Calculate your loan eligibility in Malaysia based on DSR (Debt Service Ratio). Find out how much you can borrow for property, car, or personal loans based on your income and existing commitments."
        keywords={['loan eligibility', 'dsr calculator', 'malaysia', '2026', 'debt service ratio']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {t('calculators:loanEligibility.title')}
        </h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
          <h2 className="text-xl font-bold text-red-900 mb-3">
            {t('calculators:warnings.loanRejection')}
          </h2>
          <p className="text-red-800 mb-3">
            <strong>{t('calculators:warnings.loanRejectionBody')}</strong>
          </p>
          <p className="text-red-800 font-semibold">
            {t('calculators:warnings.loanRejectionCTA')}
          </p>
        </div>

        <p className="text-lg text-gray-700 mb-8">
          {t('calculators:loanEligibility.description')}
        </p>

        <div className="bg-white rounded-lg border-2 border-blue-200 p-6 mb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms:labels.monthlyIncome')} (MYR)
              </label>
              <input
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 8000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms:loanEligibility.existingCommitments')} (MYR)
              </label>
              <input
                type="number"
                value={existingCommitments}
                onChange={(e) => setExistingCommitments(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1500"
              />
              <p className="text-sm text-gray-500 mt-1">
                {t('forms:loanEligibility.existingCommitmentsHelper')}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('forms:labels.interestRate')} (% {t('forms:labels.years')})
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
                {t('forms:loanEligibility.loanTenure')}
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
            {t('forms:loanEligibility.calculateEligibility')}
          </button>
        </div>

        {result && (
          <>
            <div className={`rounded-lg p-6 mb-8 border ${
              result.eligible
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {result.eligible ? t('forms:loanEligibility.youAreEligible') : t('forms:loanEligibility.notEligible')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">{t('forms:loanEligibility.yourDSR')}</p>
                  <p className={`text-2xl font-bold ${
                    result.dsr <= 70 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercentage(result.dsr)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{t('forms:loanEligibility.maximum')}: 70%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('forms:loanEligibility.maxLoanAmount')}</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(result.maxLoanAmount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t('forms:loanEligibility.maxMonthlyPayment')}</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(result.maxMonthlyPayment)}</p>
                </div>
              </div>
            </div>

            <AdPlaceholder position="middle" />

            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('forms:loanEligibility.eligibilityBreakdown')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">{t('forms:loanEligibility.description')}</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">{t('forms:labels.amount')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">{t('forms:loanEligibility.monthlyGrossIncome')}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">{formatCurrency(result.income)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">{t('forms:loanEligibility.maxDSRAllowed')}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(result.income * 0.7)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">{t('forms:loanEligibility.existingCommitments')}</td>
                      <td className="px-4 py-3 text-sm text-red-600 text-right">-{formatCurrency(result.commitments)}</td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{t('forms:loanEligibility.availableForNewLoan')}</td>
                      <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">{formatCurrency(result.maxMonthlyPayment)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">{t('forms:labels.interestRate')}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatPercentage(result.rate)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-900">{t('forms:loanEligibility.loanTenure')}</td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right">{result.years} {t('forms:labels.years')}</td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{t('forms:loanEligibility.maxLoanYouCanBorrow')}</td>
                      <td className="px-4 py-3 text-sm font-bold text-green-600 text-right">{formatCurrency(result.maxLoanAmount)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{t('forms:loanEligibility.yourTotalDSR')}</td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">{formatPercentage(result.dsr)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {!result.eligible && (
              <div className="bg-yellow-50 rounded-lg p-6 mb-8 border border-yellow-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t('forms:loanEligibility.recommendationsTitle')}</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>{t('forms:loanEligibility.recommendation1')}</li>
                  <li>{t('forms:loanEligibility.recommendation2')}</li>
                  <li>{t('forms:loanEligibility.recommendation3')}</li>
                  <li>{t('forms:loanEligibility.recommendation4')}</li>
                  <li>{t('forms:loanEligibility.recommendation5')}</li>
                </ul>
              </div>
            )}

            <AffiliateCTA
              title={t('calculators:cta.loanOffers')}
              description={t('calculators:cta.loanOffersDesc')}
              buttonText={t('calculators:cta.loanOffersButton')}
            />
          </>
        )}

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('calculators:content.loanEligibilityUnderstanding')}</h2>
          <div className="space-y-4 text-gray-700">
            <p>{t('calculators:content.loanEligibilityPara1')}</p>
            <p>{t('calculators:content.loanEligibilityPara2')}</p>
            <p>{t('calculators:content.loanEligibilityPara3')}</p>
            <p>{t('calculators:content.loanEligibilityPara4')}</p>
            <p>{t('calculators:content.loanEligibilityPara5')}</p>
          </div>
        </div>

        <FAQ items={faqItems} />
        <RelatedCalculators calculators={relatedCalculators} />

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>{t('common:disclaimer')}:</strong> {t('calculators:disclaimer.general')}
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
