import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type MintPaginationProps = {
  page: number;
  totalPages: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
};

export const MintPagination = ({
  page,
  totalPages,
  handlePrevPage,
  handleNextPage,
}: MintPaginationProps) => {
  const padLength = totalPages.toString().length;

  return (
    <>
      <Progress
        value={(page / totalPages) * 100}
        className="rounded-none h-2 border-y-1 border-gray-300"
      />
      <div className="flex flex-row gap-2 justify-between p-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          <ChevronLeft />
        </Button>
        <div className="flex flex-row gap-2 items-center tabular-nums text-zinc-700">
          <span>{page.toString().padStart(padLength, "0")}</span>
          <span className="text-zinc-400">of</span>
          <span>{totalPages.toString()}</span>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          <ChevronRight />
        </Button>
      </div>
    </>
  );
};
