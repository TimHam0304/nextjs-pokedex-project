import { InView } from "react-intersection-observer";
import { PokemonCardSkeleton } from "@components/pokedex/PokemonCard";

interface PokedexLoadingSkelletonProps {
  onInView: Function;
}

export function PokedexLoadingSkelleton({
  onInView,
}: PokedexLoadingSkelletonProps) {
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
