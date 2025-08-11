"use client";

import { type ReactNode, useState } from "react";
import { Header } from "@/components/header";
import { PasswordDialog } from "@/components/password/password-dialog";
import { Separator } from "@/components/separator";
import { SideBar } from "@/components/sidebar";
import { AuthContext } from "@/context/auth-context";

export const Main = ({ children }: { children: ReactNode }) => {
  const [password, setPassword] = useState<string | undefined>(undefined);

  return (
    <AuthContext value={{ password, setPassword }}>
      {password ? (
        <>
          <SideBar />
          <main className="flex flex-col flex-1">
            <div className="flex flex-col h-screen gap-3 p-4">
              <Header />
              <Separator />
              {children}
            </div>
          </main>
        </>
      ) : (
        <PasswordDialog />
      )}
    </AuthContext>
  );
};
