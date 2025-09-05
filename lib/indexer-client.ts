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

export const GetIndexerHealth = async (): Promise<any> => {
  const indexerUrl = await getIndexerURL();

  try {
    const result = await fetch(`${indexerUrl}/health`);
    const parsedResult = await result.json();

    return {
      indexer_url: indexerUrl,
      indexer_connected: true,
      ...parsedResult,
    };
  } catch (e) {}

  return {
    indexer_url: indexerUrl,
    indexer_connected: false,
  };
};
