import { ConnectionForm } from "@/components/settings/connection/connection-form";

export const Connection = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full flex-1 gap-4">
      <h2 className="text-lg font-semibold">
        Let's connect to your Fractal Engine instance.
      </h2>
      <ConnectionForm />
    </div>
  );
};
