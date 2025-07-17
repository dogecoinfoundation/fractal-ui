import { SetupCard } from "@/components/setup/setup-card";

export const Connection = () => {
  return (
    <SetupCard
      cardDescription="Connection"
      onComplete={() => window.location.reload()}
    >
      <h2>Connection</h2>
      <p>etc</p>
          <ConnectionFormField
            control={form.control}
            name="host"
            label="Host"
            className="grid col-span-2"
          />
          <ConnectionFormField
            control={form.control}
            name="port"
            label="Port"
            inputType="number"
            className="grid col-span-1"
          />

          <ConnectionFormField
            control={form.control}
            name="token"
            label="Token"
            className="grid col-span-3"
          />
          <TestConnection
            loading={loading}
            isValid={form.formState.isValid}
            host={host}
            port={port}
            token={token}
          />
    </SetupCard>
  );
};
