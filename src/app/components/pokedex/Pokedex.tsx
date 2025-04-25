"use client";
import { Pokemon } from "@models/Pokemon/pokemon";
import { getPokemons } from "@actions/PokemonActions";
import { useState, useCallback } from "react";
import { PokemonGridWithDivider } from "@components/pokedex/PokemonGrid";
import { PokedexLoadingSkelleton } from "@components/pokedex/PokedexLoadingSkelleton";
import { ShowMoreResultsButton } from "@components/pokedex/MoreSearchResultsButton";
/**
 * returns either the normal infinite scroll PokemonList or the SearchList depending on if the query field is empty or not
 */
export function Pokedex({
  initialPokemon,
  matches,
  search,
}: {
  initialPokemon: Pokemon[];
  matches: string[];
  search: string | undefined;
}) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);
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
      <div aria-live="polite" aria-atomic>
        Displaying <span className="font-bold">{pokemon.length}</span> out of{" "}
        <span className="font-bold">{matches.length} </span>
        results
      </div>
      <PokemonGridWithDivider pokemon={pokemon} />
      {search ? (
        <ShowMoreResultsButton disabled={disabled} onClick={loadMorePokemon} />
      ) : (
        <>
          {pokemon.length < matches.length ? (
            <PokedexLoadingSkelleton onInView={loadMorePokemon} />
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
