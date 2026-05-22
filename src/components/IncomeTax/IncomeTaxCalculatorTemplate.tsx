import { CalculatorLayout } from '../Layout/CalculatorLayout';
import { SEOHead } from '../SEO/SEOHead';
import { IncomeTaxCTA } from './IncomeTaxCTA';
import { FAQ } from '../Calculator/FAQ';
import { Calculator, CheckCircle2 } from 'lucide-react';

interface CalculatorConfig {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  keywords: string[];
  calculationType: string;
}

interface IncomeTaxCalculatorTemplateProps {
  config: CalculatorConfig;
  faqs: Array<{ question: string; answer: string }>;
  educationalContent: {
    whatIsIt: string;
    howItWorks: string;
    whoNeedsIt: string;
    keyBenefits: string[];
  };
}

export const IncomeTaxCalculatorTemplate = ({
  config,
  faqs,
  educationalContent
}: IncomeTaxCalculatorTemplateProps) => {

  return (
    <CalculatorLayout>
      <SEOHead
        title={config.metaTitle}
        description={config.metaDescription}
        keywords={config.keywords}
      />

      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-blue-600 rounded-lg p-3">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
                {config.h1}
              </h1>
              <p className="text-xl text-gray-700">{config.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Updated with 2026 LHDN Rates</span>
            <span className="mx-2">•</span>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Free • No Registration Required</span>
          </div>
        </div>

        <IncomeTaxCTA variant="top" currentPage={config.slug} />

        <IncomeTaxCTA variant="middle" currentPage={config.slug} />

        <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Understanding {config.title}</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What Is It?</h3>
              <p className="text-gray-700 leading-relaxed">{educationalContent.whatIsIt}</p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">How It Works</h3>
              <p className="text-gray-700 leading-relaxed">{educationalContent.howItWorks}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Who Needs This Calculator?</h3>
            <p className="text-gray-700 leading-relaxed">{educationalContent.whoNeedsIt}</p>
          </div>
        </div>

        <FAQ items={faqs} />

        <IncomeTaxCTA variant="bottom" currentPage={config.slug} />
      </div>
    </CalculatorLayout>
  );
};
