import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import { CONFIG_KEYS } from "@/lib/definitions";
import { validateConfigRows } from "@/lib/validation";

describe("validateConfigRows", () => {
  const createConfigRow = (key: string, value = "test") => ({
    id: faker.string.uuid(),
    key,
    value,
  });

  const createValidConfig = () =>
    CONFIG_KEYS.map((key) => createConfigRow(key));

  it("returns false if the config data is empty", () => {
    expect(validateConfigRows([])).toBe(false);
  });

  it("returns false if the config data is missing a key", () => {
    expect(validateConfigRows([createConfigRow("test")])).toBe(false);
  });

  it("returns true when all required config keys are present", () => {
    expect(validateConfigRows(createValidConfig())).toBe(true);
  });

  it("returns false when config data has fewer keys than required", () => {
    const incompleteConfig = [
      createConfigRow("timezone"),
      createConfigRow("connection_host"),
    ];
    expect(validateConfigRows(incompleteConfig)).toBe(false);
  });

  it("returns false when config data has more keys than required", () => {
    const extraConfig = [...createValidConfig(), createConfigRow("extra_key")];
    expect(validateConfigRows(extraConfig)).toBe(false);
  });

  it("returns false when config has correct length but invalid keys", () => {
    const invalidConfig = [
      createConfigRow("invalid_key1"),
      createConfigRow("invalid_key2"),
      createConfigRow("invalid_key3"),
      createConfigRow("invalid_key4"),
    ];
    expect(validateConfigRows(invalidConfig)).toBe(false);
  });

  it("returns false when some keys are valid and some are invalid", () => {
    const mixedConfig = [
      createConfigRow("timezone"),
      createConfigRow("connection_host"),
      createConfigRow("invalid_key1"),
      createConfigRow("invalid_key2"),
    ];
    expect(validateConfigRows(mixedConfig)).toBe(false);
  });

  it("returns false when required keys are missing but other valid keys exist", () => {
    const partialValidConfig = [
      createConfigRow("timezone"),
      createConfigRow("connection_host"),
      createConfigRow("connection_port"),
    ];
    expect(validateConfigRows(partialValidConfig)).toBe(false);
  });

  it("returns false for single invalid key", () => {
    expect(validateConfigRows([createConfigRow("nonexistent_key")])).toBe(
      false,
    );
  });
});
