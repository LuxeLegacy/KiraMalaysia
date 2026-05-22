export interface AmortizationEntry {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanSchedule {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationEntry[];
}

export const calculateLoanSchedule = (
  principal: number,
  annualRate: number,
  years: number
): LoanSchedule => {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) {
    const monthlyPayment = principal / numPayments;
    const schedule: AmortizationEntry[] = [];

    for (let month = 1; month <= numPayments; month++) {
      schedule.push({
        month,
        payment: monthlyPayment,
        principal: monthlyPayment,
        interest: 0,
        balance: principal - (monthlyPayment * month),
      });
    }

    return {
      monthlyPayment,
      totalPayment: principal,
      totalInterest: 0,
      schedule,
    };
  }

  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  let balance = principal;
  const schedule: AmortizationEntry[] = [];

  for (let month = 1; month <= numPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance = Math.max(0, balance - principalPayment);

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance,
    });
  }

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    schedule,
  };
};
