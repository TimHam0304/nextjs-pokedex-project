"use client"; // Error boundaries must be Client Components
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FetchErrorPageProps {
  status: {
    code: number;
    message: string;
  };
}

export function FetchError({ status }: FetchErrorPageProps) {
  const { refresh } = useRouter();
  return (
    <div className="flex flex-col gap-8 py-20 px-6 mx-auto max-w-7xl h-screen w-full items-center justify-center text-center">
      <h1 className="text-3xl font-bold font-mono">
        {status.code} {status.message}
      </h1>
      <p>
        This page fetches its data from{" "}
        <Link
          referrerPolicy="no-referrer"
          rel="external"
          target="_blank"
          className="underline visited:text-blue-400"
          href={"https://pokeapi.co/"}
        >
          Pokeapi.co
        </Link>
        . It might be unavailable right now.
      </p>
      <p>Please try again later</p>
      <button
        className="py-3 px-8 inline-flex justify-center items-center bg-neutral-800 hover:bg-neutral-700 rounded-md text-sm font-medium whitespace-nowrap ring-offset-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300/70 focus-visible:ring-offset-2"
        onClick={refresh}
      >
        Try again
      </button>
    </div>
  );
}
