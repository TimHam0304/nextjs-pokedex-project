import { MetadataRoute } from "next";
import { BASE_URL } from "@constants";
import { getPokemonList } from "./actions/PokemonActions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { pokemonList, status } = await getPokemonList();
  if (!pokemonList) {
    throw new Error(
      `Failed to fetch pokemon list for ListPage, API RESPONSE: ${status}`
    );
  }

  const postEntries: MetadataRoute.Sitemap = pokemonList.map((name) => ({
    url: `${BASE_URL.DOMAIN}/pokemon/${name}`,
  }));
  return [
    {
      url: `${BASE_URL.DOMAIN}/pokedex`,
    },
    {
      url: `${BASE_URL.DOMAIN}/paginatedPokedex`,
    },
    {
      url: `${BASE_URL.DOMAIN}/list`,
    },
    ...postEntries,
  ];
}
