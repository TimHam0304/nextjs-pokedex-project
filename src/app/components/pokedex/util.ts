interface getSearchMatchesProps {
  search: string | undefined;
  pokemonList: string[];
}

/**
 *
 * @param search query term
 * @param pokemonList list of names to get matches from
 * @returns a list of pokemon names matching the search query. returns full list if there is no query
 */
export function getSearchMatches({
  search,
  pokemonList,
}: getSearchMatchesProps) {
  if (search) {
    // get all pokemon names matching the query
    const filteredPokemon = pokemonList.filter((item) =>
      item.toLowerCase().includes(search.toLowerCase())
    );
    return filteredPokemon;
  } else {
    return pokemonList;
  }
}
