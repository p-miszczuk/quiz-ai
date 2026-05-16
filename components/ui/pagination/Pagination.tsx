"use client";

import { useRouter } from "next/navigation";
import { Button } from "../shadcn/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../shadcn/pagination";
import { cn } from "@/lib/utils";

export default function PaginationComponent({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number;
}): React.ReactNode {
  const router = useRouter();

  const handlePageChange = (page: number) => () => {
    router.push(`/dashboard?page=${page}`);
  };

  const disablePrevious = page === 1;
  const disableNext = page === totalPages;

  return (
    <Pagination>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePageChange(page - 1)}
            className={cn({
              "opacity-50 cursor-not-allowed": disablePrevious,
            })}
          />
        </PaginationItem>
        {Array.from({ length: totalPages - 1 }).map((_, index) => (
          <PaginationItem key={index}>
            <Button
              onClick={handlePageChange(index + 1)}
              variant="ghost"
              className={cn({
                "border-primary text-primary": page === index + 1,
              })}
            >
              {index + 1}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={handlePageChange(page + 1)}
            className={cn({
              "opacity-50 cursor-not-allowed": disableNext,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
