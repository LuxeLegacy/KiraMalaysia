# Calculator Implementation Patterns
## Code Templates for Each Calculator Type

---

## Pattern 1: Comparison Calculator

**Use for:** BonusVsSalaryComparison, CompanyAVsCompanyBSalaryComparison, ResidentVsNonresidentTaxComparison

### Input Structure
```typescript
const [scenarioA, setScenarioA] = useState({
  income: '',
  reliefs: '9000',
  // scenario-specific fields
});

const [scenarioB, setScenarioB] = useState({
  income: '',
  reliefs: '9000',
  // scenario-specific fields
});
```

### Calculation Logic
```typescript
const calculate = () => {
  const taxA = calculateProgressiveTax(scenarioA.income - scenarioA.reliefs);
  const taxB = calculateProgressiveTax(scenarioB.income - scenarioB.reliefs);
  const netA = scenarioA.income - taxA;
  const netB = scenarioB.income - taxB;
  const difference = netB - netA;

  onCalculate({
    mainValue: Math.abs(difference),
    breakdown: [
      { label: 'Scenario A - Gross Income', value: scenarioA.income },
      { label: 'Scenario A - Tax', value: -taxA },
      { label: 'Scenario A - Net Income', value: netA },
      { label: '', value: 0 }, // Spacer
      { label: 'Scenario B - Gross Income', value: scenarioB.income },
      { label: 'Scenario B - Tax', value: -taxB },
      { label: 'Scenario B - Net Income', value: netB },
      { label: '', value: 0 }, // Spacer
      { label: 'Net Difference', value: difference }
    ],
    insights: [
      difference > 0
        ? `Scenario B gives you RM${Math.abs(difference).toFixed(2)} more annually`
        : `Scenario A gives you RM${Math.abs(difference).toFixed(2)} more annually`,
      `Monthly difference: RM${(Math.abs(difference) / 12).toFixed(2)}`,
      `Winner: ${difference > 0 ? 'Scenario B' : 'Scenario A'}`,
      taxB - taxA !== 0 ? `Tax difference: RM${Math.abs(taxB - taxA).toFixed(2)}` : ''
    ].filter(Boolean)
  });
};
```

### Sample FAQs
```typescript
const faqs = [
  {
    question: 'Which scenario is better for my situation?',
    answer: 'The calculator shows net income after tax for both scenarios. Choose the one with higher net income unless non-monetary factors (benefits, work-life balance) tip the scale.'
  },
  {
    question: 'Should I consider other factors beyond salary?',
    answer: 'Yes! Consider EPF contributions (employers typically contribute 12-13%), medical benefits, training opportunities, career growth, commute time, and company culture.'
  },
  {
    question: 'How accurate is this comparison?',
    answer: 'Very accurate for tax calculations using 2026 LHDN rates. However, this doesn\'t factor in variable bonuses, stock options, or other benefits that may vary.'
  },
  {
    question: 'What if both offers have different bonus structures?',
    answer: 'Include the expected annual bonus in the income field for each scenario. If unsure, use conservative estimates or run multiple comparisons.'
  },
  {
    question: 'Can I compare part-time vs full-time offers?',
    answer: 'Yes, enter the annualized income for each option. Make sure to account for benefits differences as part-time roles often have fewer benefits.'
  }
];
```

---

## Pattern 2: Breakdown/Itemized Calculator

**Use for:** PayslipBreakdownCalculator, TaxReliefCalculator, AllowanceTaxabilityChecker

### Input Structure
```typescript
const [inputs, setInputs] = useState({
  basicSalary: '',
  housingAllowance: '',
  travelAllowance: '',
  mealAllowance: '',
  phoneAllowance: '',
  carAllowance: '',
  performanceBonus: ''
});

const updateInput = (field: string, value: string) => {
  setInputs(prev => ({ ...prev, [field]: value }));
};
```

### Calculation Logic
```typescript
const calculate = () => {
  const basic = parseFloat(inputs.basicSalary) || 0;
  const housing = parseFloat(inputs.housingAllowance) || 0;
  const travel = parseFloat(inputs.travelAllowance) || 0;
  const meal = parseFloat(inputs.mealAllowance) || 0;
  const phone = parseFloat(inputs.phoneAllowance) || 0;
  const car = parseFloat(inputs.carAllowance) || 0;
  const bonus = parseFloat(inputs.performanceBonus) || 0;

  // Taxable vs non-taxable logic
  const taxableIncome = basic + housing + car + bonus;
  const nonTaxableIncome = travel + meal + phone; // Assuming within LHDN limits
  const totalIncome = taxableIncome + nonTaxableIncome;

  const tax = calculateProgressiveTax(taxableIncome);

  onCalculate({
    mainValue: tax,
    breakdown: [
      { label: 'TAXABLE COMPONENTS:', value: 0 },
      { label: 'Basic Salary', value: basic },
      { label: 'Housing Allowance', value: housing },
      { label: 'Car Allowance', value: car },
      { label: 'Performance Bonus', value: bonus },
      { label: 'Subtotal Taxable', value: taxableIncome },
      { label: '', value: 0 },
      { label: 'NON-TAXABLE COMPONENTS:', value: 0 },
      { label: 'Travel Allowance', value: travel },
      { label: 'Meal Allowance', value: meal },
      { label: 'Phone Allowance', value: phone },
      { label: 'Subtotal Non-Taxable', value: nonTaxableIncome },
      { label: '', value: 0 },
      { label: 'Total Income', value: totalIncome },
      { label: 'Tax Liability', value: tax }
    ],
    insights: [
      `${((nonTaxableIncome / totalIncome) * 100).toFixed(1)}% of your income is tax-free`,
      `Taxable income: RM${taxableIncome.toFixed(2)}`,
      travel + meal + phone > 6000 ? 'Warning: Some allowances may exceed LHDN tax-free limits' : '',
      `You take home RM${((totalIncome - tax) / 12).toFixed(2)} monthly after tax`
    ].filter(Boolean)
  });
};
```

### Sample FAQs
```typescript
const faqs = [
  {
    question: 'Which allowances are taxable in Malaysia?',
    answer: 'Generally taxable: housing, entertainment, gardener, driver allowances. Partially exempt: petrol (up to RM6,000/year for non-business use), meal, parking. Fully exempt: actual business travel reimbursements.'
  },
  {
    question: 'How can I structure my pay to minimize tax?',
    answer: 'Maximize tax-free allowances like meal (up to RM2,400/year), petrol (up to RM6,000/year), phone, and parking within LHDN guidelines. However, this reduces EPF contributions which are deducted from gross salary.'
  },
  {
    question: 'What documentation do I need for allowances?',
    answer: 'Keep receipts for meal, travel, and phone expenses. For car allowance, maintain log of business vs personal use. Your employer will report all payments in your EA form.'
  },
  {
    question: 'Can my employer give me more allowances instead of salary?',
    answer: 'Yes, but be aware: 1) It reduces EPF contributions (calculated on basic + certain allowances only), 2) LHDN may question excessive allowances, 3) Some allowances have tax-free limits.'
  },
  {
    question: 'What happens if LHDN audits my allowances?',
    answer: 'LHDN may request proof that allowances were genuinely incurred for employment purposes. Without documentation, they may reclassify allowances as taxable income and impose penalties plus interest.'
  }
];
```

---

## Pattern 3: Projection/Tracking Calculator

**Use for:** YtdTaxTracker, MonthlyIncomeProjection, MtdCalculator

### Input Structure
```typescript
const [inputs, setInputs] = useState({
  currentMonth: new Date().getMonth() + 1,
  incomeToDate: '',
  taxPaidToDate: '',
  expectedMonthlyIncome: '',
  expectedBonus: '',
  expectedBonusMonth: '12'
});
```

### Calculation Logic
```typescript
const calculate = () => {
  const currentMonth = parseInt(inputs.currentMonth) || 1;
  const incomeYTD = parseFloat(inputs.incomeToDate) || 0;
  const taxPaidYTD = parseFloat(inputs.taxPaidToDate) || 0;
  const monthlyIncome = parseFloat(inputs.expectedMonthlyIncome) || 0;
  const bonus = parseFloat(inputs.expectedBonus) || 0;

  const remainingMonths = 12 - currentMonth;
  const projectedRemainingIncome = monthlyIncome * remainingMonths + bonus;
  const projectedTotalIncome = incomeYTD + projectedRemainingIncome;

  const projectedTotalTax = calculateProgressiveTax(projectedTotalIncome - 9000);
  const expectedTaxRemaining = projectedTotalTax - taxPaidYTD;
  const refundOrPayable = expectedTaxRemaining < 0 ? 'Refund' : 'Payable';

  onCalculate({
    mainValue: Math.abs(expectedTaxRemaining),
    breakdown: [
      { label: 'Income Year-to-Date', value: incomeYTD },
      { label: 'Tax Paid Year-to-Date', value: taxPaidYTD },
      { label: 'Projected Remaining Income', value: projectedRemainingIncome },
      { label: 'Projected Total Income', value: projectedTotalIncome },
      { label: 'Projected Total Tax', value: projectedTotalTax },
      { label: `Expected ${refundOrPayable}`, value: expectedTaxRemaining }
    ],
    insights: [
      expectedTaxRemaining > 0
        ? `Set aside RM${(expectedTaxRemaining / remainingMonths).toFixed(2)} monthly for tax`
        : `You're on track for a RM${Math.abs(expectedTaxRemaining).toFixed(2)} refund`,
      `Current month: ${currentMonth}/12`,
      `${remainingMonths} months remaining`,
      Math.abs(taxPaidYTD - (projectedTotalTax * currentMonth / 12)) > 1000
        ? 'Consider adjusting your PCB using TP1 form'
        : 'Your PCB is well-calibrated'
    ].filter(Boolean)
  });
};
```

### Sample FAQs
```typescript
const faqs = [
  {
    question: 'How do I use the Year-to-Date Tax Tracker?',
    answer: 'Enter your total income and PCB paid so far this year (check your payslips), your expected monthly income for remaining months, and any expected bonus. The calculator projects your year-end tax position.'
  },
  {
    question: 'Will I get a tax refund or owe tax?',
    answer: 'If your PCB deductions exceed your actual tax liability, you\'ll get a refund. If you underpaid PCB, you\'ll owe tax. Use this calculator to estimate which scenario applies to you.'
  },
  {
    question: 'When should I adjust my PCB (submit TP1)?',
    answer: 'If this calculator shows you\'re significantly overpaying (refund > RM3,000) or underpaying (payable > RM2,000), consider submitting Form TP1 to LHDN to adjust your monthly PCB deductions.'
  },
  {
    question: 'What if my income varies each month?',
    answer: 'Use your average monthly income or be conservative (use lower estimates). You can recalculate monthly as you get more data. Better to slightly overpay PCB than face a large tax bill in April.'
  },
  {
    question: 'Should I include my bonus in the projection?',
    answer: 'Yes, include expected bonuses in the projection. If uncertain about bonus amounts, run two scenarios: with and without bonus, to see the range of possible outcomes.'
  }
];
```

---

## Pattern 4: Scenario-Specific (Gig Economy) Calculator

**Use for:** GrabDriverTaxCalculator, ShopeeSellerTaxCalculator, FreelancerTaxCalculator

### Input Structure
```typescript
const [inputs, setInputs] = useState({
  grossEarnings: '',
  fuelCosts: '',
  vehicleMaintenance: '',
  insurance: '',
  carLoanInterest: '',
  tollParking: '',
  phoneInternet: ''
});
```

### Calculation Logic
```typescript
const calculate = () => {
  const gross = parseFloat(inputs.grossEarnings) || 0;
  const fuel = parseFloat(inputs.fuelCosts) || 0;
  const maintenance = parseFloat(inputs.vehicleMaintenance) || 0;
  const insurance = parseFloat(inputs.insurance) || 0;
  const loanInterest = parseFloat(inputs.carLoanInterest) || 0;
  const toll = parseFloat(inputs.tollParking) || 0;
  const phone = parseFloat(inputs.phoneInternet) || 0;

  const totalExpenses = fuel + maintenance + insurance + loanInterest + toll + phone;
  const netIncome = gross - totalExpenses;
  const chargeableIncome = Math.max(0, netIncome - 9000);
  const tax = calculateProgressiveTax(chargeableIncome);

  const quarterlyProvision = tax / 4;
  const monthlySetAside = tax / 12;

  onCalculate({
    mainValue: tax,
    breakdown: [
      { label: 'Gross Earnings', value: gross },
      { label: 'DEDUCTIBLE EXPENSES:', value: 0 },
      { label: 'Fuel Costs', value: -fuel },
      { label: 'Vehicle Maintenance', value: -maintenance },
      { label: 'Insurance', value: -insurance },
      { label: 'Car Loan Interest', value: -loanInterest },
      { label: 'Toll & Parking', value: -toll },
      { label: 'Phone & Internet', value: -phone },
      { label: 'Total Expenses', value: -totalExpenses },
      { label: 'Net Business Income', value: netIncome },
      { label: 'Less: Personal Relief', value: -9000 },
      { label: 'Chargeable Income', value: chargeableIncome },
      { label: 'Annual Tax', value: tax },
      { label: 'Quarterly Provision', value: quarterlyProvision },
      { label: 'Monthly Set Aside', value: monthlySetAside }
    ],
    insights: [
      `Expense ratio: ${((totalExpenses / gross) * 100).toFixed(1)}%`,
      `Net profit margin: ${((netIncome / gross) * 100).toFixed(1)}%`,
      `Set aside RM${monthlySetAside.toFixed(2)} monthly for tax`,
      netIncome > 34000 ? 'You may need to register for GST if revenue exceeds threshold' : '',
      totalExpenses < gross * 0.2 ? 'Your expense ratio seems low. Are you tracking all expenses?' : ''
    ].filter(Boolean)
  });
};
```

### Sample FAQs
```typescript
const faqs = [
  {
    question: 'What expenses can I deduct as a Grab driver?',
    answer: 'Deductible: fuel, vehicle maintenance, insurance, road tax, car loan interest (not principal), toll, parking, phone bills (proportionate to business use), vehicle depreciation. Not deductible: fines, personal expenses, capital expenditure.'
  },
  {
    question: 'Do I need to register a business for Grab driving?',
    answer: 'If your annual revenue exceeds RM34,000, LHDN recommends registering as a sole proprietor. This allows proper business expense deductions. Keep detailed records even if below threshold.'
  },
  {
    question: 'How do I track my expenses properly?',
    answer: 'Keep all receipts, create a mileage log (business vs personal use), maintain a simple spreadsheet or use expense tracking apps. Separate business and personal expenses. Good records protect you in an LHDN audit.'
  },
  {
    question: 'What about quarterly tax payments?',
    answer: 'While not mandatory for individuals, setting aside quarterly provisions helps avoid a large tax bill in April. Some drivers voluntarily pay quarterly using CP500 forms to manage cash flow.'
  },
  {
    question: 'Can I deduct my car purchase price?',
    answer: 'Not directly. Instead, claim: 1) Annual depreciation (usually 20% reducing balance), OR 2) Actual running costs (fuel, maintenance). You cannot claim both. Actual costs usually work better for high-mileage drivers.'
  }
];
```

---

## Pattern 5: Optimization Calculator

**Use for:** TaxReliefCalculator, LifestyleReliefCalculator, EpfTaxReliefCalculator

### Input Structure
```typescript
const [inputs, setInputs] = useState({
  income: '',
  // Individual relief inputs
  selfRelief: '9000',
  spouseRelief: '0',
  childrenCount: '0',
  parentsCount: '0',
  epfAmount: '',
  lifeInsurance: '',
  educationFees: '',
  medicalExpenses: '',
  lifestyleSpending: '',
  // ... more relief categories
});
```

### Calculation Logic
```typescript
const calculate = () => {
  const income = parseFloat(inputs.income) || 0;

  // Calculate each relief
  const selfRelief = 9000;
  const spouseRelief = parseFloat(inputs.spouseRelief) || 0;
  const childRelief = Math.min(parseInt(inputs.childrenCount) * 2000, 16000);
  const parentRelief = Math.min(parseInt(inputs.parentsCount) * 1500, 6000);
  const epfRelief = Math.min(parseFloat(inputs.epfAmount) || 0, 4000);
  const insuranceRelief = Math.min(parseFloat(inputs.lifeInsurance) || 0, 3000);
  const educationRelief = Math.min(parseFloat(inputs.educationFees) || 0, 7000);
  const medicalRelief = Math.min(parseFloat(inputs.medicalExpenses) || 0, 8000);
  const lifestyleRelief = Math.min(parseFloat(inputs.lifestyleSpending) || 0, 2500);

  const totalReliefs = selfRelief + spouseRelief + childRelief + parentRelief +
                       epfRelief + insuranceRelief + educationRelief +
                       medicalRelief + lifestyleRelief;

  // Calculate maximum possible reliefs
  const maxSpouse = 4000;
  const maxChildren = 16000; // assume max scenario
  const maxParents = 6000;
  const maxEPF = 4000;
  const maxInsurance = 3000;
  const maxEducation = 7000;
  const maxMedical = 8000;
  const maxLifestyle = 2500;

  const maxTotalReliefs = 9000 + maxSpouse + maxChildren + maxParents +
                         maxEPF + maxInsurance + maxEducation +
                         maxMedical + maxLifestyle;

  const potentialAdditionalReliefs = maxTotalReliefs - totalReliefs;

  const taxWithCurrent = calculateProgressiveTax(Math.max(0, income - totalReliefs));
  const taxWithMax = calculateProgressiveTax(Math.max(0, income - maxTotalReliefs));
  const potentialSavings = taxWithCurrent - taxWithMax;

  onCalculate({
    mainValue: totalReliefs,
    breakdown: [
      { label: 'Self Relief', value: selfRelief },
      { label: 'Spouse Relief', value: spouseRelief },
      { label: 'Children Relief', value: childRelief },
      { label: 'Parent Relief', value: parentRelief },
      { label: 'EPF Relief', value: epfRelief },
      { label: 'Life Insurance Relief', value: insuranceRelief },
      { label: 'Education Relief', value: educationRelief },
      { label: 'Medical Relief', value: medicalRelief },
      { label: 'Lifestyle Relief', value: lifestyleRelief },
      { label: '', value: 0 },
      { label: 'Total Current Reliefs', value: totalReliefs },
      { label: 'Tax with Current Reliefs', value: taxWithCurrent },
      { label: '', value: 0 },
      { label: 'Maximum Possible Reliefs', value: maxTotalReliefs },
      { label: 'Potential Additional Reliefs', value: potentialAdditionalReliefs },
      { label: 'Tax with Max Reliefs', value: taxWithMax },
      { label: 'Potential Tax Savings', value: potentialSavings }
    ],
    insights: [
      potentialSavings > 0
        ? `You could save RM${potentialSavings.toFixed(2)} by maximizing reliefs`
        : 'You\'re maximizing your available reliefs!',
      epfRelief < 4000 && income > 50000 ? 'Consider topping up EPF for additional RM4,000 relief' : '',
      lifestyleRelief < 2500 ? 'Claim lifestyle relief: gym, books, internet, sports equipment (RM2,500 max)' : '',
      medicalRelief < 8000 ? 'Keep medical receipts for parents/self/spouse (RM8,000 max)' : '',
      `Effective tax rate: ${((taxWithCurrent / income) * 100).toFixed(2)}%`
    ].filter(Boolean)
  });
};
```

### Sample FAQs
```typescript
const faqs = [
  {
    question: 'How can I maximize my tax reliefs?',
    answer: 'Review all 18 relief categories. Common missed reliefs: lifestyle (RM2,500), medical for parents (RM5,000), education fees (RM7,000), and EPF top-up (RM4,000). Even small amounts add up to significant tax savings.'
  },
  {
    question: 'What counts as "lifestyle relief"?',
    answer: 'Purchases of books, journals, magazines, newspapers, computers/smartphones/tablets, gym memberships, and sports equipment for you, spouse, or children. Maximum RM2,500. Keep receipts.'
  },
  {
    question: 'Can I claim relief for my parents?',
    answer: 'Yes, RM1,500 per parent if income < RM24,000/year. Additional RM1,500 per parent if they have medical conditions. Parents need not live with you, but you must financially support them.'
  },
  {
    question: 'What documentation do I need?',
    answer: 'Receipts for all claims, medical reports for disabled dependents, education enrollment proof, insurance policy statements, EPF statements showing additional contributions. Keep for 7 years in case of LHDN audit.'
  },
  {
    question: 'Is it worth spending money just to get relief?',
    answer: 'No! Reliefs reduce taxable income, not tax dollar-for-dollar. If you\'re in 24% bracket, RM1,000 relief saves RM240 tax. Only "spend for relief" if you were planning those expenses anyway (insurance, education).'
  }
];
```

---

## General Best Practices

### Input Fields
- Use descriptive labels
- Add helpful placeholder text
- Include tooltips for complex fields
- Validate inputs (non-negative, reasonable ranges)
- Format currency inputs

### Calculations
- Handle edge cases (zero income, very high income)
- Use realistic defaults where appropriate
- Round to 2 decimal places for display
- Validate all numeric conversions

### Results Display
- Show clear primary result
- Provide detailed breakdown
- Include actionable insights
- Highlight important warnings
- Format all currency consistently

### FAQs
- Answer real user questions
- Provide specific, actionable advice
- Include relevant regulations/limits
- Address common misconceptions
- Be conversational but authoritative

### Educational Content
- Define the specific scenario
- Explain unique calculation method
- Target the right audience
- List calculator-specific benefits
- Keep language accessible

---

## Implementation Priority

1. **Start with Pattern 1 (Comparison)** - Easiest to implement, high value
2. **Then Pattern 4 (Gig Economy)** - Clear use cases, well-defined expenses
3. **Then Pattern 5 (Optimization)** - Most complex but highest user value
4. **Then Pattern 3 (Projection)** - Requires date handling
5. **Finally Pattern 2 (Breakdown)** - Many input fields to design

---

## Testing Checklist

For each implemented calculator:
- [ ] Test with zero/empty inputs
- [ ] Test with very low income (< RM5,000)
- [ ] Test with typical income (RM40,000 - RM80,000)
- [ ] Test with high income (> RM150,000)
- [ ] Test with maximum relief values
- [ ] Verify all insights appear correctly
- [ ] Check FAQ answers are helpful
- [ ] Confirm educational content is unique
- [ ] Validate SEO meta descriptions
- [ ] Mobile responsiveness check
