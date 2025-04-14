import { BackButton } from "@components/misc/BackButton";
import { PokemonStatCard } from "@components/pokemon/PokemonStatCard";
import { Metadata } from "next";
import { Suspense } from "react";

interface PokemonPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(
  props: PokemonPageProps
): Promise<Metadata> {
  const params = await props.params;
  return {
    title: params.slug,
  };
}

//TODO this can probably be improved
//currently non existent slugs still cause a dynamic render on the server for each new slug
//I could use a middleware here to check the sslug against a whitelist
export default async function Pokemon(props: PokemonPageProps) {
  const params = await props.params;
  return (
    <main className="flex flex-col gap-4 py-20 px-6 mx-auto max-w-7xl h-auto w-full">
      <div>
        <BackButton />
      </div>
      <Suspense
        fallback={
          <div className="flex w-full justify-center animate-pulse">
            <div className="bg-neutral-200 dark:bg-neutral-800 w-[600px] rounded-3xl p-2 h-[1100px]"></div>
          </div>
        }
      >
        <PokemonStatCard slug={params.slug} />
      </Suspense>
    </main>
  );
}
