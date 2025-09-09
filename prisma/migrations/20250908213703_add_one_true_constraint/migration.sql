-- -- This ensures only one row can have active = true
CREATE UNIQUE INDEX one_active_wallet
ON "Wallet" ((true))
WHERE "active" = true;

WITH first_wallet AS (
  SELECT privateKey FROM "Wallet"
  ORDER BY privateKey ASC
  LIMIT 1
)
UPDATE "Wallet"
SET "active" = (privateKey = (SELECT privateKey FROM first_wallet));
