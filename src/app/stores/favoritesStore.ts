import { createStore } from "zustand/vanilla";

export type FavoritesState = {
  count: number;
  favorites: string[];
};

export type FavoritesActions = {
  toggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
};

export type FavoritesStore = FavoritesState & FavoritesActions;

export const defaultInitState: FavoritesState = {
  count: 0,
  favorites: [],
};

//TODO make persistant on refresh
export const createFavoritesStore = (
  initState: FavoritesState = defaultInitState
) => {
  return createStore<FavoritesStore>()((set, get) => ({
    ...initState,
    toggleFavorite: (name: string) =>
      set((state) => {
        const exists = state.favorites.includes(name);
        const updatedFavorites = exists
          ? state.favorites.filter((n) => n !== name)
          : [...state.favorites, name];
        return {
          favorites: updatedFavorites,
          count: updatedFavorites.length,
        };
      }),
    isFavorite: (name: string) => get().favorites.includes(name),
  }));
};
