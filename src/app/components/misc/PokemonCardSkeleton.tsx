import { SVGSkeleton, Skeleton } from "@components/misc/Skeleton";
import { forwardRef, AnchorHTMLAttributes } from "react";

interface SkeletonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}

/**
 * A Skeleton for the PokemonCard
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
