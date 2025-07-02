import { Header } from "@/components/header";
import { Separator } from "@/components/separator";

type PageContainerProps = {
  children: React.ReactNode;
  label: string;
};

export const PageContainer = ({ children, label }: PageContainerProps) => {
  return (
    <div className="flex flex-col h-screen gap-2 pl-2 pt-2 pr-0 pb-2">
      <Header label={label} />
      <Separator />
      {children}
    </div>
  );
};
