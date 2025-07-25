import { cva } from "class-variance-authority";
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
  buttonIcon: ReactNode;
  buttonText: string;
};

const messageVariants = cva(
  "flex flex-1 self-stretch items-center gap-2 px-2 border-1 rounded-lg rounded-r-none border-r-0 transition-colors",
  {
    variants: {
      status: {
        error: "border-red-500/50 bg-red-50 text-red-700",
        saved: "border-emerald-400 bg-emerald-50 text-emerald-700",
        unsaved: "border-amber-400 bg-amber-50 text-amber-700",
        loading: "border-orange-500/50 bg-orange-50 text-orange-700",
        dirty: "border-amber-400 bg-amber-50 text-amber-700",
        empty: "border-blue-500/50 bg-blue-50 text-blue-600",
        idle: "border-zinc-400 bg-zinc-50 text-zinc-600",
      },
    },
    defaultVariants: {
      status: "idle",
    },
  },
);

const buttonVariants = cva("rounded-l-none min-w-24 transition-colors", {
  variants: {
    status: {
      error: "bg-red-500 hover:bg-red-700",
      saved: "",
      unsaved: "",
      loading: "bg-orange-500",
      dirty: "bg-amber-500 hover:bg-amber-400",
      empty: "bg-blue-500 hover:bg-blue-400",
      idle: "bg-zinc-400 hover:bg-zinc-400 disabled:bg-zinc-400 disabled:opacity-100",
    },
  },
  defaultVariants: {
    status: "idle",
  },
});

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

    if (saved && !loading)
      return {
        status: "saved",
        message: isLastStep
          ? "Saved! Click Complete to finish the setup process."
          : "Saved! Click Next to continue.",
        buttonIcon: <Check />,
        buttonText: "Saved",
      };

    if (loading)
      return {
        status: "loading",
        message: "Saving...",
        buttonIcon: <Loader2 className="animate-spin" />,
        buttonText: "Saving",
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
        disabled={loading}
      >
        {buttonIcon}
        {buttonText}
      </Button>
    </div>
  );
};
