"use client";
import React from "react";
import { useEffect, useState } from "react";

type WaveSVGProps = {
  className?: string;
} & React.SVGProps<SVGSVGElement>;

export function WavesSVG({ className, ...props }: WaveSVGProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    const handler = (e: any) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <svg
      className={`${className}`}
      id="visual"
      viewBox="0 0 900 600"
      preserveAspectRatio="xMidYMin slice"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      {...props}
    >
      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#3730a3" />
        </linearGradient>
      </defs>

      <path
        d="M0 525L37.5 518.5C75 512 150 499 225 492.5C300 486 375 486 450 493.3C525 500.7 600 515.3 675 512.5C750 509.7 825 489.3 862.5 479.2L900 469L900 601L862.5 601C825 601 750 601 675 601C600 601 525 601 450 601C375 601 300 601 225 601C150 601 75 601 37.5 601L0 601Z"
        fill={`url(#heroGradient)`}
      />
      <path
        d="M0 548L37.5 542.8C75 537.7 150 527.3 225 524.7C300 522 375 527 450 535.3C525 543.7 600 555.3 675 553.2C750 551 825 535 862.5 527L900 519L900 601L862.5 601C825 601 750 601 675 601C600 601 525 601 450 601C375 601 300 601 225 601C150 601 75 601 37.5 601L0 601Z"
        fill={isDarkMode ? "#171717" : "#fff"}
      />
    </svg>
  );
}
