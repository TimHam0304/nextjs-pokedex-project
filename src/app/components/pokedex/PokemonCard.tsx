import Link from "next/link";
import Image from "next/image";
import { TYPECOLORS } from "@constants";
import { Pokemon, PokemonType } from "@models/Pokemon/pokemon";
import fallBackImage from "@public/fallback.jpg";
import { SVGSkeleton, Skeleton } from "@components/misc/Skeleton";
import { forwardRef, AnchorHTMLAttributes } from "react";

export function PokemonCard({ Pokemon }: { Pokemon: Pokemon }) {
  return (
    <Link
      href={`/pokemon/${Pokemon.name}`}
      className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg shadow-indigo-700/10 dark:shadow-inherit hover:shadow-none gray-outline-indigo-focus-outline hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all"
    >
      <Image
        src={
          Pokemon.sprites.front_default
            ? Pokemon.sprites.front_default
            : fallBackImage
        }
        width={200}
        height={200}
        className="object-contain mx-auto"
        alt={`Image of ${Pokemon.name}`}
      />
      <div className="flex flex-col items-center pt-2 gap-2">
        <span className="font-bold text-xl">
          {Pokemon.name[0].toUpperCase() + Pokemon.name.slice(1)}
        </span>
        <span className="font-semibold text-base">{`#${Pokemon.id
          .toString()
          .padStart(3, "0")}`}</span>
        <div className="flex gap-2">
          {Pokemon.types.map((pType: PokemonType) => {
            const color =
              TYPECOLORS[pType.type.name as keyof typeof TYPECOLORS] || "#333";
            return (
              <span
                key={pType.type.name}
                className={`py-1 px-2 rounded-xl font-extrabold text-white`}
                style={{ backgroundColor: color }}
              >
                {pType.type.name[0].toUpperCase() + pType.type.name.slice(1)}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

interface SkeletonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

/**
 * A Skelleton for the PokemonCard
 * classname is only needed to apply media query on parent
 */
export const PokemonCardSkeleton = forwardRef<HTMLAnchorElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <a
        ref={ref}
        {...props}
        className={`${className} flex flex-col items-center p-5 border-2 rounded-2xl border-neutral-200 dark:border-neutral-800 shadow-sm`}
      >
        <SVGSkeleton className="object-contain w-[200px] h-[200px]" />
        <div className="flex flex-col items-center pt-2 gap-2">
          <span>
            <Skeleton className="w-[120px] max-w-full" />
          </span>
          <span>
            <Skeleton className="w-[60px] max-w-full" />
          </span>
          <div className="flex gap-2">
            <span className="py-1 px-2">
              <Skeleton className="w-[48px] max-w-full" />
            </span>
            <span className="py-1 px-2">
              <Skeleton className="w-[48px] max-w-full" />
            </span>
          </div>
        </div>
      </a>
    );
  }
);

PokemonCardSkeleton.displayName = "PokemonCardSkeleton";
