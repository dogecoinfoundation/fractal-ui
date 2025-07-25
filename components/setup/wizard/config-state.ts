import type { Config } from "@/generated/prisma";
import { CONFIG_GROUPS } from "@/lib/definitions";

export type ConfigState = Record<keyof typeof CONFIG_GROUPS, boolean>;

export type ConfigStateWithLoading = {
  configState: ConfigState;
  isLoading: boolean;
};

export const getConfigState = (configData: Config[]): ConfigState => {
  const state: ConfigState = {};

  Object.keys(CONFIG_GROUPS).forEach((group) => {
    CONFIG_GROUPS[group].forEach((key) => {
      const config = configData.find((c) => c.key === key);
      state[group] = Boolean(config);
    });
  });

  return state;
};
