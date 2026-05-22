import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not configured. Database features will be disabled.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any;

export interface PayrollScenario {
  id?: string;
  user_id?: string | null;
  scenario_name: string;
  monthly_salary: number;
  age: number;
  epf_voluntary: number;
  socso_category: number;
  years_to_retirement: number;
  current_epf_balance: number;
  expected_dividend_rate: number;
  salary_growth_rate: number;
  employee_count: number;
  created_at?: string;
  updated_at?: string;
}

export async function saveScenario(scenario: PayrollScenario): Promise<{ data: PayrollScenario | null; error: any }> {
  if (!supabase) {
    return { data: null, error: new Error('Database not configured') };
  }

  const { data, error } = await supabase
    .from('payroll_scenarios')
    .insert([scenario])
    .select()
    .maybeSingle();

  return { data, error };
}

export async function loadScenarios(): Promise<{ data: PayrollScenario[] | null; error: any }> {
  if (!supabase) {
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from('payroll_scenarios')
    .select('*')
    .order('created_at', { ascending: false });

  return { data, error };
}

export async function updateScenario(id: string, scenario: Partial<PayrollScenario>): Promise<{ data: PayrollScenario | null; error: any }> {
  if (!supabase) {
    return { data: null, error: new Error('Database not configured') };
  }

  const { data, error } = await supabase
    .from('payroll_scenarios')
    .update({ ...scenario, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .maybeSingle();

  return { data, error };
}

export async function deleteScenario(id: string): Promise<{ error: any }> {
  if (!supabase) {
    return { error: new Error('Database not configured') };
  }

  const { error } = await supabase
    .from('payroll_scenarios')
    .delete()
    .eq('id', id);

  return { error };
}
