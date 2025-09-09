-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallet" (
    "privateKey" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Wallet" ("address", "privateKey") SELECT "address", "privateKey" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
