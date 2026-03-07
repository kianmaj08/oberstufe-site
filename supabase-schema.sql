-- ============================================================
-- oberstufe.site – Supabase Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Projects table
CREATE TABLE projects (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  content     TEXT NOT NULL DEFAULT '',
  slug        TEXT NOT NULL UNIQUE,
  image_url   TEXT,
  tags        TEXT[] NOT NULL DEFAULT '{}',
  links       JSONB NOT NULL DEFAULT '[]',
  members     JSONB NOT NULL DEFAULT '[]',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_slug    ON projects(slug);
CREATE INDEX idx_projects_order   ON projects("order");
CREATE INDEX idx_projects_featured ON projects(is_featured);

-- FAQ items table
CREATE TABLE faq_items (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  "order"    INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Planned improvements table
CREATE TABLE planned_improvements (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT NOT NULL DEFAULT 'planned'
                CHECK (status IN ('planned', 'in_progress', 'completed')),
  "order"     INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Site content table (key-value store)
CREATE TABLE site_content (
  key        TEXT PRIMARY KEY,
  value      TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Default site content
INSERT INTO site_content (key, value) VALUES
  ('site_title',    'oberstufe.site'),
  ('site_subtitle', 'Eine Sammlung von Projekten'),
  ('about_text',    'Hier findest du eine Sammlung von Projekten aus der Oberstufe.'),
  ('footer_text',   '© 2025 oberstufe.site');

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE projects              ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_items             ENABLE ROW LEVEL SECURITY;
ALTER TABLE planned_improvements  ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content          ENABLE ROW LEVEL SECURITY;

-- Public read policies (anon key)
CREATE POLICY "Public read projects"          ON projects             FOR SELECT USING (true);
CREATE POLICY "Public read faq"               ON faq_items            FOR SELECT USING (true);
CREATE POLICY "Public read improvements"      ON planned_improvements FOR SELECT USING (true);
CREATE POLICY "Public read site_content"      ON site_content         FOR SELECT USING (true);

-- All writes use SUPABASE_SERVICE_ROLE_KEY (bypasses RLS) – no write policies needed

-- ============================================================
-- Storage (run separately or use Supabase Dashboard)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('project-images', 'project-images', TRUE);
--
-- CREATE POLICY "Public read images"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'project-images');
