import { useState } from "react";

type TestResult = {
  status: number;
  message: string;
};

export const useTestConnection = () => {
  const [result, setResult] = useState<TestResult | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const testConnection = async (
    host: string,
    port: number,
    authenticationToken?: string,
  ) => {
    setError(undefined);
    setResult(undefined);
    setLoading(true);

    const params: Record<string, string> = {
      host,
      port: port.toString(),
    };

    if (authenticationToken && authenticationToken !== "")
      params.authenticationToken = authenticationToken;

    fetch(
      `/api/config/test-connection?${new URLSearchParams(params).toString()}`,
    )
      .then((res) => res.json())
      .then((data) => setResult(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  return { result, error, loading, testConnection };
};
