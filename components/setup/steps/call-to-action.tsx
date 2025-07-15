import { Check, Loader2, Save } from "lucide-react";
import { type ReactNode, useContext } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StepContext } from "../setup-wizard";

type CallToActionProps = {
  handleSave: () => void;
  saved: boolean;
  error: unknown;
};

type CallToActionState = {
  status: "error" | "saved" | "loading" | "idle";
  message: string;
  buttonIcon: ReactNode;
  buttonText: string;
  styling: string;
};

export const CallToAction = ({
  handleSave,
  saved,
  error,
}: CallToActionProps) => {
  const { loading } = useContext(StepContext);

  const getState = (): CallToActionState => {
    if (error)
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
        buttonIcon: <Save />,
        buttonText: "Save",
        styling: "border-red-500/50 bg-red-50 text-red-700",
      };

    if (saved && !loading)
      return {
        status: "saved",
        message: "Saved! Click Next to continue.",
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
        styling: "border-amber-500/50 bg-amber-50 text-amber-700",
      };

    return {
      status: "idle",
      message: "If this looks okay, click Save, and then Next.",
      buttonIcon: <Save />,
      buttonText: "Save",
      styling: "border-indigo-500/50 bg-indigo-50 text-indigo-700",
    };
  };

  const state = getState();

  return (
    <div
      className={cn(
        "flex flex-row gap-2 p-1 justify-between items-center border-1 rounded-lg",
        state.styling,
      )}
    >
      <p className="pl-2 text-sm">{state.message}</p>
      <Button
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
