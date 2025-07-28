import { TimezoneForm } from "@/components/settings/timezone/timezone-form";

export const Timezone = () => {
  return (
    <div className="flex flex-col justify-between h-full w-full flex-1 gap-4">
      <h2 className="text-lg font-semibold">Set your preferred timezone.</h2>
      <TimezoneForm />
    </div>
  );
};
