-- Create participants table for church event registration
CREATE TABLE IF NOT EXISTS participants (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  full_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  in_connect_group BOOLEAN NOT NULL DEFAULT false,
  connect_group TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_participants_created_at ON participants(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for registration)
CREATE POLICY "Allow public insert" ON participants
  FOR INSERT
  WITH CHECK (true);

-- Allow SELECT for viewing data (optional - set to false if you want admin-only access)
CREATE POLICY "Allow public read" ON participants
  FOR SELECT
  USING (true);
