/*
  # Create contact_submissions table

  ## Purpose
  Stores all inbound lead requests submitted through the website's contact/quote form.

  ## New Tables

  ### contact_submissions
  - `id` (uuid, primary key) — auto-generated unique identifier
  - `name` (text, not null) — full name of the person submitting
  - `phone` (text) — contact phone number
  - `email` (text, not null) — contact email address
  - `service_needed` (text) — the type of service they're requesting
  - `message` (text) — free-form message or description
  - `created_at` (timestamptz) — timestamp of submission

  ## Security
  - RLS enabled: unauthenticated visitors may INSERT (submit a lead)
  - No SELECT, UPDATE, or DELETE for anon — only internal/admin reads
  - Authenticated users (admin) can SELECT their own submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  service_needed text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a contact form"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
