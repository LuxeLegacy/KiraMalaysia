import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CalculatorLayout } from '../components/Layout/CalculatorLayout';
import { SEOHead } from '../components/SEO/SEOHead';
import {
  Calculator, Home, Car, Star, Heart, TrendingUp, ChevronDown, ChevronUp, Search
} from 'lucide-react';
import { allCalculators, categories, incomeTaxSubcategories } from '../data/all-calculators';
import HeroImageGallery from '../components/HeroImageGallery';

export const HomePage = () => {
  const { t } = useTranslation(['home', 'common']);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kira Malaysia",
    "description": "Malaysian Tax & Financial Calculators with Official 2026 Rates",
    "url": "https://kiramalaysia.com",
    "publisher": {
      "@type": "Organization",
      "name": "Kira Malaysia"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://kiramalaysia.com/?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const iconMap: Record<string, any> = {
    Calculator,
    Home,
    Car,
    Star,
    Heart,
    TrendingUp
  };

  const colorMap: Record<string, { bg: string; border: string; hover: string; text: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:border-blue-500', text: 'text-blue-600' },
    green: { bg: 'bg-green-50', border: 'border-green-200', hover: 'hover:border-green-500', text: 'text-green-600' },
    slate: { bg: 'bg-slate-50', border: 'border-slate-200', hover: 'hover:border-slate-500', text: 'text-slate-600' },
    teal: { bg: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:border-teal-500', text: 'text-teal-600' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:border-rose-500', text: 'text-rose-600' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:border-amber-500', text: 'text-amber-600' }
  };

  const filteredCalculators = allCalculators.filter(calc =>
    calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    calc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getCalculatorsByCategory = (categoryId: string, subcategory?: string) => {
    return filteredCalculators.filter(calc => {
      if (subcategory) {
        return calc.category === categoryId && calc.subcategory === subcategory;
      }
      return calc.category === categoryId && !calc.subcategory;
    });
  };

  return (
    <CalculatorLayout>
      <SEOHead
        title="Free Malaysian Financial Calculators - Income Tax, EPF, Mortgage & More"
        description="Calculate income tax, EPF, SOCSO, mortgage, car loans, and more with our free Malaysian calculators. Updated with 2026 rates from LHDN, KWSP, and Bank Negara."
        keywords={['malaysia', 'calculator', 'income tax', 'epf', 'mortgage', 'loan', '2026', 'LHDN', 'tax relief', 'financial planning']}
        structuredData={structuredData}
        lastUpdated="2026-03-20"
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl mb-12 py-12 px-4 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Malaysian Tax & Financial Calculators
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-4">
              Official 2026 Rates from LHDN, KWSP, PERKESO & Bank Negara Malaysia
            </p>
            <p className="text-base text-blue-100 mb-8">
              Free calculators for income tax, EPF, SOCSO, mortgages, and more. Updated within 24 hours of official rate changes.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:outline-none text-lg shadow-lg"
                />
              </div>
              {searchQuery && (
                <p className="text-white/90 text-sm mt-3">
                  Found {filteredCalculators.length} calculator{filteredCalculators.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="hidden md:block">
            <HeroImageGallery />
          </div>
        </div>
      </div>

      {/* Popular Calculators */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Calculators</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Income Tax Calculator', path: '/finance/income-tax-calculator-malaysia', description: 'Calculate your tax liability' },
            { name: 'EPF Calculator', path: '/finance/epf-calculator-malaysia', description: 'Project your EPF savings' },
            { name: 'Mortgage Calculator', path: '/finance/mortgage-calculator-malaysia', description: 'Calculate home loan payments' }
          ].map((calc) => (
            <Link
              key={calc.path}
              to={calc.path}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition-all"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{calc.name}</h3>
              <p className="text-gray-600 text-sm">{calc.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* All Categories */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">All Calculators</h2>

        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const colors = colorMap[category.color];
          const isExpanded = expandedCategory === category.id;
          const categoryCalculators = getCalculatorsByCategory(category.id);
          const hasSubcategories = category.id === 'income-tax';

          return (
            <div key={category.id} className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`${colors.bg} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-600">
                      {hasSubcategories
                        ? `${allCalculators.filter(c => c.category === category.id).length} calculators`
                        : `${categoryCalculators.length} calculator${categoryCalculators.length !== 1 ? 's' : ''}`
                      }
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-gray-400" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                )}
              </button>

              {/* Category Content */}
              {isExpanded && (
                <div className="border-t-2 border-gray-200 p-6 bg-gray-50">
                  {hasSubcategories ? (
                    // Income Tax Subcategories
                    <div className="space-y-8">
                      {incomeTaxSubcategories.map((subcategory) => {
                        const subcategoryCalculators = getCalculatorsByCategory(category.id, subcategory.id);

                        if (subcategoryCalculators.length === 0) return null;

                        return (
                          <div key={subcategory.id}>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                              {subcategory.name}
                            </h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              {subcategoryCalculators.map((calc) => (
                                <Link
                                  key={calc.path}
                                  to={calc.path}
                                  className={`${colors.bg} border-2 ${colors.border} ${colors.hover} rounded-lg p-4 transition-all hover:shadow-md`}
                                >
                                  <h5 className={`font-semibold ${colors.text} mb-1`}>{calc.name}</h5>
                                  <p className="text-sm text-gray-600">{calc.description}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    // Regular Categories
                    <div className="grid md:grid-cols-3 gap-4">
                      {categoryCalculators.map((calc) => (
                        <Link
                          key={calc.path}
                          to={calc.path}
                          className={`${colors.bg} border-2 ${colors.border} ${colors.hover} rounded-lg p-4 transition-all hover:shadow-md`}
                        >
                          <h4 className={`font-semibold ${colors.text} mb-1`}>{calc.name}</h4>
                          <p className="text-sm text-gray-600">{calc.description}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Official Facts & Key Information */}
      <div className="mt-16 pt-8 border-t-2 border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Current Tax Year Information</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Year of Assessment 2025</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Form BE deadline:</strong> 30 April 2026 (manual), 15 May 2026 (e-Filing)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Form B deadline:</strong> 30 June 2026 (manual), 15 July 2026 (e-Filing)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Tax rates:</strong> Progressive from 0% to 30%</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Contribution Rates</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>EPF:</strong> 11% employee, 13% employer (below age 60)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>SOCSO:</strong> Tiered rates up to RM5,000 salary ceiling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span><strong>Last updated:</strong> 1 January 2026 (SOCSO rates)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Commitment to Accuracy</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">Official Sources</div>
              <p className="text-sm text-gray-600">All rates from LHDN, KWSP, PERKESO, and Bank Negara Malaysia</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">24-Hour Updates</div>
              <p className="text-sm text-gray-600">Rates updated within 24 hours of official announcements</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">Transparent Methods</div>
              <p className="text-sm text-gray-600">Every calculator shows formulas and source citations</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex flex-wrap gap-4 justify-center">
            <Link
              to="/reference-tables"
              className="text-blue-600 hover:underline font-semibold"
            >
              View Official Rate Tables
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/methodology"
              className="text-blue-600 hover:underline font-semibold"
            >
              How Our Calculators Work
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/tax-filing-guide"
              className="text-blue-600 hover:underline font-semibold"
            >
              Tax Filing Guide 2026
            </Link>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
};
