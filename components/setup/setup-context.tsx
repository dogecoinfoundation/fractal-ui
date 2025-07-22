import { createContext, type ReactNode } from "react";
import { Welcome } from "@/components/setup/wizard/steps/00-welcome";
import { General } from "@/components/setup/wizard/steps/01-general";
import { Connection } from "@/components/setup/wizard/steps/02-connection";

type SetupContextType = {
  steps: Pick<Step, "key" | "title">[];
  totalSteps: number;
  currentStep: number;
  progress: number;
  previousStep: () => void;
  nextStep: () => void;
  setStep: (stepIndex: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  refreshConfigData: () => void;
  disableNextStep?: boolean;
};

export const SetupContext = createContext<SetupContextType>({
  steps: [],
  totalSteps: 0,
  currentStep: 0,
  progress: 0,
  previousStep: () => {},
  nextStep: () => {},
  setStep: () => {},
  loading: false,
  setLoading: () => {},
  refreshConfigData: () => {},
  disableNextStep: false,
});

type Step = {
  key: string;
  title: string;
  description: string;
  component: ReactNode;
};

export const steps: Step[] = [
  {
    key: "welcome",
    title: "Welcome",
    description:
      "Welcome to the Fractal Engine Administration UI setup wizard!",
    component: <Welcome key="welcome" />,
  },
  {
    key: "general",
    title: "General",
    description: "General",
    component: <General key="general" />,
  },
  {
    key: "connection",
    title: "Connection",
    description: "Connection",
    component: <Connection key="connection" />,
  },
];
