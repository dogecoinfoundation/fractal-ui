import { createHash } from 'crypto';
import { ec as EC } from 'elliptic';

const ec = new EC('secp256k1');

export function signPayload(payload: Buffer, privHex: string): string {
    const key = ec.keyFromPrivate(privHex, 'hex');
    const hash = createHash('sha256').update(payload).digest();
    const signature = key.sign(hash);
    const derSign = signature.toDER('hex');
  
    return derSign;
  }