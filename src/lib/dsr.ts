export interface DSRCalculation {
  dsr: number;
  maxLoanAmount: number;
  monthlyCommitment: number;
  maxMonthlyPayment: number;
  eligible: boolean;
}

export const calculateDSR = (
  monthlyIncome: number,
  existingCommitments: number,
  annualRate: number,
  loanTenureYears: number,
  maxDSR: number = 70
): DSRCalculation => {
  const maxMonthlyPayment = (monthlyIncome * maxDSR) / 100 - existingCommitments;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = loanTenureYears * 12;

  let maxLoanAmount = 0;

  if (monthlyRate > 0) {
    maxLoanAmount =
      (maxMonthlyPayment * (Math.pow(1 + monthlyRate, numPayments) - 1)) /
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
  } else {
    maxLoanAmount = maxMonthlyPayment * numPayments;
  }

  const monthlyCommitment = existingCommitments + maxMonthlyPayment;
  const dsr = (monthlyCommitment / monthlyIncome) * 100;
  const eligible = dsr <= maxDSR && maxLoanAmount > 0;

  return {
    dsr: Math.min(dsr, 100),
    maxLoanAmount: Math.max(0, maxLoanAmount),
    monthlyCommitment,
    maxMonthlyPayment: Math.max(0, maxMonthlyPayment),
    eligible,
  };
};
