import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../../lib/formatters';

interface DeductionBreakdownChartProps {
  epfEmployee: number;
  socsoEmployee: number;
  eisEmployee: number;
  netTakeHome: number;
}

const COLORS = {
  epf: '#3b82f6',
  socso: '#10b981',
  eis: '#f59e0b',
  takeHome: '#6366f1',
};

export function DeductionBreakdownChart({
  epfEmployee,
  socsoEmployee,
  eisEmployee,
  netTakeHome,
}: DeductionBreakdownChartProps) {
  const data = [
    { name: 'EPF Deduction', value: epfEmployee, color: COLORS.epf },
    { name: 'SOCSO Deduction', value: socsoEmployee, color: COLORS.socso },
    { name: 'EIS Deduction', value: eisEmployee, color: COLORS.eis },
    { name: 'Net Take-Home', value: netTakeHome, color: COLORS.takeHome },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
