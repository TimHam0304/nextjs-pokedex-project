import { getPokemon, getPokemonSpecies } from "@actions/PokemonActions";
import Image from "next/image";
import fallBackImage from "@public/fallback.jpg";
import { STATCOLORS, TYPECOLORS, STAT_ABBREVIATIONS } from "@constants";
import {
  PokemonAbility,
  PokemonStat,
  PokemonType,
} from "@models/Pokemon/pokemon";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NamedAPIResource } from "@models/basic/resource";
import { FetchError } from "../error/fetchErrorPage";
import { FlavorTextModal } from "@components/pokemon/FlavorTextDialog";
import { TypeEffectivenessContainer } from "@components/pokemon/TypeEffectivenessContainer";

interface PokemonCardProps {
  slug: string;
}

export async function PokemonStatCard({ slug }: PokemonCardProps) {
  const { pokemon, status: pStatus } = await getPokemon(slug);

  if (!pokemon) {
    if (pStatus.code === 404) {
      notFound();
    } else {
      return <FetchError status={pStatus} />;
    }
  }

  const { pokemonSpecies, status } = await getPokemonSpecies(
    pokemon.species.name
  );

  if (!pokemonSpecies) {
    if (status.code === 404) {
      notFound();
    } else {
      return <FetchError status={status} />;
    }
  }

  const FirstTypeColor =
    TYPECOLORS[pokemon.types[0].type.name as keyof typeof TYPECOLORS] || "#333";

  const englishFlavorTexts = pokemonSpecies.flavor_text_entries.filter(
    (entry) => entry.language.name === "en"
  );

  const englishGenus = pokemonSpecies.genera.find(
    (entry) => entry.language.name === "en"
  )?.genus;

  const jpPokemonName = pokemonSpecies.names.find(
    (entry) => entry.language.name === "ja"
  )?.name;

  const roomajiPokemonName = pokemonSpecies.names.find(
    (entry) => entry.language.name === "roomaji"
  )?.name;

  return (
    <section className="flex w-full justify-center">
      <div className="bg-white dark:bg-neutral-800 w-[600px] h-auto rounded-3xl p-2 outline outline-2 outline-gray-900/10 shadow-xl shadow-indigo-700/10 dark:shadow-inherit">
        <div
          style={{ backgroundColor: FirstTypeColor }}
          className="flex flex-col w-full h-full rounded-3xl p-1 relative"
        >
          {/*ID*/}
          <div className=" absolute top-0 left-0 flex justify-start gap-2 min-w-24 bg-white dark:bg-neutral-800 rounded-br-3xl py-4 px-5 rounded-tl-2xl z-10">
            <span className="font-bold text-2xl">{`#${pokemon.id
              .toString()
              .padStart(3, "0")}`}</span>
          </div>
          {/*Image Container*/}
          <div className="flex justify-center w-full h-[300px] relative">
            <Image
              src={
                pokemon.sprites.other?.["official-artwork"].front_default ||
                pokemon.sprites.front_default ||
                fallBackImage
              }
              width={300}
              height={300}
              className="absolute bottom-[-30%] w-full h-full max-w-[300px] max-h-[300px] object-contain"
              alt={`Image of ${pokemon.name}`}
            />
          </div>
          {/*inner content block*/}
          <div className="bg-white dark:bg-neutral-800 w-full rounded-3xl pt-28 p-6">
            <div className="flex flex-col items-center h-full w-full text-pretty gap-6">
              {/*Image Gallery Link*/}
              <Link
                className="underline text-xs visited:text-blue-400 indigo-focus-outline focus-visible:outline-offset-4"
                href={`/pokemon/${pokemon.name}/images`}
              >
                More Images
              </Link>
              {/*Pokemon Types*/}
              <div className="flex gap-4">
                {pokemon.types.map((pType: PokemonType) => {
                  const color =
                    TYPECOLORS[pType.type.name as keyof typeof TYPECOLORS] ||
                    "#333";
                  return (
                    <span
                      key={pType.type.name}
                      className={`py-1 px-2 rounded-xl font-extrabold text-white`}
                      style={{ backgroundColor: color }}
                    >
                      {pType.type.name[0].toUpperCase() +
                        pType.type.name.slice(1)}
                    </span>
                  );
                })}
              </div>
              {/*Pokemon Names EN/JP*/}
              <div className="flex flex-col sm:flex-row w-full items-center sm:items-stretch gap-2 sm:gap-0">
                <div className="flex flex-col items-center justify-center w-full sm:w-1/2 text-center">
                  <span className="font-extrabold text-2xl">
                    {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                  </span>
                  {englishGenus ? (
                    <span className="font-medium text-lg leading-5">
                      {englishGenus}
                    </span>
                  ) : (
                    <span className="font-medium text-xl">none</span>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center text-lg w-full sm:w-1/2 font-medium">
                  {jpPokemonName ? (
                    <span className="font-bold"> {jpPokemonName}</span>
                  ) : (
                    <span>no jp name</span>
                  )}
                  {roomajiPokemonName ? (
                    <span>{roomajiPokemonName}</span>
                  ) : (
                    <span>no romaji name</span>
                  )}
                </div>
              </div>
              {/*About Heading*/}
              <h1
                style={{ color: FirstTypeColor }}
                className="text-2xl font-extrabold dark:brightness-150"
              >
                About
              </h1>
              {/*About Text*/}
              <FlavorTextModal
                titleColor={FirstTypeColor}
                englishFlavorTexts={englishFlavorTexts}
              />
              {/*Abilities Heading + Content*/}
              <div className="flex flex-col gap-2 items-center w-full">
                <h2
                  style={{ color: FirstTypeColor }}
                  className="text-xl font-extrabold dark:brightness-150"
                >
                  Abilities
                </h2>
                <div className="flex gap-2 w-full justify-evenly">
                  {pokemon.abilities.map((pAbil: PokemonAbility, i: number) => {
                    return (
                      <Link
                        key={i}
                        href={`/ability/${pAbil.ability.name}`}
                        className={`flex flex-col justify-center py-1 px-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600`}
                      >
                        <span className="text-center indigo-focus-outline">
                          {pAbil.ability.name[0].toUpperCase() +
                            pAbil.ability.name.slice(1)}
                        </span>
                        {pAbil.is_hidden && (
                          <span className="text-xs font-sans text-center">
                            Hidden Ability
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-center w-full">
                <h2
                  style={{ color: FirstTypeColor }}
                  className="text-lg font-bold dark:brightness-150"
                >
                  Base stats
                </h2>
                <div className="flex gap-2 flex-wrap justify-center mb-2">
                  {pokemon.stats.map((entry: PokemonStat) => {
                    const color =
                      STATCOLORS[entry.stat.name as keyof typeof STATCOLORS] ||
                      "#333";
                    const statAbbr =
                      STAT_ABBREVIATIONS[entry.stat.name] || entry.stat.name;
                    return (
                      <span
                        className="flex flex-col min-w-20 items-center py-1 px-2 rounded-xl font-extrabold text-white"
                        style={{ backgroundColor: color }}
                        key={entry.stat.name}
                      >
                        <span>{entry.base_stat}</span>
                        <span>{statAbbr}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
              {/*Weight / Height Container*/}
              <div className="flex justify-around w-full gap-2">
                <div className="flex flex-col gap-2 items-center w-1/2">
                  <h2
                    style={{ color: FirstTypeColor }}
                    className="text-lg font-bold dark:brightness-150"
                  >
                    Weight
                  </h2>
                  <span className="text-base font-medium">
                    {pokemon.weight / 10} kg
                  </span>
                </div>
                <div className="flex flex-col gap-2 items-center w-1/2">
                  <h2
                    style={{ color: FirstTypeColor }}
                    className="text-lg font-bold dark:brightness-150"
                  >
                    Height
                  </h2>
                  <span className="text-base font-medium">
                    {pokemon.height / 10} m
                  </span>
                </div>
              </div>
              {/*Egg Group / Gender Container*/}
              <div className="flex flex-col gap-2 sm:flex-row w-full">
                <div className="flex flex-col gap-2 items-center sm:w-1/2">
                  <h2
                    style={{ color: FirstTypeColor }}
                    className="text-lg font-bold dark:brightness-150"
                  >
                    Egg Group
                  </h2>
                  {pokemonSpecies?.egg_groups ? (
                    <div className="flex gap-2">
                      {pokemonSpecies.egg_groups.map(
                        (egg_groups: NamedAPIResource) => {
                          return (
                            <div
                              key={egg_groups.name}
                              className="flex flex-col justify-center py-1 px-2 rounded-xl bg-neutral-100 dark:bg-neutral-700"
                            >
                              <span className="text-center">
                                {egg_groups.name[0].toUpperCase() +
                                  egg_groups.name.slice(1)}
                              </span>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <div>none</div>
                  )}
                </div>
                <div className="flex flex-col gap-2 items-center sm:w-1/2">
                  <h2
                    style={{ color: FirstTypeColor }}
                    className="text-lg font-bold text-center dark:brightness-150"
                  >
                    Gender Distribution
                  </h2>
                  {pokemonSpecies?.gender_rate ? (
                    <div>
                      {pokemonSpecies.gender_rate === -1 ? (
                        <span>gender neutral</span>
                      ) : (
                        <div className="flex gap-2 w-full">
                          <span className="flex flex-col justify-center py-1 px-2 rounded-xl bg-pink-700 text-center text-nowrap text-white">
                            {(pokemonSpecies.gender_rate / 8) * 100} % female
                          </span>
                          <span className="flex flex-col justify-center py-1 px-2 rounded-xl bg-blue-700 text-center text-nowrap text-white">
                            {100 - (pokemonSpecies.gender_rate / 8) * 100} %
                            male
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span>none</span>
                  )}
                </div>
              </div>
              {/*Previous Evolution*/}
              <div className="flex flex-col gap-2 items-center w-full">
                <h2
                  style={{ color: FirstTypeColor }}
                  className="text-lg font-bold text-center dark:brightness-150"
                >
                  Previous Evolution
                </h2>
                {pokemonSpecies?.evolves_from_species ? (
                  <Link
                    className="visited:text-blue-500 underline"
                    href={`/pokemon/${pokemonSpecies.evolves_from_species.name}`}
                  >
                    {pokemonSpecies.evolves_from_species.name[0].toUpperCase() +
                      pokemonSpecies.evolves_from_species.name.slice(1)}
                  </Link>
                ) : (
                  <span>none</span>
                )}
              </div>
              {/*Capture rate / Leveling rate Container*/}
              <div className="flex gap-2 justify-around w-full">
                <div className="flex flex-col gap-2 items-center sm:w-1/2">
                  <h2
                    style={{ color: FirstTypeColor }}
                    className="text-lg font-bold dark:brightness-150 text-center leading-tight"
                  >
                    Caputure rate
                  </h2>
                  <span className="">
                    {pokemonSpecies?.capture_rate || <span>none</span>}
                  </span>
                </div>
                <div className="flex flex-col gap-2 items-center sm:w-1/2">
                  <h2
                    style={{ color: FirstTypeColor }}
                    className="text-lg font-bold dark:brightness-150 text-center leading-tight"
                  >
                    Leveling rate
                  </h2>
                  <span className="">
                    {pokemonSpecies.growth_rate?.name || <span>none</span>}
                  </span>
                </div>
              </div>
              {/*Type effectiveness*/}
              <TypeEffectivenessContainer types={pokemon.types} />
              {/*Shape*/}
              <div className="flex flex-col gap-2 items-center w-full">
                <h2
                  style={{ color: FirstTypeColor }}
                  className="text-lg font-bold dark:brightness-150"
                >
                  Shape
                </h2>
                <span className="">
                  {pokemonSpecies.shape?.name || <span>none</span>}
                </span>
              </div>
              {/*First Appearance*/}
              <div className="flex flex-col gap-2 items-center w-full">
                <h2
                  style={{ color: FirstTypeColor }}
                  className="text-lg font-bold dark:brightness-150"
                >
                  First Appearance
                </h2>
                <span className="">
                  {pokemonSpecies.generation?.name.toUpperCase() || (
                    <span>none</span>
                  )}
                </span>
              </div>
              {/*Habitat*/}
              <div className="flex flex-col gap-2 items-center w-full">
                <h2
                  style={{ color: FirstTypeColor }}
                  className="text-lg font-bold dark:brightness-150"
                >
                  Habitat
                </h2>
                <span className="">
                  {pokemonSpecies.habitat?.name || <span>none</span>}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
