"use client";

import { Paper } from "@/components/ui/surfaces/Paper";
import { Balance } from "@/generated/prisma";
import { useAPI } from "@/hooks/useAPI";
import { Health } from "@/app/api/health/route";
import { Button } from "@/components/ui/button";

export default function AddBalance() {
  const { data: health, isLoading: healthLoading, error: healthError } = useAPI<Health>("/api/health");
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useAPI<Balance[]>("/api/balance");
 
  return <Paper>
    <div>
  
        <div>
          <h1>Balance</h1>
          {(health?.chain === "regtest" && !balanceLoading && balance?.length === 0) && (
          <Button onClick={() => {
            fetch("/api/setup-demo-balance", {
              method: "POST",
            })
          }}>Setup Demo Balance</Button>
          )} 

          {(health?.chain === "regtest" && !balanceLoading && balance?.length && balance?.length > 0) && (
          <Button onClick={() => {
            fetch("/api/setup-demo-balance", {
              method: "POST",
            })
          }}>Top Up Demo Balance</Button>
          )} 
        </div>
        {balanceLoading || healthLoading && <p>Loading...</p>}
        {balanceError && <p>Error: {balanceError.message}</p>}
        {healthError && <p>Error: {healthError.message}</p>}
        {balance && balance.map((b) => (
          <div key={b.id}>
            <p>{b.symbol}</p>
            <p>{b.value}</p>
          </div>
        ))}
    </div>
  </Paper>;
}
