"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import { Welcome } from "@/components/setup/wizard/steps/00-welcome";
import { General } from "@/components/setup/wizard/steps/01-general";
import { Connection } from "@/components/setup/wizard/steps/02-connection";
import { Config } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import { cn } from "@/lib/utils";
import { Separator } from "../separator";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { WizardProgress } from "../wizard-progress";
import { getConfigDataState } from "./config-context";

type StepContextType = {
  stepTitles: string[];
  totalSteps: number;
  currentStep: number;
  previousStep: () => void;
  nextStep: () => void;
  setStep: (stepIndex: number) => void;
  disableNextStep?: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const StepContext = createContext<StepContextType>({
  stepTitles: [],
  totalSteps: 0,
  currentStep: 0,
  previousStep: () => {},
  nextStep: () => {},
  setStep: () => {},
  disableNextStep: false,
  loading: false,
  setLoading: () => {},
});

type ConfigState = {
  group: string;
  valid: boolean;
};

type Step = {
  title: string;
  description: string;
  component: ReactNode;
};

const steps: Step[] = [
  {
    title: "Welcome",
    description:
      "Welcome to the Fractal Engine Administration UI setup wizard!",
    component: <Welcome key="welcome" />,
  },
  {
    title: "General",
    description: "General",
    component: <General key="general" />,
  },
  {
    title: "Connection",
    description: "Connection",
    component: <Connection key="connection" />,
  },
];

export const SetupWizard = () => {
  const {
    mutate: refreshConfigData,
    data: configData,
    isLoading,
    error,
  } = useAPI<Config[]>("/api/config");

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [configState, setConfigState] = useState<ConfigState[]>([]);
  const totalSteps = steps.length;

  useMemo(
    () => setConfigState(getConfigDataState(configData || [])),
    [configData],
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

  const setStep = useCallback((stepIndex: number) => {
    setCurrentStep(stepIndex);
  }, []);

  const stepContextValue = useMemo(
    () => ({
      stepTitles: steps.map((step) => step.title),
      totalSteps,
      currentStep,
      previousStep,
      nextStep,
      setStep,
      loading,
      setLoading,
    }),
    [totalSteps, currentStep, previousStep, nextStep, setStep, loading],
  );

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <StepContext value={stepContextValue}>
      <div className="bg-black/80 w-full min-h-full flex items-center justify-center">
        <Card className="m-2 w-1/2 min-h-3/4 justify-between">
          <CardHeader className="gap-3">
            <CardTitle>First Time Setup</CardTitle>
            <WizardProgress />
          </CardHeader>
          <Separator />

          <CardContent className="flex flex-col flex-1 gap-4 items-start">
            <pre className="text-xs font-normal">
              <code>{JSON.stringify(configState, null, 2)}</code>
            </pre>
            {steps[currentStep].component}
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
              onClick={isLastStep ? window.location.reload : nextStep}
              disabled={loading}
            >
              {isLastStep ? "Complete" : "Next"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </StepContext>
  );
};
