export interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
  fixedAmount?: number;
}

export interface ProgressiveTaxResult {
  totalTax: number;
  effectiveRate: number;
  breakdown: {
    bracket: string;
    amount: number;
    rate: number;
    tax: number;
  }[];
}

export const calculateProgressiveTax = (
  income: number,
  brackets: TaxBracket[]
): ProgressiveTaxResult => {
  let totalTax = 0;
  const breakdown: ProgressiveTaxResult['breakdown'] = [];

  for (const bracket of brackets) {
    if (income <= bracket.min) break;

    const taxableInBracket = bracket.max
      ? Math.min(income, bracket.max) - bracket.min
      : income - bracket.min;

    if (taxableInBracket <= 0) continue;

    const taxForBracket = (taxableInBracket * bracket.rate) / 100;
    totalTax += taxForBracket;

    breakdown.push({
      bracket: `${bracket.min.toLocaleString()} - ${
        bracket.max ? bracket.max.toLocaleString() : '∞'
      }`,
      amount: taxableInBracket,
      rate: bracket.rate,
      tax: taxForBracket,
    });
  }

  const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

  return {
    totalTax,
    effectiveRate,
    breakdown,
  };
};
