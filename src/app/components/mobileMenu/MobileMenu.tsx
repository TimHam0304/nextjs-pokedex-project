"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "@icons/x";
import { BurgerMenuIcon } from "@icons/BurgerMenu";

//TODO fix: if focus is lost user can tab outside menu while its open
export function MobileMenu() {
  const [open, setOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (
          e.key === "Tab" &&
          !e.shiftKey &&
          document.activeElement === lastLinkRef.current
        ) {
          e.preventDefault();
          buttonRef.current?.focus();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <div className="block lg:hidden relative">
      <button
        ref={buttonRef}
        className="p-2 rounded-full indigo-focus-outline"
        onClick={() => setOpen(!open)}
        aria-label={`${open ? "close" : "open"} the nav menu`}
      >
        {open ? (
          <X aria-hidden strokeWidth={2} className="size-6" />
        ) : (
          <BurgerMenuIcon strokeWidth={2} aria-hidden className="size-6" />
        )}
      </button>
      <div
        className={`${
          open ? "flex flex-col" : "hidden"
        } fixed bg-white dark:bg-neutral-900 top-16 left-0 right-0 bottom-0 h-screen w-screen p-4`}
      >
        <nav className="flex flex-col">
          <Link
            onClick={() => setOpen(false)}
            className="dark:hover:bg-neutral-500/50 hover:bg-indigo-400/30 rounded-md p-3 indigo-focus-outline"
            href="/pokedex"
          >
            Pokédex
          </Link>

          <Link
            onClick={() => setOpen(false)}
            className="dark:hover:bg-neutral-500/50 hover:bg-indigo-400/30 rounded-md p-3 indigo-focus-outline"
            href="/paginatedPokedex"
          >
            paginated Pokédex
          </Link>
          <Link
            ref={lastLinkRef}
            onClick={() => setOpen(false)}
            className="dark:hover:bg-neutral-500/50 hover:bg-indigo-400/30 rounded-md p-3 indigo-focus-outline"
            href="/list"
          >
            List
          </Link>
          <Link
            ref={lastLinkRef}
            onClick={() => setOpen(false)}
            className="dark:hover:bg-neutral-500/50 hover:bg-indigo-400/30 rounded-md p-3 indigo-focus-outline"
            href="/favorites"
          >
            Favorites
          </Link>
        </nav>
      </div>
    </div>
  );
}
