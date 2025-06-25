"use client";
import { PokemonGrid } from "@components/pokedex/PokemonGrid";
import { Pagination } from "@components/pokedex/Pagination";
import { useFavoritesStore } from "@/app/stores/favoritesStoreProvider";
import { POKEDEXPAGESIZE } from "@constants";
import { useSearchParams } from "next/navigation";
import { getPokemons } from "@actions/PokemonActions";
import { useState, useEffect } from "react";
import { Pokemon } from "@models/Pokemon/pokemon";

export function FavoritesGrid() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const { count, favorites } = useFavoritesStore((state) => state);
  const maxPages = Math.ceil(count / POKEDEXPAGESIZE);
  const page =
    Number.isInteger(Number(pageParam)) && Number(pageParam) > 0
      ? Math.min(Number(pageParam), maxPages)
      : 1;

  useEffect(() => {
    async function getData() {
      const data = await getPokemons(page, favorites);
      setPokemon(data);
    }
    getData();
  }, [page, favorites]);

  return (
    <div className="flex flex-col items-center w-full h-full gap-6">
      {count ? (
        <>
          <Pagination maxPages={maxPages} />
          <PokemonGrid pokemon={pokemon} />
          <Pagination maxPages={maxPages} />
        </>
      ) : (
        <div>No favorites yet</div>
      )}
    </div>
  );
}
