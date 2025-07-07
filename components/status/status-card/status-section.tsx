import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Separator } from "@/components/separator";

type StatusSectionProps = {
  title: string;
  titleIcon: LucideIcon;
  items: SectionContent[];
};

type SectionContent = {
  id: string;
  value: ReactNode;
};

export const Monospace = ({ children }: { children: ReactNode }) => {
  return (
    <span className="font-mono bg-orange-100 text-amber-800 px-1 py-0.2 rounded-sm">
      {children}
    </span>
  );
};

export const StatusSection = (props: StatusSectionProps) => {
  return (
    <section className="flex flex-col w-1/2 gap-2 bg-gray-50/85 border-gray-300 border-1 rounded-sm p-3">
      <h3 className="text-md font-semibold flex flex-row items-center gap-2">
        <props.titleIcon className="size-4 text-muted-foreground" />
        {props.title}
      </h3>
      <Separator />
      <div className="flex flex-col gap-2">
        {props.items.map((item) => (
          <h4 key={item.id} className="flex text-sm items-center gap-2">
            {item.value}
          </h4>
        ))}
      </div>
    </section>
  );
};
