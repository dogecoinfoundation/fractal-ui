import type { ReactNode } from "react";

type StatusCardProps = {
  title: string;
  children: ReactNode;
  titleIcon?: ReactNode;
};

export const StatusCard = ({ title, titleIcon, children }: StatusCardProps) => {
  return (
    <section className="flex flex-col gap-2 p-4 border-1 border-gray-400 rounded-md bg-white">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        {titleIcon}
        {title}
      </h2>
      <div className="flex flex-row gap-2">{children}</div>
    </section>
  );
};
