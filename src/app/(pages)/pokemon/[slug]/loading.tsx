export default function Loading() {
  return (
    <div className="flex flex-col gap-4 py-20 px-6 mx-auto max-w-7xl h-auto w-full animate-pulse">
      <div>
        <div className="h-10 w-[117px] bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded-md"></div>
      </div>
      <div className="flex w-full justify-center">
        <div className="bg-neutral-200 dark:bg-neutral-800 w-[600px] rounded-3xl p-2 h-[1100px]"></div>
      </div>
    </div>
  );
}
