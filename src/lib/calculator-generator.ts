export interface CalculatorPageConfig {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  keywords: string[];
  calculationType: string;
  category: string;
}

export const generateCalculatorTemplate = (config: CalculatorPageConfig, customContent?: {
  faqs?: Array<{ question: string; answer: string }>;
  educationalContent?: {
    whatIsIt: string;
    howItWorks: string;
    whoNeedsIt: string;
    keyBenefits: string[];
  };
}) => {
  const defaultFaqs = [
    {
      question: `What is ${config.title.replace(' Malaysia 2026', '')}?`,
      answer: `This calculator helps you determine your tax obligations based on specific income scenarios in Malaysia for 2026. It uses official LHDN rates and guidelines.`
    },
    {
      question: 'How accurate is this calculator?',
      answer: 'This calculator uses official 2026 LHDN tax rates and follows Malaysian tax computation guidelines. Results are accurate for standard tax situations.'
    },
    {
      question: 'Do I need to register to use this calculator?',
      answer: 'No, this calculator is completely free and requires no registration. Calculate as many times as you need.'
    },
    {
      question: 'Can I save my calculations?',
      answer: 'Currently, you can take screenshots or download results. We recommend keeping records of your calculations for reference.'
    },
    {
      question: 'When should I use this calculator?',
      answer: 'Use this calculator when planning your taxes, evaluating job offers, or any time you need to understand your tax obligations.'
    }
  ];

  const defaultEducationalContent = {
    whatIsIt: `The ${config.title} helps Malaysian taxpayers calculate their income tax obligations accurately using official LHDN 2026 rates. It's designed for specific tax scenarios to give you precise estimates.`,
    howItWorks: 'Enter your income details and relevant information. The calculator applies Malaysian tax law, including progressive tax rates, reliefs, and deductions, to compute your tax liability accurately.',
    whoNeedsIt: 'Malaysian taxpayers, HR professionals, financial planners, and anyone needing accurate tax calculations for planning, budgeting, or compliance purposes.',
    keyBenefits: [
      'Accurate calculations using 2026 LHDN rates',
      'Free and unlimited use',
      'No registration required',
      'Instant results with detailed breakdown',
      'Updated with latest tax regulations',
      'Mobile-friendly interface'
    ]
  };

  return {
    config,
    faqs: customContent?.faqs || defaultFaqs,
    educationalContent: customContent?.educationalContent || defaultEducationalContent
  };
};
