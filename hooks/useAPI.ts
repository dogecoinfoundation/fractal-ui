import useSWR from "swr";

export const useAPI = <T>(url: string) => {
  const fetcher = async (url: string): Promise<T> => {
    const res = await fetch(url);

    if (!res.ok) {
      const errorRes = await res.json();
      throw new Error(errorRes.error);
    }

    return res.json();
  };

  const { data, mutate, isLoading, error } = useSWR<T>(url, fetcher);

  return { data, mutate, isLoading, error };
};
