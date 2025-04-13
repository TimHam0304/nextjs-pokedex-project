"use client";

import { useEffect, useState } from "react";

interface ScrollStyleWrapperProps {
  children: React.ReactNode;
}

/**
 * A Wrapper used for the header to change style based on scroll state
 *
 * Using the Children pattern prevents the entire component from turning into client component
 */
export function ScrollStyleWrapper({ children }: ScrollStyleWrapperProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function changeBG() {
      if (window.scrollY >= 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", changeBG);
    return () => {
      window.removeEventListener("scroll", changeBG);
    };
  }, []);

  const style = {
    base: "flex w-full h-full px-6 transition-all duration-300",
    top: "bg-white/60 dark:bg-neutral-900/60",
    onScroll:
      "bg-white/90 dark:bg-neutral-900/90 shadow-sm shadow-neutral-600 backdrop-blur-sm backdrop-saturate-150",
  };

  return (
    <div className={`${style.base} ${scrolled ? style.onScroll : style.top}`}>
      {children}
    </div>
  );
}
