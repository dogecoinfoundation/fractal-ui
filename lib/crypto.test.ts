import { describe, expect, it } from "vitest";
import { decrypt, encrypt } from "./crypto";

describe("crypto", () => {
  const testPassword = "testPassword123";
  const testData = "Hello, World!";
  const longTestData =
    "This is a much longer string that contains various characters including special symbols !@#$%^&*()_+ and unicode characters like 🔐✨🚀";
  const emptyString = "";
  const numericData = "1234567890";
  const jsonData = JSON.stringify({
    user: "alice",
    balance: 100.5,
    active: true,
  });

  describe("encrypt", () => {
    it("encrypts a simple string", () => {
      const encrypted = encrypt(testData, testPassword);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe("string");
      expect(encrypted).not.toBe(testData);
      expect(encrypted.length).toBeGreaterThan(testData.length);
    });

    it("encrypts empty string", () => {
      const encrypted = encrypt(emptyString, testPassword);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe("string");
      expect(encrypted.length).toBeGreaterThan(0);
    });

    it("encrypts long strings", () => {
      const encrypted = encrypt(longTestData, testPassword);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe("string");
      expect(encrypted).not.toBe(longTestData);
    });

    it("encrypts numeric strings", () => {
      const encrypted = encrypt(numericData, testPassword);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe("string");
      expect(encrypted).not.toBe(numericData);
    });

    it("encrypts JSON strings", () => {
      const encrypted = encrypt(jsonData, testPassword);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe("string");
      expect(encrypted).not.toBe(jsonData);
    });

    it("produces different results with different passwords", () => {
      const encrypted1 = encrypt(testData, "password1");
      const encrypted2 = encrypt(testData, "password2");

      expect(encrypted1).not.toBe(encrypted2);
    });

    it("handles special characters in password", () => {
      const specialPassword = "p@ssw0rd!#$%^&*()";
      const encrypted = encrypt(testData, specialPassword);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe("string");
      expect(encrypted).not.toBe(testData);
    });

    it("handles unicode characters in data", () => {
      const unicodeData = "🔐 Encrypted data with emoji 🚀";
      const encrypted = encrypt(unicodeData, testPassword);

      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe("string");
      expect(encrypted).not.toBe(unicodeData);
    });
  });

  describe("decrypt", () => {
    it("decrypts encrypted data back to original", () => {
      const encrypted = encrypt(testData, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(testData);
    });

    it("decrypts empty string correctly", () => {
      const encrypted = encrypt(emptyString, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(emptyString);
    });

    it("decrypts long strings correctly", () => {
      const encrypted = encrypt(longTestData, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(longTestData);
    });

    it("decrypts numeric strings correctly", () => {
      const encrypted = encrypt(numericData, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(numericData);
    });

    it("decrypts JSON strings correctly", () => {
      const encrypted = encrypt(jsonData, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(jsonData);

      expect(() => JSON.parse(decrypted)).not.toThrow();
      expect(JSON.parse(decrypted)).toEqual(JSON.parse(jsonData));
    });

    it("decrypts unicode characters correctly", () => {
      const unicodeData = "🔐 Encrypted data with emoji 🚀";
      const encrypted = encrypt(unicodeData, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(unicodeData);
    });

    it("should fail to decrypt with wrong password", () => {
      const encrypted = encrypt(testData, testPassword);

      expect(() => {
        decrypt(encrypted, "wrongPassword");
      }).toThrow();
    });

    it("should fail to decrypt malformed data", () => {
      expect(() => {
        decrypt("invalid-encrypted-data", testPassword);
      }).toThrow();
    });

    it("should fail to decrypt truncated data", () => {
      const encrypted = encrypt(testData, testPassword);
      const truncated = encrypted.slice(0, encrypted.length - 10);

      expect(() => {
        decrypt(truncated, testPassword);
      }).toThrow();
    });

    it("should fail to decrypt data with invalid IV", () => {
      const encrypted = encrypt(testData, testPassword);
      const corrupted = `invalid-iv-data${encrypted.slice(32)}`;

      expect(() => {
        decrypt(corrupted, testPassword);
      }).toThrow();
    });
  });

  describe("encrypt/decrypt round trip tests", () => {
    const testCases = [
      { name: "simple string", data: "Hello, World!" },
      { name: "empty string", data: "" },
      { name: "numeric string", data: "1234567890" },
      { name: "special characters", data: "!@#$%^&*()_+-=[]{}|;:,.<>?" },
      { name: "unicode emoji", data: "🔐🚀✨💻🌟" },
      { name: "mixed content", data: "Hello 🌍! Price: $123.45" },
      { name: "JSON data", data: JSON.stringify({ key: "value", number: 42 }) },
      { name: "long string", data: "A".repeat(1000) },
      {
        name: "newlines and tabs",
        data: "Line 1\nLine 2\tTabbed\rCarriage return",
      },
      {
        name: "wallet seed phrase",
        data: "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
      },
    ];

    testCases.forEach(({ name, data }) => {
      it(`should handle round trip for ${name}`, () => {
        const encrypted = encrypt(data, testPassword);
        const decrypted = decrypt(encrypted, testPassword);

        expect(decrypted).toBe(data);
      });
    });

    const passwordCases = [
      { name: "short password", password: "abc" },
      { name: "long password", password: "a".repeat(100) },
      {
        name: "special chars password",
        password: "!@#$%^&*()_+-=[]{}|;:,.<>?",
      },
      { name: "unicode password", password: "pássw🔐rd" },
      { name: "numeric password", password: "1234567890" },
    ];

    passwordCases.forEach(({ name, password }) => {
      it(`should handle round trip with ${name}`, () => {
        const encrypted = encrypt(testData, password);
        const decrypted = decrypt(encrypted, password);

        expect(decrypted).toBe(testData);
      });
    });
  });

  describe("security properties", () => {
    it("should produce encrypted data that looks random", () => {
      const encrypted = encrypt(testData, testPassword);

      // Should not contain original data
      expect(encrypted).not.toContain(testData);

      // Should be hex encoded (only contains 0-9, a-f)
      expect(encrypted).toMatch(/^[0-9a-f]+$/);
    });
  });

  describe("edge cases", () => {
    it("should handle very long passwords", () => {
      const longPassword = "a".repeat(1000);
      const encrypted = encrypt(testData, longPassword);
      const decrypted = decrypt(encrypted, longPassword);

      expect(decrypted).toBe(testData);
    });

    it("should handle data with null bytes", () => {
      const dataWithNull = "Hello\x00World";
      const encrypted = encrypt(dataWithNull, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(dataWithNull);
    });

    it("should maintain data integrity with various encodings", () => {
      const binaryLikeData = String.fromCharCode(
        ...Array.from({ length: 256 }, (_, i) => i),
      );
      const encrypted = encrypt(binaryLikeData, testPassword);
      const decrypted = decrypt(encrypted, testPassword);

      expect(decrypted).toBe(binaryLikeData);
    });
  });
});
