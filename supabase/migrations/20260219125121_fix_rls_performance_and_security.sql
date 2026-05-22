/*
  # Fix RLS Performance and Security Issues

  ## Overview
  This migration addresses critical security and performance issues identified in the database audit.

  ## Changes Made

  ### 1. RLS Performance Optimization
  - Optimize all RLS policies on `payroll_scenarios` table to use `(select auth.uid())` instead of `auth.uid()`
  - This prevents re-evaluation of auth.uid() for each row, significantly improving query performance at scale

  ### 2. Security Improvements
  - Replace the overly permissive "Anyone can create scenarios" policy
  - Add proper authentication check for INSERT operations
  - Ensure only authenticated users can create scenarios linked to their user_id
  - Allow anonymous users to create scenarios only with NULL user_id (one-time calculations)

  ### 3. Index Cleanup
  - Remove unused indexes that add overhead without providing benefit
  - Keep essential indexes for actual query patterns

  ## Security Notes
  - All policies now properly restrict access based on user authentication
  - Anonymous users can only create temporary scenarios (no user_id)
  - Authenticated users have full CRUD on their own scenarios
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create scenarios" ON payroll_scenarios;
DROP POLICY IF EXISTS "Users can read own scenarios" ON payroll_scenarios;
DROP POLICY IF EXISTS "Users can update own scenarios" ON payroll_scenarios;
DROP POLICY IF EXISTS "Users can delete own scenarios" ON payroll_scenarios;

-- Create optimized and secure policies using (select auth.uid())

-- Allow authenticated users to create scenarios linked to their user_id
-- Allow anonymous users to create scenarios with NULL user_id only
CREATE POLICY "Users can create own scenarios"
  ON payroll_scenarios
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "Anonymous can create temporary scenarios"
  ON payroll_scenarios
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Optimized SELECT policy
CREATE POLICY "Users can read own scenarios"
  ON payroll_scenarios
  FOR SELECT
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Optimized UPDATE policy
CREATE POLICY "Users can update own scenarios"
  ON payroll_scenarios
  FOR UPDATE
  TO authenticated
  USING (user_id = (select auth.uid()))
  WITH CHECK (user_id = (select auth.uid()));

-- Optimized DELETE policy
CREATE POLICY "Users can delete own scenarios"
  ON payroll_scenarios
  FOR DELETE
  TO authenticated
  USING (user_id = (select auth.uid()));

-- Drop unused indexes
DROP INDEX IF EXISTS idx_payroll_scenarios_user_id;
DROP INDEX IF EXISTS idx_payroll_scenarios_created_at;
DROP INDEX IF EXISTS idx_categories_slug;
DROP INDEX IF EXISTS idx_calculators_slug;
DROP INDEX IF EXISTS idx_calculators_category_id;
DROP INDEX IF EXISTS idx_calculators_priority_rank;
DROP INDEX IF EXISTS idx_calculator_links_from;
DROP INDEX IF EXISTS idx_calculator_links_to;

-- Recreate only essential indexes based on actual query patterns
-- Index for user-specific queries (most common pattern)
CREATE INDEX IF NOT EXISTS idx_payroll_scenarios_user_id_created 
  ON payroll_scenarios(user_id, created_at DESC) 
  WHERE user_id IS NOT NULL;
