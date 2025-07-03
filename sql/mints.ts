export const mintsTableSql = `
  CREATE TABLE IF NOT EXISTS mints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    metadata TEXT NOT NULL,
    fraction_count INTEGER NOT NULL DEFAULT 0,
    hash TEXT NULL,
    feed_url TEXT NOT NULL,
    block_height INTEGER NOT NULL DEFAULT 0,
    tags TEXT NOT NULL DEFAULT '[]',
    transaction_hash TEXT NULL,
    owner_address TEXT NULL
  );
`;

export const mintsDataSql = `
  INSERT OR IGNORE INTO mints (
    title,
    description,
    created_at,
    metadata,
    fraction_count,
    hash,
    feed_url,
    block_height,
    tags,
    transaction_hash
  ) VALUES (
    'Automobile Asset',
    'A sample automobile asset for testing purposes.',
    '2023-06-12 12:34:20',
    '{"type": "car", "make": "DeLorean", "model": "DMC-12", "year": 1981, "vin": "1234567890"}',
    10000,
    'd61a1a36598dab02848342e9d4b6cc20',
    'https://example.com/car/123',
    1234,
    '["test", "sample", "automobile"]',
    '756a60fa150d408658e821fcbb4f3f84'
  ),
  (
    'Trading Card Asset',
    'A sample trading card asset for testing purposes.',
    '2019-10-31 19:45:01',
    '{"type": "trading_card", "category": "Pokemon", "name": "Pikachu", "rarity": "common", "set": "Pokémon TCG"}',
    100,
    '9c3061475e1b64c7abb9514043e647da',
    'https://example.com/tcg/pikachu',
    45,
    '["test", "sample", "trading_card"]',
    'f81f44c532faca57f208946909a5a163'
  ),
  (
    'Property Asset',
    'A sample property asset for testing purposes.',
    '2024-02-20 10:20:30',
    '{"type": "property", "category": "House", "address": "123 Main St, Anytown, USA", "city": "Anytown", "state": "CA", "zip": "12345", "country": "USA"}',
    1000000,
    'a1e48d1794aaa2a78f54c88d2097d76b',
    'https://example.com/property/house',
    6789,
    '["test", "sample", "property"]',
    'c8bdb418b11fb95edfb9197987b4a3ed'
  );
`;
