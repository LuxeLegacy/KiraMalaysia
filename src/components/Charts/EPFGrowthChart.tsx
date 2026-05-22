import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../lib/formatters';

interface EPFGrowthChartProps {
  currentBalance: number;
  yearsToRetirement: number;
  monthlyContribution: number;
  dividendRate: number;
  salaryGrowthRate: number;
}

export function EPFGrowthChart({
  currentBalance,
  yearsToRetirement,
  monthlyContribution,
  dividendRate,
  salaryGrowthRate,
}: EPFGrowthChartProps) {
  const data = [];
  let balance = currentBalance;
  let currentMonthlyContribution = monthlyContribution;

  data.push({
    year: 0,
    balance: currentBalance,
    contributions: 0,
    dividends: 0,
  });

  for (let year = 1; year <= yearsToRetirement; year++) {
    const yearlyContribution = currentMonthlyContribution * 12;
    const yearlyDividend = (balance + yearlyContribution / 2) * (dividendRate / 100);

    balance += yearlyContribution + yearlyDividend;

    data.push({
      year,
      balance: Math.round(balance),
      contributions: Math.round(balance - currentBalance - (yearlyDividend * year)),
      dividends: Math.round(balance - currentBalance - yearlyContribution * year),
    });

    currentMonthlyContribution *= (1 + salaryGrowthRate / 100);
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            label={{ value: 'Years from Now', position: 'insideBottom', offset: -5 }}
            stroke="#6b7280"
          />
          <YAxis
            tickFormatter={(value) => `RM ${(value / 1000).toFixed(0)}k`}
            stroke="#6b7280"
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#2563eb"
            strokeWidth={3}
            name="Total EPF Balance"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
