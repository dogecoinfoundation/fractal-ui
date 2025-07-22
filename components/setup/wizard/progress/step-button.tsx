import { Check, LoaderPinwheel, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type StepButtonProps = {
  isActive: boolean;
  label: string;
  isLoading: boolean;
  onClick: () => void;
  isValid: boolean;
};

const getButtonStyles = (isActive: boolean, isValid: boolean) => {
  const activeInvalid = isActive && !isValid;
  const activeValid = isActive && isValid;
  const inactive = !isActive;

  return cn(
    activeInvalid
      ? "border-yellow-400 bg-yellow-50 text-yellow-600 [&>#status-icon]:bg-yellow-400 [&>#status-icon]:text-white"
      : null,
    activeValid
      ? "border-emerald-500 bg-emerald-50 text-emerald-600 [&>#status-icon]:bg-emerald-500 [&>#status-icon]:text-emerald-50"
      : null,
    inactive
      ? "border-zinc-300 bg-zinc-50 text-zinc-500 [&>#status-icon]:bg-zinc-200 [&>#status-icon]:text-zinc-400"
      : null,
  );
};

export const StepButton = ({
  isActive,
  label,
  isLoading,
  onClick,
  isValid,
}: StepButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "flex flex-row items-center z-10 transition-colors duration-300 cursor-pointer border-1 rounded-xs border-zinc-200 text-zinc-500 disabled:cursor-not-allowed",
        getButtonStyles(isActive, isValid),
      )}
    >
      <div id="status-icon" className="self-stretch px-1 py-0.5 [&>svg]:size-4">
        {isLoading ? (
          <LoaderPinwheel className="animate-spin" />
        ) : isValid ? (
          <Check />
        ) : (
          <TriangleAlert />
        )}
      </div>
      <div className="flex flex-row items-center px-1.5 py-0.5 text-xs">
        <p className="leading-tight">{label} </p>
      </div>
    </button>
  );
};
