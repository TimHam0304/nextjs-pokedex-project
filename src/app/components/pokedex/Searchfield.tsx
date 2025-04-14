"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "@/app/hooks/useDebounce";
import { useEffect, useRef, useState } from "react";
import { useCallback } from "react";

//TODO fix known issue: navigating to the same route with the nav bar does not cause the state to reset even though search params are removed
export function SearchField() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const page = searchParams.get("page");
  const debouncedQuery = useDebounce(query);
  //prevents useEffect from running handleSearch because it got rebuild
  const lastquery = useRef<string | undefined>(
    searchParams.get("search") || ""
  );

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        //rest page to one
        if (query !== lastquery.current && page) {
          params.delete("page");
          params.append("page", "1");
        }
        params.delete("search");
        params.append("search", query);
      } else {
        params.delete("search");
      }
      replace(`${pathname}?${params.toString()}`, { scroll: true });
    },
    [searchParams, pathname, replace]
  );

  useEffect(() => {
    if (debouncedQuery !== lastquery.current) {
      handleSearch(debouncedQuery);
      lastquery.current = debouncedQuery;
    }
  }, [debouncedQuery, handleSearch]);

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        className="bg-white dark:bg-neutral-800 placeholder:text-neutral-400 dark:placeholder:text-neutral-300/70 indigo-focus-outline rounded-lg p-2 shadow-md shadow-indigo-700/10 dark:shadow-inherit border border-neutral-300 dark:border-neutral-700 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
        id="search"
        placeholder="Search..."
      />
    </>
  );
}
