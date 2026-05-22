import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';
import { Mail, MessageSquare, AlertCircle } from 'lucide-react';

export const Contact = () => {
  const { t } = useTranslation();

  return (
    <CalculatorLayout>
      <SEOHead
        title="Contact Us | Malaysia Financial Calculators"
        description="Get in touch with us for feedback, suggestions, or to report issues with our Malaysian financial calculators."
        keywords={['contact', 'feedback', 'support']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
          <p className="text-lg font-semibold text-blue-900">
            We welcome your feedback, suggestions, and questions about our calculators
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            While we are a free service and cannot provide personalized financial advice, we value your
            input and want to hear from you if you have:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback & Suggestions</h3>
              <p className="text-sm text-gray-700">
                Ideas for new calculators, features to add, or improvements to existing tools
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-red-400 transition-colors">
              <AlertCircle className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Bug Reports</h3>
              <p className="text-sm text-gray-700">
                Calculation errors, broken links, display issues, or technical problems
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-400 transition-colors">
              <Mail className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">General Inquiries</h3>
              <p className="text-sm text-gray-700">
                Questions about our service, partnership opportunities, or other matters
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Before You Contact Us</h2>
          <p className="text-gray-700 mb-4">Please note:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>We cannot provide personal financial advice</strong> - For tax, investment, or financial planning advice, please consult licensed professionals</li>
            <li><strong>We are not a government agency</strong> - For official tax filing, EPF withdrawals, or SOCSO claims, contact LHDN, KWSP, or PERKESO directly</li>
            <li><strong>We do not store your data</strong> - If you have privacy concerns, please read our Privacy Policy</li>
            <li><strong>Check our FAQ first</strong> - Many common questions are answered on individual calculator pages</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Include</h2>
          <p className="text-gray-700 mb-4">To help us respond effectively, please include:</p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">For Bug Reports:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
              <li>Which calculator you were using (e.g., "Income Tax Calculator")</li>
              <li>What you expected to happen</li>
              <li>What actually happened</li>
              <li>Your browser and device type (e.g., "Chrome on Windows", "Safari on iPhone")</li>
              <li>Screenshots if applicable (hide any personal financial data)</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mb-3 mt-6">For Calculation Discrepancies:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
              <li>The specific inputs you used (without real personal data)</li>
              <li>The result you got from our calculator</li>
              <li>The expected or official result (if known)</li>
              <li>Source of the official result (e.g., LHDN website, official documentation)</li>
            </ul>

            <h3 className="font-semibold text-gray-900 mb-3 mt-6">For Feature Requests:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 text-sm">
              <li>Which new calculator or feature you'd like to see</li>
              <li>Why it would be useful to you and other Malaysians</li>
              <li>Any specific requirements or scenarios it should handle</li>
            </ul>
          </div>
        </section>

        <section className="mb-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Response Time</h2>
          <p className="text-gray-700">
            We are a small team running this service as a public good. While we read all messages,
            we may not be able to respond to every inquiry individually. We prioritize:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 ml-4 mt-3">
            <li>Bug reports affecting calculator accuracy</li>
            <li>Technical issues preventing calculator use</li>
            <li>Updates needed due to law changes</li>
            <li>Feature requests with broad appeal</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">For Urgent Issues</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you discover a critical error that could lead to significant financial miscalculation
            (e.g., wrong tax brackets, incorrect SOCSO rates), please mark your message as "URGENT"
            and we will prioritize it.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Remember: For your own financial decisions, always verify calculations through official
            sources regardless of our response time.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Official Government Contacts</h2>
          <p className="text-gray-700 mb-4">
            For official matters, please contact the relevant government agency directly:
          </p>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Tax Matters - LHDN</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Website: <a href="https://www.hasil.gov.my" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.hasil.gov.my</a></li>
                <li>HASiL Care Line: 03-8911 1000</li>
                <li>Email: hasil@hasil.gov.my</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">EPF Matters - KWSP</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Website: <a href="https://www.kwsp.gov.my" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.kwsp.gov.my</a></li>
                <li>EPF Call Centre: 03-8922 6000</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">SOCSO Matters - PERKESO</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Website: <a href="https://www.perkeso.gov.my" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.perkeso.gov.my</a></li>
                <li>SOCSO Care Line: 1-300-22-8000</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-bold text-green-900 mb-2">Thank You</h3>
          <p className="text-gray-700">
            Your feedback helps us improve our calculators and serve the Malaysian community better.
            We appreciate you taking the time to reach out!
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
