/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MintToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Tag_name_key";

-- DropIndex
DROP INDEX "_MintToTag_B_index";

-- DropIndex
DROP INDEX "_MintToTag_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Tag";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MintToTag";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL,
    "fraction_count" INTEGER NOT NULL,
    "hash" TEXT,
    "feed_url" TEXT NOT NULL,
    "block_height" INTEGER,
    "transaction_hash" TEXT
);
INSERT INTO "new_Mint" ("block_height", "created_at", "description", "feed_url", "fraction_count", "hash", "id", "metadata", "title", "transaction_hash") SELECT "block_height", "created_at", "description", "feed_url", "fraction_count", "hash", "id", "metadata", "title", "transaction_hash" FROM "Mint";
DROP TABLE "Mint";
ALTER TABLE "new_Mint" RENAME TO "Mint";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
