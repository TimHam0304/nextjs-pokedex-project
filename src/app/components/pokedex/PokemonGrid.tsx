import { DividerWithCenterText } from "@components/misc/Divider";
import { Fragment } from "react";
import { PokemonCard } from "@components/pokedex/PokemonCard";
import { Pokemon } from "@models/Pokemon/pokemon";
import { POKEDEXPAGESIZE } from "@constants";

interface PokemonGridProps {
  pokemon: Pokemon[];
}

export function PokemonGridWithDivider({ pokemon }: PokemonGridProps) {
  return (
    <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full h-auto">
      {pokemon.map((pokemon: Pokemon, i: number) => (
        <Fragment key={pokemon.id}>
          <PokemonCard Pokemon={pokemon} />
          {(i + 1) % POKEDEXPAGESIZE === 0 && (
            <DividerWithCenterText text={Math.floor(i / POKEDEXPAGESIZE) + 2} />
          )}
        </Fragment>
      ))}
    </section>
  );
}

export function PokemonGrid({ pokemon }: PokemonGridProps) {
  return (
    <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full h-auto">
      {pokemon.map((pokemon: Pokemon) => (
        <PokemonCard key={pokemon.id} Pokemon={pokemon} />
      ))}
    </section>
  );
}
