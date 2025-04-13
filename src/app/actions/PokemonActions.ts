"use server";
import { BASE_URL, ENDPOINTS, POKEDEXPAGESIZE } from "@constants";
import { Pokemon } from "@models/Pokemon/pokemon";
import { NamedAPIResourceList } from "@models/basic/resource";
import { PokemonSpecies } from "@models/PokemonSpecies/species";

interface status {
  code: number;
  message: string;
}

/**
 * @param page the page to fetch
 * @param pokemonList a list of pokemon
 * @returns an array of detailed pokemon data. If all fetches fail, an empty array is returned
 *
 * this function does not return an error for failed fetches. Instead just successful ones are returned
 */
export async function getPokemons(
  page: number,
  pokemonList: string[]
): Promise<Pokemon[]> {
  const pageStart = POKEDEXPAGESIZE * (page - 1);
  const pageEnd = POKEDEXPAGESIZE * page;

  //slice matches down to page size
  const slicedMatches = pokemonList.slice(pageStart, pageEnd);

  const responses = await Promise.allSettled(
    slicedMatches.map((name) =>
      fetch(`${BASE_URL.REST}${ENDPOINTS.POKEMON}/${name}`, {
        cache: "force-cache",
        next: { revalidate: 604800 },
      }).then((res) => res.json() as Promise<Pokemon>)
    )
  );

  const pokemons: Pokemon[] = responses.flatMap((result) =>
    result.status === "fulfilled" ? [result.value] : []
  );

  return pokemons;
}

interface GetPokemonListResponse {
  pokemonList: string[] | null;
  status: status;
}

//TODO serialise data using stringy to json
/**
 * server action
 *
 * @returns an array containing all pokemon names
 */
export async function getPokemonList(): Promise<GetPokemonListResponse> {
  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.POKEMON}?offset=0&limit=5000`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return {
      pokemonList: null,
      status: { code: response.status, message: response.statusText },
    };
  }

  const jsonData = (await response.json()) as NamedAPIResourceList;
  const pokemonList = jsonData.results.map((obj) => obj.name);
  return {
    pokemonList: pokemonList,
    status: { code: response.status, message: response.statusText },
  };
} //TODO move out of actions

interface GetPokemonSpeciesResponse {
  pokemonSpecies: PokemonSpecies | null;
  status: status;
}

/**
 * server action
 * @param name name of the pokemon-species to fetch detailed data for
 * @returns PokemonSpeciesResponse object that contains either a pokemonSpecies object or null if the pokmeon-species name does not exist
 */
export async function getPokemonSpecies(
  name: string
): Promise<GetPokemonSpeciesResponse> {
  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.POKEMON_SPECIES}/${name}`,
    {
      cache: "force-cache",
      next: { revalidate: 604800 },
    }
  );

  if (!response.ok) {
    return {
      pokemonSpecies: null,
      status: { code: response.status, message: response.statusText },
    };
  }

  const jsonData = (await response.json()) as PokemonSpecies;
  return {
    pokemonSpecies: jsonData,
    status: { code: response.status, message: response.statusText },
  };
}

interface GetPokemonResponse {
  pokemon: Pokemon | null;
  status: status;
}

/**
 * server action
 * @param nameOrID or ID name of the pokemon to fetch detailed data for
 * @returns returns a PokemonResponse object that contains either a pokemon object or null if the pokmeon name does not exist
 */
export async function getPokemon(
  nameOrID: string
): Promise<GetPokemonResponse> {
  //the pokeapi.co allows the use of either the name or ID of a pokemon
  const response = await fetch(
    `${BASE_URL.REST}${ENDPOINTS.POKEMON}/${nameOrID}`,
    {
      cache: "force-cache",
      next: { revalidate: 604800 },
    }
  );

  if (!response.ok) {
    return {
      pokemon: null,
      status: { code: response.status, message: response.statusText },
    };
  }

  const jsonData = (await response.json()) as Pokemon;
  return {
    pokemon: jsonData,
    status: { code: response.status, message: response.statusText },
  };
}
