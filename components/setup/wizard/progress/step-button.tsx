import { cva } from "class-variance-authority";
import { Check, LoaderPinwheel, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type StepButtonProps = {
  isActive: boolean;
  label: string;
  isLoading: boolean;
  onClick: () => void;
  isValid: boolean;
};

type ButtonVariant =
  | "loading"
  | "activeInvalid"
  | "activeValid"
  | "inactiveInvalid"
  | "inactiveValid";

const buttonVariants = cva(
  "flex flex-row items-center z-10 transition-colors cursor-pointer border-1 rounded-xs border-zinc-200 text-zinc-500 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        loading: "border-zinc-300 bg-zinc-50 text-zinc-500",
        activeInvalid:
          "border-yellow-400 bg-yellow-50 text-yellow-600 hover:bg-yellow-400 hover:text-yellow-50",
        activeValid:
          "border-emerald-500 bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-emerald-50",
        inactiveInvalid:
          "border-zinc-300 bg-zinc-50 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-500",
        inactiveValid:
          "border-zinc-300 bg-zinc-50 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-500",
      },
    },
  },
);

const iconVariants = cva(
  "flex flex-row items-center self-stretch px-1 py-0.75 [&>svg]:size-4",
  {
    variants: {
      variant: {
        loading: "bg-zinc-200 text-zinc-400 [&>svg]:animate-spin",
        activeInvalid: "bg-yellow-400 text-white",
        activeValid: "bg-emerald-500 text-emerald-50",
        inactiveInvalid: "bg-zinc-200 text-zinc-400",
        inactiveValid: "bg-zinc-200 text-zinc-400",
      },
    },
  },
);

const StatusIcon = ({
  variant,
  className,
}: {
  variant: ButtonVariant;
  className?: string;
}) => {
  let IconComponent = TriangleAlert;

  if (variant === "loading") IconComponent = LoaderPinwheel;
  if (variant === "activeInvalid") IconComponent = TriangleAlert;
  if (variant === "activeValid") IconComponent = Check;
  if (variant === "inactiveInvalid") IconComponent = TriangleAlert;
  if (variant === "inactiveValid") IconComponent = Check;

  return (
    <div className={className}>
      <IconComponent />
    </div>
  );
};

const getButtonVariant = (
  isLoading: boolean,
  isActive: boolean,
  isValid: boolean,
): ButtonVariant => {
  if (isLoading) return "loading";

  if (isActive && !isValid) return "activeInvalid";
  if (isActive && isValid) return "activeValid";

  if (!isActive && !isValid) return "inactiveInvalid";
  if (!isActive && isValid) return "inactiveValid";

  return "inactiveInvalid";
};

export const StepButton = ({
  isActive,
  label,
  isLoading,
  onClick,
  isValid,
}: StepButtonProps) => {
  const variant = getButtonVariant(isLoading, isActive, isValid);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={cn(buttonVariants({ variant }))}
    >
      <StatusIcon variant={variant} className={cn(iconVariants({ variant }))} />
      <div className="flex flex-row items-center text-xs px-1.5 py-0.5">
        <p className="leading-tight">{label} </p>
      </div>
    </button>
  );
};
