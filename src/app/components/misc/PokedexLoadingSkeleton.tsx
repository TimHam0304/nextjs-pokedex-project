import { InView } from "react-intersection-observer";
import { PokemonCardSkeleton } from "@components/misc/PokemonCardSkeleton";
import { Skeleton } from "@components/misc/Skeleton";

interface PokedexLoadingSkeletonProps {
  onInView: Function;
}

export function PokedexLoadingSkeleton({
  onInView,
}: PokedexLoadingSkeletonProps) {
  return (
    <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full h-auto">
      <InView
        onChange={(inView) => {
          if (inView) {
            onInView();
          }
        }}
      >
        <PokemonCardSkeleton />
      </InView>
      <PokemonCardSkeleton className="hidden sm:flex" />
      <PokemonCardSkeleton className="hidden lg:flex" />
    </section>
  );
}

export function PokedexComponentSkeleton() {
  return (
    <div className="flex flex-col items-center h-auto w-full gap-6">
      <span className="flex items-center h-14 gap-1">
        <Skeleton className="w-60 max-w-full" />
      </span>
      <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full h-auto">
        <PokemonCardSkeleton />
        <PokemonCardSkeleton className="hidden sm:flex" />
        <PokemonCardSkeleton className="hidden lg:flex" />
        <PokemonCardSkeleton />
        <PokemonCardSkeleton className="hidden sm:flex" />
        <PokemonCardSkeleton className="hidden lg:flex" />
      </section>
    </div>
  );
}
