import type { Config } from "@/generated/prisma";
import { CONFIG_KEYS } from "@/lib/definitions";

export const validateConfigRows = (configData: Config[]): boolean => {
  if (configData.length !== CONFIG_KEYS.length) return false;

  return configData.every((config) =>
    CONFIG_KEYS.includes(config.key as (typeof CONFIG_KEYS)[number]),
  );
};
