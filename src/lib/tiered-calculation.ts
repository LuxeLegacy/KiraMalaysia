export interface Tier {
  min: number;
  max: number | null;
  rate: number;
  fixedAmount?: number;
}

export interface TieredResult {
  total: number;
  breakdown: {
    tier: string;
    amount: number;
    rate: number;
    charge: number;
  }[];
}

export const calculateTiered = (
  value: number,
  tiers: Tier[]
): TieredResult => {
  let total = 0;
  const breakdown: TieredResult['breakdown'] = [];

  for (const tier of tiers) {
    if (value <= tier.min) break;

    const amountInTier = tier.max
      ? Math.min(value, tier.max) - tier.min
      : value - tier.min;

    if (amountInTier <= 0) continue;

    const chargeForTier = (amountInTier * tier.rate) / 100 + (tier.fixedAmount || 0);
    total += chargeForTier;

    breakdown.push({
      tier: `${tier.min.toLocaleString()} - ${
        tier.max ? tier.max.toLocaleString() : '∞'
      }`,
      amount: amountInTier,
      rate: tier.rate,
      charge: chargeForTier,
    });
  }

  return {
    total,
    breakdown,
  };
};
