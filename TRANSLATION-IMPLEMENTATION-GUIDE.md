# Translation Implementation Guide

## Overview

This guide provides instructions for implementing Bahasa Malaysia translations across all calculator pages. The translation infrastructure has been fully set up with comprehensive translation files covering forms, results, calculator metadata, and common UI elements.

## Translation Infrastructure

### Available Translation Files

All translation files are located in `src/i18n/locales/` with parallel structures for English (`en/`) and Bahasa Malaysia (`ms/`):

1. **common.json** - Shared UI elements, navigation, footer
2. **home.json** - Homepage content
3. **calculators.json** - All calculator titles, subtitles, and descriptions (70+ calculators)
4. **forms.json** - Form labels, placeholders, buttons, validation messages, sections, options, and relief types
5. **results.json** - Result labels, messages, insights, recommendations, breakdown labels, FAQ, and related calculators

### Configuration

The i18n configuration (`src/i18n/config.ts`) has been updated to load all translation namespaces. Language detection uses localStorage and browser settings.

## Implementation Pattern

### Step 1: Import useTranslation Hook

```typescript
import { useTranslation } from 'react-i18next';
```

### Step 2: Initialize Hook in Component

```typescript
export const YourCalculator = () => {
  const { t } = useTranslation();
  // ... rest of component
}
```

### Step 3: Replace Hard-coded Strings

#### Example: Form Labels

**Before:**
```tsx
<label>Monthly Income</label>
<input placeholder="Enter amount" />
```

**After:**
```tsx
<label>{t('forms.labels.monthlyIncome')}</label>
<input placeholder={t('forms.placeholders.enterAmount')} />
```

#### Example: Buttons

**Before:**
```tsx
<button>Calculate</button>
<button>Reset</button>
<button>Download PDF</button>
```

**After:**
```tsx
<button>{t('forms.buttons.calculate')}</button>
<button>{t('forms.buttons.reset')}</button>
<button>{t('forms.buttons.download')}</button>
```

#### Example: Section Headers

**Before:**
```tsx
<h2>Basic Information</h2>
<h3>Tax Reliefs</h3>
<h3>Results</h3>
```

**After:**
```tsx
<h2>{t('forms.sections.basicInfo')}</h2>
<h3>{t('forms.sections.taxReliefs')}</h3>
<h3>{t('forms.sections.results')}</h3>
```

#### Example: Result Labels

**Before:**
```tsx
<div>Total Tax: {formatCurrency(totalTax)}</div>
<div>Net Income: {formatCurrency(netIncome)}</div>
<div>Effective Rate: {formatPercentage(effectiveRate)}</div>
```

**After:**
```tsx
<div>{t('results.labels.totalTax')}: {formatCurrency(totalTax)}</div>
<div>{t('results.labels.netIncome')}: {formatCurrency(netIncome)}</div>
<div>{t('results.labels.effectiveRate')}: {formatPercentage(effectiveRate)}</div>
```

#### Example: Dynamic Content with Interpolation

**Before:**
```typescript
insights.push(`Your effective tax rate of ${formatPercentage(rate)} is excellent.`);
```

**After:**
```typescript
insights.push(
  t('results.insights.effectiveLow', {
    rate: formatPercentage(rate),
    keepRate: formatPercentage(100 - rate)
  })
);
```

### Step 4: Update SEO Metadata

**Before:**
```tsx
<SEOHead
  title="Income Tax Calculator Malaysia 2026"
  description="Calculate your income tax with 2026 LHDN rates"
/>
```

**After:**
```tsx
<SEOHead
  title={t('calculators.incomeTax.title')}
  description={t('calculators.incomeTax.description')}
/>
```

### Step 5: Handle Dropdown Options

**Before:**
```tsx
<select>
  <option value="resident">Resident</option>
  <option value="nonResident">Non-Resident</option>
</select>
```

**After:**
```tsx
<select>
  <option value="resident">{t('forms.options.resident')}</option>
  <option value="nonResident">{t('forms.options.nonResident')}</option>
</select>
```

## Available Translation Keys

### Forms Namespace

#### Labels
- `forms.labels.monthlyIncome`
- `forms.labels.annualIncome`
- `forms.labels.grossIncome`
- `forms.labels.basicSalary`
- `forms.labels.age`
- `forms.labels.residencyStatus`
- `forms.labels.maritalStatus`
- And 40+ more...

#### Buttons
- `forms.buttons.calculate`
- `forms.buttons.reset`
- `forms.buttons.download`
- `forms.buttons.share`
- `forms.buttons.email`
- `forms.buttons.compare`
- And more...

#### Sections
- `forms.sections.basicInfo`
- `forms.sections.incomeDetails`
- `forms.sections.deductions`
- `forms.sections.taxReliefs`
- `forms.sections.results`
- `forms.sections.breakdown`
- `forms.sections.insights`
- `forms.sections.recommendations`
- And more...

#### Reliefs
- `forms.reliefs.individual`
- `forms.reliefs.spouse`
- `forms.reliefs.children`
- `forms.reliefs.epf`
- `forms.reliefs.lifeInsurance`
- `forms.reliefs.education`
- `forms.reliefs.medical`
- `forms.reliefs.lifestyle`
- And more...

### Results Namespace

#### Labels
- `results.labels.totalTax`
- `results.labels.netIncome`
- `results.labels.chargeableIncome`
- `results.labels.effectiveRate`
- `results.labels.monthlyPCB`
- And 30+ more...

#### Messages
- `results.messages.calculating`
- `results.messages.noResults`
- `results.messages.linkCopied`
- `results.messages.emailSent`
- And more...

#### Insights (with interpolation)
- `results.insights.effectiveLow` - Parameters: `{rate}`, `{keepRate}`
- `results.insights.reliefsSaved` - Parameters: `{amount}`, `{savings}`
- `results.insights.epfPotential` - Parameters: `{amount}`, `{savings}`
- And more...

#### Recommendations
- `results.recommendations.maximizeReliefs`
- `results.recommendations.maximizeReliefsDesc`
- `results.recommendations.increaseEPF`
- And more...

### Calculators Namespace

All 70+ calculators have:
- `calculators.{calculatorKey}.title`
- `calculators.{calculatorKey}.subtitle`
- `calculators.{calculatorKey}.description`

Example keys:
- `epf`, `incomeTax`, `socso`, `mortgage`, `carLoan`
- `pcb`, `netSalary`, `grossToNet`, `takeHomePay`
- `bonusTax`, `13thMonthSalary`, `overtimeTax`
- `taxRelief`, `epfTaxRelief`, `prsTaxRelief`
- And 60+ more...

## Common Patterns

### 1. Alert Messages

**Before:**
```typescript
alert('Link copied to clipboard!');
```

**After:**
```typescript
alert(t('results.messages.linkCopied'));
```

### 2. Loading States

**Before:**
```tsx
{isCalculating && <div>Calculating...</div>}
```

**After:**
```tsx
{isCalculating && <div>{t('results.messages.calculating')}</div>}
```

### 3. Empty States

**Before:**
```tsx
<p>No results yet. Enter your details and click Calculate.</p>
```

**After:**
```tsx
<p>{t('results.messages.noResults')}</p>
```

### 4. Validation Messages

**Before:**
```tsx
{error && <span>This field is required</span>}
```

**After:**
```tsx
{error && <span>{t('forms.validation.required')}</span>}
```

### 5. Conditional Section Headers

**Before:**
```tsx
{expanded ? 'Show Less' : 'Show More'}
```

**After:**
```tsx
{expanded ? t('forms.buttons.showLess') : t('forms.buttons.showMore')}
```

## Number and Currency Formatting

Number formatting should remain locale-aware through the existing formatter functions. The i18n library automatically handles:
- Number formatting (thousands separators)
- Currency symbols
- Percentage formatting
- Date formatting

```typescript
// These continue to work with locale detection
formatCurrency(1000) // RM 1,000.00 or RM1,000.00 depending on locale
formatPercentage(25.5) // 25.5% or 25,5% depending on locale
```

## Testing Translations

1. **Visual Testing**: Toggle language using the LanguageToggle component in the header
2. **Check for Missing Keys**: Missing translations will display the key path (e.g., `forms.labels.missing`)
3. **Verify Interpolation**: Ensure dynamic values appear correctly in translated strings
4. **Test All States**: Check loading, error, empty, and success states

## Priority Implementation Order

1. **High Priority** (User-facing forms and results):
   - Input labels and placeholders
   - Button text
   - Result labels and values
   - Validation messages
   - Section headers

2. **Medium Priority** (Enhanced UX):
   - Insights and recommendations
   - FAQ content
   - Helper text and tooltips
   - Success/error messages

3. **Low Priority** (Technical content):
   - PDF export content
   - Email templates
   - Detailed breakdowns
   - Technical methodology text

## Calculator-Specific Notes

### Income Tax Calculators
- Use `forms.reliefs.*` for all tax relief labels
- Use `results.insights.*` for tax insights with interpolation
- Use `results.recommendations.*` for tax optimization suggestions

### Loan Calculators
- Use `forms.labels.loanAmount`, `loanPeriod`, `interestRate`
- Use `results.labels.monthlyPayment`, `totalInterest`, `totalPayment`
- Use `forms.sections.amortization` for amortization tables

### Payroll Calculators
- Use `forms.labels.epfContribution`, `socsoContribution`, `eisContribution`
- Use `results.labels.netSalary`, `takeHomePay`
- Use `forms.labels.pcbDeduction` for tax deductions

### Property Calculators
- Use `forms.labels.propertyPrice`, `purchasePrice`, `salePrice`
- Use `results.labels.stampDuty`, `rpgt`, `rentalYield`

## Adding New Translation Keys

If you need a translation key that doesn't exist:

1. Add to appropriate English file (`src/i18n/locales/en/*.json`)
2. Add matching Bahasa Malaysia translation (`src/i18n/locales/ms/*.json`)
3. Use descriptive, hierarchical keys (e.g., `forms.reliefs.newRelief`)
4. For dynamic content, use interpolation with clear parameter names

## Troubleshooting

### Translation Not Showing
- Check if key exists in both `en` and `ms` files
- Verify namespace is loaded in `src/i18n/config.ts`
- Ensure `useTranslation()` hook is called in component
- Check browser console for missing key warnings

### Wrong Language Displaying
- Check localStorage for `i18nextLng` key
- Verify LanguageToggle component is working
- Clear browser cache and localStorage

### Interpolation Not Working
- Ensure values passed match parameter names in translation
- Check that values are defined (not undefined/null)
- Use consistent formatting functions

## Best Practices

1. **Always translate user-visible text** - Never leave hard-coded English strings
2. **Use semantic key names** - Keys should describe content, not location
3. **Keep translations in sync** - Update both `en` and `ms` files together
4. **Test both languages** - Verify layout works in both English and Bahasa Malaysia
5. **Use interpolation for dynamic content** - Never concatenate strings
6. **Maintain consistent terminology** - Use same translation for same concept across calculators
7. **Consider text length** - Bahasa Malaysia text may be longer, ensure UI accommodates
8. **Preserve formatting** - Keep number, currency, and percentage formatting consistent

## Example: Complete Component Translation

See `src/components/Calculator/FAQ.tsx` and `src/components/Calculator/RelatedCalculators.tsx` for complete examples of translated components.

## Support

For questions or issues with translations:
1. Check this guide first
2. Review existing translated components for patterns
3. Verify translation files have matching keys in both languages
4. Test with language toggle to see both versions
