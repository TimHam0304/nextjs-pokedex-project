"use client";
import { useEffect, useState } from "react";

/**
 *
 * @param value the value to be debounced
 * @param delay the delay in ms (default 500ms)
 * @returns debounced value
 */
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, SetDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      SetDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
