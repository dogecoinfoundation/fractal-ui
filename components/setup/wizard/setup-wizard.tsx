"use client";

import { useCallback, useMemo, useState } from "react";
import { Separator } from "@/components/separator";
import {
  type ConfigStateWithLoading,
  getConfigState,
} from "@/components/setup/wizard/config-state";
import { WizardProgress } from "@/components/setup/wizard/progress/wizard-progress";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SetupContext, steps } from "@/context/setup-context";
import type { Config } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import { cn } from "@/lib/utils";

export const SetupWizard = () => {
  const {
    mutate: refreshConfigData,
    data: configData,
    isLoading,
  } = useAPI<Config[]>("/api/config");

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [configState, setConfigState] = useState<ConfigStateWithLoading>({
    configState: getConfigState(configData || []),
    isLoading: true,
  });

  const totalSteps = steps.length;

  useMemo(
    () =>
      setConfigState({
        configState: getConfigState(configData || []),
        isLoading,
      }),
    [configData, isLoading],
  );

  const previousStep = useCallback(() => {
    refreshConfigData();
    setCurrentStep((previousState) => Math.max(previousState - 1, 0));
  }, [refreshConfigData]);

  const nextStep = useCallback(() => {
    refreshConfigData();
    setCurrentStep((previousState) =>
      Math.min(previousState + 1, Object.keys(steps).length - 1),
    );
  }, [refreshConfigData]);

  const setStep = useCallback(
    (stepIndex: number) => {
      refreshConfigData();
      setCurrentStep(stepIndex);
    },
    [refreshConfigData],
  );

  const stepContextValue = useMemo(
    () => ({
      steps: steps.map((step) => ({
        key: step.key,
        title: step.title,
      })),
      totalSteps,
      currentStep,
      previousStep,
      progress: (currentStep / (totalSteps - 1)) * 100,
      nextStep,
      setStep,
      loading,
      setLoading,
      refreshConfigData,
    }),
    [
      totalSteps,
      currentStep,
      previousStep,
      nextStep,
      setStep,
      loading,
      refreshConfigData,
    ],
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const StepComponent = steps[currentStep].component;

  return (
    <SetupContext value={stepContextValue}>
      <div className="bg-black/80 w-full min-h-full flex items-center justify-center">
        <Card className="m-2 w-1/2 min-h-3/4 justify-between">
          <CardHeader className="gap-3">
            <CardTitle>First Time Setup</CardTitle>
            <WizardProgress configState={configState} />
          </CardHeader>
          <Separator />

          <CardContent className="flex flex-col flex-1 gap-4 items-start">
            <StepComponent />
          </CardContent>

          <Separator />
          <CardFooter
            className={cn(
              "flex",
              !isFirstStep ? "justify-between" : "justify-end",
            )}
          >
            {!isFirstStep && (
              <Button onClick={previousStep} disabled={loading}>
                Previous
              </Button>
            )}
            <Button
              onClick={isLastStep ? () => window.location.reload() : nextStep}
              disabled={loading}
            >
              {isLastStep ? "Complete" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </SetupContext>
  );
};
