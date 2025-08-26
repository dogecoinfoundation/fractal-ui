"use client";

import { ListMints } from "@/components/mints/list/list-mints";
import { Paper } from "@/components/ui/surfaces/Paper";

export default function MyTokens() {
  return (
    <Paper className="h-full p-0">
      <ListMints myTokens />
    </Paper>
  );
}
