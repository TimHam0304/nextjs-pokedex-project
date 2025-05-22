import { Metadata } from "next";
import { SearchField } from "@components/pokedex/Searchfield";
import { Pokedex } from "@components/pokedex/Pokedex";
import { getSearchMatches } from "@components/pokedex/util";
import { getPokemons } from "@actions/PokemonActions";
import { pokemonList } from "@constants";
import { Suspense } from "react";
import { PokedexComponentSkeleton } from "@components/misc/PokedexLoadingSkeleton";

export const metadata: Metadata = {
  title: "Pokedex",
};

export default async function PokedexPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : undefined;

  // names of the pokemons matching the query / full list if there is no query
  const matches = getSearchMatches(search, pokemonList.slice());
  //fetches first batch (page) based on query matches
  const pokemonPromise = getPokemons(1, matches);
  //if the initial data changes the key changes as well causing all state to reset. This means no useEffect is needed to handle the state reset
  const key = matches.slice(0, 15).join("-");
  return (
    <main className="flex flex-col gap-6 py-20 px-6 mx-auto max-w-7xl h-auto w-full items-center">
      <h1 className="font-bold text-3xl text-indigo-700 dark:text-inherit">
        Pokédex
      </h1>
      <SearchField />

      <Suspense fallback={<PokedexComponentSkeleton />}>
        <Pokedex
          key={key}
          initialPokemon={pokemonPromise}
          matches={matches}
          search={search}
        />
      </Suspense>
    </main>
  );
}
