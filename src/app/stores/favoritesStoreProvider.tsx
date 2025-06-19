"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type FavoritesStore, createFavoritesStore } from "./favoritesStore";

export type FavoritesStoreApi = ReturnType<typeof createFavoritesStore>;

export const FavoritesStoreContext = createContext<
  FavoritesStoreApi | undefined
>(undefined);

export interface FavoritesStoreProviderProps {
  children: ReactNode;
}

export const FavoritesStoreProvider = ({
  children,
}: FavoritesStoreProviderProps) => {
  const storeRef = useRef<FavoritesStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createFavoritesStore();
  }

  return (
    <FavoritesStoreContext.Provider value={storeRef.current}>
      {children}
    </FavoritesStoreContext.Provider>
  );
};

export const useFavoritesStore = <T,>(
  selector: (store: FavoritesStore) => T
): T => {
  const favoritesStoreContext = useContext(FavoritesStoreContext);

  if (!favoritesStoreContext) {
    throw new Error(
      `useFavoritesStore must be used within CounterStoreProvider`
    );
  }

  return useStore(favoritesStoreContext, selector);
};
