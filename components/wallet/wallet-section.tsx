import { cn } from "@/lib/utils";

export const WalletSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "flex flex-col gap-4 border-1 border-zinc-200 bg-white rounded-md p-4",
        className,
      )}
    >
      {children}
    </section>
  );
};
