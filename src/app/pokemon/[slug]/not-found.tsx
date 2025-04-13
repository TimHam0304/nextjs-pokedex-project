import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 py-20 px-6 mx-auto max-w-7xl h-screen w-full items-center justify-center text-center">
      <span className="text-3xl font-bold font-mono">404</span>
      <span>This page does not exist</span>
      <span>
        Please try using the search function of the{" "}
        <Link className="underline visited:text-blue-400" href="/pokedex">
          pokedex page
        </Link>{" "}
        or the search bar on top of the page
      </span>
    </div>
  );
}
