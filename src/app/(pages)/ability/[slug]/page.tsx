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

//TODO improve design of page
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
    <main className="flex flex-col gap-6 py-20 px-6 mx-auto max-w-7xl h-auto w-full items-center">
      <h1 className="font-bold text-3xl text-center text-indigo-700 dark:text-inherit">
        {ability.name[0].toUpperCase() + ability.name.slice(1)}
      </h1>
      <section className="flex flex-col sm:flex-row text-center gap-2">
        <div className="sm:min-w-3/4 bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg shadow-indigo-700/10 dark:shadow-inherit gray-outline-indigo-focus-outline transition-all">
          <h2 className="text-xl font-bold">Effect</h2>
          {englishEffect && (
            <p className="text-sm text-center">{englishEffect.effect}</p>
          )}
        </div>
        <div className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg shadow-indigo-700/10 dark:shadow-inherit gray-outline-indigo-focus-outline transition-all">
          <h2 className="text-xl font-bold">Short Effect</h2>
          {englishEffect && (
            <p className="text-sm text-center">{englishEffect.short_effect}</p>
          )}
        </div>
      </section>
      <section className="flex flex-col text-center gap-2">
        <h2 className="text-xl font-bold">First Appearance</h2>

        <p className="text-sm text-center">
          {ability.generation.name.toUpperCase()}
        </p>
      </section>
      <section className="flex flex-col w-full gap-2">
        <h2 className="text-xl font-bold text-center">
          List of pokemons with this ability
        </h2>
        <p className="text-sm text-center">
          * the ability is hidden for this pokemon
        </p>
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
      </section>
    </main>
  );
}
