import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { Link } from 'react-router-dom';
import { Calendar, FileText, AlertCircle, CheckCircle, ExternalLink, ArrowRight } from 'lucide-react';

export const TaxFilingGuide = () => {
  return (
    <CalculatorLayout>
      <SEOHead
        title="Complete Malaysian Income Tax Filing Guide 2026 | Kira Malaysia"
        description="Step-by-step guide to filing Malaysian income tax for YA 2025. Learn about Form BE, Form B, deadlines, e-Filing, tax relief claims, and common mistakes to avoid."
        keywords={['tax filing guide', 'how to file income tax Malaysia', 'Form BE', 'e-Filing', 'tax deadline 2026', 'LHDN', 'tax relief', 'YA 2025']}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Malaysian Income Tax Filing Guide 2026
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Complete guide to filing your Malaysian income tax for Year of Assessment 2025 (filed in 2026). Learn which form to use, when to file, and how to maximize your tax reliefs.
        </p>

        {/* Quick Reference */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Reference: YA 2025</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Form BE Deadline</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">30 April 2026</p>
              <p className="text-sm text-gray-600">Manual filing</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">15 May 2026</p>
              <p className="text-sm text-gray-600">e-Filing (extended)</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Form B Deadline</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">30 June 2026</p>
              <p className="text-sm text-gray-600">Manual filing</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">15 July 2026</p>
              <p className="text-sm text-gray-600">e-Filing (extended)</p>
            </div>
          </div>
        </div>

        {/* Who Must File */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Who Must File Income Tax?
          </h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">You MUST file if:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Your total income for 2025 exceeds RM34,000 (after EPF deduction)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>You received a tax return form (Borang Nyata) from LHDN</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>You have business income (regardless of amount)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>You want to claim tax refunds from excess PCB/MTD deductions</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                You may NOT need to file if:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Your total income is below RM34,000 after EPF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>You only have employment income and your employer deducted PCB correctly</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>You did NOT receive a tax form from LHDN</span>
                </li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                <strong>Note:</strong> Even if not required, you may still file to claim refunds or establish a filing record.
              </p>
            </div>
          </div>
        </section>

        {/* Which Form to Use */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Which Tax Form Should I Use?</h2>

          <div className="space-y-4">
            <div className="bg-white border-2 border-blue-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Form BE (Most Common)</h3>
              <p className="text-gray-700 mb-3">
                <strong>For resident individuals with employment income only</strong>
              </p>
              <p className="text-gray-700 mb-3">Use Form BE if you:</p>
              <ul className="space-y-1 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Are employed and receive salary/wages</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Do NOT have business income</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>May have rental income, dividends, or interest (reported separately)</span>
                </li>
              </ul>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-900">Deadline:</p>
                <p className="text-lg font-bold text-blue-600">30 April 2026 (manual) | 15 May 2026 (e-Filing)</p>
              </div>
            </div>

            <div className="bg-white border-2 border-green-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-green-900 mb-3">Form B</h3>
              <p className="text-gray-700 mb-3">
                <strong>For resident individuals with business income</strong>
              </p>
              <p className="text-gray-700 mb-3">Use Form B if you:</p>
              <ul className="space-y-1 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Are self-employed or have a business</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Are a freelancer, consultant, or contractor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Have rental properties as a business</span>
                </li>
              </ul>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-900">Deadline:</p>
                <p className="text-lg font-bold text-green-600">30 June 2026 (manual) | 15 July 2026 (e-Filing)</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Form M</h3>
              <p className="text-gray-700 mb-3">
                <strong>For non-resident individuals</strong>
              </p>
              <p className="text-gray-700 mb-3">Use Form M if you:</p>
              <ul className="space-y-1 text-gray-700 mb-4">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Are in Malaysia for less than 182 days in 2025</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Are subject to non-resident tax rates (flat rates by income type)</span>
                </li>
              </ul>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-900">Deadline:</p>
                <p className="text-lg font-bold text-gray-600">30 April 2026</p>
              </div>
            </div>
          </div>
        </section>

        {/* e-Filing Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to File Online (e-Filing)</h2>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-700 mb-4">
              <strong>e-Filing Website:</strong>{' '}
              <a
                href="https://mytax.hasil.gov.my"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center gap-1"
              >
                mytax.hasil.gov.my
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Register for e-Filing</h3>
                <p className="text-gray-700 mb-2">If first time:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Go to mytax.hasil.gov.my</li>
                  <li>• Click "Daftar Pengguna Baharu" (Register New User)</li>
                  <li>• Enter your income tax number and identification details</li>
                  <li>• Create a secure password</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Gather Your Documents</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• EA Form from employer (annual remuneration statement)</li>
                  <li>• EPF/KWSP contribution statement</li>
                  <li>• Tax relief receipts (insurance, medical, education, lifestyle)</li>
                  <li>• Any additional income statements (rental, dividends, etc.)</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Login and Select Form</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Login to MyTax system</li>
                  <li>• Select "e-Filing"</li>
                  <li>• Choose your form type (BE, B, or M)</li>
                  <li>• Select Year of Assessment 2025</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fill in Your Information</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Enter employment income (from EA form)</li>
                  <li>• Declare EPF contributions</li>
                  <li>• Claim all eligible tax reliefs</li>
                  <li>• Declare any other income sources</li>
                  <li>• Review calculations</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                5
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Your Return</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• Review all information carefully</li>
                  <li>• Submit electronically</li>
                  <li>• Print or save acknowledgment receipt (important!)</li>
                  <li>• Keep all supporting documents for 7 years</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                6
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pay Tax or Receive Refund</h3>
                <ul className="text-gray-700 space-y-1">
                  <li>• If tax payable: Pay via FPX, credit card, or bank</li>
                  <li>• If tax refund: Wait 30-90 days for processing</li>
                  <li>• Check refund status on MyTax portal</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Tax Reliefs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Tax Reliefs to Claim</h2>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-4">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-900">Relief Type</th>
                  <th className="px-4 py-3 text-left text-gray-900">Maximum (RM)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3">Individual relief</td>
                  <td className="px-4 py-3 font-semibold">9,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">EPF + Life insurance</td>
                  <td className="px-4 py-3 font-semibold">7,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Medical/education insurance</td>
                  <td className="px-4 py-3 font-semibold">3,000</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Lifestyle (books, PC, smartphone, gym)</td>
                  <td className="px-4 py-3 font-semibold">2,500</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Private Retirement Scheme (PRS)</td>
                  <td className="px-4 py-3 font-semibold">3,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Link
            to="/income-tax-malaysia/tax-relief-calculator"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline font-semibold"
          >
            Calculate your tax reliefs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-amber-600" />
            Common Mistakes to Avoid
          </h2>

          <div className="space-y-3">
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Missing the deadline</h3>
              <p className="text-gray-700 text-sm">Penalty: RM200 - RM2,000 fine plus possible 300% increase in tax</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Not keeping receipts</h3>
              <p className="text-gray-700 text-sm">LHDN can request proof for any relief claimed. Keep documents for 7 years.</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Claiming ineligible expenses</h3>
              <p className="text-gray-700 text-sm">Only claim reliefs you're entitled to with proper documentation.</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Forgetting to declare all income</h3>
              <p className="text-gray-700 text-sm">Declare ALL sources: employment, rental, dividends, interest, side income, etc.</p>
            </div>

            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-1">Not reviewing before submitting</h3>
              <p className="text-gray-700 text-sm">Double-check all figures, especially income and relief amounts.</p>
            </div>
          </div>
        </section>

        {/* Helpful Tools */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Helpful Calculators</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/income-tax-malaysia/annual-tax-calculator"
              className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 hover:border-blue-500 transition-all"
            >
              <h3 className="font-semibold text-blue-900 mb-1">Annual Tax Calculator</h3>
              <p className="text-sm text-gray-700">Calculate your total tax liability</p>
            </Link>

            <Link
              to="/income-tax-malaysia/tax-relief-calculator"
              className="bg-green-50 border-2 border-green-200 rounded-lg p-4 hover:border-green-500 transition-all"
            >
              <h3 className="font-semibold text-green-900 mb-1">Tax Relief Calculator</h3>
              <p className="text-sm text-gray-700">Maximize your tax reliefs</p>
            </Link>

            <Link
              to="/income-tax-malaysia/tax-refund-calculator"
              className="bg-teal-50 border-2 border-teal-200 rounded-lg p-4 hover:border-teal-500 transition-all"
            >
              <h3 className="font-semibold text-teal-900 mb-1">Tax Refund Calculator</h3>
              <p className="text-sm text-gray-700">Check if you'll get a refund</p>
            </Link>

            <Link
              to="/income-tax-malaysia/pcb-calculator"
              className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 hover:border-amber-500 transition-all"
            >
              <h3 className="font-semibold text-amber-900 mb-1">PCB Calculator</h3>
              <p className="text-sm text-gray-700">Verify monthly tax deduction</p>
            </Link>
          </div>
        </section>

        {/* External Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Official Resources</h2>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <ul className="space-y-3">
              <li>
                <a
                  href="https://mytax.hasil.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  MyTax e-Filing Portal
                </a>
              </li>
              <li>
                <a
                  href="https://www.hasil.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  LHDN Official Website
                </a>
              </li>
              <li>
                <a
                  href="https://www.hasil.gov.my/en/individual/general-information/tax-relief/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Official Tax Relief Guidelines
                </a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
};
