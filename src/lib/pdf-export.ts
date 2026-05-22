import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatCurrency } from './formatters';
import type { UnifiedPayrollInputs, UnifiedPayrollResult, RetirementProjection, ProtectionAnalysis } from './unified-payroll';

export async function generatePDFReport(
  inputs: UnifiedPayrollInputs,
  result: UnifiedPayrollResult,
  retirement: RetirementProjection,
  protection: ProtectionAnalysis,
  insights: string[]
): Promise<void> {
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let yPos = margin;

  const addNewPageIfNeeded = (requiredSpace: number) => {
    if (yPos + requiredSpace > pageHeight - margin) {
      pdf.addPage();
      yPos = margin;
      return true;
    }
    return false;
  };

  pdf.setFontSize(20);
  pdf.setTextColor(31, 41, 55);
  pdf.text('Malaysia Unified Payroll Report', margin, yPos);
  yPos += 10;

  pdf.setFontSize(10);
  pdf.setTextColor(107, 114, 128);
  pdf.text(`Generated: ${new Date().toLocaleDateString('en-MY')}`, margin, yPos);
  yPos += 15;

  pdf.setFontSize(14);
  pdf.setTextColor(31, 41, 55);
  pdf.text('Salary Overview', margin, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(55, 65, 81);
  const overviewData = [
    ['Monthly Gross Salary:', formatCurrency(inputs.monthlySalary)],
    ['Age:', `${inputs.age} years`],
    ['SOCSO Category:', `Category ${inputs.socsoCategory}`],
    ['Years to Retirement:', `${inputs.yearsToRetirement} years`],
  ];

  overviewData.forEach(([label, value]) => {
    pdf.text(label, margin, yPos);
    pdf.text(value, margin + 60, yPos);
    yPos += 6;
  });

  yPos += 10;
  addNewPageIfNeeded(60);

  pdf.setFontSize(14);
  pdf.setTextColor(31, 41, 55);
  pdf.text('Statutory Contributions', margin, yPos);
  yPos += 8;

  pdf.setFontSize(11);
  pdf.setTextColor(37, 99, 235);
  pdf.text('EPF (Employees Provident Fund)', margin, yPos);
  yPos += 6;

  pdf.setFontSize(10);
  pdf.setTextColor(55, 65, 81);
  const epfData = [
    ['Employee Contribution:', `${formatCurrency(result.epf.employeeContribution)} (${result.epf.employeeRate}%)`],
    ['Employer Contribution:', `${formatCurrency(result.epf.employerContribution)} (${result.epf.employerRate}%)`],
    ['Voluntary Contribution:', formatCurrency(result.epf.voluntaryContribution)],
    ['Total Monthly:', formatCurrency(result.epf.totalMonthly)],
  ];

  epfData.forEach(([label, value]) => {
    pdf.text(label, margin + 5, yPos);
    pdf.text(value, margin + 70, yPos);
    yPos += 6;
  });

  yPos += 5;
  pdf.setFontSize(11);
  pdf.setTextColor(16, 185, 129);
  pdf.text('SOCSO (Social Security)', margin, yPos);
  yPos += 6;

  pdf.setFontSize(10);
  pdf.setTextColor(55, 65, 81);
  const socsoData = [
    ['Employee Contribution:', formatCurrency(result.socso.employeeContribution)],
    ['Employer Contribution:', formatCurrency(result.socso.employerContribution)],
    ['Total Monthly:', formatCurrency(result.socso.totalMonthly)],
  ];

  socsoData.forEach(([label, value]) => {
    pdf.text(label, margin + 5, yPos);
    pdf.text(value, margin + 70, yPos);
    yPos += 6;
  });

  yPos += 5;
  pdf.setFontSize(11);
  pdf.setTextColor(245, 158, 11);
  pdf.text('EIS (Employment Insurance)', margin, yPos);
  yPos += 6;

  pdf.setFontSize(10);
  pdf.setTextColor(55, 65, 81);
  const eisData = [
    ['Employee Contribution:', formatCurrency(result.eis.employeeContribution)],
    ['Employer Contribution:', formatCurrency(result.eis.employerContribution)],
    ['Total Monthly:', formatCurrency(result.eis.totalMonthly)],
  ];

  eisData.forEach(([label, value]) => {
    pdf.text(label, margin + 5, yPos);
    pdf.text(value, margin + 70, yPos);
    yPos += 6;
  });

  yPos += 10;
  addNewPageIfNeeded(50);

  pdf.setFontSize(14);
  pdf.setTextColor(31, 41, 55);
  pdf.text('Payroll Summary', margin, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(55, 65, 81);
  const summaryData = [
    ['Total Employee Deductions:', formatCurrency(result.totalEmployeeDeductions)],
    ['Net Take-Home Pay:', formatCurrency(result.netTakeHome)],
    ['Total Employer Statutory Cost:', formatCurrency(result.totalEmployerCost)],
    ['Total Payroll Cost:', formatCurrency(inputs.monthlySalary + result.totalEmployerCost)],
    ['Effective Deduction Rate:', `${result.effectiveDeductionRate.toFixed(2)}%`],
    ['Effective Employer Rate:', `${result.effectiveEmployerRate.toFixed(2)}%`],
  ];

  summaryData.forEach(([label, value]) => {
    pdf.text(label, margin, yPos);
    pdf.text(value, margin + 70, yPos);
    yPos += 6;
  });

  yPos += 10;
  addNewPageIfNeeded(50);

  pdf.setFontSize(14);
  pdf.setTextColor(31, 41, 55);
  pdf.text('Retirement Projection', margin, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(55, 65, 81);
  const retirementData = [
    ['Projected EPF Balance:', formatCurrency(retirement.projectedBalance)],
    ['Total Contributions:', formatCurrency(retirement.totalContributions)],
    ['Total Dividends Earned:', formatCurrency(retirement.totalDividends)],
    ['Sustainable Monthly Withdrawal:', formatCurrency(retirement.monthlyWithdrawal)],
    ['Years Balance Will Last:', `${retirement.yearsBalanceWillLast} years`],
  ];

  retirementData.forEach(([label, value]) => {
    pdf.text(label, margin, yPos);
    pdf.text(value, margin + 70, yPos);
    yPos += 6;
  });

  yPos += 10;
  addNewPageIfNeeded(50);

  pdf.setFontSize(14);
  pdf.setTextColor(31, 41, 55);
  pdf.text('Social Protection Analysis', margin, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.setTextColor(55, 65, 81);
  const protectionData = [
    ['Protection Score:', `${protection.protectionScore}/100 (${protection.protectionLevel})`],
    ['SOCSO Temporary Disability:', `${formatCurrency(protection.socsoTemporaryDisability)}/month`],
    ['SOCSO Invalidity Pension:', `${formatCurrency(protection.socsoInvalidityPension)}/month`],
    ['EIS Unemployment Benefit:', `${formatCurrency(protection.eisUnemploymentBenefit)}/month`],
    ['EIS Duration:', protection.eisDuration],
    ['Total 10-Year Protection:', formatCurrency(protection.totalProtectionValue)],
  ];

  protectionData.forEach(([label, value]) => {
    pdf.text(label, margin, yPos);
    pdf.text(value, margin + 70, yPos);
    yPos += 6;
  });

  yPos += 10;
  addNewPageIfNeeded(60);

  pdf.setFontSize(14);
  pdf.setTextColor(31, 41, 55);
  pdf.text('Smart Insights', margin, yPos);
  yPos += 8;

  pdf.setFontSize(9);
  pdf.setTextColor(55, 65, 81);
  insights.forEach((insight, index) => {
    addNewPageIfNeeded(15);
    const lines = pdf.splitTextToSize(`${index + 1}. ${insight}`, pageWidth - 2 * margin);
    pdf.text(lines, margin, yPos);
    yPos += lines.length * 5;
  });

  pdf.save(`Malaysia-Payroll-Report-${new Date().toISOString().split('T')[0]}.pdf`);
}

export async function generatePDFWithCharts(elementId: string): Promise<Blob | null> {
  const element = document.getElementById(elementId);
  if (!element) return null;

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth - 20;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 10;

  pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight + 10;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  return pdf.output('blob');
}
