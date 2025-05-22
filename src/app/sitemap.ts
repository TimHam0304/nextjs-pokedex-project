import { MetadataRoute } from "next";
import { BASE_URL } from "@constants";
import { pokemonList } from "@constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
