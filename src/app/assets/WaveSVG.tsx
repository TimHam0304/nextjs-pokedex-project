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
        d="M0 529L37.5 526.2C75 523.3 150 517.7 225 518.5C300 519.3 375 526.7 450 530.5C525 534.3 600 534.7 675 531.2C750 527.7 825 520.3 862.5 516.7L900 513L900 601L862.5 601C825 601 750 601 675 601C600 601 525 601 450 601C375 601 300 601 225 601C150 601 75 601 37.5 601L0 601Z"
        fill={`url(#heroGradient)`}
      />
      <path
        d="M0 570L37.5 565.3C75 560.7 150 551.3 225 550.7C300 550 375 558 450 563.5C525 569 600 572 675 570.5C750 569 825 563 862.5 560L900 557L900 601L862.5 601C825 601 750 601 675 601C600 601 525 601 450 601C375 601 300 601 225 601C150 601 75 601 37.5 601L0 601Z"
        fill={isDarkMode ? "#171717" : "#fff"}
      />
    </svg>
  );
}
