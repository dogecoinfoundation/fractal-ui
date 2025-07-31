import { createContext, useEffect, useState } from "react";
import type { KeyedMutator } from "swr";
import type { Config } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import type { CONFIG_KEYS } from "@/lib/definitions";

type ConfigContextType = {
  configData: Config[];
  loading: boolean;
  error: Error | null;
  refreshConfigData: KeyedMutator<Config[]>;
  setLoading: (loading: boolean) => void;
  getConfigRowByKey: (
    configData: Config[],
    key: (typeof CONFIG_KEYS)[number],
  ) => Config | undefined;
  getConfigRowsByKey: (
    configData: Config[],
    key: string,
    fuzzy?: boolean,
  ) => Config[];
};

const getConfigRowByKey = (
  configData: Config[],
  key: (typeof CONFIG_KEYS)[number],
): Config | undefined => {
  return configData.find((config) => config.key === key);
};

const getConfigRowsByKey = (
  configData: Config[],
  key: string,
  fuzzy: boolean = false,
): Config[] => {
  return configData.filter((config) =>
    fuzzy ? config.key.includes(key) : config.key === key,
  );
};

export const ConfigContext = createContext<ConfigContextType>({
  configData: [],
  loading: false,
  error: null,
  refreshConfigData: () => Promise.resolve([]),
  setLoading: () => {},
  getConfigRowByKey,
  getConfigRowsByKey,
});

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, mutate, error } = useAPI<Config[]>("/api/config");
  const [loading, setLoading] = useState(false);
  const [configData, setConfigData] = useState<Config[]>(data || []);

  useEffect(() => {
    setLoading(isLoading);
    if (data && data.length > 0) setConfigData(data);
  }, [data, isLoading]);

  return (
    <ConfigContext
      value={{
        configData,
        loading,
        error,
        setLoading,
        refreshConfigData: mutate,
        getConfigRowByKey,
        getConfigRowsByKey,
      }}
    >
      {children}
    </ConfigContext>
  );
};
