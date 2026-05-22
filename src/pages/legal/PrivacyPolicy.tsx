import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';

export const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const currentDate = new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <CalculatorLayout>
      <SEOHead
        title="Privacy Policy | Malaysia Financial Calculators"
        description="Our privacy policy explains how we handle your data. We don't store your calculations or personal information."
        keywords={['privacy policy', 'data protection', 'privacy']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: {currentDate}</p>

        <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
          <p className="text-lg font-semibold text-green-900">
            Your Privacy is Our Priority: We don't store your calculations or personal data
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy explains how Malaysia Financial Calculators ("we", "us", or "our")
            handles information when you use our website and calculators. We are committed to protecting
            your privacy and being transparent about our data practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We DON'T Collect</h2>
          <p className="text-gray-700 mb-4">We want to be clear about what we don't do:</p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <span>We do NOT store your calculation inputs (salary, income, expenses, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <span>We do NOT store your calculation results</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <span>We do NOT require account registration</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <span>We do NOT collect your name, email, or contact information (unless you voluntarily provide it)</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <span>We do NOT sell or share your data with third parties</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How Our Calculators Work</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            All calculations happen in your web browser on your device. When you enter information into
            our calculators:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
            <li>Your data stays on your device</li>
            <li>Calculations are performed locally in your browser</li>
            <li>No data is transmitted to our servers</li>
            <li>When you close the page, your data is gone</li>
          </ol>
          <p className="text-gray-700 leading-relaxed mt-4">
            Think of it like using a physical calculator - we provide the tool, but you keep the numbers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We May Collect</h2>
          <p className="text-gray-700 mb-4">
            While we don't store your calculations, we may collect limited, anonymized information:
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">1. Anonymous Usage Statistics</h3>
          <p className="text-gray-700 mb-2">We may use analytics services to understand:</p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>Which calculators are most popular</li>
            <li>How visitors navigate our site</li>
            <li>General geographic region (country/state level only)</li>
            <li>Device type and browser used</li>
            <li>Page load times and errors</li>
          </ul>
          <p className="text-gray-700 mt-2 text-sm italic">
            This helps us improve the website and prioritize calculator updates.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2. Technical Information</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
            <li>IP address (automatically logged by web servers, not stored by us)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">3. Cookies</h3>
          <p className="text-gray-700">
            We use minimal cookies only for essential functions like remembering your language preference
            (English or Bahasa Malaysia). We do not use advertising or tracking cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Voluntary Information Sharing</h2>
          <p className="text-gray-700 mb-4">
            Some calculators offer optional features like:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Email Reports:</strong> If you choose to email yourself a calculation report, we temporarily process your email address to send the report. We do not store this email address.</li>
            <li><strong>Downloaded Reports:</strong> These are generated entirely on your device and contain only the information you input.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="text-gray-700 mb-4">Our website may use:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Analytics:</strong> To understand site usage (Google Analytics or similar, with anonymized IPs)</li>
            <li><strong>Hosting:</strong> Our website is hosted on secure servers that may collect standard server logs</li>
          </ul>
          <p className="text-gray-700 mt-4">
            These services have their own privacy policies. We choose providers that respect user privacy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            Since we don't store your calculation data, there's no database of personal information to breach.
            Our website uses HTTPS encryption to protect data in transit. Your calculations remain on your
            device and are never transmitted to our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
          <p className="text-gray-700 mb-3">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Use our calculators without providing any personal information</li>
            <li>Clear your browser cache and cookies at any time</li>
            <li>Disable analytics through your browser settings or ad blockers</li>
            <li>Request information about any data we may have collected (though we collect very little)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
          <p className="text-gray-700 leading-relaxed">
            Our calculators are designed for adults managing their finances. We do not knowingly collect
            information from children under 13. If you are a parent or guardian and believe your child
            has provided us with information, please contact us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. The "Last Updated" date at the top will
            reflect any changes. We will notify users of significant changes by posting a notice on our
            homepage.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have questions about this Privacy Policy or our data practices, please contact us
            through the contact information provided on our website.
          </p>
        </section>

        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Summary</h3>
          <p className="text-gray-700">
            <strong>Bottom line:</strong> We built these calculators to help you, not to collect data about you.
            Your financial information stays on your device, and we're committed to keeping it that way.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
};
