"use client";
import { useRouter } from "next/navigation";
import { ChevronDown } from "@icons/chevron";
import { useEffect, useState } from "react";

export function SearchBar() {
  const { push } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    function changeBG() {
      if (window.scrollY >= 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", changeBG);
    return () => {
      window.removeEventListener("scroll", changeBG);
    };
  }, []);

  const style = {
    top: "bg-white/70 focus:bg-white dark:bg-neutral-800/70 dark:focus:bg-neutral-800",
    onScroll: "bg-white dark:bg-neutral-800",
  };

  return (
    <form
      onSubmit={() => {
        push(`/pokedex?search=${query}`);
      }}
      role="search"
      className="h-9 max-w-[380px] my-2 w-full hidden sm:flex rounded-lg"
    >
      <div className="relative">
        <select
          className={`inline-flex h-full min-w-36 rounded-l-lg pe-8 ps-3 appearance-none items-center text-sm text-neutral-600 dark:text-neutral-300/70 indigo-focus-outline border border-neutral-300 dark:border-neutral-700 ${
            scrolled ? style.onScroll : style.top
          }`}
          aria-label="search options"
        >
          <option value="Pokemon">Pokemon</option>
          <option value="Placeholder">Placeholder</option>
          <option value="Placeholder">Placeholder</option>
          <option value="Placeholder">Placeholder</option>
          <option value="Placeholder">Placeholder</option>
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-px flex h-full w-9 items-center justify-center text-neutral-600 dark:text-neutral-300/70">
          <ChevronDown strokeWidth={2} aria-hidden="true" role="img" />
        </span>
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
        id="search-field"
        aria-label="search"
        className={`flex w-full -ml-px focus:z-10 rounded-r-lg px-3 py-2 text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-300/70 indigo-focus-outline border border-neutral-300 dark:border-neutral-700 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none ${
          scrolled ? style.onScroll : style.top
        }`}
        placeholder="Search..."
        type="search"
      />
    </form>
  );
}
