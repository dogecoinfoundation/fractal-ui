import { SetupCard } from "@/components/setup/setup-card";

export const Connection = () => {
  return (
    <SetupCard
      cardDescription="Connection"
      onComplete={() => window.location.reload()}
    >
      <h2>Connection</h2>
      <p>etc</p>
    </SetupCard>
  );
};
