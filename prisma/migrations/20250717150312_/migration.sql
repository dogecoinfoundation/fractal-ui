-- CreateTable
CREATE TABLE "WalletConfig" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "private_key" TEXT NOT NULL,
    "public_key" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "label" TEXT NOT NULL
);
