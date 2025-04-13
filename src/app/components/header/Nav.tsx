import Link from "next/link";
import { ScrollStyleWrapper } from "@components/header/ScrollStyleWrapper";
import { SearchBar } from "@components/header/SearchBar";
export function Header() {
  return (
    <header className="fixed top-0 h-16 w-full z-50">
      <ScrollStyleWrapper>
        <nav className="flex justify-end items-center max-w-7xl w-full mx-auto">
          <div className="flex flex-1 h-9 justify-center sm:justify-start">
            <Link
              className="flex items-center font-bold antialiased text-2xl leading-7"
              href="/"
            >
              Next.js Pokédex
            </Link>
            <ul className="hidden text-sm lg:flex items-center gap-2 ml-5 pl-5 border-l border-neutral-400">
              <li>
                <Link
                  className="dark:hover:bg-neutral-500/50 hover:bg-indigo-400/30 rounded-md p-3 focus-visible:outline focus-visible:outline-2  focus-visible:outline-indigo-700"
                  href="/pokedex"
                >
                  Pokédex
                </Link>
              </li>
              <li>
                <Link
                  className="dark:hover:bg-neutral-500/50 hover:bg-indigo-400/30 rounded-md p-3 focus-visible:outline focus-visible:outline-2  focus-visible:outline-indigo-700"
                  href="/paginatedPokedex"
                >
                  paginated Pokedex
                </Link>
              </li>
              <li>
                <Link
                  className="dark:hover:bg-neutral-500/50 hover:bg-indigo-400/30 rounded-md p-3 focus-visible:outline focus-visible:outline-2  focus-visible:outline-indigo-700"
                  href="/list"
                >
                  List
                </Link>
              </li>
            </ul>
          </div>
          <SearchBar />
        </nav>
      </ScrollStyleWrapper>
    </header>
  );
}
