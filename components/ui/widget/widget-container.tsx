export const WidgetContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col border-1 border-gray-300 hover:border-amber-600/25 bg-white hover:bg-amber-50/70 rounded-md gap-1 p-2 transition-colors">
      {children}
    </div>
  );
};
