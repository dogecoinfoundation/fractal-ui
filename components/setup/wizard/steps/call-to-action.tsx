import { Check, Loader2, Save } from "lucide-react";
import { type ReactNode, useContext } from "react";
import { SetupContext } from "@/components/setup/wizard/setup-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CallToActionProps = {
  handleSave: () => void;
  saved: boolean;
  error: unknown;
  isLastStep?: boolean;
};

type CallToActionState = {
  status: "error" | "saved" | "unsaved" | "loading" | "idle";
  message: string;
  buttonIcon: ReactNode;
  buttonText: string;
  styling: string;
};

export const CallToAction = ({
  handleSave,
  saved,
  error,
  isLastStep = false,
}: CallToActionProps) => {
  const { loading } = useContext(SetupContext);

  const getState = (): CallToActionState => {
    if (error)
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
        buttonIcon: <Save />,
        buttonText: "Save",
        styling: "border-red-500/50 bg-red-50 text-red-700",
      };

    if (!saved)
      return {
        status: "unsaved",
        message: "You have unsaved changes.",
        buttonIcon: <Save />,
        buttonText: "Save",
        styling: "border-amber-500/50 bg-amber-50 text-amber-700",
      };

    if (saved && !loading)
      return {
        status: "saved",
        message: isLastStep
          ? "Saved! Click Complete to finish the setup process."
          : "Saved! Click Next to continue.",
        buttonIcon: <Check />,
        buttonText: "Saved",
        styling: "border-emerald-500/50 bg-emerald-50 text-emerald-700",
      };

    if (loading)
      return {
        status: "loading",
        message: "Saving...",
        buttonIcon: <Loader2 className="animate-spin" />,
        buttonText: "Saving",
        styling: "border-orange-500/50 bg-orange-50 text-orange-700",
      };

    return {
      status: "idle",
      message: `If this looks okay, click Save, and then ${
        isLastStep ? "Complete" : "Next"
      }.`,
      buttonIcon: <Save />,
      buttonText: "Save",
      styling: "border-indigo-500/50 bg-indigo-50 text-indigo-700",
    };
  };

  const state = getState();

  return (
    <div className="flex flex-row justify-between items-center">
      <div
        className={cn(
          "flex flex-1 self-stretch items-center border-1 rounded-lg rounded-r-none border-r-0",
          state.styling,
        )}
      >
        <p className="pl-2 text-sm font-medium leading-loose">
          {state.message}
        </p>
      </div>
      <Button
        className="rounded-l-none"
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
