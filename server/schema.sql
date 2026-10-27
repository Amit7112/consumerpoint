CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  kind TEXT NOT NULL CHECK(kind IN ('contact', 'service', 'amc', 'partnership', 'career')),
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'reviewing', 'closed')),
  ciphertext BLOB NOT NULL,
  iv BLOB NOT NULL,
  auth_tag BLOB NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  consent_version TEXT NOT NULL DEFAULT '2026-01'
);
CREATE INDEX IF NOT EXISTS enquiries_created_at ON enquiries(created_at);

CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  service TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  verified INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('published', 'hidden'))
);
CREATE INDEX IF NOT EXISTS feedback_created_at ON feedback(created_at);
CREATE INDEX IF NOT EXISTS feedback_status ON feedback(status);