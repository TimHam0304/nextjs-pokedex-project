"use client";

import { useFavoritesStore } from "@/app/stores/favoritesStoreProvider";
import { HeartSolid, HeartOutlined } from "@icons/heart";
import { LinkIcon } from "@icons/link";
import { BASE_URL } from "@constants";

export function LikeAndShareBox({ name }: { name: string }) {
  const { toggleFavorite, isFavorite } = useFavoritesStore((state) => state);
  const isFav = isFavorite(name);
  return (
    <div className="flex justify-center gap-4 mt-2">
      <button
        onClick={() =>
          navigator.clipboard.writeText(`${BASE_URL.DOMAIN}/pokemon/${name}`)
        }
        className="group p-1 rounded-full hover:bg-blue-500/10 active:bg-blue-500/20"
      >
        <LinkIcon className="size-6 group-hover:text-blue-500 group-active:text-blue-300" />
      </button>
      <button
        onClick={() => toggleFavorite(name)}
        className="group p-2 rounded-full hover:bg-pink-600/10"
      >
        {isFav ? (
          <HeartSolid className="size-6 text-pink-600" />
        ) : (
          <HeartOutlined className="size-6 group-hover:text-pink-600" />
        )}
      </button>
    </div>
  );
}
