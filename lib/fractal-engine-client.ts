import { Health } from "@/app/api/health/route";
import { getFractalEngineURL } from "./config-helper";
import prisma from "@/lib/prisma";
import { decrypt, sha256Hash, jsonStringifyCanonical } from "./crypto";
import km2, { Crypto, Net } from "@houseofdoge/km2";

export const GetFractalEngineHealth = async (): Promise<Health> => {
  const feUrl = await getFractalEngineURL();
  const result = await fetch(feUrl + "/health");
  const parsedResult = await result.json();

  return parsedResult as Health;
};

export const MintToken = async (mintData: any): Promise<string> => {
  const feUrl = await getFractalEngineURL();
  const password = mintData.password;
  delete mintData.password;

  const health = await GetFractalEngineHealth();

  let network;
  if (health.chain === "regtest") {
    network = Net.Regtest;
  } else if (health.chain === "testnet") {
    network = Net.Testnet;
  } else {
    network = Net.Mainnet;
  }

  const walletRecord = await prisma.wallet.findFirstOrThrow();
  const privateKeyHex = decrypt(walletRecord.privateKey, password);

  const wallet = km2.Wallet.fromXPriv(privateKeyHex, {
    cryptocurrency: Crypto.Dogecoin,
    network: network,
  });

  using kp = wallet.deriveKeypair({ account: 1, change: 0, index: 0 });

  const hashedPayload = sha256Hash(jsonStringifyCanonical(mintData));

  const signature = kp.signMessage({
    cryptocurrency: Crypto.Dogecoin,
    message: hashedPayload,
  });

  const hexSignature = Buffer.from(signature.toBase64(), "base64").toString(
    "hex",
  );

  console.log("SIGGY", hexSignature);
  console.log("HASHED", hashedPayload);

  let mintEnvelope = {
    payload: mintData,
    signature: hexSignature,
    public_key: kp.publicKey,
    address: walletRecord.address,
  };

  console.log(mintEnvelope);

  const res = await fetch(feUrl + "/mints", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(mintEnvelope),
  });

  const parsedResult = await res.json();

  return "";
};
