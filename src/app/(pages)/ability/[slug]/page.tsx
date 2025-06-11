import { getAbility } from "@actions/AbilityActions";
import { FetchError } from "@components/error/fetchErrorPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AbilityPokemon } from "@models/Pokemon/ability";
import Link from "next/link";

interface AbilityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: AbilityPageProps
): Promise<Metadata> {
  const params = await props.params;
  return {
    title: `Ability - ${params.slug}`,
  };
}

export default async function AbilityPage(props: AbilityPageProps) {
  const params = await props.params;
  const { ability, status } = await getAbility(params.slug);

  if (!ability) {
    if (status.code === 404) {
      notFound();
    } else {
      return <FetchError status={status} />;
    }
  }

  const englishEffect = ability.effect_entries.find(
    (entry) => entry.language.name === "en"
  );

  return (
    <main className="flex flex-col py-20 px-6 mx-auto max-w-7xl h-auto w-full gap-6">
      <h1 className="font-bold text-3xl text-center text-indigo-700 dark:text-indigo-300">
        {ability.name[0].toUpperCase() + ability.name.slice(1)}
      </h1>
      <section className="flex flex-col w-full gap-6">
        <div className="">
          <h2 className="text-xl font-bold w-full border-b-2 pb-1 border-indigo-500 mb-4">
            Effect
          </h2>
          {englishEffect && <p className="text-sm">{englishEffect.effect}</p>}
        </div>
        <div className="">
          <h2 className="text-xl font-bold w-full border-b-2 pb-1 border-indigo-500 mb-4">
            Short Effect
          </h2>
          {englishEffect && (
            <p className="text-sm">{englishEffect.short_effect}</p>
          )}
        </div>
      </section>
      <section className="flex flex-col w-full">
        <h2 className="text-xl font-bold w-full border-b-2 pb-1 border-indigo-500 mb-4">
          First Appearance
        </h2>

        <p className="text-sm">{ability.generation.name.toUpperCase()}</p>
      </section>
      <section className="flex flex-col w-full gap-2">
        <h2 className="text-xl font-bold w-full border-b-2 pb-1 border-indigo-500 mb-4">
          List of pokemons with this ability
        </h2>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 w-full">
          {ability.pokemon.map((entry: AbilityPokemon) => (
            <Link
              href={`/pokemon/${entry.pokemon.name}`}
              className="text-center hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md py-1 indigo-focus-outline"
              key={entry.pokemon.name}
            >
              {entry.pokemon.name[0].toUpperCase() +
                entry.pokemon.name.slice(1)}
              {entry.is_hidden ? " *" : ""}
            </Link>
          ))}
        </div>
        <p className="text-sm">* the ability is hidden for this pokemon</p>
      </section>
    </main>
  );
}
