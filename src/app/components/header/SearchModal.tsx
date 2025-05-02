"use client";
import { X } from "@/app/icons/x";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { ArrowInBoxTopRight } from "@icons/arrowInBox";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@/app/icons/MagnifyingGlass";
import Link from "next/link";

const searchPaths = [
  {
    label: "Pokedex",
    route: "/pokedex",
  },
  {
    label: "paginated Pokedex",
    route: "/paginatedPokedex",
  },
];

interface SearchModalProps {
  pokemonList: string[] | null;
}

//TODO make search suggestions accessible with keyboard up/down instead of tab
export function SearchModal({ pokemonList }: SearchModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeRoute, setActiveRoute] = useState<string | null>(
    searchPaths[0].route
  );
  const [query, setQuery] = useState("");
  const { push } = useRouter();

  const filteredQueryList = query
    ? pokemonList
        ?.filter((name) => name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 10)
    : [];

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    closeModal();
    push(`${activeRoute}?search=${query}`);
    setQuery("");
  }

  function openModal() {
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (!dialogRef.current) return;

    if (e.target === dialogRef.current) {
      closeModal();
    }
  };

  useEffect(() => {
    dialogRef.current?.addEventListener("close", closeModal);
    dialogRef.current?.addEventListener("mousedown", handleClickOutside);
    return () => {
      dialogRef.current?.removeEventListener("mousedown", handleClickOutside);
      dialogRef.current?.removeEventListener("close", closeModal);
    };
  }, []);

  return (
    <Fragment>
      <dialog
        aria-label="search dialog"
        className="backdrop:bg-black/50 bg-white dark:bg-neutral-800 text-inherit rounded-2xl w-[500px] max-h-[80vh] relative"
        ref={dialogRef}
      >
        <div className="flex justify-end sticky top-0">
          <button
            aria-label="close search dialog"
            onClick={() => dialogRef.current?.close()}
            className="bg-neutral-200 dark:bg-neutral-600 rounded-full p-1 mr-2 mt-2 indigo-focus-outline"
          >
            <X strokeWidth={3} aria-hidden className="size-3" />
          </button>
        </div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          role="search"
          className="flex flex-col items-center gap-4 px-8 pb-8"
        >
          <fieldset className="flex w-full">
            <legend className="sr-only">Pokedex type</legend>
            <div className="flex gap-2 items-center text-xs has-[:focus-visible]:outline outline-2 outline-indigo-700 dark:outline-indigo-500 outline-offset-8 rounded-sm">
              {searchPaths.map((searchPaths) => (
                <div key={searchPaths.label}>
                  <input
                    className="peer sr-only"
                    type="radio"
                    id={searchPaths.label}
                    name="set1"
                    value={searchPaths.route}
                    checked={activeRoute === searchPaths.route}
                    onChange={(e) => setActiveRoute(e.target.value)}
                  />
                  <label
                    htmlFor={searchPaths.label}
                    className="inline-block rounded-md p-1 text-xs dark:bg-neutral-700 bg-neutral-200 peer-checked:bg-indigo-600 peer-checked:text-white cursor-pointer"
                  >
                    {searchPaths.label}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <input
            className="w-full bg-white dark:bg-neutral-800 placeholder:text-neutral-400 dark:placeholder:text-neutral-300/70 indigo-focus-outline rounded-lg p-2 shadow-md shadow-indigo-700/10 dark:shadow-inherit border border-neutral-300 dark:border-neutral-700 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
            placeholder="Search..."
            type="search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          ></input>
          {filteredQueryList && (
            <div
              aria-hidden
              className="w-full border-t-2 border-indigo-500"
            ></div>
          )}
          {filteredQueryList && (
            <div
              aria-label="Search suggestions matching the query"
              className="flex flex-col w-full h-60 max-h-60 overflow-scroll rounded-md indigo-focus-outline"
            >
              {filteredQueryList.map((entry) => (
                <Link
                  href={`${activeRoute}?search=${entry}`}
                  onClick={closeModal}
                  className="flex items-center pl-2 min-h-10 hover:bg-neutral-700 rounded-md focus-visible:bg-neutral-700 outline-none"
                  key={entry}
                >
                  {entry[0].toUpperCase() + entry.slice(1)}
                </Link>
              ))}
            </div>
          )}
        </form>
      </dialog>
      <button
        onClick={openModal}
        aria-label="click to open search modal"
        className="hidden sm:flex items-center justify-between h-9 p-2 w-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-400 text-sm rounded-md indigo-focus-outline"
      >
        Search site...
        <ArrowInBoxTopRight aria-hidden strokeWidth={2} className="size-4" />
      </button>
      <button
        onClick={openModal}
        aria-label="click to open search modal"
        className="sm:hidden flex items-center justify-center p-3 rounded-full indigo-focus-outline"
      >
        <MagnifyingGlassIcon aria-hidden strokeWidth={3} className="size-4" />
      </button>
    </Fragment>
  );
}
