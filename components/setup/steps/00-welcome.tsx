import { SetupCard } from "@/components/setup/setup-card";

export const Welcome = () => {
  return (
    <SetupCard
      cardDescription="Welcome"
      cardContent={
        <>
          <h2>Welcome to the Fractal Engine Administration UI setup wizard!</h2>
          <p>
            This will guide you through the process of setting up some
            configuration information, as well as connecting to your Fractal
            Engine instance.
          </p>
          <p>
            Please click <span className="font-semibold">Next</span> to
            continue.
          </p>
        </>
      }
    />
  );
};
