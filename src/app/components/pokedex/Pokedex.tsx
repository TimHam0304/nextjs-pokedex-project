"use client";
import { Pokemon } from "@models/Pokemon/pokemon";
import { getPokemons } from "@actions/PokemonActions";
import { useState, useCallback, use } from "react";
import { PokemonGridWithDivider } from "@components/pokedex/PokemonGrid";
import { PokedexLoadingSkeleton } from "@/app/components/misc/PokedexLoadingSkeleton";
import { ShowMoreResultsButton } from "@components/pokedex/MoreSearchResultsButton";
/**
 * Displays the pokemons in a grid view based on the query.
 * If there is a query infinite scroll is replaced with a "more results" button
 * @param initialPokemon the first page of pokemon based on the query
 * @param matches the matches for the current query
 * @param search the current query
 */
export function Pokedex({
  initialPokemon,
  matches,
  search,
}: {
  initialPokemon: Promise<Pokemon[]>;
  matches: string[];
  search: string | undefined;
}) {
  const initialP = use(initialPokemon);
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialP);
  //starting from page 2 because page 1 is delivered with initial render (initialPokemon)
  const [page, setPage] = useState(2);
  const disabled = pokemon.length >= matches.length;

  const loadMorePokemon = useCallback(() => {
    if (!disabled) {
      getPokemons(page, matches).then((res) => {
        setPokemon((prev) => [...prev, ...res]);
        setPage((prev) => prev + 1);
      });
    }
  }, [page, matches, disabled]);

  return (
    <div className="flex flex-col items-center h-auto w-full gap-6">
      <div
        className="flex items-center h-14 gap-1"
        aria-live="polite"
        aria-atomic
      >
        Displaying <span className="font-bold">{pokemon.length}</span> out of
        <span className="font-bold">{matches.length} </span>
        results
      </div>
      <PokemonGridWithDivider pokemon={pokemon} />
      {search ? (
        <ShowMoreResultsButton disabled={disabled} onClick={loadMorePokemon} />
      ) : (
        <>
          {pokemon.length < matches.length ? (
            <PokedexLoadingSkeleton onInView={loadMorePokemon} />
          ) : (
            <div>No more entries to load</div>
          )}
        </>
      )}
      <div aria-live="polite" aria-atomic>
        Displaying <span className="font-bold">{pokemon.length}</span> out of{" "}
        <span className="font-bold">{matches.length} </span>
        results
      </div>
    </div>
  );
}
