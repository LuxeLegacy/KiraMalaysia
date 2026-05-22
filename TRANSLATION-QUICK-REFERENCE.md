# Translation Quick Reference

## Setup (Once per component)

```typescript
import { useTranslation } from 'react-i18next';

export const YourCalculator = () => {
  const { t } = useTranslation();
  // ... rest of component
}
```

## Common Replacements

### Form Labels
```typescript
// Input labels
{t('forms.labels.monthlyIncome')}
{t('forms.labels.annualIncome')}
{t('forms.labels.grossIncome')}
{t('forms.labels.basicSalary')}
{t('forms.labels.age')}
{t('forms.labels.residencyStatus')}
{t('forms.labels.loanAmount')}
{t('forms.labels.interestRate')}
{t('forms.labels.loanPeriod')}
```

### Buttons
```typescript
{t('forms.buttons.calculate')}
{t('forms.buttons.reset')}
{t('forms.buttons.download')}
{t('forms.buttons.share')}
{t('forms.buttons.email')}
{t('forms.buttons.compare')}
```

### Placeholders
```typescript
placeholder={t('forms.placeholders.enterAmount')}
placeholder={t('forms.placeholders.enterValue')}
placeholder={t('forms.placeholders.enterIncome')}
placeholder={t('forms.placeholders.selectOption')}
```

### Section Headers
```typescript
{t('forms.sections.basicInfo')}
{t('forms.sections.incomeDetails')}
{t('forms.sections.taxReliefs')}
{t('forms.sections.results')}
{t('forms.sections.breakdown')}
{t('forms.sections.insights')}
{t('forms.sections.recommendations')}
```

### Result Labels
```typescript
{t('results.labels.totalTax')}
{t('results.labels.netIncome')}
{t('results.labels.chargeableIncome')}
{t('results.labels.effectiveRate')}
{t('results.labels.monthlyPCB')}
{t('results.labels.monthlyPayment')}
{t('results.labels.totalInterest')}
{t('results.labels.epfBalance')}
```

### Status Messages
```typescript
{t('results.messages.calculating')}
{t('results.messages.noResults')}
alert(t('results.messages.linkCopied'))
alert(t('results.messages.emailSent'))
```

### Validation
```typescript
{t('forms.validation.required')}
{t('forms.validation.mustBePositive')}
{t('forms.validation.mustBeValid')}
{t('forms.validation.invalidEmail')}
```

### Dropdown Options
```typescript
<option value="resident">{t('forms.options.resident')}</option>
<option value="nonResident">{t('forms.options.nonResident')}</option>
<option value="single">{t('forms.options.single')}</option>
<option value="married">{t('forms.options.married')}</option>
```

### Tax Reliefs
```typescript
{t('forms.reliefs.individual')}
{t('forms.reliefs.spouse')}
{t('forms.reliefs.children')}
{t('forms.reliefs.epf')}
{t('forms.reliefs.lifeInsurance')}
{t('forms.reliefs.education')}
{t('forms.reliefs.medical')}
{t('forms.reliefs.lifestyle')}
```

## Dynamic Content (Interpolation)

```typescript
// Insight with variables
t('results.insights.effectiveLow', {
  rate: formatPercentage(result.effectiveRate),
  keepRate: formatPercentage(100 - result.effectiveRate)
})

// Relief savings
t('results.insights.reliefsSaved', {
  amount: formatCurrency(result.totalReliefs),
  savings: formatCurrency(savedTax)
})

// EPF potential
t('results.insights.epfPotential', {
  amount: formatCurrency(potentialExtra),
  savings: formatCurrency(potentialSavings)
})
```

## SEO Metadata

```typescript
<SEOHead
  title={t('calculators.incomeTax.title')}
  description={t('calculators.incomeTax.description')}
/>
```

## Calculator Keys

Replace `{key}` in `calculators.{key}.title`:

**Finance:** epf, incomeTax, socso, mortgage, personalLoan, payroll, loanEligibility

**Income Tax:** pcb, netSalary, grossToNet, takeHomePay, bonusTax, 13thMonthSalary, overtimeTax, commissionTax, annualTax, monthlyTaxPlanner, taxRelief, epfTaxRelief, prsTaxRelief, lifestyleRelief, insuranceRelief, zakatTaxRebate, taxBracket, marginalTaxRate, effectiveTaxRate, nextRinggitTaxed, salaryIncrementTax, raiseNegotiation, jobSwitchTax, newJobPcb, resignationMonthTax, companyAVsB, bonusVsSalary, salaryOffernet, payslipBreakdown, mtd, ytdTaxTracker, monthlyToAnnual, monthlyIncomeProjection, taxProvision, taxRefund, overUnderMtd, nonResidentTax, residentVsNonresident, residencyDays, expatNetPay, employerTaxBorne, salaryPackaging, allowanceTaxability, freelancerTax, sideIncomeTax, rentalIncomeTax, grabDriverTax, shopeeSellerTax, tp3Income, unpaidLeaveTax

**Property:** stampDuty, rpgt, rentalYield

**Automotive:** carLoan, roadTax

**Islamic:** zakat

**Life:** retirement, netWorth, inflation

## Testing Checklist

- [ ] Toggle language in header
- [ ] All labels switch languages
- [ ] All buttons switch languages
- [ ] All messages switch languages
- [ ] Numbers format correctly
- [ ] Layout works in both languages
- [ ] No English strings remain
- [ ] Dynamic content (insights) translates

## Need More Keys?

See full reference: **TRANSLATION-IMPLEMENTATION-GUIDE.md**
