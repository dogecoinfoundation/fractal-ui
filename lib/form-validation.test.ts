import { describe, expect, it } from "vitest";
import { NumberSchema } from "@/lib/form-validation";

describe("NumberSchema", () => {
  describe("with minimum value of 0", () => {
    const schema = NumberSchema(0);

    it("successfully parses valid positive numbers", () => {
      expect(schema.safeParse("0").success).toBe(true);
      expect(schema.safeParse("1").success).toBe(true);
      expect(schema.safeParse("10").success).toBe(true);
      expect(schema.safeParse("100.5").success).toBe(true);
      expect(schema.safeParse("999999").success).toBe(true);
    });

    it("successfully parses zero", () => {
      expect(schema.safeParse("0").success).toBe(true);
      expect(schema.safeParse("0.0").success).toBe(true);
      expect(schema.safeParse("0.00").success).toBe(true);
    });

    it("fails when parsing negative numbers", () => {
      const result = schema.safeParse("-1");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than -1.",
        );
      }
    });

    it("fails when parsing negative decimals", () => {
      const result = schema.safeParse("-0.1");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than -1.",
        );
      }
    });

    it("fails when parsing non-numeric strings", () => {
      const result = schema.safeParse("abc");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than -1.",
        );
      }
    });

    it("fails when parsing empty strings", () => {
      const result = schema.safeParse("");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than -1.",
        );
      }
    });

    it("fails when parsing whitespace", () => {
      const result = schema.safeParse(" ");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than -1.",
        );
      }
    });
  });

  describe("with minimum value of 1", () => {
    const schema = NumberSchema(1);

    it("successfully parses numbers greater than or equal to 1", () => {
      expect(schema.safeParse("1").success).toBe(true);
      expect(schema.safeParse("1.0").success).toBe(true);
      expect(schema.safeParse("1.5").success).toBe(true);
      expect(schema.safeParse("100").success).toBe(true);
    });

    it("fails when parsing zero", () => {
      const result = schema.safeParse("0");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than 0.",
        );
      }
    });

    it("fails when parsing numbers less than 1", () => {
      const result = schema.safeParse("0.99");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than 0.",
        );
      }
    });

    it("fails when parsing negative numbers", () => {
      const result = schema.safeParse("-5");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than 0.",
        );
      }
    });
  });

  describe("edge cases", () => {
    const schema = NumberSchema(0);

    it("should handle very large numbers", () => {
      expect(schema.safeParse("999999999999999").success).toBe(true);
      expect(schema.safeParse("1e10").success).toBe(true);
    });

    it("should handle very small positive numbers", () => {
      expect(schema.safeParse("0.000001").success).toBe(true);
      expect(schema.safeParse("1e-10").success).toBe(true);
    });

    it("successfully parses Infinity (parseFloat behavior)", () => {
      const result = schema.safeParse("Infinity");
      expect(result.success).toBe(true);
    });

    it("fails when parsing -Infinity", () => {
      const result = schema.safeParse("-Infinity");
      expect(result.success).toBe(false);
    });

    it("fails when parsing NaN", () => {
      const result = schema.safeParse("NaN");
      expect(result.success).toBe(false);
    });

    it("should handle leading and trailing whitespace in numbers", () => {
      // parseFloat handles whitespace, so these successfully parses   expect(schema.safeParse(" 5 ").success).toBe(true);
      expect(schema.safeParse("  10.5  ").success).toBe(true);
    });

    it("successfully parses mixed alphanumeric strings starting with numbers (parseFloat behavior)", () => {
      // parseFloat("5abc") returns 5, which is >= 0
      const result = schema.safeParse("5abc");
      expect(result.success).toBe(true);
    });

    it("fails when parsing strings with numbers at the end", () => {
      const result = schema.safeParse("abc5");
      expect(result.success).toBe(false);
    });

    it("should handle scientific notation", () => {
      expect(schema.safeParse("1e2").success).toBe(true); // 100
      expect(schema.safeParse("5e-1").success).toBe(true); // 0.5
    });
  });

  describe("error message formatting", () => {
    it("should format error message correctly for positive minimum", () => {
      const schema = NumberSchema(5);
      const result = schema.safeParse("3");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than 4.",
        );
      }
    });

    it("should format error message correctly for zero minimum", () => {
      const schema = NumberSchema(0);
      const result = schema.safeParse("-1");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than -1.",
        );
      }
    });

    it("should format error message correctly for negative minimum", () => {
      const schema = NumberSchema(-10);
      const result = schema.safeParse("-15");
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Must be a number greater than -11.",
        );
      }
    });
  });
});
