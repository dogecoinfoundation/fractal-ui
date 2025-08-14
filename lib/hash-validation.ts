// Mainnet: P2PKH (D) or P2SH (A)
export const mainNetRegex = /^(D|A)[1-9A-HJ-NP-Za-km-z]{25,34}$/;

// Testnet/Regtest: P2PKH (m or n) or P2SH (2)
export const testNetRegex = /^([mn2])[1-9A-HJ-NP-Za-km-z]{25,34}$/;

export const hexRegex = /^[a-f0-9]{64}$/;
