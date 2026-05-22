import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { TestPage } from './pages/TestPage';
import { IncomeTaxCalculator } from './pages/finance/IncomeTaxCalculator';
import { EPFCalculator } from './pages/finance/EPFCalculator';
import { SOCSOCalculator } from './pages/finance/SOCSOCalculator';
import { UnifiedPayrollCalculator } from './pages/finance/UnifiedPayrollCalculator';
import { LoanEligibilityCalculator } from './pages/finance/LoanEligibilityCalculator';
import { PersonalLoanCalculator } from './pages/finance/PersonalLoanCalculator';
import { MortgageCalculator } from './pages/finance/MortgageCalculator';
import { StampDutyCalculator } from './pages/property/StampDutyCalculator';
import { RPGTCalculator } from './pages/property/RPGTCalculator';
import { RentalYieldCalculator } from './pages/property/RentalYieldCalculator';
import { CarLoanCalculator } from './pages/automotive/CarLoanCalculator';
import { RoadTaxCalculator } from './pages/automotive/RoadTaxCalculator';
import { ZakatCalculator } from './pages/islamic-finance/ZakatCalculator';
import { RetirementCalculator } from './pages/life/RetirementCalculator';
import { InflationCalculator } from './pages/life/InflationCalculator';
import { NetWorthCalculator } from './pages/life/NetWorthCalculator';

import { AnnualTaxCalculator } from './pages/income-tax/AnnualTaxCalculator';
import { TakeHomePayCalculator } from './pages/income-tax/TakeHomePayCalculator';
import { PCBCalculator } from './pages/income-tax/PCBCalculator';
import { NetSalaryCalculator } from './pages/income-tax/NetSalaryCalculator';
import { GrossToNetCalculator } from './pages/income-tax/GrossToNetCalculator';
import { MtdCalculator } from './pages/income-tax/MtdCalculator';
import { TaxRefundCalculator } from './pages/income-tax/TaxRefundCalculator';
import { OverUnderMtdDetector } from './pages/income-tax/OverUnderMtdDetector';
import { YtdTaxTracker } from './pages/income-tax/YtdTaxTracker';
import { TaxBracketCalculator } from './pages/income-tax/TaxBracketCalculator';
import { BonusTaxCalculator } from './pages/income-tax/BonusTaxCalculator';
import { CommissionTaxCalculator } from './pages/income-tax/CommissionTaxCalculator';
import { OvertimeTaxCalculator } from './pages/income-tax/OvertimeTaxCalculator';
import { ThirteenthMonthSalaryTax } from './pages/income-tax/13thMonthSalaryTax';
import { SalaryIncrementTaxImpact } from './pages/income-tax/SalaryIncrementTaxImpact';
import { SalaryOfferNetCalculator } from './pages/income-tax/SalaryOfferNetCalculator';
import { BonusVsSalaryComparison } from './pages/income-tax/BonusVsSalaryComparison';
import { JobSwitchTaxCalculator } from './pages/income-tax/JobSwitchTaxCalculator';
import { Tp3IncomeCalculator } from './pages/income-tax/Tp3IncomeCalculator';
import { ResignationMonthTaxCalculator } from './pages/income-tax/ResignationMonthTaxCalculator';
import { NewJobPcbEstimator } from './pages/income-tax/NewJobPcbEstimator';
import { UnpaidLeaveTaxImpact } from './pages/income-tax/UnpaidLeaveTaxImpact';
import { MonthlyTaxPlanner } from './pages/income-tax/MonthlyTaxPlanner';
import { TaxProvisionCalculator } from './pages/income-tax/TaxProvisionCalculator';
import { EffectiveTaxRateCalculator } from './pages/income-tax/EffectiveTaxRateCalculator';
import { MarginalTaxRateCalculator } from './pages/income-tax/MarginalTaxRateCalculator';
import { MonthlyIncomeProjection } from './pages/income-tax/MonthlyIncomeProjection';
import { TaxReliefCalculator } from './pages/income-tax/TaxReliefCalculator';
import { LifestyleReliefCalculator } from './pages/income-tax/LifestyleReliefCalculator';
import { EpfTaxReliefCalculator } from './pages/income-tax/EpfTaxReliefCalculator';
import { PrsTaxReliefCalculator } from './pages/income-tax/PrsTaxReliefCalculator';
import { ZakatTaxRebateCalculator } from './pages/income-tax/ZakatTaxRebateCalculator';
import { InsuranceReliefCalculator } from './pages/income-tax/InsuranceReliefCalculator';
import { NonResidentTaxCalculator } from './pages/income-tax/NonResidentTaxCalculator';
import { ResidencyDaysCalculator } from './pages/income-tax/ResidencyDaysCalculator';
import { ResidentVsNonresidentTaxComparison } from './pages/income-tax/ResidentVsNonresidentTaxComparison';
import { ExpatNetPayCalculator } from './pages/income-tax/ExpatNetPayCalculator';
import { FreelancerTaxCalculator } from './pages/income-tax/FreelancerTaxCalculator';
import { RentalIncomeTaxCalculator } from './pages/income-tax/RentalIncomeTaxCalculator';
import { SideIncomeTaxSetAside } from './pages/income-tax/SideIncomeTaxSetAside';
import { GrabDriverTaxCalculator } from './pages/income-tax/GrabDriverTaxCalculator';
import { ShopeeSellerTaxCalculator } from './pages/income-tax/ShopeeSellerTaxCalculator';
import { RaiseNegotiationCalculator } from './pages/income-tax/RaiseNegotiationCalculator';
import { CompanyAVsCompanyBSalaryComparison } from './pages/income-tax/CompanyAVsCompanyBSalaryComparison';
import { SalaryPackagingTaxImpact } from './pages/income-tax/SalaryPackagingTaxImpact';
import { AllowanceTaxabilityChecker } from './pages/income-tax/AllowanceTaxabilityChecker';
import { EmployerTaxBorneCalculator } from './pages/income-tax/EmployerTaxBorneCalculator';
import { NextRinggitTaxedAtCalculator } from './pages/income-tax/NextRinggitTaxedAtCalculator';
import { MonthlyToAnnualTaxConverter } from './pages/income-tax/MonthlyToAnnualTaxConverter';
import { PayslipBreakdownCalculator } from './pages/income-tax/PayslipBreakdownCalculator';

import { AboutUs } from './pages/legal/AboutUs';
import { PrivacyPolicy } from './pages/legal/PrivacyPolicy';
import { TermsOfService } from './pages/legal/TermsOfService';
import { Disclaimer } from './pages/legal/Disclaimer';
import { Contact } from './pages/legal/Contact';
import { Methodology } from './pages/legal/Methodology';
import { ReferenceTables } from './pages/legal/ReferenceTables';
import { TaxFilingGuide } from './pages/legal/TaxFilingGuide';

import { AuthProvider } from './contexts/AuthContext';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-6xl font-bold text-gray-300 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-8">The calculator or page you're looking for doesn't exist or may have moved.</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/test" element={<TestPage />} />

        <Route path="/finance/income-tax-calculator-malaysia" element={<IncomeTaxCalculator />} />
        <Route path="/finance/epf-calculator-malaysia" element={<EPFCalculator />} />
        <Route path="/finance/socso-calculator-malaysia" element={<SOCSOCalculator />} />
        <Route path="/finance/unified-payroll-calculator-malaysia" element={<UnifiedPayrollCalculator />} />
        <Route path="/finance/loan-eligibility-calculator-malaysia" element={<LoanEligibilityCalculator />} />
        <Route path="/finance/personal-loan-calculator-malaysia" element={<PersonalLoanCalculator />} />
        <Route path="/finance/mortgage-calculator-malaysia" element={<MortgageCalculator />} />

        <Route path="/property/stamp-duty-calculator-malaysia" element={<StampDutyCalculator />} />
        <Route path="/property/rpgt-calculator-malaysia" element={<RPGTCalculator />} />
        <Route path="/property/rental-yield-calculator-malaysia" element={<RentalYieldCalculator />} />

        <Route path="/automotive/car-loan-calculator-malaysia" element={<CarLoanCalculator />} />
        <Route path="/automotive/road-tax-calculator-malaysia" element={<RoadTaxCalculator />} />

        <Route path="/islamic-finance/zakat-calculator-malaysia" element={<ZakatCalculator />} />

        <Route path="/life/retirement-calculator-malaysia" element={<RetirementCalculator />} />
        <Route path="/life/inflation-calculator-malaysia" element={<InflationCalculator />} />
        <Route path="/life/net-worth-calculator-malaysia" element={<NetWorthCalculator />} />

        <Route path="/income-tax-malaysia/annual-tax-calculator" element={<AnnualTaxCalculator />} />
        <Route path="/income-tax-malaysia/take-home-pay-calculator" element={<TakeHomePayCalculator />} />
        <Route path="/income-tax-malaysia/pcb-calculator" element={<PCBCalculator />} />
        <Route path="/income-tax-malaysia/net-salary-calculator" element={<NetSalaryCalculator />} />
        <Route path="/income-tax-malaysia/gross-to-net-calculator" element={<GrossToNetCalculator />} />
        <Route path="/income-tax-malaysia/mtd-calculator" element={<MtdCalculator />} />
        <Route path="/income-tax-malaysia/tax-refund-calculator" element={<TaxRefundCalculator />} />
        <Route path="/income-tax-malaysia/over-under-mtd-detector" element={<OverUnderMtdDetector />} />
        <Route path="/income-tax-malaysia/ytd-tax-tracker" element={<YtdTaxTracker />} />
        <Route path="/income-tax-malaysia/tax-bracket-calculator" element={<TaxBracketCalculator />} />
        <Route path="/income-tax-malaysia/bonus-tax-calculator" element={<BonusTaxCalculator />} />
        <Route path="/income-tax-malaysia/commission-tax-calculator" element={<CommissionTaxCalculator />} />
        <Route path="/income-tax-malaysia/overtime-tax-calculator" element={<OvertimeTaxCalculator />} />
        <Route path="/income-tax-malaysia/13th-month-salary-tax" element={<ThirteenthMonthSalaryTax />} />
        <Route path="/income-tax-malaysia/salary-increment-tax-impact" element={<SalaryIncrementTaxImpact />} />
        <Route path="/income-tax-malaysia/salary-offer-net-calculator" element={<SalaryOfferNetCalculator />} />
        <Route path="/income-tax-malaysia/bonus-vs-salary-comparison" element={<BonusVsSalaryComparison />} />
        <Route path="/income-tax-malaysia/job-switch-tax-calculator" element={<JobSwitchTaxCalculator />} />
        <Route path="/income-tax-malaysia/tp3-income-calculator" element={<Tp3IncomeCalculator />} />
        <Route path="/income-tax-malaysia/resignation-month-tax-calculator" element={<ResignationMonthTaxCalculator />} />
        <Route path="/income-tax-malaysia/new-job-pcb-estimator" element={<NewJobPcbEstimator />} />
        <Route path="/income-tax-malaysia/unpaid-leave-tax-impact" element={<UnpaidLeaveTaxImpact />} />
        <Route path="/income-tax-malaysia/monthly-tax-planner" element={<MonthlyTaxPlanner />} />
        <Route path="/income-tax-malaysia/tax-provision-calculator" element={<TaxProvisionCalculator />} />
        <Route path="/income-tax-malaysia/effective-tax-rate-calculator" element={<EffectiveTaxRateCalculator />} />
        <Route path="/income-tax-malaysia/marginal-tax-rate-calculator" element={<MarginalTaxRateCalculator />} />
        <Route path="/income-tax-malaysia/monthly-income-projection" element={<MonthlyIncomeProjection />} />
        <Route path="/income-tax-malaysia/tax-relief-calculator" element={<TaxReliefCalculator />} />
        <Route path="/income-tax-malaysia/lifestyle-relief-calculator" element={<LifestyleReliefCalculator />} />
        <Route path="/income-tax-malaysia/epf-tax-relief-calculator" element={<EpfTaxReliefCalculator />} />
        <Route path="/income-tax-malaysia/prs-tax-relief-calculator" element={<PrsTaxReliefCalculator />} />
        <Route path="/income-tax-malaysia/zakat-tax-rebate-calculator" element={<ZakatTaxRebateCalculator />} />
        <Route path="/income-tax-malaysia/insurance-relief-calculator" element={<InsuranceReliefCalculator />} />
        <Route path="/income-tax-malaysia/non-resident-tax-calculator" element={<NonResidentTaxCalculator />} />
        <Route path="/income-tax-malaysia/residency-days-calculator" element={<ResidencyDaysCalculator />} />
        <Route path="/income-tax-malaysia/resident-vs-nonresident-tax-comparison" element={<ResidentVsNonresidentTaxComparison />} />
        <Route path="/income-tax-malaysia/expat-net-pay-calculator" element={<ExpatNetPayCalculator />} />
        <Route path="/income-tax-malaysia/freelancer-tax-calculator" element={<FreelancerTaxCalculator />} />
        <Route path="/income-tax-malaysia/rental-income-tax-calculator" element={<RentalIncomeTaxCalculator />} />
        <Route path="/income-tax-malaysia/side-income-tax-set-aside" element={<SideIncomeTaxSetAside />} />
        <Route path="/income-tax-malaysia/grab-driver-tax-calculator" element={<GrabDriverTaxCalculator />} />
        <Route path="/income-tax-malaysia/shopee-seller-tax-calculator" element={<ShopeeSellerTaxCalculator />} />
        <Route path="/income-tax-malaysia/raise-negotiation-calculator" element={<RaiseNegotiationCalculator />} />
        <Route path="/income-tax-malaysia/company-a-vs-company-b-salary-comparison" element={<CompanyAVsCompanyBSalaryComparison />} />
        <Route path="/income-tax-malaysia/salary-packaging-tax-impact" element={<SalaryPackagingTaxImpact />} />
        <Route path="/income-tax-malaysia/allowance-taxability-checker" element={<AllowanceTaxabilityChecker />} />
        <Route path="/income-tax-malaysia/employer-tax-borne-calculator" element={<EmployerTaxBorneCalculator />} />
        <Route path="/income-tax-malaysia/next-ringgit-taxed-at-calculator" element={<NextRinggitTaxedAtCalculator />} />
        <Route path="/income-tax-malaysia/monthly-to-annual-tax-converter" element={<MonthlyToAnnualTaxConverter />} />
        <Route path="/income-tax-malaysia/payslip-breakdown-calculator" element={<PayslipBreakdownCalculator />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/reference-tables" element={<ReferenceTables />} />
        <Route path="/tax-filing-guide" element={<TaxFilingGuide />} />
        <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
