interface getSearchMatchesProps {
  search: string | undefined;
  pokemonList: string[];
}

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
