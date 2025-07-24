import { type ComponentType, createContext } from "react";
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
  component: ComponentType;
};

export const steps: Step[] = [
  {
    key: "welcome",
    title: "Welcome",
    component: Welcome,
  },
  {
    key: "general",
    title: "General",
    component: General,
  },
  {
    key: "connection",
    title: "Connection",
    component: Connection,
  },
];
