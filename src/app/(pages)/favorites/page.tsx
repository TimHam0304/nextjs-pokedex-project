import { FavoritesGrid } from "@components/favorites/FavoritesGrid";
import { Suspense } from "react";
import { PokedexComponentSkeleton } from "@/app/components/misc/PokedexLoadingSkeleton";

export default async function ListPage() {
  return (
    <main className="flex flex-col gap-6 py-20 px-6 mx-auto max-w-7xl w-full items-center">
      <h1 className="font-bold text-3xl text-center text-indigo-700 dark:text-indigo-300">
        Favorites
      </h1>
      <Suspense fallback={<PokedexComponentSkeleton />}>
        <FavoritesGrid />
      </Suspense>
    </main>
  );
}
