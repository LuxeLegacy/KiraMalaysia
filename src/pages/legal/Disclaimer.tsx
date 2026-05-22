import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';

export const Disclaimer = () => {
  const { t } = useTranslation();

  return (
    <CalculatorLayout>
      <SEOHead
        title="Disclaimer | Malaysia Financial Calculators"
        description="Important disclaimers about using our Malaysian financial calculators. Understand the limitations and proper use of our tools."
        keywords={['disclaimer', 'limitations', 'calculator accuracy']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Disclaimer</h1>

        <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-8">
          <p className="text-lg font-semibold text-red-900 mb-2">
            IMPORTANT: Please Read Before Using Our Calculators
          </p>
          <p className="text-red-800">
            Our calculators are estimation tools only. They are NOT a substitute for professional advice
            or official government calculations.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">General Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The information and calculators provided on this website are for general informational and
            educational purposes only. While we strive for accuracy and update our tools regularly with
            official data from Malaysian government sources, we make no representations or warranties of
            any kind, express or implied, about:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>The completeness, accuracy, reliability, suitability, or availability of the calculators</li>
            <li>The correctness of calculation results</li>
            <li>The timeliness of updates when regulations change</li>
            <li>The applicability of results to your specific situation</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Professional Advice</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>Our calculators do NOT provide:</strong>
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">❌ Tax Advice</h3>
              <p className="text-sm text-gray-700">
                We are not tax advisors. For official tax advice, consult LHDN or a licensed tax professional.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">❌ Financial Planning</h3>
              <p className="text-sm text-gray-700">
                We are not financial advisors. Consult a certified financial planner for personalized advice.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">❌ Legal Counsel</h3>
              <p className="text-sm text-gray-700">
                We are not lawyers. For legal matters, consult a qualified legal professional.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">❌ Official Calculations</h3>
              <p className="text-sm text-gray-700">
                Our results are estimates. Official calculations must be verified with relevant authorities.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Government Affiliation</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>We are NOT affiliated with or endorsed by any Malaysian government agency,</strong> including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Lembaga Hasil Dalam Negeri Malaysia (LHDN / Inland Revenue Board)</li>
            <li>Kumpulan Wang Simpanan Pekerja (KWSP / EPF)</li>
            <li>Pertubuhan Keselamatan Sosial (PERKESO / SOCSO)</li>
            <li>Bank Negara Malaysia</li>
            <li>Any state or federal government department</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We are an independent educational service. Our calculators use publicly available official
            data, but results are unofficial estimates that must be verified through proper channels.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Calculator Limitations</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">What Our Calculators Can Do:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Provide estimates based on standard scenarios</li>
            <li>Help you understand financial concepts</li>
            <li>Give you ballpark figures for planning purposes</li>
            <li>Use official tax brackets and contribution rates</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">What Our Calculators Cannot Do:</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Account for every special case, exemption, or unique situation</li>
            <li>Replace professional analysis of complex financial situations</li>
            <li>Guarantee accuracy for all edge cases</li>
            <li>Consider future changes in laws or regulations</li>
            <li>Provide personalized advice for your specific circumstances</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibility</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>By using our calculators, you acknowledge that:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 ml-4">
            <li>You are responsible for the accuracy of information you input</li>
            <li>You will verify important calculations through official sources</li>
            <li>You will seek professional advice for complex situations</li>
            <li>You understand these are estimates, not official determinations</li>
            <li>You will not rely solely on our calculators for important financial decisions</li>
            <li>You accept full responsibility for any actions taken based on our calculations</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When Laws Change</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Malaysian tax laws, contribution rates, and financial regulations change periodically:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Budget announcements may introduce new rules</li>
            <li>Agencies may update rates and limits</li>
            <li>Special programs or exemptions may be introduced or removed</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We update our calculators as soon as possible after official announcements, but there may be
            delays. Always check the "Last Updated" date on each calculator and verify with official
            sources if regulations have changed recently.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>We are not liable for:</strong>
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Any errors or inaccuracies in calculations</li>
            <li>Financial losses from decisions based on our calculators</li>
            <li>Tax penalties, interest, or fines resulting from incorrect estimates</li>
            <li>Missed opportunities or poor financial decisions</li>
            <li>Service interruptions or calculator downtime</li>
            <li>Changes in laws or regulations after our last update</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            You use our calculators entirely at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Before Making Important Decisions:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
              <li><strong>Verify calculations</strong> with official government websites or tools</li>
              <li><strong>Consult professionals</strong> for complex situations or large amounts</li>
              <li><strong>Check for updates</strong> - has the law changed since our last update?</li>
              <li><strong>Keep documentation</strong> - don't rely on our calculations alone for filing</li>
              <li><strong>Use multiple sources</strong> - cross-reference with other tools and advisors</li>
            </ol>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Official Resources</h2>
          <p className="text-gray-700 mb-4">For official information, please visit:</p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <strong>Tax matters:</strong> LHDN Malaysia -{' '}
              <a href="https://www.hasil.gov.my" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                www.hasil.gov.my
              </a>
            </li>
            <li>
              <strong>EPF contributions:</strong> KWSP/EPF -{' '}
              <a href="https://www.kwsp.gov.my" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                www.kwsp.gov.my
              </a>
            </li>
            <li>
              <strong>SOCSO matters:</strong> PERKESO -{' '}
              <a href="https://www.perkeso.gov.my" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                www.perkeso.gov.my
              </a>
            </li>
          </ul>
        </section>

        <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Summary</h3>
          <p className="text-gray-700 mb-4">
            Our calculators are helpful estimation tools for understanding your financial obligations and
            planning purposes. However, they are NOT official calculations and should NOT be your only
            source of information for important decisions.
          </p>
          <p className="text-gray-700 font-semibold">
            When in doubt, always consult with qualified professionals or official government agencies.
            Your financial well-being is too important to leave to chance.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
