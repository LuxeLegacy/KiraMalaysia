import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface RelatedCalculator {
  name: string;
  path: string;
  description: string;
  isExternal?: boolean;
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[];
}

export const RelatedCalculators = ({ calculators }: RelatedCalculatorsProps) => {
  const { t } = useTranslation('results');

  return (
    <div className="mt-12 bg-gray-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('relatedCalculators.title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {calculators.map((calc, index) => {
          const LinkComponent = calc.isExternal ? 'a' : Link;
          const linkProps = calc.isExternal
            ? { href: calc.path, target: '_blank', rel: 'noopener noreferrer' }
            : { to: calc.path };

          return (
            <LinkComponent
              key={index}
              {...linkProps}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                    {calc.name}
                    {calc.isExternal && <ExternalLink className="w-4 h-4 opacity-50" />}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{calc.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </LinkComponent>
          );
        })}
      </div>
    </div>
  );
};
