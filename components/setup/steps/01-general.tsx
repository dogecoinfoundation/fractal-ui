import { SetupCard } from "@/components/setup/setup-card";

export const General = () => {
  return (
    <SetupCard
      cardDescription="General"
      cardContent={
        <>
          <h2>Welcome to the Fractal Engine Administration UI setup wizard!</h2>
          <p>Timezone</p>
        </>
      }
    />
  );
};
