import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../../components/Layout/CalculatorLayout';
import { SEOHead } from '../../components/SEO/SEOHead';

export const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <CalculatorLayout>
      <SEOHead
        title="About Us | Malaysia Financial Calculators"
        description="Learn about our mission to provide free, accurate financial calculators for Malaysians. Empowering financial literacy through technology."
        keywords={['about us', 'financial calculators', 'malaysia', 'financial literacy']}
      />

      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>

        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8">
          <p className="text-lg font-semibold text-blue-900">
            Empowering Malaysians with free, accurate financial tools to make informed decisions
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We believe that every Malaysian deserves access to accurate, easy-to-use financial calculators
            without the need for expensive software or professional services. Our mission is to democratize
            financial planning by providing free, comprehensive tools that help you understand your taxes,
            retirement savings, property investments, and more.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Financial literacy is the foundation of economic empowerment. By making complex calculations
            simple and accessible, we aim to help Malaysians take control of their financial futures.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accurate Calculations</h3>
              <p className="text-gray-700">
                All our calculators use official government data from LHDN, KWSP, PERKESO, and other
                authoritative sources. We update our tools regularly to reflect the latest regulations.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">100% Free</h3>
              <p className="text-gray-700">
                No hidden fees, no subscriptions, no registration required. Access all our calculators
                completely free of charge, anytime, anywhere.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-700">
                Your financial data stays on your device. We don't store your calculations or
                personal information. What you calculate is yours alone.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bilingual Support</h3>
              <p className="text-gray-700">
                All calculators available in both English and Bahasa Malaysia, making financial
                planning accessible to all Malaysians.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span><strong>Accuracy:</strong> We verify all calculations against official government sources and update regularly</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span><strong>Transparency:</strong> Clear methodology explanations for every calculator</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span><strong>Education:</strong> Comprehensive guides and FAQs to help you understand the numbers</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span><strong>Accessibility:</strong> Mobile-friendly design that works on any device</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span><strong>No Bias:</strong> Independent tools not affiliated with any financial institution</span>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why We Built This</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We noticed that many Malaysians struggle with understanding their taxes, EPF contributions,
            property costs, and other financial obligations. Professional financial advisors are expensive,
            and existing free tools are often outdated, inaccurate, or filled with advertisements that
            distract from the core purpose.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We built this platform to bridge that gap - providing professional-grade calculators that are
            accurate, up-to-date, and completely free. Our goal is to help every Malaysian make informed
            financial decisions with confidence.
          </p>
        </section>

        <section className="mb-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Coverage</h2>
          <p className="text-gray-700 mb-4">We currently offer calculators for:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Finance & Tax</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Income Tax</li>
                <li>• EPF Contributions</li>
                <li>• SOCSO</li>
                <li>• Personal Loans</li>
                <li>• Mortgages</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Property</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Stamp Duty</li>
                <li>• RPGT</li>
                <li>• Rental Yield</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Life & Planning</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Retirement Planning</li>
                <li>• Inflation Calculator</li>
                <li>• Net Worth Tracker</li>
                <li>• Car Loans</li>
                <li>• Road Tax</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Disclaimer</h2>
          <p className="text-gray-700 leading-relaxed">
            While we strive for accuracy and update our calculators regularly with official data, these
            tools are for estimation purposes only. For official advice, complex financial situations,
            or legal matters, please consult with licensed professionals such as tax advisors, financial
            planners, or the relevant government agencies.
          </p>
        </section>
      </div>
    </CalculatorLayout>
  );
};
