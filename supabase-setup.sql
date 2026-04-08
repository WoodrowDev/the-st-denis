-- St. Denis Mailing List Table Setup
-- Run this SQL in your Supabase SQL Editor

-- Create the mailing_list table
CREATE TABLE IF NOT EXISTS mailing_list (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  verified BOOLEAN DEFAULT false,
  subscribed BOOLEAN DEFAULT true
);

-- Add index for email lookups to improve performance
CREATE INDEX IF NOT EXISTS idx_mailing_list_email ON mailing_list(email);

-- Add index for created_at to sort by signup date
CREATE INDEX IF NOT EXISTS idx_mailing_list_created_at ON mailing_list(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE mailing_list ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public to insert emails" ON mailing_list;
DROP POLICY IF EXISTS "Allow public to read emails" ON mailing_list;

-- Create policy to allow anyone to insert emails (for the signup form)
CREATE POLICY "Allow public to insert emails" ON mailing_list
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow anyone to read emails (to check for duplicates)
-- Note: In production, you might want to restrict this to authenticated users only
CREATE POLICY "Allow public to read emails" ON mailing_list
  FOR SELECT
  USING (true);

-- Optional: Add a comment to the table
COMMENT ON TABLE mailing_list IS 'Stores email addresses for the St. Denis mailing list';

-- Optional: View to see statistics (run separately if needed)
CREATE OR REPLACE VIEW mailing_list_stats AS
SELECT 
  COUNT(*) as total_subscribers,
  COUNT(*) FILTER (WHERE verified = true) as verified_subscribers,
  COUNT(*) FILTER (WHERE subscribed = true) as active_subscribers,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') as subscribers_last_7_days,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') as subscribers_last_30_days
FROM mailing_list;
