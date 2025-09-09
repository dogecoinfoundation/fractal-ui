import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const walletItemContainerVariants = cva(
  "flex flex-row items-center flex-1 border-1 rounded-sm",
  {
    variants: {
      variant: {
        blue: "border-blue-700/20",
        green: "border-green-700/20",
        amber: "border-amber-700/20",
      },
    },
  },
);

const walletItemLabelVariants = cva("min-w-28 p-2 font-semibold border-r-1", {
  variants: {
    variant: {
      blue: "border-blue-900/10 bg-blue-100 text-blue-800",
      green: "border-green-900/10 bg-green-100 text-green-800",
      amber: "border-amber-900/10 bg-amber-100 text-amber-800",
    },
  },
});

const walletItemValueVariants = cva("flex-1 p-2 font-mono tabular-nums", {
  variants: {
    variant: {
      blue: "border-blue-50 bg-blue-50 text-blue-900",
      green: "border-green-50 bg-green-50 text-green-900",
      amber: "border-amber-50 bg-amber-50 text-amber-900",
    },
  },
});

export const WalletItem = ({
  label,
  value,
  variant,
  extraClasses,
}: {
  label: string;
  value: string;
  variant: "blue" | "green" | "amber";
  extraClasses?: string;
}) => {
  return (
    <div
      className={`${cn(walletItemContainerVariants({ variant }))} ${extraClasses}`}
    >
      <div className={cn(walletItemLabelVariants({ variant }))}>{label}</div>

      {value != "" && (
        <div className={cn(walletItemValueVariants({ variant }))}>{value}</div>
      )}
    </div>
  );
};
