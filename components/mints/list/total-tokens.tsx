export const TotalTokens = ({
  fractionCount,
  balance,
}: {
  fractionCount: number;
  balance?: number;
}) => {
  const formattedFractionCount = fractionCount.toLocaleString();

  return (
    <div className="w-fit flex flex-col gap-0.5 rounded-sm border-1 border-green-600/30 bg-green-50 p-1">
      <h4 className="font-mono text-xs text-green-700 tabular-nums">
        {balance
          ? `${balance.toLocaleString()} of ${formattedFractionCount}`
          : formattedFractionCount}
      </h4>
      <h5 className="text-xs font-semibold text-green-700/85">
        {balance ? "Tokens owned" : "Total Tokens"}
      </h5>
    </div>
  );
};
