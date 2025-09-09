import { Health } from "@/app/api/health/route";
import { getFractalEngineURL } from "./config-helper";
import prisma from "@/lib/prisma";
import { decrypt, sha256Hash, jsonStringifyCanonical } from "./crypto";
import km2, {
  Crypto,
  Net,
  Wallet,
  UnsignedTransaction,
  SighashType,
  TransactionInputOptions,
  TransactionOutputOptions,
} from "@houseofdoge/km2";
import { GetIndexerUTXOs, UTXOItem } from "./indexer-client";
import { Mint, MintsResponse } from "@/app/api/mints/route";
import { URLSearchParams } from "url";
import { MintWithBalanceResponse } from "./definitions";
import { InvoicesResponse } from "@/app/api/invoice/my/route";
import { removeNullKeys } from "./utils";

const KOINU = 100_000_000;
const KOINU_DECIMALS = 8;

export const GetFractalEngineHealth = async (): Promise<Health> => {
  const feUrl = await getFractalEngineURL();

  try {
    const result = await fetch(feUrl + "/health");
    const parsedResult = await result.json();

    return {
      ...parsedResult,
      fractal_engine_url: feUrl,
      fractal_engine_connected: true,
    } as Health;
  } catch (e) {}

  return {
    fractal_engine_url: feUrl,
    fractal_engine_connected: false,
  } as Health;
};

export const GetMyTokens = async (
  page: number,
  limit: number,
  myAddress: string | null,
): Promise<MintWithBalanceResponse> => {
  const feUrl = await getFractalEngineURL();

  const url = new URL(feUrl + "/mint-token-balances");

  if (myAddress) {
    url.searchParams.append("address", myAddress);
  }

  url.searchParams.append("page", `${page}`);
  url.searchParams.append("limit", `${limit}`);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const resJson = await res.json();
  return resJson;
};

export const GetMyInvoices = async (
  page: number,
  limit: number,
  myAddress: string | null,
): Promise<InvoicesResponse> => {
  const feUrl = await getFractalEngineURL();

  const url = new URL(feUrl + "/my-invoices");

  if (myAddress) {
    url.searchParams.append("address", myAddress);
  }

  url.searchParams.append("page", `${page}`);
  url.searchParams.append("limit", `${limit}`);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const resJson = await res.json();
  return resJson;
};

export const GetMyMints = async (
  page: number,
  limit: number,
  myAddress: string | null,
): Promise<MintsResponse> => {
  const feUrl = await getFractalEngineURL();

  const url = new URL(feUrl + "/mints");

  if (myAddress) {
    url.searchParams.append("address", myAddress);
  }

  url.searchParams.append("page", `${page}`);
  url.searchParams.append("limit", `${limit}`);
  url.searchParams.append("include_unconfirmed", "true");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const resJson = await res.json();
  return resJson;
};

export const CreateInvoice = async (invoiceData: any): Promise<string> => {
  const walletRecord = await prisma.wallet.findFirstOrThrow({
    where: { active: true },
  });
  const { wallet, network } = await getWallet(
    walletRecord.privateKey,
    invoiceData.password,
  );
  delete invoiceData.password;

  const utxos = await GetIndexerUTXOs(walletRecord.address);

  if (utxos.length === 0) {
    throw new Error("No UTXOs found");
  }

  using kp = wallet.deriveKeypair({ account: 1, change: 0, index: 0 });

  invoiceData.payment_address = walletRecord.address;
  invoiceData.seller_address = walletRecord.address;

  const invoiceResponse = await invoiceHttp(
    invoiceData,
    wallet,
    walletRecord.address,
  );

  const unsignedTrxn = new UnsignedTransaction(Crypto.Dogecoin, network);

  // NOTE: This is a pretty crude way of figuring out UTXOs and Fees.
  const totalValue = dogeToKoinu(utxos[0].value);
  const totalFee = dogeToKoinu("0.002");

  unsignedTrxn.addInput({
    outputIndex: utxos[0].vout,
    prevTxId: utxos[0].tx,
    scriptPubKeyHex: utxos[0].script,
    value: totalValue,
    sequence: 0xffffffff,
  });

  unsignedTrxn.addOutput({
    kind: "payment",
    address: walletRecord.address,
    value: totalValue - totalFee,
  });

  unsignedTrxn.addOutput({
    kind: "opReturn",
    data: invoiceResponse.encoded_transaction_body,
    value: 0,
  });

  const signedTrxn = unsignedTrxn.sign({
    keypairs: [kp],
  });

  const trxnId = await sendSignedTransaction(signedTrxn.rawHex);

  return trxnId;
};

export const PayInvoice = async (invoiceData: any): Promise<string> => {
  const walletRecord = await prisma.wallet.findFirstOrThrow({
    where: { active: true },
  });
  const { wallet, network } = await getWallet(
    walletRecord.privateKey,
    invoiceData.password,
  );
  delete invoiceData.password;

  const utxos = await GetIndexerUTXOs(walletRecord.address);

  if (utxos.length === 0) {
    throw new Error("No UTXOs found");
  }

  using kp = wallet.deriveKeypair({ account: 1, change: 0, index: 0 });

  const invoiceResponse = await payInvoiceHttp(invoiceData.invoice_hash);

  const unsignedTrxn = new UnsignedTransaction(Crypto.Dogecoin, network);

  // NOTE: This is a pretty crude way of figuring out UTXOs and Fees.
  const totalValue = dogeToKoinu(utxos[0].value);
  const totalFee = dogeToKoinu("0.002");
  const invoiceValue = dogeToKoinu(`${invoiceData.total}`);

  const changeValue = totalValue - invoiceValue - totalFee;

  unsignedTrxn.addInput({
    outputIndex: utxos[0].vout,
    prevTxId: utxos[0].tx,
    scriptPubKeyHex: utxos[0].script,
    value: totalValue,
    sequence: 0xffffffff,
  });

  unsignedTrxn.addOutput({
    kind: "payment",
    address: walletRecord.address,
    value: changeValue,
  });

  unsignedTrxn.addOutput({
    kind: "payment",
    address: invoiceData.seller_address,
    value: invoiceValue,
  });

  unsignedTrxn.addOutput({
    kind: "opReturn",
    data: invoiceResponse.encoded_transaction_body,
    value: 0,
  });

  const signedTrxn = unsignedTrxn.sign({
    keypairs: [kp],
  });

  const trxnId = await sendSignedTransaction(signedTrxn.rawHex);

  return trxnId;
};

export const MintToken = async (mintData: any): Promise<string> => {
  const walletRecord = await prisma.wallet.findFirstOrThrow({
    where: { active: true },
  });
  const { wallet, network } = await getWallet(
    walletRecord.privateKey,
    mintData.password,
  );
  delete mintData.password;

  const utxos = await GetIndexerUTXOs(walletRecord.address);

  if (utxos.length === 0) {
    throw new Error("No UTXOs found");
  }

  using kp = wallet.deriveKeypair({ account: 1, change: 0, index: 0 });

  const mintResponse = await mintTokenHttp(
    mintData,
    wallet,
    walletRecord.address,
  );

  const unsignedTrxn = new UnsignedTransaction(Crypto.Dogecoin, network);

  // NOTE: This is a pretty crude way of figuring out UTXOs and Fees.
  const totalValue = dogeToKoinu(utxos[0].value);
  const totalFee = dogeToKoinu("0.002");

  unsignedTrxn.addInput({
    outputIndex: utxos[0].vout,
    prevTxId: utxos[0].tx,
    scriptPubKeyHex: utxos[0].script,
    value: totalValue,
    sequence: 0xffffffff,
  });

  unsignedTrxn.addOutput({
    kind: "payment",
    address: walletRecord.address,
    value: totalValue - totalFee,
  });

  unsignedTrxn.addOutput({
    kind: "opReturn",
    data: mintResponse.encoded_transaction_body,
    value: 0,
  });

  const signedTrxn = unsignedTrxn.sign({
    keypairs: [kp],
  });

  const trxnId = await sendSignedTransaction(signedTrxn.rawHex);

  return trxnId;
};

const createRawTransactionHex = async (mintHash: any): Promise<string> => {
  const feUrl = await getFractalEngineURL();

  const res = await fetch(feUrl + "/doge/mint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(mintHash),
  });

  const resJson = await res.json();

  return resJson.raw_transaction_hex;
};

const sendSignedTransaction = async (
  encodedTrxnHex: string,
): Promise<string> => {
  const feUrl = await getFractalEngineURL();

  const res = await fetch(feUrl + "/doge/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      encoded_transaction_hex: encodedTrxnHex,
    }),
  });

  const resJson = await res.json();

  return resJson.raw_transaction_hex;
};

const invoiceHttp = async (
  invoiceData: any,
  wallet: Wallet,
  address: string,
): Promise<{ encoded_transaction_body: string; hash: string }> => {
  const feUrl = await getFractalEngineURL();

  using kp = wallet.deriveKeypair({ account: 1, change: 0, index: 0 });

  invoiceData = removeNullKeys(invoiceData);

  const hashedPayload = sha256Hash(jsonStringifyCanonical(invoiceData));

  const signature = kp.signMessage({
    message: hashedPayload,
  });

  let invoiceEnvelope = {
    payload: invoiceData,
    signature: signature.toBase64(),
    public_key: kp.publicKey,
  };

  const res = await fetch(feUrl + "/invoices", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(invoiceEnvelope),
  });

  const resJson = await res.json();

  return resJson;
};

const payInvoiceHttp = async (
  invoiceHash: string,
): Promise<{ encoded_transaction_body: string }> => {
  const feUrl = await getFractalEngineURL();

  let invoiceEnvelope = {
    invoice_hash: invoiceHash,
  };

  const res = await fetch(feUrl + "/invoices/encoded-transaction-body", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(invoiceEnvelope),
  });

  const resJson = await res.json();

  return resJson;
};

const mintTokenHttp = async (
  mintData: any,
  wallet: Wallet,
  address: string,
): Promise<{ encoded_transaction_body: string; hash: string }> => {
  const feUrl = await getFractalEngineURL();

  using kp = wallet.deriveKeypair({ account: 1, change: 0, index: 0 });

  mintData.owner_address = address;

  mintData = removeNullKeys(mintData);

  const hashedPayload = sha256Hash(jsonStringifyCanonical(mintData));

  const signature = kp.signMessage({
    message: hashedPayload,
  });

  let mintEnvelope = {
    payload: mintData,
    signature: signature.toBase64(),
    public_key: kp.publicKey,
  };

  const res = await fetch(feUrl + "/mints", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(mintEnvelope),
  });

  const resJson = await res.json();

  return resJson;
};

const getWallet = async (
  privateKey: string,
  password: string,
): Promise<{ wallet: Wallet; network: Net }> => {
  const health = await GetFractalEngineHealth();

  let network;
  if (health.chain === "regtest") {
    network = Net.Regtest;
  } else if (health.chain === "testnet") {
    network = Net.Testnet;
  } else {
    network = Net.Mainnet;
  }

  const privateKeyHex = decrypt(privateKey, password);

  const wallet = Wallet.fromXPriv(privateKeyHex, {
    cryptocurrency: Crypto.Dogecoin,
    network: network,
  });

  return {
    wallet,
    network,
  };
};

export const dogeToKoinu = (s: string): number => {
  const m = s.trim().match(/^([+-])?(\d+)(?:\.(\d{0,8}))?$/);
  if (!m) throw new Error(`invalid amount: ${s}`);
  const sign = m[1] === "-" ? -1 : 1;
  const w = m[2].replace(/^0+/, "") || "0";
  const f = (m[3] || "").padEnd(8, "0");

  // Max safe: whole <= 90,071,992 (because (whole*1e8 + frac) must fit 2^53-1)
  if (w.length > 8 || (w.length === 8 && Number(w) > 90071992)) {
    throw new Error("amount too large for a JS number; use the string version");
  }

  return sign * (Number(w) * KOINU + Number(f));
};
export const koinuToDoge = (k: number): string =>
  `${k / KOINU}.${(k % KOINU).toString().padStart(8, "0")}`;
