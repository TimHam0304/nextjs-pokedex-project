import Image from "next/image";
import { getPokemon } from "@actions/PokemonActions";
import { BackButton } from "@components/misc/BackButton";

interface ImageGalleryProps {
  params: Promise<{ slug: string }>;
}

export default async function ImageGallery(props: ImageGalleryProps) {
  const params = await props.params;
  return (
    <main className="flex flex-col items-center gap-8 py-20 px-6 mx-auto max-w-7xl h-auto w-full">
      <div className="flex w-full">
        <BackButton />
      </div>

      <div className="text-2xl font-bold">
        {params.slug[0].toUpperCase() + params.slug.slice(1)} Images
      </div>
      <ImageDisplay slug={params.slug} />
    </main>
  );
}

//TODO move to different file and wrap ImageDisplay in suspense
export async function ImageDisplay({ slug }: { slug: string }) {
  const { pokemon } = await getPokemon(slug);

  if (!pokemon) {
    return <div>no images</div>;
  }

  return (
    <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full h-auto">
      {pokemon.sprites.other?.["official-artwork"].front_default && (
        <div className="flex justify-center bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg shadow-indigo-700/10 dark:shadow-inherit hover:shadow-none outline outline-2 outline-gray-900/5">
          <Image
            src={pokemon.sprites.other?.["official-artwork"].front_default}
            width={300}
            height={300}
            alt={`Image of ${pokemon.name}`}
          />
        </div>
      )}
      {pokemon.sprites.other?.["official-artwork"].front_shiny && (
        <div className="flex justify-center bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg shadow-indigo-700/10 dark:shadow-inherit hover:shadow-none outline outline-2 outline-gray-900/5">
          <Image
            src={pokemon.sprites.other?.["official-artwork"].front_shiny}
            width={300}
            height={300}
            alt={`Image of ${pokemon.name}`}
          />
        </div>
      )}
      {pokemon.sprites.front_default && (
        <div className="flex justify-center bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg shadow-indigo-700/10 dark:shadow-inherit hover:shadow-none outline outline-2 outline-gray-900/5">
          <Image
            src={pokemon.sprites.front_default}
            width={300}
            height={300}
            alt={`Image of ${pokemon.name}`}
          />
        </div>
      )}
      {pokemon.sprites.front_shiny && (
        <div className="flex justify-center bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg shadow-indigo-700/10 dark:shadow-inherit hover:shadow-none outline outline-2 outline-gray-900/5">
          <Image
            src={pokemon.sprites.front_shiny}
            width={300}
            height={300}
            alt={`Image of ${pokemon.name}`}
          />
        </div>
      )}
    </section>
  );
}
