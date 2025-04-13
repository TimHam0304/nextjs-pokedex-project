/**A List of NamedAPIResources */
export interface NamedAPIResourceList {
  /** The total number of resources available from this API.*/
  count: number;
  /**	The URL for the next page in the list. */
  next: string;
  /**	The URL for the previous page in the list. */
  previous: string | null;
  /**	A list of named API resources. */
  results: NamedAPIResource[];
}

/**
 * Name and URL of the referenced resource
 */
export interface NamedAPIResource {
  /**	The name of the referenced resource. */
  name: string;
  /**	The URL of the referenced resource. */
  url: string;
}

/** A URL for another API resource */
export interface APIResource {
  /** The URL of the referenced resource */
  url: string;
}

/**
 * The localized name for an API resource in a specific language
 */
export interface Name {
  /** The localized name for an API resource in a specific language */
  name: string;
  /** The language this name is in */
  language: NamedAPIResource;
}

/**
 * The localized flavor text for an API resource in a specific language
 */
export interface FlavorText {
  /** The localized flavor text for an API resource in a specific language */
  flavor_text: string;
  /** The language this name is in */
  language: NamedAPIResource;
  /** The game version this flavor text appears in */
  version: NamedAPIResource;
}
