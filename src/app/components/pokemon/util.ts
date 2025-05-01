import { typeEffectiveness } from "@constants";
import { PokemonTypeNames } from "@/app/models/Pokemon/pokemonTypeNames";
/**
 * @param type1 a pokemon type
 * @param type2 another optional type for dual type pokemon
 * @returns an array of objects containing attacking type name and the resulting damage multiplier
 */
export function getTypeDamageMultipliers(
  type1: PokemonTypeNames,
  type2?: PokemonTypeNames
): { type: PokemonTypeNames; value: number }[] {
  const results: { type: PokemonTypeNames; value: number }[] = [];

  for (const attackType of Object.keys(
    typeEffectiveness
  ) as PokemonTypeNames[]) {
    const eff1 = typeEffectiveness[attackType][type1];
    const eff2 = type2 ? typeEffectiveness[attackType][type2] : 1;
    results.push({ type: attackType, value: eff1 * eff2 });
  }

  return results;
}
