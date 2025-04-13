import { NextIcon, ReactIcon, TailwindIcon } from "@icons/svg";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col md:flex-row justify-between px-8 py-16 gap-5 max-w-7xl w-full font-light mx-auto text-sm text-inherit dark:text-neutral-400">
      <div className="flex flex-col gap-2">
        <div>
          Pokémon © 2002-2024 Pokémon. © 1995-2024 Nintendo/Creatures Inc./GAME
          FREAK inc. TM, ® and Pokémon character names are trademarks of
          Nintendo.
        </div>
        <div>
          All content texts and images (except for the landing page) are fetched
          from{" "}
          <Link
            className="underline visited:text-blue-400"
            referrerPolicy="no-referrer"
            rel="external"
            target="_blank"
            href="https://pokeapi.co/"
          >
            pokeapi.co
          </Link>
        </div>
      </div>
      <div className="flex flex-col  md:ml-48 text-center gap-2">
        <div>Made with:</div>
        <div className="flex gap-2 items-center justify-center">
          <Link
            href="https://nextjs.org/"
            referrerPolicy="no-referrer"
            rel="external"
            target="_blank"
            className=""
          >
            <NextIcon
              aria-label="Next.js Icon"
              className="dark:invert h-6 w-auto"
            />
          </Link>
          <Link
            href="https://tailwindcss.com/"
            referrerPolicy="no-referrer"
            rel="external"
            target="_blank"
          >
            <TailwindIcon aria-label="Tailwind Icon" className="h-6 w-auto" />
          </Link>
          <Link
            href="https://react.dev/"
            referrerPolicy="no-referrer"
            rel="external"
            target="_blank"
            className="w-6 h-6"
          >
            <ReactIcon aria-label="React Icon" className="h-6 w-auto" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
