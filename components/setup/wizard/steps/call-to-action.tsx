import { cva } from "class-variance-authority";
import { Check, Loader2, Save } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CallToActionProps = {
  handleSave: () => void;
  saved: boolean;
  error: unknown;
  isDirty: boolean;
  isEmpty: boolean;
  isLoading: boolean;
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
  buttonIcon: ReactNode;
  buttonText: string;
};

const messageVariants = cva(
  "flex flex-1 self-stretch items-center gap-2 px-2 border-1 rounded-l-sm rounded-r-none border-r-0 transition-colors",
  {
    variants: {
      status: {
        error: "border-red-500/50 bg-red-50 text-red-700",
        saved: "border-emerald-400 bg-emerald-50 text-emerald-700",
        unsaved: "border-amber-400 bg-amber-50 text-amber-700",
        loading: "border-orange-500/50 bg-orange-50 text-orange-700",
        dirty: "border-amber-400 bg-amber-50 text-amber-700",
        empty: "border-blue-500/50 bg-blue-50 text-blue-600",
        idle: "border-zinc-300 bg-zinc-50 text-zinc-400",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  },
);

const buttonVariants = cva(
  "rounded-l-none rounded-r-sm min-w-24 transition-colors",
  {
    variants: {
      status: {
        error: "bg-red-500 hover:bg-red-700",
        saved: "",
        unsaved: "",
        loading: "bg-orange-500",
        dirty: "bg-amber-500 hover:bg-amber-400",
        empty: "bg-blue-500 hover:bg-blue-400",
        idle: "bg-zinc-300 hover:bg-zinc-300 disabled:bg-zinc-300 disabled:opacity-100",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  },
);

export const CallToAction = ({
  handleSave,
  saved,
  error,
  isDirty,
  isEmpty,
  isLoading,
}: CallToActionProps) => {
  const getState = (): CallToActionState => {
    if (isLoading)
      return {
        status: "loading",
        message: "Loading...",
        buttonIcon: <Loader2 className="animate-spin" />,
        buttonText: "Saving",
      };

    if (error)
      return {
        status: "error",
        message: "Something went wrong. Please try again.",
        buttonIcon: <Save />,
        buttonText: "Save",
      };

    if (isDirty)
      return {
        status: "dirty",
        message: "You have unsaved changes.",
        buttonIcon: <Save />,
        buttonText: "Save",
      };

    if (isEmpty) {
      return {
        status: "empty",
        message: "Please fill in the details above.",
        buttonIcon: <Save />,
        buttonText: "Save",
      };
    }

    if (saved && !isLoading)
      return {
        status: "saved",
        message: "Saved successfully!",
        buttonIcon: <Check />,
        buttonText: "Saved",
      };

    return {
      status: "idle",
      message: "Everything looks good.",
      buttonIcon: <Save />,
      buttonText: "Save",
    };
  };

  const { status, message, buttonIcon, buttonText } = getState();

  return (
    <div className="flex flex-row justify-between items-center">
      <div className={cn(messageVariants({ status }))}>
        <p className="text-sm font-medium leading-loose">{message}</p>
      </div>
      <Button
        className={cn(buttonVariants({ status }))}
        variant={error ? "destructive" : "creative"}
        onClick={handleSave}
        disabled={isLoading}
      >
        {buttonIcon}
        {buttonText}
      </Button>
    </div>
  );
};
