import { useContext, useEffect, useState } from "react";
import {
  allTimezones,
  type ITimezoneOption,
  useTimezoneSelect,
} from "react-timezone-select";
import { TimezonePreview } from "@/components/settings/timezone/timezone-preview";
import { CallToAction } from "@/components/setup/wizard/steps/call-to-action";
import { FilterableCombobox } from "@/components/ui/forms/filterable-combobox";
import { ConfigContext } from "@/context/config-context";

export const timezones = {
  ...allTimezones,
  "Australia/Melbourne": "Melbourne",
};

export const TimezoneForm = () => {
  const {
    configData,
    loading: configLoading,
    setLoading,
    getConfigRowByKey,
    refreshConfigData,
    error,
  } = useContext(ConfigContext);
  const { options, parseTimezone } = useTimezoneSelect({
    labelStyle: "original",
    timezones,
  });
  const [timezone, setTimezone] = useState<ITimezoneOption>();
  const [saved, setSaved] = useState(false);

  const timezoneConfigRow = getConfigRowByKey(configData, "timezone");
  const dirty =
    timezone !== undefined && timezone?.value !== timezoneConfigRow?.value;

  useEffect(() => {
    if (configData.length > 0) {
      if (!timezone && timezoneConfigRow)
        setTimezone(parseTimezone(timezoneConfigRow.value));
    }
  }, [configData, timezone, parseTimezone, timezoneConfigRow]);

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

      setSaved(true);
      await refreshConfigData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 flex-1 justify-start">
      <FilterableCombobox
        options={options}
        value={timezone?.value || ""}
        setValue={(value: string) => setTimezone(parseTimezone(value))}
        loading={configLoading}
        type="timezone"
        label="Click to select a timezone."
      />
      <div className="flex flex-1">
        <TimezonePreview timezone={timezone?.value} />
      </div>
      <CallToAction
        handleSave={handleSave}
        saved={saved}
        error={error}
        isDirty={dirty}
        isEmpty={!timezone}
        isLoading={configLoading}
      />
    </div>
  );
};
