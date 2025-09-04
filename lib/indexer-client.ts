import { Health } from "@/app/api/health/route";
import { getIndexerURL } from "./config-helper";
import { Balance } from "@/app/api/balance/route";

export type UTXOItem = {
  tx: string;
  vout: number;
  value: string;
  type: string;
  script: string;
};

export type UTXOResponse = {
  utxo: UTXOItem[];
};

export const GetIndexerBalance = async (address: string): Promise<Balance> => {
  const indexerUrl = await getIndexerURL();

  const result = await fetch(`${indexerUrl}/balance?address=${address}`);
  const parsedResult = await result.json();

  return parsedResult;
};

export const GetIndexerUTXOs = async (address: string): Promise<UTXOItem[]> => {
  const indexerUrl = await getIndexerURL();

  const result = await fetch(`${indexerUrl}/utxo?address=${address}`);
  const parsedResult = await result.json();

  return parsedResult.utxo as UTXOItem[];
};
