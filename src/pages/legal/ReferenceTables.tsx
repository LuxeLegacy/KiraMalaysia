import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { ExternalLink, Download } from 'lucide-react';

export const ReferenceTables = () => {
  return (
    <CalculatorLayout>
      <SEOHead
        title="Malaysian Tax & Financial Reference Tables 2026 | Kira Malaysia"
        description="Complete reference tables for Malaysian income tax rates, EPF contribution schedules, SOCSO rates, tax relief limits, and more. Updated with official 2026 rates from LHDN, KWSP, and PERKESO."
        keywords={['tax tables', 'income tax rates 2026', 'EPF contribution table', 'SOCSO rates', 'tax relief Malaysia', 'LHDN', 'reference']}
      />

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Malaysian Tax & Financial Reference Tables 2026
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Official reference tables for Malaysian income tax, EPF, SOCSO, and other financial calculations. All data sourced from official government publications and updated for Year of Assessment 2025 (filed in 2026).
        </p>

        {/* Income Tax Rate Schedule */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Income Tax Rate Schedule YA 2025</h2>
            <span className="text-sm text-gray-600">Effective: 1 January 2025</span>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Chargeable Income (RM)</th>
                    <th className="px-4 py-3 text-left">Tax Rate</th>
                    <th className="px-4 py-3 text-left">Tax Amount (RM)</th>
                    <th className="px-4 py-3 text-left">Cumulative Tax (RM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">0 - 5,000</td>
                    <td className="px-4 py-3 font-semibold">0%</td>
                    <td className="px-4 py-3">0</td>
                    <td className="px-4 py-3 font-semibold">0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">5,001 - 20,000</td>
                    <td className="px-4 py-3 font-semibold">1%</td>
                    <td className="px-4 py-3">150</td>
                    <td className="px-4 py-3 font-semibold">150</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">20,001 - 35,000</td>
                    <td className="px-4 py-3 font-semibold">3%</td>
                    <td className="px-4 py-3">450</td>
                    <td className="px-4 py-3 font-semibold">600</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">35,001 - 50,000</td>
                    <td className="px-4 py-3 font-semibold">6%</td>
                    <td className="px-4 py-3">900</td>
                    <td className="px-4 py-3 font-semibold">1,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">50,001 - 70,000</td>
                    <td className="px-4 py-3 font-semibold">11%</td>
                    <td className="px-4 py-3">2,200</td>
                    <td className="px-4 py-3 font-semibold">3,700</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">70,001 - 100,000</td>
                    <td className="px-4 py-3 font-semibold">19%</td>
                    <td className="px-4 py-3">5,700</td>
                    <td className="px-4 py-3 font-semibold">9,400</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">100,001 - 250,000</td>
                    <td className="px-4 py-3 font-semibold">24%</td>
                    <td className="px-4 py-3">36,000</td>
                    <td className="px-4 py-3 font-semibold">45,400</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">250,001 - 400,000</td>
                    <td className="px-4 py-3 font-semibold">24.5%</td>
                    <td className="px-4 py-3">36,750</td>
                    <td className="px-4 py-3 font-semibold">82,150</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">400,001 - 600,000</td>
                    <td className="px-4 py-3 font-semibold">25%</td>
                    <td className="px-4 py-3">50,000</td>
                    <td className="px-4 py-3 font-semibold">132,150</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">600,001 - 1,000,000</td>
                    <td className="px-4 py-3 font-semibold">26%</td>
                    <td className="px-4 py-3">104,000</td>
                    <td className="px-4 py-3 font-semibold">236,150</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">1,000,001 - 2,000,000</td>
                    <td className="px-4 py-3 font-semibold">28%</td>
                    <td className="px-4 py-3">280,000</td>
                    <td className="px-4 py-3 font-semibold">516,150</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">2,000,001 and above</td>
                    <td className="px-4 py-3 font-semibold">30%</td>
                    <td className="px-4 py-3">-</td>
                    <td className="px-4 py-3 font-semibold">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            <strong>Source:</strong>{' '}
            <a
              href="https://www.hasil.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              LHDN Tax Schedule for Resident Individuals
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </section>

        {/* Tax Relief Summary */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Tax Relief Summary YA 2025</h2>
            <span className="text-sm text-gray-600">Effective: YA 2025</span>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Relief Category</th>
                    <th className="px-4 py-3 text-left">Maximum Amount (RM)</th>
                    <th className="px-4 py-3 text-left">Eligibility Conditions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Individual Relief</td>
                    <td className="px-4 py-3">9,000</td>
                    <td className="px-4 py-3">All resident individuals</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Spouse Relief (not working)</td>
                    <td className="px-4 py-3">4,000</td>
                    <td className="px-4 py-3">Married, spouse has no income</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Child Relief (under 18)</td>
                    <td className="px-4 py-3">2,000 per child</td>
                    <td className="px-4 py-3">Unmarried children under 18</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Child Relief (18+, studying)</td>
                    <td className="px-4 py-3">2,000 per child</td>
                    <td className="px-4 py-3">Full-time student, 18+ years</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Child Relief (disabled)</td>
                    <td className="px-4 py-3">6,000 per child</td>
                    <td className="px-4 py-3">Child with disabilities</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Life Insurance & EPF</td>
                    <td className="px-4 py-3">7,000</td>
                    <td className="px-4 py-3">Life insurance premiums + EPF</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Medical/Education Insurance</td>
                    <td className="px-4 py-3">3,000</td>
                    <td className="px-4 py-3">Medical/education insurance premiums</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Private Retirement Scheme (PRS)</td>
                    <td className="px-4 py-3">3,000</td>
                    <td className="px-4 py-3">PRS contributions</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Lifestyle Expenses</td>
                    <td className="px-4 py-3">2,500</td>
                    <td className="px-4 py-3">Books, PC, smartphone, gym, internet</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Additional Lifestyle (sports)</td>
                    <td className="px-4 py-3">500</td>
                    <td className="px-4 py-3">Sports equipment, gym membership</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Disabled Individual Relief</td>
                    <td className="px-4 py-3">6,000</td>
                    <td className="px-4 py-3">Individual with disabilities</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Serious Disease (self/spouse/child)</td>
                    <td className="px-4 py-3">8,000</td>
                    <td className="px-4 py-3">Medical expenses for serious diseases</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Parent Medical Expenses</td>
                    <td className="px-4 py-3">8,000</td>
                    <td className="px-4 py-3">Parents' medical expenses</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">Domestic Travel</td>
                    <td className="px-4 py-3">1,000</td>
                    <td className="px-4 py-3">Accommodation (min 3 nights)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            <strong>Source:</strong>{' '}
            <a
              href="https://www.hasil.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              LHDN Tax Relief Guidelines YA 2025
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </section>

        {/* EPF Contribution Rates */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">EPF Contribution Rates</h2>
            <span className="text-sm text-gray-600">Effective: 1 January 2024</span>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-teal-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Employee Rate</th>
                    <th className="px-4 py-3 text-left">Employer Rate</th>
                    <th className="px-4 py-3 text-left">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Employees (below 60 years)</td>
                    <td className="px-4 py-3">11%</td>
                    <td className="px-4 py-3">13%</td>
                    <td className="px-4 py-3 font-semibold">24%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Employees (60 years and above)</td>
                    <td className="px-4 py-3">5.5%</td>
                    <td className="px-4 py-3">12%</td>
                    <td className="px-4 py-3 font-semibold">17.5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Employees (below RM5,000/month)</td>
                    <td className="px-4 py-3">11%</td>
                    <td className="px-4 py-3">13%</td>
                    <td className="px-4 py-3 font-semibold">24%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Important Notes:</strong>
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
              <li>Mandatory contribution threshold: RM5,000 monthly salary</li>
              <li>Employees earning below RM5,000 can contribute voluntarily</li>
              <li>Employer contribution is tax-deductible</li>
              <li>Employee contribution provides tax relief up to RM7,000 (combined with life insurance)</li>
            </ul>
          </div>

          <p className="text-sm text-gray-600">
            <strong>Source:</strong>{' '}
            <a
              href="https://www.kwsp.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              KWSP Contribution Rates
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </section>

        {/* SOCSO Contribution Table */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">SOCSO Contribution Rates (Sample)</h2>
            <span className="text-sm text-gray-600">Effective: 1 January 2026</span>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Monthly Wage (RM)</th>
                    <th className="px-4 py-3 text-left">Employee (RM)</th>
                    <th className="px-4 py-3 text-left">Employer (RM)</th>
                    <th className="px-4 py-3 text-left">Total (RM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">30.00 and below</td>
                    <td className="px-4 py-3">0.10</td>
                    <td className="px-4 py-3">0.40</td>
                    <td className="px-4 py-3 font-semibold">0.50</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">50.01 - 70.00</td>
                    <td className="px-4 py-3">0.20</td>
                    <td className="px-4 py-3">0.70</td>
                    <td className="px-4 py-3 font-semibold">0.90</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">1,000.01 - 1,100.00</td>
                    <td className="px-4 py-3">4.30</td>
                    <td className="px-4 py-3">15.75</td>
                    <td className="px-4 py-3 font-semibold">20.05</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">2,000.01 - 2,100.00</td>
                    <td className="px-4 py-3">8.10</td>
                    <td className="px-4 py-3">29.75</td>
                    <td className="px-4 py-3 font-semibold">37.85</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">3,000.01 - 3,100.00</td>
                    <td className="px-4 py-3">11.95</td>
                    <td className="px-4 py-3">43.85</td>
                    <td className="px-4 py-3 font-semibold">55.80</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">4,000.01 - 4,100.00</td>
                    <td className="px-4 py-3">15.80</td>
                    <td className="px-4 py-3">57.95</td>
                    <td className="px-4 py-3 font-semibold">73.75</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3">5,000.00 and above</td>
                    <td className="px-4 py-3">19.75</td>
                    <td className="px-4 py-3">72.25</td>
                    <td className="px-4 py-3 font-semibold">92.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> This is a sample of the SOCSO contribution table. The complete table has 23 salary ranges from RM30 to RM5,000+. Maximum contribution ceiling is RM5,000 monthly salary.
            </p>
          </div>

          <p className="text-sm text-gray-600">
            <strong>Source:</strong>{' '}
            <a
              href="https://www.perkeso.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              PERKESO Contribution Schedule
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </section>

        {/* Important Filing Deadlines */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Important Tax Filing Deadlines 2026</h2>
            <span className="text-sm text-gray-600">Year of Assessment 2025</span>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-rose-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Form Type</th>
                    <th className="px-4 py-3 text-left">Filing Method</th>
                    <th className="px-4 py-3 text-left">Deadline</th>
                    <th className="px-4 py-3 text-left">Who Must File</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Form BE</td>
                    <td className="px-4 py-3">Manual</td>
                    <td className="px-4 py-3 font-bold text-rose-600">30 April 2026</td>
                    <td className="px-4 py-3">Resident individuals with employment income only</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Form BE</td>
                    <td className="px-4 py-3">e-Filing</td>
                    <td className="px-4 py-3 font-bold text-rose-600">15 May 2026</td>
                    <td className="px-4 py-3">Resident individuals with employment income only</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Form B</td>
                    <td className="px-4 py-3">Manual</td>
                    <td className="px-4 py-3 font-bold text-rose-600">30 June 2026</td>
                    <td className="px-4 py-3">Resident individuals with business income</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Form B</td>
                    <td className="px-4 py-3">e-Filing</td>
                    <td className="px-4 py-3 font-bold text-rose-600">15 July 2026</td>
                    <td className="px-4 py-3">Resident individuals with business income</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">Form M</td>
                    <td className="px-4 py-3">Manual/e-Filing</td>
                    <td className="px-4 py-3 font-bold text-rose-600">30 April 2026</td>
                    <td className="px-4 py-3">Non-resident individuals</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm text-gray-600">
            <strong>Source:</strong>{' '}
            <a
              href="https://www.hasil.gov.my"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline inline-flex items-center gap-1"
            >
              LHDN Filing Deadlines
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </section>

        {/* Download Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Download Reference Tables</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Download className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Income Tax Rate Schedule</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Complete tax rate schedule for YA 2025 in PDF format
              </p>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Download PDF
              </button>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Download className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Tax Relief Summary</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                Complete list of tax reliefs and maximum amounts
              </p>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Download PDF
              </button>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mt-6">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> These reference tables are for educational purposes only. For official filing, always refer to the latest LHDN publications and consult qualified tax professionals if needed.
            </p>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
};
