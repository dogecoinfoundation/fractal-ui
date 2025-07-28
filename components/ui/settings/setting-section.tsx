import type { ReactNode } from "react";

export const SettingSection = ({
  children,
  sectionName,
}: {
  children: ReactNode;
  sectionName: string;
}) => {
  return (
    <section className="grid grid-cols-9 p-4 gap-4">
      <div className="flex flex-col col-span-1 gap-2">
        <h2 className="text-md font-medium select-none">{sectionName}</h2>
      </div>
      <div className="flex flex-col col-span-8 gap-6 bg-white border-1 border-gray-300 rounded-md p-4">
        {children}
      </div>
    </section>
  );
};
