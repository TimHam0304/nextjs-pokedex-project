"use client";
import PokeBG from "@public/pokemon-party.jpg";
import PokeBG2 from "@public/pokemon-outing.jpg";
import PokeBG3 from "@public/pokestop.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";

const IMAGES = [PokeBG, PokeBG2, PokeBG3];

export function HomeImageSlider() {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === IMAGES.length - 1) return 0;
      return index + 1;
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      showNextImage();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute w-full min-h-[500px] h-[49.5vw] top-0 -z-20 brightness-[80%] dark:brightness-[40%] px-4 sm:px-8 lg:px-16">
      <div className="relative w-full h-full flex overflow-hidden rounded-3xl">
        {IMAGES.map((url) => (
          <Image
            className="w-full h-full object-cover object-top flex-shrink-0 flex-grow-0 transition-all duration-[800ms]"
            style={{ translate: `${-100 * imageIndex}%` }}
            width={1280}
            height={720}
            key={url.src}
            src={url.src}
            alt="hero image"
          />
        ))}
      </div>
    </div>
  );
}
