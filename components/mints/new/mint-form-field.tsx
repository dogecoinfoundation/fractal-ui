import type { HTMLInputTypeAttribute } from "react";
import type { Control } from "react-hook-form";
import type z from "zod";
import type { FormSchema } from "@/components/mints/new/mint-new-asset-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface MintFormFieldProps {
  control: Control<z.infer<typeof FormSchema>>;
  name: keyof z.infer<typeof FormSchema>;
  label: string;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export const MintFormField = ({
  control,
  name,
  label,
  inputType = "text",
  placeholder = "",
}: MintFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={inputType} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
