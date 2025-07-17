import type { HTMLInputTypeAttribute } from "react";
import type { Control } from "react-hook-form";
import type z from "zod";
import type { FormSchema } from "@/components/setup/steps/02-connection";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ConnectionFormFieldProps {
  control: Control<z.infer<typeof FormSchema>>;
  name: keyof z.infer<typeof FormSchema>;
  label: string;
  className?: string;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export const ConnectionFormField = ({
  control,
  name,
  label,
  className,
  inputType = "text",
  placeholder = "",
}: ConnectionFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel htmlFor={name}>
            {label} <FormMessage />
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={inputType} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
