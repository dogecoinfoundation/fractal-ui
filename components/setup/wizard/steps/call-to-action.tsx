import { Check, Loader2, Save } from "lucide-react";
import { type ReactNode, useContext } from "react";
import { SetupContext } from "@/components/setup/setup-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CallToActionProps = {
  handleSave: () => void;
  saved: boolean;
  error: unknown;
  isDirty: boolean;
  isEmpty: boolean;
  isLastStep?: boolean;
};

type CallToActionState = {
  status:
    | "error"
    | "saved"
    | "unsaved"
    | "loading"
    | "dirty"
    | "empty"
    | "idle";
  message: string;
  messageStyling: string;
  buttonIcon: ReactNode;
  buttonText: string;
  buttonStyling: string;
};

export const CallToAction = ({
  handleSave,
  saved,
  error,
  isDirty,
  isEmpty,
  isLastStep = false,
}: CallToActionProps) => {
  const { loading } = useContext(SetupContext);

  const getState = (): CallToActionState => {
    if (error)
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
        messageStyling: "border-red-500/50 bg-red-50 text-red-700",
        buttonIcon: <Save />,
        buttonText: "Save",
        buttonStyling: "bg-red-500 hover:bg-red-700",
      };

    if (isDirty)
      return {
        status: "dirty",
        message: "You have unsaved changes.",
        messageStyling: "border-amber-400 bg-amber-50 text-amber-700",
        buttonIcon: <Save />,
        buttonText: "Save",
        buttonStyling: "bg-amber-500 hover:bg-amber-400",
      };

    if (isEmpty) {
      return {
        status: "empty",
        message: "Please fill in the details above.",
        messageStyling: "border-blue-500/50 bg-blue-50 text-blue-600",
        buttonIcon: <Save />,
        buttonText: "Save",
        buttonStyling: "bg-blue-400 hover:bg-blue-300",
      };
    }

    if (saved && !loading)
      return {
        status: "saved",
        message: isLastStep
          ? "Saved! Click Complete to finish the setup process."
          : "Saved! Click Next to continue.",
        messageStyling: "border-emerald-400 bg-emerald-50 text-emerald-700",
        buttonIcon: <Check />,
        buttonText: "Saved",
        buttonStyling: "",
      };

    if (loading)
      return {
        status: "loading",
        message: "Saving...",
        messageStyling: "border-orange-500/50 bg-orange-50 text-orange-700",
        buttonIcon: <Loader2 className="animate-spin" />,
        buttonText: "Saving",
        buttonStyling: "bg-orange-500",
      };

    return {
      status: "idle",
      message: "Everything looks good.",
      messageStyling: "border-zinc-400 bg-zinc-50 text-zinc-600",
      buttonIcon: <Save />,
      buttonText: "Save",
      buttonStyling:
        "bg-zinc-400 hover:bg-zinc-400 disabled:bg-zinc-400 disabled:opacity-100",
    };
  };

  const state = getState();

  return (
    <div className="flex flex-row justify-between items-center">
      <div
        className={cn(
          "flex flex-1 self-stretch items-center gap-2 px-2 border-1 rounded-lg rounded-r-none border-r-0 transition-colors",
          state.messageStyling,
        )}
      >
        <p className="text-sm font-medium leading-loose">{state.message}</p>
      </div>
      <Button
        className={cn(
          "rounded-l-none min-w-22 transition-colors",
          state.buttonStyling,
        )}
        variant={error ? "destructive" : "creative"}
        onClick={handleSave}
        disabled={loading}
      >
        {state.buttonIcon}
        {state.buttonText}
      </Button>
    </div>
  );
};
