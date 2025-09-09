import { Mint } from "@/app/api/mints/route";

export const PAGE_SIZE = 9;

export type Invoice = {
  id: string;
  hash: string;
  mint_hash: string;
  quantity: number;
  price: number;
  buyer_address: string;
  created_at: string;
  seller_address: string;
  public_key: string;
};

export type MintsResponse = {
  mints: Mint[];
  total: number;
  page: number;
};

export type MintWithBalanceResponse = {
  mints: MintWithBalance[];
  total: number;
  page: number;
};

export type MintWithBalance = Mint & {
  address: string;
  quantity: number;
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
