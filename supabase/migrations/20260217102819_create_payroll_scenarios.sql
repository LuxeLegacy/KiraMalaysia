/*
  # Create Payroll Scenarios Table

  ## Overview
  This migration creates a table to store saved payroll calculation scenarios for users.
  Allows users to save, compare, and track different salary scenarios over time.

  ## New Tables
  - `payroll_scenarios`
    - `id` (uuid, primary key) - Unique identifier for each scenario
    - `user_id` (uuid, nullable) - Optional user ID for authenticated users
    - `scenario_name` (text) - User-provided name for the scenario
    - `monthly_salary` (decimal) - Monthly gross salary
    - `age` (integer) - Employee age
    - `epf_voluntary` (decimal) - Voluntary EPF contribution
    - `socso_category` (integer) - SOCSO category (1 or 2)
    - `years_to_retirement` (integer) - Years until retirement
    - `current_epf_balance` (decimal) - Current EPF balance
    - `expected_dividend_rate` (decimal) - Expected EPF dividend rate
    - `salary_growth_rate` (decimal) - Expected annual salary growth rate
    - `employee_count` (integer) - Number of employees (for employers)
    - `created_at` (timestamptz) - Timestamp when scenario was created
    - `updated_at` (timestamptz) - Timestamp when scenario was last updated

  ## Security
  - Enable RLS on `payroll_scenarios` table
  - Allow anonymous users to create scenarios (user_id can be null)
  - Authenticated users can read their own scenarios
  - Authenticated users can update/delete their own scenarios
  - Anonymous users can only create but not read back (no user_id to match)

  ## Notes
  - Scenarios without user_id are one-time calculations, not retrievable
  - Authenticated users get full CRUD on their scenarios
  - All monetary values stored as decimal for precision
*/

CREATE TABLE IF NOT EXISTS payroll_scenarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_name text NOT NULL DEFAULT 'Unnamed Scenario',
  monthly_salary decimal NOT NULL,
  age integer NOT NULL,
  epf_voluntary decimal DEFAULT 0,
  socso_category integer NOT NULL DEFAULT 1,
  years_to_retirement integer NOT NULL DEFAULT 30,
  current_epf_balance decimal DEFAULT 0,
  expected_dividend_rate decimal DEFAULT 5.5,
  salary_growth_rate decimal DEFAULT 3,
  employee_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE payroll_scenarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create scenarios"
  ON payroll_scenarios
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own scenarios"
  ON payroll_scenarios
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own scenarios"
  ON payroll_scenarios
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own scenarios"
  ON payroll_scenarios
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_payroll_scenarios_user_id ON payroll_scenarios(user_id);
CREATE INDEX IF NOT EXISTS idx_payroll_scenarios_created_at ON payroll_scenarios(created_at DESC);
