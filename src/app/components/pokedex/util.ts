/**
 * Returns a list of Pokémon names matching the search query.
 * Returns the full list if no query is provided.
 *
 * @param search - search string
 * @param pokemonList - Array of Pokémon names to search within
 * @returns Filtered list based on the query
 */
export function getSearchMatches(
  search: string | undefined,
  pokemonList: string[]
): string[] {
  if (search) {
    return pokemonList.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
  }
  return pokemonList;
}
