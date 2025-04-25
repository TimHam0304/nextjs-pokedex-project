"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ChevronDoubleLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDoubleRight,
} from "@icons/chevron";
import Link from "next/link";

interface PaginationProps {
  maxPages: number;
}

export function Pagination({ maxPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page =
    Number.isInteger(Number(pageParam)) && Number(pageParam) > 0
      ? Math.min(Number(pageParam), maxPages)
      : 1;

  function createPaginationLink(pageVar: Number): string {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageVar));
    const urlString = `${pathname}?${params.toString()}`;
    return urlString;
  }

  //Links
  const firstPage = createPaginationLink(1);
  const prevPage = createPaginationLink(page > 1 ? page - 1 : page);
  const nextPage = createPaginationLink(page < maxPages ? page + 1 : page);
  const lastPage = createPaginationLink(maxPages);

  return (
    <div className="flex gap-2 sm:gap-4 items-center">
      {page !== 1 ? (
        <Link
          aria-label="go to first page"
          className="p-4 text-sm font-medium rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 indigo-focus-outline"
          href={`${firstPage}`}
        >
          <ChevronDoubleLeft className="size-6" aria-hidden />
        </Link>
      ) : (
        <span aria-hidden className="invisible p-7" />
      )}
      {page !== 1 ? (
        <Link
          aria-label="go to previous page"
          className="p-4 text-sm font-medium rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 indigo-focus-outline"
          href={`${prevPage}`}
        >
          <ChevronLeft className="size-6" aria-hidden />
        </Link>
      ) : (
        <span aria-hidden className="invisible p-7" />
      )}

      <span className="flex text-center gap-0 sm:gap-1 flex-col sm:flex-row">
        <span>{page}</span> / <span>{maxPages}</span>
      </span>
      {page !== maxPages ? (
        <Link
          aria-label="go to next page"
          className="p-4 text-sm font-medium rounded-full disabled:hover:bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 indigo-focus-outline"
          href={`${nextPage}`}
        >
          <ChevronRight className="size-6" aria-hidden />
        </Link>
      ) : (
        <span aria-hidden className="invisible p-7" />
      )}
      {page !== maxPages ? (
        <Link
          aria-label="go to last page"
          className="p-4 text-sm font-medium rounded-full disabled:hover:bg-transparent hover:bg-neutral-200 dark:hover:bg-neutral-700 indigo-focus-outline"
          href={`${lastPage}`}
        >
          <ChevronDoubleRight className="size-6" aria-hidden />
        </Link>
      ) : (
        <span aria-hidden className="invisible p-7" />
      )}
    </div>
  );
}
