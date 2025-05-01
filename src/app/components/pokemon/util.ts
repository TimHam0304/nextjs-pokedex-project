import { typeEffectiveness } from "@constants";
import { PokemonTypeNames } from "@/app/models/Pokemon/pokemonTypeNames";

interface getWeaknessesProps {
  type1: PokemonTypeNames;
  type2?: PokemonTypeNames;
}

type WeaknessMap = Record<PokemonTypeNames, number>;

/**
 *
 * @param type1 a pokemon type
 * @param type2 another optional type for dual type pokemon
 * @returns an object containing damage multipliers recieved by the input type / types by other types
 */
export function getWeaknesses({
  type1,
  type2,
}: getWeaknessesProps): WeaknessMap {
  if (!typeEffectiveness[type1]) {
    throw new Error(`Invalid type: ${type1}`);
  }
  if (type2 && !typeEffectiveness[type2]) {
    throw new Error(`Invalid type: ${type2}`);
  }

  const weaknesses = Object.fromEntries(
    (Object.keys(typeEffectiveness) as PokemonTypeNames[]).map(
      (attackingType) => {
        const mult1 = typeEffectiveness[attackingType][type1] ?? 1;
        const mult2 = type2 ? typeEffectiveness[attackingType][type2] ?? 1 : 1;
        return [attackingType, mult1 * mult2];
      }
    )
  ) as WeaknessMap;

  return weaknesses;
}
