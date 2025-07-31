import { useEffect, useState } from "react";
import { MintTimestamp } from "@/components/mints/mint-card";
import { Paper } from "@/components/ui/surfaces/Paper";

export const TimezonePreview = ({ timezone }: { timezone?: string }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const normalizeToMinute = (date: Date) => {
      date.setSeconds(0, 0);
      return date;
    };

    const interval = setInterval(() => {
      const newTime = new Date();
      const normalizedNew = normalizeToMinute(newTime);
      const normalizedPrev = normalizeToMinute(currentTime);

      if (normalizedNew > normalizedPrev) setCurrentTime(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <div className="flex flex-col w-full">
      {timezone ? (
        <>
          <p className="w-fit px-2 py-1.5 border-1 border-blue-200 bg-blue-50 text-xs text-blue-600 font-medium rounded-t-sm border-b-0">
            Using this timezone, your minted assets' timestamps will look like
            this:
          </p>

          <Paper className="p-2 flex-none rounded-tl-none">
            <MintTimestamp
              className="border-1 border-gray-300 rounded-sm bg-white p-2"
              createdAt={currentTime}
              timezone={timezone}
            />
          </Paper>
        </>
      ) : null}
    </div>
  );
};
