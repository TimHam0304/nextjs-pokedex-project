import Image from "next/image";
import PokeBG from "@public/pokemon-party.jpg";
import Link from "next/link";
import { WavesSVG } from "@/app/assets/WaveSVG";

//TODO render the waves conditionaly based on light or dark mode

export function HeroSection() {
  return (
    <div className="relative w-full min-h-[500px] h-[50vw]">
      <Image
        className="absolute w-full min-h-[500px] h-[49.5vw] top-0 -z-20 object-cover brightness-[80%] dark:brightness-[60%] object-top"
        alt=""
        priority
        src={PokeBG}
      />
      <WavesSVG className="absolute bottom-0 w-full min-h-[500px] -z-10 h-auto object-cover object-bottom" />
      <div className="w-full h-full flex flex-col justify-center items-center gap-10">
        <h1 className="font-extrabold text-white antialiased text-responsiveHero text-center mx-6 leading-none">
          Next.js Pokédex
        </h1>
        <Link
          href="/pokedex"
          className="bg-gradient-to-tr from-indigo-500 to-indigo-700 hover:from-indigo-400 hover:to-indigo-600 transition-all rounded-full py-2 px-4 text-2xl font-bold text-white
          focus-visible:outline-none ring-transparent focus-visible:ring-2 focus-visible:ring-white focus-visible:from-indigo-400 focus-visible:to-indigo-600"
        >
          Explore the Pokedex
        </Link>
      </div>
    </div>
  );
}
