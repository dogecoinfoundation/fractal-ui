import type { Mint } from "@/generated/prisma";

export const PAGE_SIZE = 9;

export type Invoice = {
  id: string;
  invoiceHash: string;
  mintHash: string;
  quantity: number;
  price: number;
  buyerAddress: string;
  createdAt: string;
  sellerAddress: string;
  publicKey: string;
};

export type MintsResponse = {
  mints: Mint[];
  total: number;
  page: number;
};

export type MintWithBalance = Mint & { balance: number };

export type TokensResponse = {
  mints: MintWithBalance[];
  total: number;
  page: number;
};

export const CONFIG_KEYS = [
  "timezone",
  "fractal_engine_url",
  "indexer_url",
] as const;

export const CONFIG_GROUPS: Record<string, (typeof CONFIG_KEYS)[number][]> = {
  timezone: ["timezone"],
  connection: ["fractal_engine_url", "indexer_url"],
};
