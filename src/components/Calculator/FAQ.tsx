import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  paaItems?: FAQItem[];
}

export const FAQ = ({ items, paaItems }: FAQProps) => {
  const { t } = useTranslation('results');

  return (
    <div className="mt-12 space-y-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('faq.title')}</h2>
        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {paaItems && paaItems.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">PAA</h2>
          <div className="space-y-6">
            {paaItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-700 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
