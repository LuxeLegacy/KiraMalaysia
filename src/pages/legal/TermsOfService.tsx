import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';

export const TermsOfService = () => {
  const { t } = useTranslation();
  const currentDate = new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <CalculatorLayout>
      <SEOHead
        title="Terms of Service | Malaysia Financial Calculators"
        description="Terms of service for using our free Malaysian financial calculators. Please read before using our tools."
        keywords={['terms of service', 'terms and conditions', 'user agreement']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: {currentDate}</p>

        <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-8">
          <p className="text-lg font-semibold text-yellow-900">
            Please read these terms carefully before using our calculators
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using Malaysia Financial Calculators ("the Service", "our website", or "our tools"),
            you accept and agree to be bound by these Terms of Service. If you do not agree to these terms,
            please do not use our Service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We provide free online financial calculators for Malaysian taxes, retirement planning, property
            calculations, and other financial tools. Our calculators are designed to help you estimate and
            understand various financial scenarios.
          </p>
          <p className="text-gray-700 leading-relaxed">
            <strong>Important:</strong> Our calculators are educational tools for estimation purposes only.
            They are not a substitute for professional financial, tax, or legal advice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Service</h2>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">3.1 Permitted Use</h3>
          <p className="text-gray-700 mb-2">You may use our Service to:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Calculate and estimate your taxes, savings, loans, and other financial matters</li>
            <li>Download or print calculation results for personal use</li>
            <li>Share links to our calculators with others</li>
            <li>Use the tools for personal financial planning</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3.2 Prohibited Use</h3>
          <p className="text-gray-700 mb-2">You may NOT:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Use our Service for any illegal purpose</li>
            <li>Attempt to hack, reverse engineer, or compromise our website</li>
            <li>Scrape, copy, or redistribute our content without permission</li>
            <li>Impersonate us or suggest affiliation with government agencies</li>
            <li>Use our Service to provide professional advice to others for compensation</li>
            <li>Overload our servers with automated requests</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. No Professional Advice</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>IMPORTANT:</strong> Our calculators provide estimates based on the information you input
            and publicly available regulations. They do NOT constitute:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Professional financial advice</li>
            <li>Tax advice or legal counsel</li>
            <li>Investment recommendations</li>
            <li>Accounting or auditing services</li>
            <li>Official government calculations</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            For official advice, complex situations, or important financial decisions, please consult with
            licensed professionals such as tax advisors, certified financial planners, lawyers, or relevant
            government agencies (LHDN, KWSP, PERKESO, etc.).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Accuracy and Updates</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We strive to keep our calculators accurate and up-to-date with official government data.
            However:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>We cannot guarantee 100% accuracy at all times</li>
            <li>Tax laws and regulations change; there may be a delay before we update our tools</li>
            <li>Our calculators may not cover every special case or exception</li>
            <li>Results depend on the accuracy of the information you provide</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We update our calculators regularly, but you should verify critical calculations through official
            channels before making important decisions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. No Warranty</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our Service is provided "AS IS" and "AS AVAILABLE" without any warranties of any kind, either
            express or implied, including but not limited to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Accuracy or completeness of calculations</li>
            <li>Fitness for a particular purpose</li>
            <li>Uninterrupted or error-free operation</li>
            <li>Security of data transmission</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            We make no warranty that our calculators will meet your requirements or expectations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            <strong>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</strong>
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            We shall not be liable for any damages arising from your use of our Service, including but
            not limited to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Financial losses resulting from calculation errors</li>
            <li>Tax penalties or interest from incorrect estimations</li>
            <li>Lost opportunities or decisions based on our calculators</li>
            <li>Data loss or security breaches</li>
            <li>Service interruptions or downtime</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            You use our Service at your own risk and are responsible for verifying all important calculations
            through official sources or professional advisors.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Links</h2>
          <p className="text-gray-700 leading-relaxed">
            Our website may contain links to third-party websites, services, or resources. We do not control
            or endorse these third parties and are not responsible for their content, privacy policies, or
            practices. Clicking these links is at your own risk.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Intellectual Property</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All content on our website, including calculator design, text, graphics, logos, and software,
            is our property or licensed to us and protected by copyright and other intellectual property laws.
          </p>
          <p className="text-gray-700 leading-relaxed">
            You may not reproduce, distribute, modify, or create derivative works from our content without
            express written permission. However, you may share links to our calculators freely.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Government Affiliation</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>We are NOT affiliated with any Malaysian government agency.</strong> We are an independent
            service providing educational financial tools. We are not part of LHDN, KWSP, PERKESO, or any
            other government body. Our calculators use publicly available official data, but results are
            unofficial estimates.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Your use of our Service is also governed by our Privacy Policy. We do not store your calculation
            data. Please review our Privacy Policy to understand how we handle information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to modify these Terms of Service at any time. Changes will be posted on
            this page with an updated "Last Updated" date. Continued use of our Service after changes
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Termination</h2>
          <p className="text-gray-700 leading-relaxed">
            We reserve the right to terminate or suspend access to our Service for any user who violates
            these Terms of Service or engages in abusive behavior, without prior notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
          <p className="text-gray-700 leading-relaxed">
            These Terms of Service shall be governed by and construed in accordance with the laws of Malaysia.
            Any disputes arising from these terms or your use of our Service shall be subject to the exclusive
            jurisdiction of Malaysian courts.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about these Terms of Service, please contact us through the contact
            information provided on our website.
          </p>
        </section>

        <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
          <h3 className="text-lg font-bold text-red-900 mb-2">Key Points to Remember</h3>
          <ul className="space-y-2 text-gray-800 text-sm">
            <li>✓ Our calculators are for estimation only, not official advice</li>
            <li>✓ Always verify important calculations with official sources</li>
            <li>✓ We are not affiliated with any government agency</li>
            <li>✓ Use at your own risk - we're not liable for calculation errors</li>
            <li>✓ Consult professionals for complex financial situations</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
};
