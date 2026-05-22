/*
  # Add anonymous read policy for payroll scenarios

  1. Security Changes
    - Add policy to allow anonymous users to query payroll_scenarios table
    - Anonymous users will receive empty results due to user_id check
    - This prevents errors when loading the page without authentication

  2. Notes
    - This doesn't expose any data to anonymous users
    - It simply allows the query to execute without throwing an error
    - Actual data access is still controlled by the existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'payroll_scenarios' 
    AND policyname = 'Allow anonymous reads'
  ) THEN
    CREATE POLICY "Allow anonymous reads"
      ON payroll_scenarios
      FOR SELECT
      TO anon
      USING (false);
  END IF;
END $$;