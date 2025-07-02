CREATE TABLE IF NOT EXISTS mints (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  metadata TEXT NOT NULL,
  fraction_count INTEGER NOT NULL DEFAULT 0,
  hash TEXT NOT NULL,
  feed_url TEXT NOT NULL,
  block_height INTEGER NOT NULL DEFAULT 0,
  tags TEXT NOT NULL DEFAULT '[]',
  transaction_hash TEXT NULL
);