import { NamedAPIResource } from "../basic/resource";
import { PokemonTypeNames } from "./pokemonTypeNames";

export interface Pokemon {
  id: number;
  /** The name for this resource */
  name: string;
  /** The base experience gained for defeating this Pokémon */
  base_experience: number;
  /** The height of this Pokémon in decimetres */
  height: number;
  /** Set for exactly one Pokémon used as the default for each species */
  is_default: boolean;
  /** Order for sorting. Almost national order, except families are grouped together */
  order: number;
  /** The weight of this Pokémon in hectograms */
  weight: number;
  /** A list of abilities this Pokémon could potentially have */
  abilities: PokemonAbility[];
  /** A list of forms this Pokémon can take on */
  forms: any[];
  /** A list of game indices relevent to Pokémon item by generation */
  game_indices: any[];
  /** A list of items this Pokémon may be holding when encountered */
  held_items: any[];
  /** A link to a list of location areas, as well as encounter details pertaining to specific versions */
  location_area_encounters: string;
  /** A list of moves along with learn methods and level details pertaining to specific version groups */
  moves: any[];
  /** A set of sprites used to depict this Pokémon in the game. */
  sprites: PokemonSprites;
  /** A set of cries used to depict this Pokémon in the game. */
  cries: any;
  /** The species this Pokémon belongs to */
  species: NamedAPIResource;
  /** A list of base stat values for this Pokémon */
  stats: PokemonStat[];
  /** A list of details showing types this Pokémon has */
  types: PokemonType[];
  /** Data describing a Pokemon's types in a previous generation. */
  past_types: any[];
}

export interface PokemonAbility {
  /** Whether or not this is a hidden ability */
  is_hidden: boolean;
  /** The slot this ability occupies in this Pokémon species */
  slot: number;
  /** The ability the Pokémon may have */
  ability: any;
}

export interface PokemonSprites {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
  /** Dream World, Official Artwork and Home sprites */
  other?: OtherPokemonSprites;
  /** Version Sprites of this Pokémon */
  versions: any;
}
/** Other Pokemon Sprites (Dream World and Official Artwork sprites) */

export interface OtherPokemonSprites {
  /** Dream World Sprites of this Pokémon */
  dream_world: DreamWorld;
  /** Official Artwork Sprites of this Pokémon */
  "official-artwork": OfficialArtwork;
  /** Home Artwork Sprites of this Pokémon */
  home: Home;
  /** Pokemon Showdown animated sprites of this Pokémon */
  showdown: Showdown;
}
/** Dream World sprites */

export interface DreamWorld {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
}
/** Official Artwork sprites */

export interface OfficialArtwork {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
}
/** Home sprites */

export interface Home {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
}
/** Showdown Sprites */

export interface Showdown {
  /** The default depiction of this Pokémon from the front in battle */
  front_default: string | null;
  /** The female depiction of this Pokémon from the front in battle */
  front_female: string | null;
  /** The shiny depiction of this Pokémon from the front in battle */
  front_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the front in battle */
  front_shiny_female: string | null;
  /** The default depiction of this Pokémon from the back in battle */
  back_default: string | null;
  /** The female depiction of this Pokémon from the back in battle */
  back_female: string | null;
  /** The shiny depiction of this Pokémon from the back in battle */
  back_shiny: string | null;
  /** The shiny female depiction of this Pokémon from the back in battle */
  back_shiny_female: string | null;
}

export interface PokemonType {
  /** The order the Pokémon's types are listed in */
  slot: number;
  /** The type the referenced Pokémon has */
  type: Type;
}

export interface Type {
  /** The name of the type*/
  name: PokemonTypeNames;
  /**The URL of the referenced resource. */
  url: string;
}

export interface PokemonStat {
  /**	The stat the Pokémon has. */
  stat: NamedAPIResource;
  /**	/**	The stat the Pokémon has. */
  effort: number;
  /**	The base value of the stat. */
  base_stat: number;
}
