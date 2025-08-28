// Thanks to https://mskelton.dev/bytes/encrypting-data-with-node-js

import crypto from "node:crypto";
import * as canonicalize from "json-canonicalize";

const algorithm = "aes-256-cbc";

const iv = crypto.randomBytes(16);

export function encrypt(data: string, password: string) {
  console.log("data", data);
  const key = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex")
    .substring(0, 32);

  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");

  // Package the IV and encrypted data together so it can be stored in a single
  // column in the database.
  return iv.toString("hex") + encrypted;
}

export function decrypt(data: string, password: string) {
  const key = crypto
    .createHash("sha512")
    .update(password)
    .digest("hex")
    .substring(0, 32);

  // Unpackage the combined iv + encrypted message. Since we are using a fixed
  // size IV, we can hard code the slice length.
  const inputIV = data.slice(0, 32);
  const encrypted = data.slice(32);
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key),
    Buffer.from(inputIV, "hex"),
  );

  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

export function sha256Hash(input: string | Uint8Array): string {
  const buf =
    typeof input === "string" ? Buffer.from(input, "utf8") : Buffer.from(input);
  return crypto.createHash("sha256").update(buf).digest("hex"); // 32 bytes
}

export function jsonStringifyCanonical(payload: unknown): Uint8Array {
  const canon = canonicalize.canonicalize(payload); // RFC 8785 canonical JSON
  return new TextEncoder().encode(canon); // UTF-8
}
