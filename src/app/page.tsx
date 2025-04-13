import PokedexPNG from "@public/Pokedex.png";
import { HomeCardLinkPicure } from "@components/home/HomeCard";
import { HeroSection } from "@components/home/hero";

export default function Home() {
  return (
    <main className="flex flex-col w-full h-auto">
      <HeroSection />
      <section>
        <div className="flex gap-6 flex-col px-6 items-center mx-auto max-w-7xl h-auto w-full">
          <h2 className="font-extrabold text-indigo-700 dark:text-inherit antialiased text-2xl sm:text-4xl text-center">
            Explore our Content
          </h2>
          <p className="dark:text-neutral-400 text-center text-sm font-normal">
            Find all pokemon related information on one site
          </p>
        </div>

        <div className="flex flex-wrap gap-4 py-10 px-6 justify-center items-center  mx-auto max-w-7xl h-auto w-full">
          <HomeCardLinkPicure
            href="/pokedex"
            title="Pokedex"
            imgSrc={PokedexPNG}
            text="An infinite scroll pokedex with search function"
          />
          <HomeCardLinkPicure
            href="/paginatedPokedex"
            title="Paginated Pokedex"
            imgSrc={PokedexPNG}
            text="A paginated Pokedex with search function"
          />
          <HomeCardLinkPicure
            href="/list"
            title="Pokemon list"
            imgSrc={PokedexPNG}
            text="A simple list view of all existing Pokemon"
          />
        </div>
      </section>
    </main>
  );
}
