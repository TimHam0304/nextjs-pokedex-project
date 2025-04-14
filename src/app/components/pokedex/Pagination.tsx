"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight,
} from "@icons/chevron";

interface PaginationProps {
  maxPages: number;
}

//TODO make disabled accessible + use Link instead of button
export function Pagination({ maxPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pageParam = searchParams.get("page");
  const page =
    Number.isInteger(Number(pageParam)) && Number(pageParam) > 0
      ? Math.min(Number(pageParam), maxPages)
      : 1;

  return (
    <div className="flex gap-4 items-center">
      <button
        disabled={page === 1}
        aria-label="go to first page"
        className="p-4 text-sm font-medium rounded-full disabled:hover:bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 indigo-focus-outline"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("page", String(1));
          push(`${pathname}?${params.toString()}`, { scroll: false });
        }}
      >
        <ChevronDoubleLeft />
      </button>
      <button
        disabled={page === 1}
        aria-label="go to previous page"
        className="p-4 text-sm font-medium rounded-full disabled:hover:bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 indigo-focus-outline"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          const prev = page > 1 ? page - 1 : page;
          params.set("page", String(prev));
          push(`${pathname}?${params.toString()}`, { scroll: false });
        }}
      >
        <ChevronLeft />
      </button>
      <span>
        {page} / {maxPages}
      </span>
      <button
        disabled={page === maxPages}
        aria-label="go to next page"
        className="p-4 text-sm font-medium rounded-full disabled:hover:bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 indigo-focus-outline"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          const next = page < maxPages ? page + 1 : page;
          params.set("page", String(next));
          push(`${pathname}?${params.toString()}`, { scroll: false });
        }}
      >
        <ChevronRight />
      </button>
      <button
        disabled={page === maxPages}
        aria-label="go to last page"
        className="p-4 text-sm font-medium rounded-full disabled:hover:bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 indigo-focus-outline"
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set("page", String(maxPages));
          push(`${pathname}?${params.toString()}`, { scroll: false });
        }}
      >
        <ChevronDoubleRight />
      </button>
    </div>
  );
}
