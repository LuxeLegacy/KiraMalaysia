import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';

interface IncomeTaxCTAProps {
  variant?: 'top' | 'middle' | 'bottom';
  currentPage: string;
}

export const IncomeTaxCTA = ({ variant = 'middle', currentPage }: IncomeTaxCTAProps) => {
  const ctaContent = {
    top: {
      title: "Need the Complete Picture?",
      description: "This calculator shows one aspect. Get your full tax breakdown with all reliefs, deductions, and refund estimates.",
      buttonText: "Calculate Complete Income Tax",
      icon: Calculator,
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    middle: {
      title: "Don't Stop at Just This Calculation",
      description: "Most Malaysians miss RM2,000-RM8,000 in tax savings. See your complete tax picture with all eligible reliefs.",
      buttonText: "Get Your Full Tax Report",
      icon: TrendingUp,
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    bottom: {
      title: "Ready to See Your Complete Tax Breakdown?",
      description: "Calculate your actual tax liability with PCB deductions, reliefs, rebates, and find out if LHDN owes you money.",
      buttonText: "Calculate My Full Income Tax Now",
      icon: AlertCircle,
      bgColor: "from-orange-50 to-amber-50",
      borderColor: "border-orange-200",
      buttonColor: "bg-orange-600 hover:bg-orange-700"
    }
  };

  const content = ctaContent[variant];
  const Icon = content.icon;

  return (
    <div className={`bg-gradient-to-r ${content.bgColor} rounded-xl p-6 md:p-8 my-8 border-2 ${content.borderColor} shadow-lg`}>
      <div className="flex items-start gap-4">
        <div className="bg-white rounded-lg p-3 shadow-sm flex-shrink-0">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{content.title}</h3>
          <p className="text-gray-700 mb-4 text-lg leading-relaxed">{content.description}</p>
          <a
            href="https://cal.kiramalaysia.com/finance/income-tax-calculator-malaysia"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 ${content.buttonColor} text-white px-8 py-4 rounded-lg transition-all transform hover:scale-105 font-bold text-lg shadow-md`}
          >
            {content.buttonText} →
          </a>
          <p className="text-sm text-gray-600 mt-3">
            Free • Takes 3 minutes • Used by 47,000+ Malaysians
          </p>
        </div>
      </div>
    </div>
  );
};
