import "./globals.css";

import DynamicLayoutWrapper from "@/components/root/dynamic-wrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en" className="h-full">
      <body className="antialiased h-full">
        <div className="flex flex-row min-h-full" role="document">
          <DynamicLayoutWrapper>
            {children}
          </DynamicLayoutWrapper>
        </div>
      </body>
    </html>
  );
}
