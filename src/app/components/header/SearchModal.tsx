"use client";
import { X } from "@/app/icons/x";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Fragment } from "react";
import { ArrowInBoxTopRight } from "@icons/arrowInBox";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@/app/icons/MagnifyingGlass";

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

//TODO add search recommendations based on input
//TODO add search button
export function SearchModal({ pokemonList }: SearchModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [activeRoute, setActiveRoute] = useState<string | null>(
    searchPaths[0].route
  );
  const [query, setQuery] = useState("");
  const { push } = useRouter();

  function onButtonClick(route: string) {
    setActiveRoute(route);
  }

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
          <div className="flex gap-2 w-full items-center text-xs">
            {searchPaths.map((searchPaths) => (
              <button
                type="button"
                key={searchPaths.label}
                className={`rounded-md p-1 indigo-focus-outline outline-offset-2 ${
                  activeRoute === searchPaths.route
                    ? "bg-indigo-600 text-white"
                    : "dark:bg-neutral-700 bg-neutral-200"
                }`}
                onClick={() => onButtonClick(searchPaths.route)}
              >
                {searchPaths.label}
              </button>
            ))}
          </div>

          <input
            className="w-full bg-white dark:bg-neutral-800 placeholder:text-neutral-400 dark:placeholder:text-neutral-300/70 indigo-focus-outline rounded-lg p-2 shadow-md shadow-indigo-700/10 dark:shadow-inherit border border-neutral-300 dark:border-neutral-700 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
            placeholder="Search..."
            type="search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          ></input>
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
