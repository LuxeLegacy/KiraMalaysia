/*
  # Create password reset tokens table

  1. New Tables
    - `password_reset_tokens`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `token_hash` (text, unique) - SHA256 hash of the reset token
      - `expires_at` (timestamptz) - Token expiration time (1 hour from creation)
      - `used_at` (timestamptz, nullable) - When the token was used
      - `created_at` (timestamptz) - Token creation time

  2. Security
    - Enable RLS on `password_reset_tokens` table
    - No public access - tokens are managed server-side only
    - Tokens expire after 1 hour
    - Tokens are single-use only

  3. Functions
    - Create function to clean up expired tokens
*/

-- Create password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '1 hour'),
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- No policies - tokens are managed through service role only for security
-- This prevents users from accessing or manipulating tokens directly

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_hash ON password_reset_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);

-- Function to clean up expired tokens (can be called periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_reset_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM password_reset_tokens
  WHERE expires_at < now() OR used_at IS NOT NULL;
END;
$$;