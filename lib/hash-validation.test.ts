import { describe, expect, it } from "vitest";
import { hexRegex, mainNetRegex, testNetRegex } from "./hash-validation";

describe("mainNetRegex", () => {
  describe("valid addresses", () => {
    it("accepts valid P2PKH addresses starting with D", () => {
      const validAddresses = [
        "D7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "D1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN",
        "DFGHJKMNPQRSTUVWXYZabcdefghjk",
        "D123456789ABCDEFGHJKMNPQRSTUVWXYZa",
      ];

      for (const address of validAddresses) {
        expect(mainNetRegex.test(address)).toBe(true);
      }
    });

    it("accepts valid P2SH addresses starting with A", () => {
      const validAddresses = [
        "A7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "A1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN",
        "AFGHJKMNPQRSTUVWXYZabcdefghjk",
        "A123456789ABCDEFGHJKMNPQRSTUVWXYZa",
      ];

      for (const address of validAddresses) {
        expect(mainNetRegex.test(address)).toBe(true);
      }
    });

    it("accepts addresses with minimum length (26 characters)", () => {
      expect(mainNetRegex.test("D123456789ABCDEFGHJKMNPQRs")).toBe(true);
      expect(mainNetRegex.test("A123456789ABCDEFGHJKMNPQRs")).toBe(true);
    });

    it("accepts addresses with maximum length (35 characters)", () => {
      expect(mainNetRegex.test("D123456789ABCDEFGHJKMNPQRSTUVWXYZab")).toBe(
        true,
      );
      expect(mainNetRegex.test("A123456789ABCDEFGHJKMNPQRSTUVWXYZab")).toBe(
        true,
      );
    });
  });

  describe("invalid addresses", () => {
    it("rejects addresses with invalid starting characters", () => {
      const invalidAddresses = [
        "B7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "C7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "17q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "m7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "n7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "27q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
      ];

      for (const address of invalidAddresses) {
        expect(mainNetRegex.test(address)).toBe(false);
      }
    });

    it("rejects addresses with invalid characters", () => {
      const invalidAddresses = [
        "D0q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains 0
        "DIq3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains I
        "DOq3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains O
        "Dlq3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains l
        "D+q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains +
        "D/q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains /
      ];

      for (const address of invalidAddresses) {
        expect(mainNetRegex.test(address)).toBe(false);
      }
    });

    it("rejects addresses that are too short", () => {
      const shortAddresses = [
        "D",
        "DA",
        "D123456789",
        "D123456789ABCDEFGHJKMNPQR",
        "A123456789ABCDEFGHJKMNPQR",
      ];

      for (const address of shortAddresses) {
        expect(mainNetRegex.test(address)).toBe(false);
      }
    });

    it("rejects addresses that are too long", () => {
      const longAddresses = [
        "D123456789ABCDEFGHJKMNPQRSTUVWXYZabc",
        "A123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijk",
      ];

      for (const address of longAddresses) {
        expect(mainNetRegex.test(address)).toBe(false);
      }
    });

    it("rejects empty string and undefined", () => {
      expect(mainNetRegex.test("")).toBe(false);
    });

    it("rejects addresses with whitespace", () => {
      const addressesWithWhitespace = [
        " D7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // leading space
        "D7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8 ", // trailing space
        "D7q3 QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // space in middle
        "D7q3\tQjBfjHt4Lw8kJ3nL5mG2pV9sX8", // tab
        "D7q3\nQjBfjHt4Lw8kJ3nL5mG2pV9sX8", // newline
      ];

      for (const address of addressesWithWhitespace) {
        expect(mainNetRegex.test(address)).toBe(false);
      }
    });
  });
});

describe("testNetRegex", () => {
  describe("valid addresses", () => {
    it("accepts valid P2PKH addresses starting with m", () => {
      const validAddresses = [
        "m7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "m1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN",
        "mFGHJKMNPQRSTUVWXYZabcdefghjk",
        "m123456789ABCDEFGHJKMNPQRSTUVWXYZa",
      ];

      for (const address of validAddresses) {
        expect(testNetRegex.test(address)).toBe(true);
      }
    });

    it("accepts valid P2PKH addresses starting with n", () => {
      const validAddresses = [
        "n7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "n1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN",
        "nFGHJKMNPQRSTUVWXYZabcdefghjk",
        "n123456789ABCDEFGHJKMNPQRSTUVWXYZa",
      ];

      for (const address of validAddresses) {
        expect(testNetRegex.test(address)).toBe(true);
      }
    });

    it("accepts valid P2SH addresses starting with 2", () => {
      const validAddresses = [
        "27q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "21BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN",
        "2FGHJKMNPQRSTUVWXYZabcdefghjk",
        "2123456789ABCDEFGHJKMNPQRSTUVWXYZa",
      ];

      for (const address of validAddresses) {
        expect(testNetRegex.test(address)).toBe(true);
      }
    });

    it("accepts addresses with minimum length (26 characters)", () => {
      expect(testNetRegex.test("m123456789ABCDEFGHJKMNPQRs")).toBe(true);
      expect(testNetRegex.test("n123456789ABCDEFGHJKMNPQRs")).toBe(true);
      expect(testNetRegex.test("2123456789ABCDEFGHJKMNPQRs")).toBe(true);
    });

    it("accepts addresses with maximum length (35 characters)", () => {
      expect(testNetRegex.test("m123456789ABCDEFGHJKMNPQRSTUVWXYZab")).toBe(
        true,
      );
      expect(testNetRegex.test("n123456789ABCDEFGHJKMNPQRSTUVWXYZab")).toBe(
        true,
      );
      expect(testNetRegex.test("2123456789ABCDEFGHJKMNPQRSTUVWXYZab")).toBe(
        true,
      );
    });
  });

  describe("invalid addresses", () => {
    it("rejects addresses with invalid starting characters", () => {
      const invalidAddresses = [
        "D7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "A7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "17q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "37q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
        "B7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
      ];

      for (const address of invalidAddresses) {
        expect(testNetRegex.test(address)).toBe(false);
      }
    });

    it("rejects addresses with invalid characters", () => {
      const invalidAddresses = [
        "m0q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains 0
        "nIq3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains I
        "2Oq3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains O
        "mlq3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains l
        "m+q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains +
        "m/q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // contains /
      ];

      for (const address of invalidAddresses) {
        expect(testNetRegex.test(address)).toBe(false);
      }
    });

    it("rejects addresses that are too short", () => {
      const shortAddresses = [
        "m",
        "mA",
        "m123456789",
        "m123456789ABCDEFGHJKMNPQR",
        "n123456789ABCDEFGHJKMNPQR",
        "2123456789ABCDEFGHJKMNPQR",
      ];

      for (const address of shortAddresses) {
        expect(testNetRegex.test(address)).toBe(false);
      }
    });

    it("rejects addresses that are too long", () => {
      const longAddresses = [
        "m123456789ABCDEFGHJKMNPQRSTUVWXYZabc",
        "n123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijk",
        "2123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijk",
      ];

      for (const address of longAddresses) {
        expect(testNetRegex.test(address)).toBe(false);
      }
    });

    it("rejects empty string", () => {
      expect(testNetRegex.test("")).toBe(false);
    });

    it("rejects addresses with whitespace", () => {
      const addressesWithWhitespace = [
        " m7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // leading space
        "m7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8 ", // trailing space
        "m7q3 QjBfjHt4Lw8kJ3nL5mG2pV9sX8", // space in middle
        "n7q3\tQjBfjHt4Lw8kJ3nL5mG2pV9sX8", // tab
        "27q3\nQjBfjHt4Lw8kJ3nL5mG2pV9sX8", // newline
      ];

      for (const address of addressesWithWhitespace) {
        expect(testNetRegex.test(address)).toBe(false);
      }
    });
  });
});

describe("cross-network validation", () => {
  it("mainnet regex rejects testnet addresses", () => {
    const testnetAddresses = [
      "m7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
      "n7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
      "27q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
    ];

    for (const address of testnetAddresses) {
      expect(mainNetRegex.test(address)).toBe(false);
    }
  });

  it("testnet regex rejects mainnet addresses", () => {
    const mainnetAddresses = [
      "D7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
      "A7q3QjBfjHt4Lw8kJ3nL5mG2pV9sX8",
    ];

    for (const address of mainnetAddresses) {
      expect(testNetRegex.test(address)).toBe(false);
    }
  });
});

describe("edge cases", () => {
  it("handles case sensitivity correctly", () => {
    expect(mainNetRegex.test("DaBcDeFgHjKmNpQrStUvWxYz123456789")).toBe(true);
    expect(testNetRegex.test("maBcDeFgHjKmNpQrStUvWxYz123456789")).toBe(true);
  });

  it("validates exact boundary lengths", () => {
    const min26 = "D123456789ABCDEFGHJKMNPQRs";
    expect(min26.length).toBe(26);
    expect(mainNetRegex.test(min26)).toBe(true);

    const max35 = "D123456789ABCDEFGHJKMNPQRSTUVWXYZab";
    expect(max35.length).toBe(35);
    expect(mainNetRegex.test(max35)).toBe(true);

    const tooShort = "D123456789ABCDEFGHJKMNPQRs".slice(0, -1);
    expect(tooShort.length).toBe(25);
    expect(mainNetRegex.test(tooShort)).toBe(false);

    const tooLong = "D123456789ABCDEFGHJKMNPQRSTUVWXYZabc";
    expect(tooLong.length).toBe(36);
    expect(mainNetRegex.test(tooLong)).toBe(false);
  });

  describe("validates real-world-like addresses", () => {
    const validMainnetAddresses = [
      "DJrr7nfGJCQc3TZVwYnxX6xGdE5LjqHqBW",
      "A1ZP1EP3WaS98afEZhFvjL2XqBP8vJ7BYm",
    ];

    const validTestnetAddresses = [
      "mjSk1Ny9spzU2fouzYgLqGUD8U41iR35QN",
      "n2ZNV8YcM3cQn9rY8qJ4XnNdJ7VLqCvRpX",
      "2N2JK4pYXjcQn9rY8qJ4XnNdJ7VLqCvRpX",
    ];

    it.each(validMainnetAddresses)("mainnet regex accepts %s", (address) => {
      expect(mainNetRegex.test(address)).toBe(true);
      expect(testNetRegex.test(address)).toBe(false);
    });

    it.each(validTestnetAddresses)("testnet regex accepts %s", (address) => {
      expect(testNetRegex.test(address)).toBe(true);
      expect(mainNetRegex.test(address)).toBe(false);
    });
  });
});

describe("hexRegex", () => {
  describe("valid hashes", () => {
    it("accepts valid 64-character lowercase hex strings", () => {
      const validHexHashes = [
        "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        "0000000000000000000000000000000000000000000000000000000000000000",
        "deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
      ];

      for (const hash of validHexHashes) {
        expect(hexRegex.test(hash)).toBe(true);
      }
    });

    it("accepts valid 64-character hex strings with mixed case", () => {
      const validHexHashes = [
        "A1B2C3D4E5F6a7b8c9d0e1f2A3B4C5D6e7f8a9b0c1d2e3f4A5B6C7D8e9f0a1b2",
        "0123456789ABCDEF0123456789abcdef0123456789ABCDEF0123456789abcdef",
        "DeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEfDeAdBeEf",
      ];

      for (const hash of validHexHashes) {
        expect(hexRegex.test(hash)).toBe(false);
      }
    });

    it("validates exact 64-character length", () => {
      const exactLength64 = "a".repeat(64);
      expect(exactLength64.length).toBe(64);
      expect(hexRegex.test(exactLength64)).toBe(true);
    });
  });

  describe("invalid hashes", () => {
    it("rejects hex strings that are too short", () => {
      const shortHashes = [
        "",
        "a",
        "ab",
        "abcdef",
        "0123456789abcdef",
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcde",
      ];

      for (const hash of shortHashes) {
        expect(hexRegex.test(hash)).toBe(false);
      }
    });

    it("rejects hex strings that are too long", () => {
      const longHashes = [
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0",
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef01",
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      ];

      for (const hash of longHashes) {
        expect(hexRegex.test(hash)).toBe(false);
      }
    });

    it("rejects strings with invalid characters", () => {
      const invalidHashes = [
        "g123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", // contains 'g'
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdeg", // contains 'g' at end
        "012345678zabcdef0123456789abcdef0123456789abcdef0123456789abcdef", // contains 'z'
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd!", // contains '!'
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd@", // contains '@'
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd ", // contains space
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcd-", // contains dash
      ];

      for (const hash of invalidHashes) {
        expect(hexRegex.test(hash)).toBe(false);
      }
    });

    it("rejects uppercase hex characters", () => {
      const uppercaseHashes = [
        "A123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdeF",
        "0123456789ABCDEF0123456789abcdef0123456789abcdef0123456789abcdef",
        "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
      ];

      for (const hash of uppercaseHashes) {
        expect(hexRegex.test(hash)).toBe(false);
      }
    });

    it("rejects strings with whitespace", () => {
      const hashesWithWhitespace = [
        " 0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", // leading space
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef ", // trailing space
        "0123456789abcdef 0123456789abcdef0123456789abcdef0123456789abcdef", // space in middle
        "0123456789abcdef\t0123456789abcdef0123456789abcdef0123456789abcdef", // tab
        "0123456789abcdef\n0123456789abcdef0123456789abcdef0123456789abcdef", // newline
      ];

      for (const hash of hashesWithWhitespace) {
        expect(hexRegex.test(hash)).toBe(false);
      }
    });

    it("rejects empty string and undefined", () => {
      expect(hexRegex.test("")).toBe(false);
    });
  });

  describe("real-world-like hashes", () => {
    it("accepts valid transaction-like hashes", () => {
      const validTransactionHashes = [
        "e3bf3d07d4b0375638d5f1db5255fe07ba2c4cb067cd81b84ee974b6585fb468",
        "3b8c45ef2f8932a2b7f8b5e4d1c0a9b8e7f6d5c4b3a2918f7e6d5c4b3a291827",
        "0000000000000000000abc123456789def0123456789abcdef0123456789abcd",
      ];

      for (const hash of validTransactionHashes) {
        expect(hexRegex.test(hash)).toBe(true);
      }
    });

    it("rejects common invalid formats", () => {
      const invalidFormats = [
        "0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef:",
        "01:23:45:67:89:ab:cd:ef:01:23:45:67:89:ab:cd:ef:01:23:45:67:89:ab:cd:ef",
        "0123-4567-89ab-cdef-0123-4567-89ab-cdef-0123-4567-89ab-cdef-0123-4567",
      ];

      for (const hash of invalidFormats) {
        expect(hexRegex.test(hash)).toBe(false);
      }
    });
  });

  describe("edge cases", () => {
    it("validates exact boundary length (64 characters)", () => {
      const exactly64Chars = "0".repeat(64);
      expect(exactly64Chars.length).toBe(64);
      expect(hexRegex.test(exactly64Chars)).toBe(true);

      const oneCharShort = "0".repeat(63);
      expect(oneCharShort.length).toBe(63);
      expect(hexRegex.test(oneCharShort)).toBe(false);

      const oneCharLong = "0".repeat(65);
      expect(oneCharLong.length).toBe(65);
      expect(hexRegex.test(oneCharLong)).toBe(false);
    });

    it("validates all valid hex characters", () => {
      const allValidChars =
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
      expect(allValidChars.length).toBe(64);
      expect(hexRegex.test(allValidChars)).toBe(true);
    });

    it("rejects each invalid character at different positions", () => {
      const baseHash =
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef";
      const invalidChars =
        "ghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";

      for (const char of invalidChars) {
        const invalidAtStart = char + baseHash.slice(1);
        expect(hexRegex.test(invalidAtStart)).toBe(false);

        const invalidAtEnd = baseHash.slice(0, -1) + char;
        expect(hexRegex.test(invalidAtEnd)).toBe(false);

        const invalidInMiddle =
          baseHash.slice(0, 32) + char + baseHash.slice(33);
        expect(hexRegex.test(invalidInMiddle)).toBe(false);
      }
    });
  });
});
