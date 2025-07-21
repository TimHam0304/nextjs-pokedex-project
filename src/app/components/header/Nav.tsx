import Link from "next/link";
import { ScrollStyleWrapper } from "@components/header/ScrollStyleWrapper";
import { SearchModal } from "./SearchModal";
import { MobileMenu } from "@components/mobileMenu/MobileMenu";
import { HeartOutlined } from "@icons/heart";

export async function Header() {
  return (
    <header className="fixed top-0 h-16 w-full z-50">
      <ScrollStyleWrapper>
        <nav className="flex justify-end items-center max-w-7xl w-full mx-auto">
          <div className="flex flex-1 h-9 justify-start">
            <Link
              className="flex items-center font-bold antialiased text-2xl leading-7 text-nowrap rounded-md indigo-focus-outline"
              href="/"
            >
              Next.js Pokédex
            </Link>
            <ul className="hidden text-sm font-bold lg:flex items-center gap-2 ml-5 pl-5 border-l border-neutral-400">
              <li>
                <Link
                  className="dark:hover:bg-neutral-500/50 hover:bg-indigo-600/90 hover:text-white rounded-md p-3 indigo-focus-outline"
                  href="/pokedex"
                >
                  Pokédex
                </Link>
              </li>
              <li>
                <Link
                  className="dark:hover:bg-neutral-500/50 hover:bg-indigo-600/90 hover:text-white rounded-md p-3 indigo-focus-outline"
                  href="/paginatedPokedex"
                >
                  paginated Pokedex
                </Link>
              </li>
              <li>
                <Link
                  className="dark:hover:bg-neutral-500/50 hover:bg-indigo-600/90 hover:text-white rounded-md p-3 indigo-focus-outline"
                  href="/list"
                >
                  List
                </Link>
              </li>
              <li>
                <Link
                  className="dark:hover:bg-neutral-500/50 block hover:bg-indigo-600/90 hover:text-white rounded-full p-2 indigo-focus-outline"
                  href="/favorites"
                >
                  <HeartOutlined className="size-5" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex w-full justify-end items-center max-w-[380px] gap-0 sm:gap-2">
            <SearchModal />
            <MobileMenu />
          </div>
        </nav>
      </ScrollStyleWrapper>
    </header>
  );
}
