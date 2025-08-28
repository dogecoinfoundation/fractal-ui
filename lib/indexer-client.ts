import { Health } from "@/app/api/health/route";
import { getIndexerURL } from "./config-helper";
import { Balance } from "@/app/api/balance/route";

export const GetIndexerBalance = async (address: string): Promise<Balance> => {
  const indexerUrl = await getIndexerURL();

  const result = await fetch(`${indexerUrl}/balance?address=${address}`);
  const parsedResult = await result.json();

  return parsedResult;
};
