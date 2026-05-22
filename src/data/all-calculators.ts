export interface Calculator {
  id: string;
  name: string;
  path: string;
  description: string;
  category: string;
  subcategory?: string;
  isExternal?: boolean;
}

export const allCalculators: Calculator[] = [
  // Finance & Tax Calculators
  {
    id: 'income-tax',
    name: 'Income Tax',
    path: 'https://cal.kiramalaysia.com/finance/income-tax-calculator-malaysia',
    description: 'Calculate your Malaysian income tax with 2026 LHDN rates',
    category: 'finance',
    isExternal: true
  },
  {
    id: 'epf',
    name: 'EPF',
    path: 'https://cal.kiramalaysia.com/finance/epf-calculator-malaysia',
    description: 'Calculate EPF contributions and retirement savings',
    category: 'finance',
    isExternal: true
  },
  {
    id: 'socso',
    name: 'SOCSO',
    path: 'https://cal.kiramalaysia.com/finance/socso-calculator-malaysia',
    description: 'Calculate SOCSO/PERKESO contributions',
    category: 'finance',
    isExternal: true
  },
  {
    id: 'loan-eligibility',
    name: 'Loan Eligibility',
    path: 'https://cal.kiramalaysia.com/finance/loan-eligibility-calculator-malaysia',
    description: 'Check how much loan you can afford based on DSR',
    category: 'finance',
    isExternal: true
  },
  {
    id: 'personal-loan',
    name: 'Personal Loan',
    path: 'https://cal.kiramalaysia.com/finance/personal-loan-calculator-malaysia',
    description: 'Calculate personal loan installments and total cost',
    category: 'finance',
    isExternal: true
  },
  {
    id: 'mortgage',
    name: 'Mortgage',
    path: 'https://cal.kiramalaysia.com/finance/mortgage-calculator-malaysia',
    description: 'Calculate home loan payments and amortization',
    category: 'finance',
    isExternal: true
  },

  // Property Calculators
  {
    id: 'stamp-duty',
    name: 'Stamp Duty',
    path: 'https://cal.kiramalaysia.com/property/stamp-duty-calculator-malaysia',
    description: 'Calculate stamp duty for property transactions',
    category: 'property',
    isExternal: true
  },
  {
    id: 'rpgt',
    name: 'RPGT',
    path: 'https://cal.kiramalaysia.com/property/rpgt-calculator-malaysia',
    description: 'Calculate Real Property Gains Tax on property sale',
    category: 'property',
    isExternal: true
  },
  {
    id: 'rental-yield',
    name: 'Rental Yield',
    path: 'https://cal.kiramalaysia.com/property/rental-yield-calculator-malaysia',
    description: 'Calculate property rental returns and ROI',
    category: 'property',
    isExternal: true
  },

  // Automotive Calculators
  {
    id: 'car-loan',
    name: 'Car Loan',
    path: 'https://cal.kiramalaysia.com/automotive/car-loan-calculator-malaysia',
    description: 'Calculate car loan payments and compare financing',
    category: 'automotive',
    isExternal: true
  },
  {
    id: 'road-tax',
    name: 'Road Tax',
    path: 'https://cal.kiramalaysia.com/automotive/road-tax-calculator-malaysia',
    description: 'Calculate road tax renewal amount for vehicles',
    category: 'automotive',
    isExternal: true
  },

  // Islamic Finance
  {
    id: 'zakat',
    name: 'Zakat',
    path: 'https://cal.kiramalaysia.com/islamic-finance/zakat-calculator-malaysia',
    description: 'Calculate zakat on income, savings, and wealth',
    category: 'islamic',
    isExternal: true
  },

  // Life Planning
  {
    id: 'retirement',
    name: 'Retirement',
    path: 'https://cal.kiramalaysia.com/life/retirement-calculator-malaysia',
    description: 'Plan your retirement and calculate savings needed',
    category: 'life',
    isExternal: true
  },
  {
    id: 'inflation',
    name: 'Inflation',
    path: 'https://cal.kiramalaysia.com/life/inflation-calculator-malaysia',
    description: 'Calculate impact of inflation on purchasing power',
    category: 'life',
    isExternal: true
  },
  {
    id: 'net-worth',
    name: 'Net Worth',
    path: 'https://cal.kiramalaysia.com/life/net-worth-calculator-malaysia',
    description: 'Track your total assets and liabilities',
    category: 'life',
    isExternal: true
  },

  // Income Tax Calculators - Basic (5 calculators)
  {
    id: 'annual-tax',
    name: 'Annual Tax Calculator',
    path: '/income-tax-malaysia/annual-tax-calculator',
    description: 'Calculate complete annual income tax liability',
    category: 'income-tax',
    subcategory: 'basic'
  },
  {
    id: 'take-home-pay',
    name: 'Take Home Pay Calculator',
    path: '/income-tax-malaysia/take-home-pay-calculator',
    description: 'Calculate actual salary after all deductions',
    category: 'income-tax',
    subcategory: 'basic'
  },
  {
    id: 'pcb',
    name: 'PCB Calculator',
    path: '/income-tax-malaysia/pcb-calculator',
    description: 'Calculate monthly tax deduction (PCB/MTD)',
    category: 'income-tax',
    subcategory: 'basic'
  },
  {
    id: 'net-salary',
    name: 'Net Salary Calculator',
    path: '/income-tax-malaysia/net-salary-calculator',
    description: 'Calculate net pay after EPF, SOCSO, and tax',
    category: 'income-tax',
    subcategory: 'basic'
  },
  {
    id: 'gross-to-net',
    name: 'Gross to Net Calculator',
    path: '/income-tax-malaysia/gross-to-net-calculator',
    description: 'Convert gross salary to net take-home pay',
    category: 'income-tax',
    subcategory: 'basic'
  },

  // Income Tax - Salary & Compensation (3 calculators)
  {
    id: 'bonus-tax',
    name: 'Bonus Tax Calculator',
    path: '/income-tax-malaysia/bonus-tax-calculator',
    description: 'Calculate tax impact of annual bonus',
    category: 'income-tax',
    subcategory: 'compensation'
  },
  {
    id: 'commission-tax',
    name: 'Commission Tax Calculator',
    path: '/income-tax-malaysia/commission-tax-calculator',
    description: 'Calculate tax on commission income',
    category: 'income-tax',
    subcategory: 'compensation'
  },
  {
    id: 'payslip-breakdown',
    name: 'Payslip Breakdown Calculator',
    path: '/income-tax-malaysia/payslip-breakdown-calculator',
    description: 'Understand all payslip deductions',
    category: 'income-tax',
    subcategory: 'compensation'
  },

  // Income Tax - Career Changes (4 calculators)
  {
    id: 'salary-increment-tax',
    name: 'Salary Increment Tax Impact',
    path: '/income-tax-malaysia/salary-increment-tax-impact',
    description: 'Calculate tax impact of salary increase',
    category: 'income-tax',
    subcategory: 'career'
  },
  {
    id: 'salary-offer-net',
    name: 'Salary Offer Net Calculator',
    path: '/income-tax-malaysia/salary-offer-net-calculator',
    description: 'Calculate net value of job offer',
    category: 'income-tax',
    subcategory: 'career'
  },
  {
    id: 'job-switch-tax',
    name: 'Job Switch Tax Calculator',
    path: '/income-tax-malaysia/job-switch-tax-calculator',
    description: 'Compare tax impact when changing jobs',
    category: 'income-tax',
    subcategory: 'career'
  },
  {
    id: 'company-a-vs-b',
    name: 'Company A vs B Comparison',
    path: '/income-tax-malaysia/company-a-vs-company-b-salary-comparison',
    description: 'Compare two job offers after tax',
    category: 'income-tax',
    subcategory: 'career'
  },

  // Income Tax - Tax Relief & Deductions (3 calculators)
  {
    id: 'tax-relief',
    name: 'Tax Relief Calculator',
    path: '/income-tax-malaysia/tax-relief-calculator',
    description: 'Calculate all eligible tax reliefs',
    category: 'income-tax',
    subcategory: 'relief'
  },
  {
    id: 'epf-tax-relief',
    name: 'EPF Tax Relief Calculator',
    path: '/income-tax-malaysia/epf-tax-relief-calculator',
    description: 'Calculate tax savings from EPF contributions',
    category: 'income-tax',
    subcategory: 'relief'
  },
  {
    id: 'lifestyle-relief',
    name: 'Lifestyle Relief Calculator',
    path: '/income-tax-malaysia/lifestyle-relief-calculator',
    description: 'Calculate tax relief on lifestyle expenses',
    category: 'income-tax',
    subcategory: 'relief'
  },

  // Income Tax - Tax Planning (3 calculators)
  {
    id: 'tax-bracket',
    name: 'Tax Bracket Calculator',
    path: '/income-tax-malaysia/tax-bracket-calculator',
    description: 'Find your income tax bracket',
    category: 'income-tax',
    subcategory: 'planning'
  },
  {
    id: 'tax-refund',
    name: 'Tax Refund Calculator',
    path: '/income-tax-malaysia/tax-refund-calculator',
    description: 'Calculate expected tax refund or balance',
    category: 'income-tax',
    subcategory: 'planning'
  },
  {
    id: 'over-under-mtd',
    name: 'Over/Under MTD Detector',
    path: '/income-tax-malaysia/over-under-mtd-detector',
    description: 'Check if PCB deduction is correct',
    category: 'income-tax',
    subcategory: 'planning'
  },

  // Income Tax - Special Situations (2 calculators)
  {
    id: 'freelancer-tax',
    name: 'Freelancer Tax Calculator',
    path: '/income-tax-malaysia/freelancer-tax-calculator',
    description: 'Calculate tax for self-employed income',
    category: 'income-tax',
    subcategory: 'special'
  },
  {
    id: 'side-income-tax',
    name: 'Side Income Tax Set-Aside',
    path: '/income-tax-malaysia/side-income-tax-set-aside',
    description: 'Calculate tax provision for side income',
    category: 'income-tax',
    subcategory: 'special'
  }
];

export const categories = [
  { id: 'finance', name: 'Finance', icon: 'Calculator', color: 'blue' },
  { id: 'property', name: 'Property', icon: 'Home', color: 'green' },
  { id: 'automotive', name: 'Automotive', icon: 'Car', color: 'slate' },
  { id: 'islamic', name: 'Islamic Finance', icon: 'Star', color: 'teal' },
  { id: 'life', name: 'Life Planning', icon: 'Heart', color: 'rose' },
  { id: 'income-tax', name: 'Income Tax Calculators', icon: 'TrendingUp', color: 'amber' }
];

export const incomeTaxSubcategories = [
  { id: 'basic', name: 'Basic Tax Calculations' },
  { id: 'compensation', name: 'Salary & Compensation' },
  { id: 'career', name: 'Career Changes & Planning' },
  { id: 'relief', name: 'Tax Relief & Deductions' },
  { id: 'planning', name: 'Tax Planning Tools' },
  { id: 'special', name: 'Special Situations' }
];
