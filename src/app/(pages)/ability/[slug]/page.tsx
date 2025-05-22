import { getAbility } from "@actions/AbilityActions";
import { FetchError } from "@components/error/fetchErrorPage";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { AbilityPokemon } from "@models/Pokemon/ability";

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

//TODO finish styling this page
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
        {ability.name}
      </h1>
      {englishEffect && (
        <h2 className="text-sm text-center">{englishEffect.effect}</h2>
      )}
      <section className="flex flex-col w-full justify-center items-center gap-2">
        <div>{englishEffect?.short_effect}</div>
        <div>first appearance: {ability.generation.name.toUpperCase()}</div>
        <h3>List of pokemons with this ability:</h3>
        {ability.pokemon.map((entry: AbilityPokemon) => (
          <div key={entry.pokemon.name}>{entry.pokemon.name}</div>
        ))}
      </section>
    </main>
  );
}
