"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-4 py-20 px-6 mx-auto max-w-7xl h-auto w-full">
      <h2>An unexpected error occurred</h2>
      <div>Error message: {error.message}</div>
      <button
        className="p-4 bg-neutral-700 rounded-md hover:bg-neutral-600"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
