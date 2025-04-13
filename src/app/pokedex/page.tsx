import { getPokemonList } from "@actions/PokemonActions";
import { Metadata } from "next";
import { SearchField } from "@components/pokedex/Searchfield";
import { Pokedex } from "@components/pokedex/Pokedex";
import { getSearchMatches } from "@components/pokedex/util";
import { getPokemons } from "@actions/PokemonActions";
import { FetchError } from "../components/error/fetchErrorPage";

export const metadata: Metadata = {
  title: "Pokedex",
};

//instead of using searchParams and turning this into a dynamic route useSearchParams could also be used
export default async function PokedexPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { pokemonList, status } = await getPokemonList();
  const params = await searchParams;
  const search = typeof params.search === "string" ? params.search : undefined;

  if (!pokemonList) {
    return <FetchError status={status} />;
  }

  const matches = getSearchMatches({ search, pokemonList });

  const pokemon = await getPokemons(1, matches);
  //if the initial data changes the key changes as well causing all state to reset. This means no useEffect is needed to hanle the state reset
  const key = pokemon.map((pokemon) => pokemon.id).join("-");
  return (
    <main className="flex flex-col gap-6 py-20 px-6 mx-auto max-w-7xl h-auto w-full items-center">
      <h1 className="font-bold text-3xl text-indigo-700 dark:text-inherit">
        Pokédex
      </h1>
      <SearchField />
      <h2>{search ? "search mode" : "infinite scroll mode"}</h2>
      <Pokedex
        key={key}
        initialPokemon={pokemon}
        matches={matches}
        search={search}
      />
    </main>
  );
}
