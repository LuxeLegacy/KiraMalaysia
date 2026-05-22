export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
}

export const generateCalculatorSEO = (
  calculatorName: string,
  category: string,
  year: number = 2026
): SEOData => {
  return {
    title: `${calculatorName} Malaysia ${year} | Free Calculator`,
    description: `Calculate your ${calculatorName.toLowerCase()} in Malaysia for ${year}. Free, accurate, and easy-to-use calculator with detailed breakdown.`,
    keywords: [
      calculatorName.toLowerCase(),
      'malaysia',
      'calculator',
      year.toString(),
      category,
    ],
    canonical: `/${category}/${calculatorName.toLowerCase().replace(/\s+/g, '-')}-malaysia`,
  };
};
