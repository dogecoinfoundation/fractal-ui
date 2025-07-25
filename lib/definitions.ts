export const CONFIG_KEYS = [
  "timezone",
  "connection_host",
  "connection_port",
  "connection_token",
] as const;

export const CONFIG_GROUPS: Record<string, (typeof CONFIG_KEYS)[number][]> = {
  timezone: ["timezone"],
  connection: ["connection_host", "connection_port", "connection_token"],
};
