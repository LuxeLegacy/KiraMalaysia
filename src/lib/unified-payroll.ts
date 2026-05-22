import epfData from '../data/malaysia/finance/epf.json';
import socsoData from '../data/malaysia/finance/socso.json';
import eisData from '../data/malaysia/finance/eis.json';

export interface UnifiedPayrollInputs {
  monthlySalary: number;
  age: number;
  epfVoluntary?: number;
  socsoCategory: 1 | 2;
  yearsToRetirement?: number;
  currentEPFBalance?: number;
  expectedDividendRate?: number;
  salaryGrowthRate?: number;
  employeeCount?: number;
}

export interface EPFCalculation {
  employeeContribution: number;
  employerContribution: number;
  voluntaryContribution: number;
  totalMonthly: number;
  totalAnnual: number;
  employeeRate: number;
  employerRate: number;
}

export interface SOCSOCalculation {
  employeeContribution: number;
  employerContribution: number;
  totalMonthly: number;
  totalAnnual: number;
  category: 1 | 2;
  incomeReplacementRate: number;
}

export interface EISCalculation {
  employeeContribution: number;
  employerContribution: number;
  totalMonthly: number;
  totalAnnual: number;
  covered: boolean;
  maxMonthlyBenefit: number;
}

export interface UnifiedPayrollResult {
  epf: EPFCalculation;
  socso: SOCSOCalculation;
  eis: EISCalculation;
  totalEmployeeDeductions: number;
  totalEmployerCost: number;
  netTakeHome: number;
  totalStatutoryCost: number;
  effectiveDeductionRate: number;
  effectiveEmployerRate: number;
}

export interface RetirementProjection {
  currentAge: number;
  retirementAge: number;
  yearsToRetirement: number;
  currentBalance: number;
  totalContributions: number;
  totalDividends: number;
  projectedBalance: number;
  monthlyWithdrawal: number;
  yearsBalanceWillLast: number;
  yearByYear: Array<{
    year: number;
    age: number;
    employeeContribution: number;
    employerContribution: number;
    dividends: number;
    balance: number;
  }>;
}

export interface ProtectionAnalysis {
  socsoInvalidityPension: number;
  socsoTemporaryDisability: number;
  eisUnemploymentBenefit: number;
  eisDuration: string;
  totalProtectionValue: number;
  incomeReplacementRate: number;
  protectionScore: number;
  protectionLevel: 'high-risk' | 'moderate' | 'strong';
}

export function calculateEPF(
  salary: number,
  age: number,
  voluntary: number = 0
): EPFCalculation {
  let employeeRate = 0;
  let employerRate = 0;

  if (age < 60) {
    employeeRate = epfData.rates.employee.under60;
    employerRate = salary < epfData.salaryThreshold
      ? epfData.rates.employer.under60_lowSalary
      : epfData.rates.employer.under60_highSalary;
  } else if (age >= 60 && age <= 75) {
    employeeRate = epfData.rates.employee.age60to75;
    employerRate = epfData.rates.employer.age60to75;
  } else {
    employeeRate = epfData.rates.employee.above75;
    employerRate = epfData.rates.employer.above75;
  }

  const employeeContribution = (salary * employeeRate) / 100;
  const employerContribution = (salary * employerRate) / 100;
  const voluntaryContribution = voluntary;
  const totalMonthly = employeeContribution + employerContribution + voluntaryContribution;
  const totalAnnual = totalMonthly * 12;

  return {
    employeeContribution,
    employerContribution,
    voluntaryContribution,
    totalMonthly,
    totalAnnual,
    employeeRate,
    employerRate,
  };
}

export function calculateSOCSO(
  salary: number,
  category: 1 | 2
): SOCSOCalculation {
  if (category === 2) {
    return {
      employeeContribution: 0,
      employerContribution: 0,
      totalMonthly: 0,
      totalAnnual: 0,
      category: 2,
      incomeReplacementRate: 0,
    };
  }

  const bracket = socsoData.wageBrackets.find(
    (b) => salary >= b.min && (b.max === null || salary < b.max)
  );

  if (!bracket) {
    return {
      employeeContribution: 0,
      employerContribution: 0,
      totalMonthly: 0,
      totalAnnual: 0,
      category: 1,
      incomeReplacementRate: 0,
    };
  }

  const employeeContribution = bracket.employee;
  const employerContribution = bracket.employer;
  const totalMonthly = employeeContribution + employerContribution;
  const totalAnnual = totalMonthly * 12;
  const incomeReplacementRate = 80;

  return {
    employeeContribution,
    employerContribution,
    totalMonthly,
    totalAnnual,
    category: 1,
    incomeReplacementRate,
  };
}

export function calculateEIS(salary: number, age: number): EISCalculation {
  const covered = age >= 18 && age <= 60 && salary <= eisData.wageCeiling;

  if (!covered) {
    return {
      employeeContribution: 0,
      employerContribution: 0,
      totalMonthly: 0,
      totalAnnual: 0,
      covered: false,
      maxMonthlyBenefit: 0,
    };
  }

  const cappedSalary = Math.min(salary, eisData.wageCeiling);
  const employeeContribution = cappedSalary * eisData.rates.employee;
  const employerContribution = cappedSalary * eisData.rates.employer;
  const totalMonthly = employeeContribution + employerContribution;
  const totalAnnual = totalMonthly * 12;
  const maxMonthlyBenefit = eisData.coverage.benefits.jobSearchAllowance.maxMonthlyAmount;

  return {
    employeeContribution,
    employerContribution,
    totalMonthly,
    totalAnnual,
    covered: true,
    maxMonthlyBenefit,
  };
}

export function calculateUnifiedPayroll(
  inputs: UnifiedPayrollInputs
): UnifiedPayrollResult {
  const epf = calculateEPF(
    inputs.monthlySalary,
    inputs.age,
    inputs.epfVoluntary || 0
  );

  const socso = calculateSOCSO(inputs.monthlySalary, inputs.socsoCategory);
  const eis = calculateEIS(inputs.monthlySalary, inputs.age);

  const totalEmployeeDeductions =
    epf.employeeContribution +
    epf.voluntaryContribution +
    socso.employeeContribution +
    eis.employeeContribution;

  const totalEmployerCost =
    epf.employerContribution +
    socso.employerContribution +
    eis.employerContribution;

  const netTakeHome = inputs.monthlySalary - totalEmployeeDeductions;
  const totalStatutoryCost = totalEmployeeDeductions + totalEmployerCost;
  const effectiveDeductionRate = (totalEmployeeDeductions / inputs.monthlySalary) * 100;
  const effectiveEmployerRate = (totalEmployerCost / inputs.monthlySalary) * 100;

  return {
    epf,
    socso,
    eis,
    totalEmployeeDeductions,
    totalEmployerCost,
    netTakeHome,
    totalStatutoryCost,
    effectiveDeductionRate,
    effectiveEmployerRate,
  };
}

export function calculateRetirementProjection(
  inputs: UnifiedPayrollInputs,
  payrollResult: UnifiedPayrollResult
): RetirementProjection {
  const currentAge = inputs.age;
  const retirementAge = 60;
  const yearsToRetirement = inputs.yearsToRetirement || Math.max(0, retirementAge - currentAge);
  const currentBalance = inputs.currentEPFBalance || 0;
  const dividendRate = (inputs.expectedDividendRate || epfData.dividendRate.conventional) / 100;
  const salaryGrowth = (inputs.salaryGrowthRate || 0) / 100;

  const yearByYear: RetirementProjection['yearByYear'] = [];
  let balance = currentBalance;
  let totalContributions = 0;
  let totalDividends = 0;
  let currentSalary = inputs.monthlySalary;

  for (let year = 1; year <= yearsToRetirement; year++) {
    const age = currentAge + year;
    const epfCalc = calculateEPF(currentSalary, age, inputs.epfVoluntary || 0);

    const annualContribution = epfCalc.totalAnnual;
    const beginningBalance = balance;
    const dividends = beginningBalance * dividendRate;

    balance += annualContribution + dividends;
    totalContributions += annualContribution;
    totalDividends += dividends;

    yearByYear.push({
      year,
      age,
      employeeContribution: (epfCalc.employeeContribution + epfCalc.voluntaryContribution) * 12,
      employerContribution: epfCalc.employerContribution * 12,
      dividends,
      balance,
    });

    currentSalary *= (1 + salaryGrowth);
  }

  const projectedBalance = balance;
  const monthlyWithdrawal = projectedBalance * 0.04 / 12;
  const yearsBalanceWillLast = projectedBalance > 0
    ? Math.floor(projectedBalance / (monthlyWithdrawal * 12))
    : 0;

  return {
    currentAge,
    retirementAge,
    yearsToRetirement,
    currentBalance,
    totalContributions,
    totalDividends,
    projectedBalance,
    monthlyWithdrawal,
    yearsBalanceWillLast,
    yearByYear,
  };
}

export function calculateProtectionAnalysis(
  inputs: UnifiedPayrollInputs,
  payrollResult: UnifiedPayrollResult
): ProtectionAnalysis {
  const monthlySalary = inputs.monthlySalary;

  const socsoTemporaryDisability = payrollResult.socso.category === 1
    ? monthlySalary * 0.8
    : 0;

  const socsoInvalidityPension = payrollResult.socso.category === 1
    ? Math.min(monthlySalary * 0.5, 2000)
    : 0;

  const eisUnemploymentBenefit = payrollResult.eis.covered
    ? Math.min(monthlySalary * 0.8, payrollResult.eis.maxMonthlyBenefit)
    : 0;

  const eisDuration = payrollResult.eis.covered ? '3-6 months' : 'Not covered';

  const totalProtectionValue =
    (socsoTemporaryDisability * 6) +
    (socsoInvalidityPension * 12 * 5) +
    (eisUnemploymentBenefit * 6);

  const incomeReplacementRate = payrollResult.eis.covered || payrollResult.socso.category === 1
    ? 80
    : 0;

  let protectionScore = 0;
  if (payrollResult.socso.category === 1) protectionScore += 40;
  if (payrollResult.eis.covered) protectionScore += 30;
  if (payrollResult.epf.totalAnnual > monthlySalary * 2) protectionScore += 30;

  const protectionLevel: ProtectionAnalysis['protectionLevel'] =
    protectionScore >= 71 ? 'strong' :
    protectionScore >= 41 ? 'moderate' :
    'high-risk';

  return {
    socsoInvalidityPension,
    socsoTemporaryDisability,
    eisUnemploymentBenefit,
    eisDuration,
    totalProtectionValue,
    incomeReplacementRate,
    protectionScore,
    protectionLevel,
  };
}

export function generateSmartInsights(
  inputs: UnifiedPayrollInputs,
  payrollResult: UnifiedPayrollResult,
  retirement: RetirementProjection,
  protection: ProtectionAnalysis
): string[] {
  const insights: string[] = [];

  const employerTrueContribution = payrollResult.totalEmployerCost * 12;
  insights.push(
    `EMPLOYER TRUTH: Your company pays RM ${employerTrueContribution.toLocaleString()} MORE than your salary annually - leverage this in negotiations. That's ${((payrollResult.totalEmployerCost / inputs.monthlySalary) * 100).toFixed(1)}% hidden compensation!`
  );

  if (retirement.projectedBalance > 0) {
    const lifeExpectancy = 78;
    const retirementYears = lifeExpectancy - 60;
    const monthlyNeeded = inputs.monthlySalary * 0.7;
    const totalNeeded = monthlyNeeded * 12 * retirementYears;
    const shortfall = totalNeeded - retirement.projectedBalance;

    if (shortfall > 0) {
      insights.push(
        `DANGER: Your EPF will be depleted ${Math.round((retirement.projectedBalance / (monthlyNeeded * 12)))} years into retirement. Most Malaysians live ${retirementYears} years post-retirement. The gap? ${(retirementYears - (retirement.projectedBalance / (monthlyNeeded * 12))).toFixed(0)} years of ZERO income!`
      );
    } else {
      insights.push(
        `COMPOUND GROWTH ADVANTAGE: Your dividends will earn you RM ${retirement.totalDividends.toLocaleString()} - that's ${((retirement.totalDividends / retirement.totalContributions) * 100).toFixed(0)}% FREE MONEY from compound growth!`
      );
    }
  }

  if (retirement.yearsBalanceWillLast > 0) {
    if (retirement.yearsBalanceWillLast < 15) {
      const epfBasicSavings = inputs.age === 55 ? 240000 : inputs.age === 50 ? 196800 : 166800;
      const gap = epfBasicSavings - retirement.projectedBalance;
      if (gap > 0) {
        insights.push(
          `RETIREMENT CRISIS DETECTED: EPF Basic Savings recommends RM ${epfBasicSavings.toLocaleString()} at your age. You're RM ${gap.toLocaleString()} behind. Your money will last ${retirement.yearsBalanceWillLast} years but you'll likely live ${78 - 60} years post-retirement!`
        );
      } else {
        insights.push(
          `WARNING: Your EPF will only last ${retirement.yearsBalanceWillLast} years. Average Malaysian lives 18-20 years after retirement. Start voluntary contributions NOW or face ${18 - retirement.yearsBalanceWillLast} years with NO income!`
        );
      }
    } else if (retirement.yearsBalanceWillLast >= 25) {
      const extraYears = retirement.yearsBalanceWillLast - 18;
      insights.push(
        `FINANCIAL FREEDOM: Your retirement savings will outlast the average by ${extraYears} years! You're in the top 20% of Malaysian savers.`
      );
    } else {
      insights.push(
        `BORDERLINE SECURE: Your EPF lasts ${retirement.yearsBalanceWillLast} years - just barely covering average life expectancy. One medical emergency could wipe this out.`
      );
    }
  }

  if (protection.protectionLevel === 'high-risk') {
    insights.push(
      `SAFETY NET HAS HOLES: Your protection score is ${protection.protectionScore}/100. If you lose your job tomorrow, you're financially exposed. Most Malaysians are 1-2 paychecks from crisis!`
    );
  } else if (protection.protectionLevel === 'strong') {
    insights.push(
      `PROTECTED BUT NOT SUFFICIENT: You have ${protection.incomeReplacementRate}% income replacement, BUT benefits only last 3-6 months. What happens after that?`
    );
  }

  if (inputs.epfVoluntary && inputs.epfVoluntary > 0) {
    const voluntaryAnnual = inputs.epfVoluntary * 12;
    const voluntaryGrowth = voluntaryAnnual * ((1 + 0.055) ** retirement.yearsToRetirement - 1) / 0.055 * (1 + 0.055);
    const taxRelief = Math.min(voluntaryAnnual, 4000);
    insights.push(
      `SMART MOVE: Your RM ${inputs.epfVoluntary.toFixed(0)}/month voluntary contribution grows to RM ${voluntaryGrowth.toLocaleString()} by retirement PLUS you save RM ${(taxRelief * 0.24).toLocaleString()} in taxes this year!`
    );
  } else {
    const potentialGrowth = 500 * 12 * ((1 + 0.055) ** retirement.yearsToRetirement - 1) / 0.055 * (1 + 0.055);
    insights.push(
      `OPPORTUNITY COST: If you invested just RM 500/month more voluntarily, you'd retire with RM ${potentialGrowth.toLocaleString()} EXTRA (that's RM ${(potentialGrowth / 12 / 20).toLocaleString()}/month for 20 years of retirement)!`
    );
  }

  const dailyLoss = (inputs.monthlySalary * 0.11 + inputs.monthlySalary * 0.13) * 0.055 / 365;
  insights.push(
    `COMPOUND GROWTH WINDOW CLOSING: Every day you delay optimization costs you RM ${dailyLoss.toFixed(2)} in lost compound growth FOREVER. That's RM ${(dailyLoss * 365 * retirement.yearsToRetirement).toLocaleString()} over your career!`
  );

  const inflationRate = 0.03;
  const realValue = retirement.projectedBalance / ((1 + inflationRate) ** retirement.yearsToRetirement);
  insights.push(
    `INFLATION THREAT: Your RM ${retirement.projectedBalance.toLocaleString()} projected balance will only buy RM ${realValue.toLocaleString()} worth of goods at retirement (${((1 - realValue/retirement.projectedBalance) * 100).toFixed(0)}% purchasing power loss)!`
  );

  return insights;
}
