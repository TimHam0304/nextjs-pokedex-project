import Link from "next/link";
import { WavesSVG } from "@/app/assets/WaveSVG";
import { HomeImageSlider } from "./HomeImageSlider";

export function HeroSection() {
  return (
    <section
      className="relative w-full min-h-[500px] h-[50vw]"
      aria-label="Image Carousel"
    >
      <HomeImageSlider />
      <WavesSVG className="absolute bottom-0 w-full min-h-[500px] -z-10 h-auto object-cover object-bottom" />
      <div className="w-full h-full flex flex-col justify-center items-center gap-10">
        <h1 className="font-extrabold text-white antialiased text-responsiveHero text-center mx-6 leading-none">
          Next.js Pokédex
        </h1>
        <Link
          href="/pokedex"
          className=" rounded-full py-2 px-4 text-2xl font-bold text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Explore the Pokedex
        </Link>
      </div>
    </section>
  );
}
