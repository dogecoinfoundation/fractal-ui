import { type ReactNode, useContext } from "react";
import { Separator } from "@/components/separator";
import { StepContext } from "@/components/setup/setup-wizard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SetupCardProps = {
  cardDescription: string;
  cardContent: ReactNode;
  onComplete?: () => void;
};

export const SetupCard = ({
  cardDescription,
  cardContent,
  onComplete,
}: SetupCardProps) => {
  const { totalSteps, currentStep, previousStep, nextStep } =
    useContext(StepContext);

  const isFirstStep = currentStep === 0;
  const setupProgress = `Step ${currentStep + 1} of ${totalSteps}`;

  return (
    <Card className="m-2 w-1/2 min-h-3/4 justify-between">
      <CardHeader>
        <CardTitle>First Time Setup</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
        <CardAction className="text-zinc-500 text-sm">
          {setupProgress}
        </CardAction>
      </CardHeader>
      <Separator />

      <CardContent className="flex flex-col flex-1 gap-2 items-start">
        {cardContent}
      </CardContent>

      <Separator />
      <CardFooter
        className={cn("flex", !isFirstStep ? "justify-between" : "justify-end")}
      >
        {!isFirstStep && <Button onClick={previousStep}>Previous</Button>}
        <Button onClick={onComplete ? onComplete : nextStep}>
          {onComplete ? "Complete" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};
