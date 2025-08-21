/*
  Warnings:

  - Added the required column `address` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallet" (
    "privateKey" TEXT NOT NULL PRIMARY KEY,
    "address" TEXT NOT NULL
);
INSERT INTO "new_Wallet" ("privateKey") SELECT "privateKey" FROM "Wallet";
DROP TABLE "Wallet";
ALTER TABLE "new_Wallet" RENAME TO "Wallet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
