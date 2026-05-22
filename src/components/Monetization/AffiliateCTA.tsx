import { ArrowRight } from 'lucide-react';

interface AffiliateCTAProps {
  title: string;
  description: string;
  buttonText: string;
  href?: string;
}

export const AffiliateCTA = ({ title, description, buttonText, href = '#' }: AffiliateCTAProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 my-8 border border-blue-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <a
        href={href}
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        {buttonText}
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};
