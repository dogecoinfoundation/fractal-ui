"use client";

import { Separator } from "@/components/separator";
import { ConnectionForm } from "@/components/settings/connection/connection-form";
import { TimezoneForm } from "@/components/settings/timezone/timezone-form";
import { SettingSection } from "@/components/ui/settings/setting-section";
import { Paper } from "@/components/ui/surfaces/Paper";
import { ConfigProvider } from "@/context/config-context";

export default function SettingsPage() {
  return (
    <Paper className="gap-4 p-0">
      <ConfigProvider>
        <SettingSection sectionName="Timezone">
          <TimezoneForm />
        </SettingSection>

        <Separator className="border-dashed border-zinc-300" />

        <SettingSection sectionName="Connection">
          <ConnectionForm />
        </SettingSection>
      </ConfigProvider>
    </Paper>
  );
}
