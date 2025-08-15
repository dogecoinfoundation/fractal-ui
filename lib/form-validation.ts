import z from "zod";

export const NumberSchema = (minimumValue: number) =>
  z.string().refine((value) => parseFloat(value) >= minimumValue, {
    error: `Must be a number greater than ${minimumValue - 1}.`,
  });
