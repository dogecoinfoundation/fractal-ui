-- CreateTable
CREATE TABLE "Mint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB NOT NULL,
    "fraction_count" INTEGER NOT NULL,
    "hash" TEXT NOT NULL,
    "feed_url" TEXT NOT NULL,
    "block_height" INTEGER NOT NULL,
    "transaction_hash" TEXT
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Config" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MintToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MintToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Mint" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MintToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Config_key_key" ON "Config"("key");

-- CreateIndex
CREATE UNIQUE INDEX "_MintToTag_AB_unique" ON "_MintToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_MintToTag_B_index" ON "_MintToTag"("B");
