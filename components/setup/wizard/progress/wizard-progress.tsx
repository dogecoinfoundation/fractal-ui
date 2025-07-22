import { useContext } from "react";
import { SetupContext } from "@/components/setup/setup-context";
import type {
  ConfigState,
  ConfigStateWithLoading,
} from "@/components/setup/wizard/config-state";
import { StepButton } from "@/components/setup/wizard/progress/step-button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type WizardProgressProps = {
  configState: ConfigStateWithLoading;
};

export const WizardProgress = ({
  configState: { configState, isLoading },
}: WizardProgressProps) => {
  const { totalSteps, currentStep, setStep, steps, progress } =
    useContext(SetupContext);
  const allValid = Object.values(configState).every((value) => value === true);

  return (
    <div className="relative flex flex-row justify-between items-center gap-2 text-sm font-semibold">
      <Progress
        value={progress}
        max={totalSteps}
        className="absolute z-0 h-0.5 bg-zinc-200"
        indicatorClassName={cn(
          "duration-400",
          allValid ? "bg-emerald-500" : "bg-yellow-400",
        )}
      />
      {steps.map(({ key, title }, index) => (
        <StepButton
          key={key}
          label={title}
          isLoading={isLoading}
          isActive={index <= currentStep}
          isValid={key === "welcome" || configState[key as keyof ConfigState]}
          onClick={() => setStep(index)}
        />
      ))}
    </div>
  );
};
