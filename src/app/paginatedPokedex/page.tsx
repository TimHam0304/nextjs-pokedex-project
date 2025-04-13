import { getPokemonList, getPokemons } from "@actions/PokemonActions";
import { FetchError } from "@components/error/fetchErrorPage";
import { PokemonGrid } from "@components/pokedex/PokemonGrid";
import { Pagination } from "@components/pokedex/Pagination";
import { POKEDEXPAGESIZE } from "@constants";
import { getSearchMatches } from "@components/pokedex/util";
import { SearchField } from "@components/pokedex/Searchfield";

export default async function PaginatedPokedex({
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
  const maxPages = Math.ceil(matches.length / POKEDEXPAGESIZE);
  const page =
    Number.isInteger(Number(params.page)) && Number(params.page) > 0
      ? Math.min(Number(params.page), maxPages)
      : 1;

  const pokemon = await getPokemons(page, matches);

  return (
    <main className="flex flex-col gap-6 py-20 px-6 mx-auto max-w-7xl h-auto w-full items-center">
      <h1 className="font-bold text-3xl text-indigo-700 dark:text-inherit">
        Paginated Pokédex
      </h1>
      <SearchField />
      <Pagination maxPages={maxPages} />
      <PokemonGrid pokemon={pokemon} />
      <Pagination maxPages={maxPages} />
    </main>
  );
}
