import { useContext, useEffect, useState } from "react";
import {
  allTimezones,
  type ITimezoneOption,
  useTimezoneSelect,
} from "react-timezone-select";
import { MintTimestamp } from "@/components/mints/mint-card";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/kibo-ui/combobox";
import { Paper } from "@/components/ui/surfaces/Paper";
import type { Config } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import { StepContext } from "../wizard/setup-wizard";
import { CallToAction } from "./call-to-action";

export const General = () => {
  const { data, mutate, error } = useAPI<Config[]>(
    "/api/config?configKey=timezone",
  );
  const { loading, setLoading } = useContext(StepContext);

  const timezones = { ...allTimezones, "Australia/Melbourne": "Melbourne" };
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle: "original",
    timezones,
  });

  const [timezone, setTimezone] = useState<ITimezoneOption>();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data && data.length > 0 && !timezone) {
      setTimezone(parseTimezone(data[0].value));
    }
  }, [data, timezone, parseTimezone]);

  const handleSave = async () => {
    setSaved(false);
    setLoading(true);
    try {
      await fetch("/api/config", {
        method: "POST",
        body: JSON.stringify({
          key: "timezone",
          value: timezone?.value,
        }),
      });
      await mutate();
      setSaved(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full w-full flex-1">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Please select your timezone.</h2>
        <div className="flex flex-col w-full gap-2">
          <h3>
            This will be used to format the timestamp of your minted assets.
          </h3>
          <Combobox
            data={options}
            value={timezone?.value || ""}
            onValueChange={(value: string) => setTimezone(parseTimezone(value))}
            type="timezone"
          >
            <ComboboxTrigger
              className="w-full"
              label="Select your timezone."
              disabled={loading}
            />
            <ComboboxContent>
              <ComboboxInput />
              <ComboboxEmpty />
              <ComboboxList>
                <ComboboxGroup>
                  {options.map((option) => (
                    <ComboboxItem key={option.value} value={option.value}>
                      {option.label}
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>

        {timezone ? (
          <div className="flex flex-col w-full gap-2">
            <p>Your minted assets' timestamps will look like this:</p>
            <Paper className="p-2">
              <MintTimestamp
                className="border-1 border-gray-300 rounded-sm bg-white p-2"
                createdAt={new Date()}
                timezone={timezone.value}
              />
            </Paper>
          </div>
        ) : null}
      </div>

      <CallToAction handleSave={handleSave} saved={saved} error={error} />
    </div>
  );
};
