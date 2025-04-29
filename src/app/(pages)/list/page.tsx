import { getPokemonList } from "@actions/PokemonActions";
import { Fragment } from "react";
import { DividerWithCenterText } from "@components/misc/Divider";
import Link from "next/link";

export default async function ListPage() {
  const { pokemonList, status } = await getPokemonList();

  if (!pokemonList) {
    throw new Error(
      `Failed to fetch pokemon list for ListPage, API RESPONSE: ${status}`
    );
  }

  const sortedList = pokemonList.sort();
  let lastLetter = "";
  return (
    <main className="flex flex-col gap-6 py-20 px-6 mx-auto max-w-7xl h-auto w-full items-center">
      <h1 className="font-bold text-3xl text-center text-indigo-700 dark:text-inherit">
        Simple Pokémon List
      </h1>
      <h2 className="text-sm text-center">
        A simple, alphabetically sorted list of all pokemon
      </h2>
      <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 w-full h-auto">
        {sortedList.map((pokemon: string) => {
          const firstLetter = pokemon[0].toUpperCase();
          const showDivider = firstLetter !== lastLetter;
          lastLetter = firstLetter;
          return (
            <Fragment key={pokemon}>
              {showDivider && <DividerWithCenterText text={firstLetter} />}
              <Link
                className="text-center hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md py-1 indigo-focus-outline"
                href={`/pokemon/${pokemon}`}
              >
                {pokemon[0].toUpperCase() + pokemon.slice(1)}
              </Link>
            </Fragment>
          );
        })}
      </section>
    </main>
  );
}
