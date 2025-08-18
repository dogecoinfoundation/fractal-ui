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

export const CONFIG_KEYS = [
  "timezone",
  "connection_host",
  "connection_port",
  "connection_authentication_token",
] as const;

export const CONFIG_GROUPS: Record<string, (typeof CONFIG_KEYS)[number][]> = {
  timezone: ["timezone"],
  connection: [
    "connection_host",
    "connection_port",
    "connection_authentication_token",
  ],
};
