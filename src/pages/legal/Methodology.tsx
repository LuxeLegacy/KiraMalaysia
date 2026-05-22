import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { CheckCircle, ExternalLink, FileText, RefreshCw, Shield } from 'lucide-react';

export const Methodology = () => {
  return (
    <CalculatorLayout>
      <SEOHead
        title="Calculation Methodology - How Our Calculators Work | Kira Malaysia"
        description="Learn how Kira Malaysia calculators work, including formula verification, rate updates, quality assurance, and our commitment to accuracy based on official Malaysian government sources."
        keywords={['methodology', 'calculator accuracy', 'formula verification', 'LHDN', 'KWSP', 'PERKESO', 'official rates']}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Calculation Methodology
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Kira Malaysia is committed to providing accurate, reliable financial calculators based on official Malaysian government regulations. This page explains our calculation methodology, verification process, and quality assurance procedures.
        </p>

        {/* Core Principles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Core Principles
          </h2>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Official Sources Only:</strong> All rates and formulas are derived from official Malaysian government sources including LHDN, KWSP, PERKESO, and Bank Negara Malaysia.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Transparent Calculations:</strong> Every calculator shows its formula, assumptions, and limitations clearly.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Regular Updates:</strong> Rates are updated within 24 hours of official government announcements.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Educational Purpose:</strong> Calculators are designed for planning and estimation, not for official filing or legal purposes.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How Calculations Are Performed */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            How Calculations Are Performed
          </h2>

          <div className="space-y-6">
            {/* Income Tax */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Income Tax Calculations</h3>
              <p className="text-gray-700 mb-4">
                Income tax is calculated using the progressive tax bracket system published by LHDN (Lembaga Hasil Dalam Negeri Malaysia).
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-mono text-sm text-gray-800 mb-2"><strong>Formula:</strong></p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  <li>Calculate total chargeable income (gross income - EPF - tax reliefs)</li>
                  <li>Apply progressive tax brackets for YA 2025:
                    <ul className="list-disc list-inside ml-6 mt-1">
                      <li>First RM5,000: 0%</li>
                      <li>Next RM15,000 (RM5,001-RM20,000): 1%</li>
                      <li>Next RM15,000 (RM20,001-RM35,000): 3%</li>
                      <li>And so on up to 30% for income above RM2,000,000</li>
                    </ul>
                  </li>
                  <li>Sum tax from all applicable brackets</li>
                  <li>Deduct zakat (if applicable) to get final tax payable</li>
                </ol>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Source:</strong>{' '}
                <a
                  href="https://www.hasil.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  LHDN Official Tax Rates
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            {/* EPF */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">EPF Contribution Calculations</h3>
              <p className="text-gray-700 mb-4">
                EPF (Employees Provident Fund) contributions are calculated based on the rates published by KWSP.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-mono text-sm text-gray-800 mb-2"><strong>Formula:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Employee contribution: 11% of monthly salary</li>
                  <li>Employer contribution: 13% of monthly salary (for employees aged below 60)</li>
                  <li>Employer contribution: 12% of monthly salary (for employees aged 60 and above)</li>
                  <li>Minimum contribution threshold: RM5,000 and above (mandatory)</li>
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
                  KWSP Contribution Rates (Effective 2024)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            {/* SOCSO */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">SOCSO Contribution Calculations</h3>
              <p className="text-gray-700 mb-4">
                SOCSO (Social Security Organisation) contributions follow the tiered rate structure published by PERKESO.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-mono text-sm text-gray-800 mb-2"><strong>Formula:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Contribution rates vary by salary bracket (23 salary ranges from RM30 to RM5,000+)</li>
                  <li>First Category: Employment Injury Scheme + Invalidity Scheme</li>
                  <li>Second Category: Employment Injury Scheme only (employees aged 60+)</li>
                  <li>Maximum monthly salary ceiling: RM5,000</li>
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Source:</strong>{' '}
                <a
                  href="https://www.perkeso.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  PERKESO Contribution Table (Updated 1 January 2026)
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>

            {/* PCB/MTD */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">PCB (Monthly Tax Deduction) Calculations</h3>
              <p className="text-gray-700 mb-4">
                PCB/MTD is calculated using the monthly tax deduction table published by LHDN.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-mono text-sm text-gray-800 mb-2"><strong>Formula:</strong></p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                  <li>Calculate annual equivalent income (monthly salary × 12)</li>
                  <li>Deduct annual EPF contribution (monthly salary × 11% × 12)</li>
                  <li>Apply standard tax reliefs based on marital status and dependents</li>
                  <li>Calculate annual tax using progressive brackets</li>
                  <li>Divide by 12 to get monthly PCB amount</li>
                </ol>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Source:</strong>{' '}
                <a
                  href="https://www.hasil.gov.my"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-items gap-1"
                >
                  LHDN PCB Schedule
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Formula Verification Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-blue-600" />
            Formula Verification Process
          </h2>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Source Identification</h4>
                  <p className="text-gray-700">We identify the official government source for each calculation (LHDN gazette, KWSP circular, PERKESO notice, etc.)</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Formula Implementation</h4>
                  <p className="text-gray-700">Formulas are implemented in code based on official calculation methods and schedules.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Cross-Verification</h4>
                  <p className="text-gray-700">Results are compared against official government calculators (where available) using multiple test cases.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Edge Case Testing</h4>
                  <p className="text-gray-700">We test boundary conditions, minimum/maximum values, and special scenarios.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Documentation</h4>
                  <p className="text-gray-700">Each calculator includes source citations, effective dates, and assumptions.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Rate Update Procedures */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Update Procedures</h2>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">When Government Announces Rate Changes:</h3>
            <ol className="space-y-3 mb-6">
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">Step 1:</span>
                <span>We monitor official government websites and gazette publications for rate announcements.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">Step 2:</span>
                <span>New rates are documented with effective dates and source links.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">Step 3:</span>
                <span>Calculator formulas are updated and tested against official examples.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">Step 4:</span>
                <span>Changes are deployed with updated "Last Updated" timestamps.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-blue-600">Step 5:</span>
                <span>Changelog is updated to reflect what changed and when.</span>
              </li>
            </ol>

            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Commitment:</strong> We aim to update our calculators within 24 hours of official rate announcements from Malaysian government agencies.
              </p>
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Automated Testing</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Unit tests for all calculation functions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Test cases covering typical scenarios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Boundary value testing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Regression testing after updates</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Manual Review</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Comparison with official calculators</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>User feedback and error reporting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Professional review by tax specialists</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Regular audits of calculation accuracy</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Assumptions and Limitations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assumptions and Limitations</h2>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Important Notes:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">⚠</span>
                <span><strong>For Estimation Only:</strong> Our calculators are for planning and educational purposes, not for official tax filing or legal advice.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">⚠</span>
                <span><strong>Standard Scenarios:</strong> Calculations assume standard employment scenarios. Special cases may require professional consultation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">⚠</span>
                <span><strong>Simplified Assumptions:</strong> Some calculators use simplified assumptions for ease of use (e.g., constant monthly income, standard reliefs).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">⚠</span>
                <span><strong>Consult Professionals:</strong> For complex tax situations, official filing, or legal matters, consult qualified tax professionals or LHDN directly.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-1">⚠</span>
                <span><strong>No Liability:</strong> While we strive for accuracy, we accept no liability for decisions made based on calculator results.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Reporting Errors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report an Error</h2>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              If you notice any calculation errors or discrepancies, please help us improve by reporting them:
            </p>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Describe the specific calculator and inputs used</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Explain the expected vs actual result</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Provide source documentation if available</span>
              </li>
            </ul>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>

        {/* Version Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Version Information</h2>

          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Current Tax Year</h3>
                <p className="text-2xl font-bold text-blue-600">YA 2025</p>
                <p className="text-sm text-gray-600">(Year of Assessment 2025, filed in 2026)</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Last Major Update</h3>
                <p className="text-2xl font-bold text-blue-600">20 March 2026</p>
                <p className="text-sm text-gray-600">Updated tax brackets and rates</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
};
