"use client";

import { createContext, type ReactNode, useCallback, useState } from "react";
import { Welcome } from "@/components/setup/steps/00-welcome";
import { General } from "@/components/setup/steps/01-general";
import { Connection } from "@/components/setup/steps/02-connection";

type StepContextShape = {
  totalSteps: number;
  currentStep: number;
  previousStep: () => void;
  nextStep: () => void;
};

export const StepContext = createContext<StepContextShape>({
  totalSteps: 0,
  currentStep: 0,
  previousStep: () => {},
  nextStep: () => {},
});

export const SetupWizard = () => {
  const steps: ReactNode[] = [
    <Welcome key="welcome" />,
    <General key="general" />,
    <Connection key="connection" />,
  ];
  const totalSteps = steps.length;

  const [currentStep, setCurrentStep] = useState<number>(0);

  const previousStep = useCallback(() => {
    setCurrentStep((previousState) => Math.max(previousState - 1, 0));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((previousState) =>
      Math.min(previousState + 1, Object.keys(steps).length - 1),
    );
  }, []);

  return (
    <StepContext value={{ totalSteps, currentStep, previousStep, nextStep }}>
      <div className="bg-black/80 w-full min-h-full flex items-center justify-center">
        {steps[currentStep]}
      </div>
    </StepContext>
  );
};
