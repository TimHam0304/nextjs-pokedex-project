const Skeleton = ({ className }: React.ComponentPropsWithoutRef<"div">) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full animate-pulse select-none rounded-md bg-neutral-700 leading-none">
      ‌
    </span>
    <br />
  </div>
);

const SVGSkeleton = ({ className }: React.ComponentPropsWithoutRef<"svg">) => (
  <svg className={className + " animate-pulse rounded bg-neutral-700"} />
);

export { Skeleton, SVGSkeleton };
