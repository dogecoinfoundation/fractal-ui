/*
  Warnings:

  - Added the required column `name` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallet" (
    "name" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Wallet" ("active", "address", "privateKey") SELECT "active", "address", "privateKey" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
CREATE UNIQUE INDEX "Wallet_name_key" ON "Wallet"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
