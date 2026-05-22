# FAQ Library for Income Tax Calculators
## Scenario-Specific FAQ Templates

---

## Calculator: SalaryOfferNetCalculator

```typescript
const faqs = [
  {
    question: 'How do I compare two salary offers with different structures?',
    answer: 'Enter the gross salary, bonus months, and allowances for each offer. The calculator shows net take-home pay after EPF, SOCSO, EIS, and tax deductions. Choose the offer with higher net pay unless benefits or career growth differ significantly.'
  },
  {
    question: 'Should I factor in EPF contributions when comparing offers?',
    answer: 'Yes! Higher gross salary means higher EPF contributions (both yours and employer\'s). While this reduces monthly take-home, it builds long-term retirement savings. A RM10,000 salary generates RM2,300/month total EPF vs RM1,840 for RM8,000 salary.'
  },
  {
    question: 'How do bonuses affect my net pay comparison?',
    answer: 'Bonuses are taxed in the year received, potentially pushing you to higher tax brackets. A RM80,000 salary with 3-month bonus may result in lower net pay than RM90,000 straight salary despite similar gross annual compensation.'
  },
  {
    question: 'What hidden costs should I consider beyond tax?',
    answer: 'Consider commute costs (fuel, toll, parking), meal expenses if not provided, dress code requirements, relocation costs, and opportunity costs of longer working hours or commute time.'
  },
  {
    question: 'Is a 20% gross increase really 20% more take-home pay?',
    answer: 'No. Due to progressive taxation, your effective net increase is lower. A 20% gross increase typically results in 15-18% net increase, depending on your tax bracket. This calculator shows the real net difference.'
  }
];
```

---

## Calculator: RaiseNegotiationCalculator

```typescript
const faqs = [
  {
    question: 'How much raise should I ask for to get X more net monthly?',
    answer: 'This calculator works backwards from your desired net increase. It factors in progressive tax rates and EPF deductions to show the gross raise you need to negotiate for your target take-home increase.'
  },
  {
    question: 'Is it better to negotiate salary increase or bonus?',
    answer: 'Salary increases compound over years and increase EPF contributions permanently. Bonuses are one-time and don\'t boost EPF base. However, bonuses can be negotiated separately and may push you to higher tax brackets.'
  },
  {
    question: 'How does a raise affect my tax bracket?',
    answer: 'Malaysia uses progressive taxation. A raise might push part of your income into a higher bracket (e.g., from 14% to 21%). Only the income above the threshold is taxed at the higher rate, not your entire income.'
  },
  {
    question: 'Should I time my raise negotiation for tax purposes?',
    answer: 'Mid-year raises are better for tax planning - they give you time to adjust PCB deductions. January raises immediately affect your whole year\'s tax, potentially causing underpayment if PCB isn\'t adjusted.'
  },
  {
    question: 'What if my employer offers allowances instead of salary?',
    answer: 'Some allowances are tax-free (meal, travel), reducing your tax burden. However, only basic salary + certain allowances count for EPF, so this reduces retirement contributions. Evaluate both immediate and long-term impacts.'
  }
];
```

---

## Calculator: BonusVsSalaryComparison

```typescript
const faqs = [
  {
    question: 'Is RM10,000 bonus better than RM833 monthly salary increase?',
    answer: 'Not always. The salary increase: 1) Compounds in future raises, 2) Increases EPF contributions permanently, 3) Spreads tax impact across months. Bonuses are one-time windfalls but don\'t provide long-term benefits.'
  },
  {
    question: 'How are bonuses taxed differently from salary?',
    answer: 'Bonuses are added to your annual income and taxed at your marginal rate. Large bonuses can push you temporarily into higher brackets. Salary increases spread the additional income across 12 months, potentially staying in lower brackets.'
  },
  {
    question: 'Does my bonus affect EPF contributions?',
    answer: 'Yes, bonuses are subject to EPF deductions (11% employee, 12-13% employer). However, this is a one-time contribution. A permanent salary increase boosts your EPF base forever, resulting in higher lifetime retirement savings.'
  },
  {
    question: 'Which option is better for career growth?',
    answer: 'Salary increases signal permanent value recognition and set a higher base for future raises (e.g., 5% of RM80,000 vs RM70,000). Bonuses are often performance-based and may not recur. Consider career trajectory over immediate cash.'
  },
  {
    question: 'Can I negotiate both salary and bonus?',
    answer: 'Absolutely! Some employers have limited salary budget but flexible bonus pools. Negotiate a moderate base increase plus performance-based bonus. This gives you financial security (base) and upside potential (bonus).'
  }
];
```

---

## Calculator: GrabDriverTaxCalculator

```typescript
const faqs = [
  {
    question: 'What vehicle expenses can I claim as a Grab driver?',
    answer: 'Deductible: fuel, maintenance, repairs, insurance, road tax, loan interest (not principal), depreciation, toll, parking, car wash, and phone bills (proportionate to business use). Keep all receipts for LHDN audit protection.'
  },
  {
    question: 'Do I need to register as a business?',
    answer: 'If annual Grab income exceeds RM34,000, you should register as a sole proprietor. This legitimizes business expense claims and allows proper accounting. Even below threshold, good records help defend expense deductions.'
  },
  {
    question: 'Can I claim both actual expenses AND mileage depreciation?',
    answer: 'No, choose one method: 1) Actual costs (fuel, maintenance, insurance, etc.) PLUS depreciation, OR 2) Mileage rate (currently not common in Malaysia). Most Grab drivers use actual costs method as it typically yields higher deductions.'
  },
  {
    question: 'How do I separate business and personal vehicle use?',
    answer: 'Maintain a mileage log showing business vs personal trips. If 70% business use, claim 70% of expenses. Grab app provides trip logs. LHDN may question 100% business use if you have no other vehicle.'
  },
  {
    question: 'What about quarterly tax payments?',
    answer: 'Grab drivers can voluntarily make quarterly tax provisions using CP500 payment slips to avoid a large April tax bill. While not mandatory for individuals, this helps with cash flow management. Set aside 10-15% of net income monthly.'
  }
];
```

---

## Calculator: ShopeeSellerTaxCalculator

```typescript
const faqs = [
  {
    question: 'What expenses can I deduct as a Shopee seller?',
    answer: 'Deductible: cost of goods sold (COGS), shipping paid by you, packaging materials, Shopee commission fees, payment gateway fees, marketing costs (ads, photography), storage/warehouse, equipment, internet, phone (proportionate to business), and accounting software.'
  },
  {
    question: 'Do I need to register a business for Shopee selling?',
    answer: 'If annual revenue exceeds RM34,000, register as a sole proprietor or Sdn Bhd. This is required for SSM compliance and allows proper business expense claims. Revenue is gross sales, not profit.'
  },
  {
    question: 'How do I calculate my actual profit from Shopee sales?',
    answer: 'Profit = Gross Sales - COGS - Shopee Fees - Shipping - Packaging - Ads - Returns/Refunds - Other Expenses. Only the net profit is taxable income, not your gross sales. Track every expense to minimize tax.'
  },
  {
    question: 'What if I sell part-time while employed full-time?',
    answer: 'You must declare all income sources. Your Shopee net profit is added to employment income for total taxable income. You can still claim business expense deductions. Consider if this pushes you into a higher tax bracket.'
  },
  {
    question: 'Do I need to charge SST to customers?',
    answer: 'Only if your annual revenue exceeds RM500,000 (SST threshold). Below this, you\'re exempt from SST registration. However, still declare income tax on profits. SST and income tax are separate obligations.'
  }
];
```

---

## Calculator: MonthlyTaxPlanner

```typescript
const faqs = [
  {
    question: 'How much should I set aside monthly for year-end tax?',
    answer: 'This calculator estimates your annual tax and divides by 12 for monthly provision. If your employer deducts PCB, this is already handled. For self-employed or multiple income sources, set aside the monthly amount shown.'
  },
  {
    question: 'What if my income varies month-to-month?',
    answer: 'Use your average or annualized income estimate. Recalculate quarterly as you get more data. It\'s better to over-provision and get a small refund than underpay and face penalties for late payment.'
  },
  {
    question: 'Can I adjust my PCB deductions monthly?',
    answer: 'Yes, submit Form TP1 to LHDN to adjust your monthly PCB deductions. This is useful if you have significant reliefs, multiple income sources, or expect large deductions. Your employer will implement LHDN\'s approved adjustment.'
  },
  {
    question: 'Should I include expected bonuses in my planning?',
    answer: 'Yes, bonuses are taxable income. Include expected year-end bonuses in your annual income estimate. If uncertain, run two scenarios: with and without bonus, then provision somewhere in between.'
  },
  {
    question: 'What happens if I underpay tax during the year?',
    answer: 'You\'ll owe tax when filing in April. If underpayment is significant (>10% of tax due), LHDN may impose penalties and interest. Regular monthly provisioning or proper PCB adjustment avoids this.'
  }
];
```

---

## Calculator: YtdTaxTracker

```typescript
const faqs = [
  {
    question: 'How do I check if my PCB is correct mid-year?',
    answer: 'Enter your total income and PCB paid year-to-date (from payslips), expected income for remaining months, and any expected bonuses. The calculator compares your projected annual tax to PCB paid, showing if you\'re over or underpaying.'
  },
  {
    question: 'What if I\'m significantly overpaying PCB?',
    answer: 'If the calculator shows you\'ll get a large refund (>RM3,000), consider submitting Form TP1 to reduce monthly PCB. This gives you higher monthly take-home now rather than waiting for refund next April.'
  },
  {
    question: 'What if I\'m underpaying PCB?',
    answer: 'If you\'ll owe substantial tax (>RM2,000), submit Form TP1 to increase monthly PCB or set aside monthly provisions. This avoids a large tax bill in April and potential late payment penalties.'
  },
  {
    question: 'When is the best time to do a mid-year tax check?',
    answer: 'June-July is ideal. You have 6 months of actual data and 6 months to adjust. This gives you accurate projections and enough time to take corrective action via TP1 if needed.'
  },
  {
    question: 'Should I include a potential job switch in my tracking?',
    answer: 'Yes! Job switches mid-year often cause PCB errors because each employer calculates independently. Your combined income may push you to higher brackets. Track both incomes together to avoid year-end surprises.'
  }
];
```

---

## Calculator: TaxReliefCalculator (Optimizer)

```typescript
const faqs = [
  {
    question: 'How can I maximize my tax reliefs legally?',
    answer: 'Review all 18 relief categories annually. Commonly missed: lifestyle relief (RM2,500), parent medical (RM5,000), education (RM7,000), and voluntary EPF (RM4,000). Even RM10,000 additional reliefs saves RM2,000-RM3,000 in tax.'
  },
  {
    question: 'Should I spend money just to claim relief?',
    answer: 'No! Reliefs reduce taxable income, not tax dollar-for-dollar. If you\'re in the 24% bracket, RM1,000 relief saves RM240 tax - you\'re still down RM760. Only claim for expenses you\'d make anyway (insurance, education).'
  },
  {
    question: 'What documentation do I need for relief claims?',
    answer: 'Keep receipts for lifestyle purchases, medical bills, education enrollment proof, insurance policy statements, EPF additional contribution statements, and donation receipts. Retain for 7 years in case of LHDN audit.'
  },
  {
    question: 'Can I claim relief for expenses paid for my parents?',
    answer: 'Yes, if parents earn <RM24,000/year: RM1,500 relief per parent, plus RM1,500 extra if they have medical conditions. Medical expenses for parents (RM5,000 max) and parent medical equipment (RM6,000) are separate reliefs.'
  },
  {
    question: 'What qualifies as "lifestyle relief"?',
    answer: 'Purchase of books, journals, magazines, newspapers, computers, smartphones, tablets (personal use), gym memberships, and sports equipment for you, spouse, or children. Maximum RM2,500 total. Must have receipts.'
  }
];
```

---

## Calculator: NonResidentTaxCalculator

```typescript
const faqs = [
  {
    question: 'How is non-resident tax different from resident tax?',
    answer: 'Non-residents are taxed at flat rates (mostly 30%) without any tax reliefs or deductions. Residents use progressive rates (0-30%) and can claim RM9,000+ in reliefs. Residency is determined by days in Malaysia.'
  },
  {
    question: 'How do I know if I\'m a tax resident?',
    answer: 'You\'re a resident if you\'re in Malaysia for 182+ days in a calendar year, OR meet special criteria (e.g., 90 days in current year + 90 in 3 out of 4 prior years). Use the Residency Days Calculator for your situation.'
  },
  {
    question: 'Can non-residents claim any reliefs?',
    answer: 'Very limited. Non-residents cannot claim personal reliefs but may claim certain business expenses if applicable. This makes resident status much more valuable for tax purposes.'
  },
  {
    question: 'What if I become a resident mid-year?',
    answer: 'LHDN will treat you as a resident for the entire year if you meet residency criteria. You\'ll recalculate tax using progressive rates and can claim reliefs. This usually results in a tax refund if you paid 30% non-resident rate.'
  },
  {
    question: 'How is my income taxed if I work remotely for overseas companies?',
    answer: 'If income is remitted to Malaysia and you\'re physically in Malaysia when working, it\'s taxable in Malaysia. Tax residency determines whether you use resident (progressive) or non-resident (30% flat) rates.'
  }
];
```

---

## Calculator: ExpatNetPayCalculator

```typescript
const faqs = [
  {
    question: 'Do expats pay different taxes than Malaysian citizens?',
    answer: 'Tax rates are the same based on residency status, not nationality. Resident expats (182+ days/year) use progressive rates (0-30%) and can claim reliefs. Non-resident expats pay flat 30% with no reliefs. SOCSO is optional for expats.'
  },
  {
    question: 'Are expats exempt from EPF contributions?',
    answer: 'Non-Malaysian citizens are not required to contribute to EPF, but employers may offer alternative retirement schemes. Some expats voluntarily contribute to EPF. Unlike Malaysians, expat EPF contributions are optional.'
  },
  {
    question: 'Do expats need to pay SOCSO?',
    answer: 'Expats are generally exempt from SOCSO and EIS unless they\'re permanent residents. This increases take-home pay compared to Malaysian citizens at the same gross salary. Confirm with your HR department.'
  },
  {
    question: 'How does foreign-sourced income affect my tax?',
    answer: 'If you\'re a Malaysian tax resident and remit foreign income to Malaysia, it may be taxable. Consult a tax advisor for double taxation agreements (DTA) between Malaysia and your income source country.'
  },
  {
    question: 'Can expats claim the same tax reliefs as Malaysians?',
    answer: 'Yes, if you\'re a tax resident (182+ days). You can claim self relief, spouse relief (if spouse is tax resident), children relief, and others. Non-resident expats cannot claim any personal reliefs.'
  }
];
```

---

## Calculator: OvertimeTaxCalculator

```typescript
const faqs = [
  {
    question: 'Is overtime taxed at a higher rate than regular salary?',
    answer: 'No special overtime rate exists. Overtime is added to your gross annual income and taxed using progressive rates. However, overtime may push you into higher tax brackets, making it feel more heavily taxed.'
  },
  {
    question: 'How much of my overtime do I actually keep after tax?',
    answer: 'This depends on your tax bracket. If you\'re in the 14% bracket, you keep 86% of overtime (before EPF/SOCSO). In the 24% bracket, you keep 76%. Higher earners keep less of overtime due to progressive taxation.'
  },
  {
    question: 'Should I work overtime or negotiate a higher base salary?',
    answer: 'Base salary increases are usually better: 1) They\'re permanent and compound in future raises, 2) They increase EPF contributions for retirement, 3) They signal career progression. Overtime is temporary income.'
  },
  {
    question: 'Does overtime affect my PCB deductions?',
    answer: 'Yes, regular monthly overtime increases your PCB deductions. One-off large overtime payments may have PCB under-deducted, potentially causing you to owe tax when filing. Track your annual position.'
  },
  {
    question: 'Can I opt out of overtime to stay in a lower tax bracket?',
    answer: 'While technically possible, this rarely makes sense. You always keep >70% of overtime even in high brackets. However, consider work-life balance, burnout, and whether your time is better spent on side businesses or upskilling.'
  }
];
```

---

## Calculator: CommissionTaxCalculator

```typescript
const faqs = [
  {
    question: 'How are sales commissions taxed in Malaysia?',
    answer: 'Commissions are fully taxable income, added to your base salary. They\'re subject to EPF, SOCSO, EIS, and progressive income tax. There\'s no special commission tax rate - it\'s just part of your annual income.'
  },
  {
    question: 'Do I pay more tax in high-commission months?',
    answer: 'Monthly PCB may be higher, but annual tax is based on total yearly income. Large one-time commissions may have PCB under-deducted. File your taxes annually to true-up and get refunds if overpaid.'
  },
  {
    question: 'Should I ask for higher base or higher commission split?',
    answer: 'Higher base provides: 1) Stable income for loans/mortgages, 2) Higher EPF contributions, 3) Better credibility for job switches. Higher commission offers upside potential but income instability. Consider your risk tolerance and life stage.'
  },
  {
    question: 'Can I deduct business expenses from commission income?',
    answer: 'Generally no, unless you\'re self-employed. Employees cannot deduct client entertainment, travel, or phone costs from employment commission income. Only self-employed agents/consultants can claim business expense deductions.'
  },
  {
    question: 'How do I plan for taxes with variable commission income?',
    answer: 'Set aside 15-25% of each commission payment for year-end tax (higher percentage if you\'re a high earner). Use the YTD Tax Tracker quarterly to monitor your position and adjust provisions.'
  }
];
```

---

## General Guidelines for Writing FAQs

### DO:
- Answer real questions users would ask
- Provide specific numbers and examples
- Address common misconceptions
- Give actionable advice
- Link to related calculators where relevant
- Use conversational but authoritative tone
- Cite LHDN rules where applicable

### DON'T:
- Use generic "How do I use this" questions
- Repeat the same answers across calculators
- Provide vague or non-specific answers
- Make promises about tax avoidance
- Give advice outside your expertise (legal, investment)
- Use technical jargon without explanation

### FAQ Writing Formula:

**Question Pattern:**
- "How [specific action/concept]?"
- "What if [specific scenario]?"
- "Should I [specific decision]?"
- "Can I [specific claim/deduction]?"
- "When [specific timing]?"

**Answer Pattern:**
1. Direct answer (first sentence)
2. Explanation with specifics
3. Example with numbers (if applicable)
4. Actionable next step
5. Warning or pro tip (if relevant)

