import type { HTMLInputTypeAttribute } from "react";
import type { Control, Path } from "react-hook-form";
import type z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputFormFieldProps<T extends z.ZodType> {
  control: Control<z.infer<T>>;
  name: Path<z.infer<T>>;
  label: string;
  className?: string;
  inputType?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
}

export const InputFormField = <T extends z.ZodType>({
  control,
  name,
  label,
  className,
  inputType = "text",
  placeholder = "",
  required = false,
}: InputFormFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          <FormLabel htmlFor={name}>
            <span className="flex gap-1">
              {label}
              {required ? <span className="text-rose-400">*</span> : null}
            </span>
            <FormMessage />
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={inputType} {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
