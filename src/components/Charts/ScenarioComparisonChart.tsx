import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../lib/formatters';

interface ScenarioComparisonChartProps {
  currentSalary: number;
  currentTakeHome: number;
  currentEmployerCost: number;
  currentRetirement: number;
  scenarioSalary: number;
  scenarioTakeHome: number;
  scenarioEmployerCost: number;
  scenarioRetirement: number;
}

export function ScenarioComparisonChart({
  currentSalary,
  currentTakeHome,
  currentEmployerCost,
  currentRetirement,
  scenarioSalary,
  scenarioTakeHome,
  scenarioEmployerCost,
  scenarioRetirement,
}: ScenarioComparisonChartProps) {
  const data = [
    {
      name: 'Gross Salary',
      current: currentSalary,
      scenario: scenarioSalary,
    },
    {
      name: 'Take-Home',
      current: currentTakeHome,
      scenario: scenarioTakeHome,
    },
    {
      name: 'Employer Cost',
      current: currentEmployerCost,
      scenario: scenarioEmployerCost,
    },
    {
      name: 'Retirement (÷1000)',
      current: currentRetirement / 1000,
      scenario: scenarioRetirement / 1000,
    },
  ];

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis
            tickFormatter={(value) => `RM ${value.toLocaleString()}`}
            stroke="#6b7280"
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              const label = data.find(d => d.name.includes('Retirement')) ? name : name;
              const multiplier = label.includes('Retirement') ? 1000 : 1;
              return [formatCurrency(value * multiplier), label];
            }}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
          />
          <Legend />
          <Bar dataKey="current" fill="#3b82f6" name="Current Scenario" />
          <Bar dataKey="scenario" fill="#8b5cf6" name="Alternative Scenario" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
