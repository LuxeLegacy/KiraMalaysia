export const formatCurrency = (amount: number, locale?: string): string => {
  const currentLocale = locale || (typeof window !== 'undefined' && localStorage.getItem('i18nextLng')) || 'en';
  const formatLocale = currentLocale === 'ms' ? 'ms-MY' : 'en-MY';

  return new Intl.NumberFormat(formatLocale, {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (num: number, decimals: number = 2, locale?: string): string => {
  const currentLocale = locale || (typeof window !== 'undefined' && localStorage.getItem('i18nextLng')) || 'en';
  const formatLocale = currentLocale === 'ms' ? 'ms-MY' : 'en-MY';

  return new Intl.NumberFormat(formatLocale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (num: number, decimals: number = 2): string => {
  return `${formatNumber(num, decimals)}%`;
};

export const parseNumber = (value: string): number => {
  const cleaned = value.replace(/[^0-9.-]/g, '');
  return parseFloat(cleaned) || 0;
};
