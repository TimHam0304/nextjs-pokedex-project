"use client";
import { X } from "@/app/icons/x";
import { FlavorText } from "@models/basic/resource";
import { useEffect, useRef } from "react";
import { Fragment } from "react";
import { ArrowInBoxTopRight } from "@icons/arrowInBox";

interface FlavorTextButtonProps {
  englishFlavorTexts: FlavorText[];
  titleColor: string;
}

export function FlavorTextModal({
  englishFlavorTexts,
  titleColor,
}: FlavorTextButtonProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const firstFlavorText = englishFlavorTexts[0].flavor_text;

  function openModal() {
    document.body.style.overflow = "hidden";
    dialogRef.current?.showModal();
  }

  function closeModal() {
    dialogRef.current?.close();
    document.body.style.overflow = "";
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (!dialogRef.current) return;
    const rect = dialogRef.current.getBoundingClientRect();
    const { left, right, top, bottom } = rect;

    if (
      e.clientX < left ||
      e.clientX > right ||
      e.clientY < top ||
      e.clientY > bottom
    ) {
      dialogRef.current.close();
    }
  };

  useEffect(() => {
    dialogRef.current?.addEventListener("close", closeModal);
    dialogRef.current?.addEventListener("click", handleClickOutside);
    return () => {
      dialogRef.current?.removeEventListener("click", handleClickOutside);
      dialogRef.current?.removeEventListener("close", closeModal);
    };
  }, []);

  return (
    <Fragment>
      <dialog
        className="backdrop:bg-black/50 bg-white dark:bg-neutral-800 text-inherit rounded-2xl w-[500px] max-h-[80vh] relative"
        ref={dialogRef}
      >
        <div className="flex justify-end sticky top-0">
          <button
            onClick={() => dialogRef.current?.close()}
            className="bg-neutral-200 dark:bg-neutral-600 rounded-full p-2 mr-2 mt-2"
          >
            <X strokeWidth={3} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 px-8 pb-8">
          <h1
            style={{ color: titleColor }}
            className="text-2xl font-extrabold text-center text-pretty"
          >
            Flavor Text in different Versions
          </h1>
          <div className="flex flex-col gap-2">
            {englishFlavorTexts.map((entry: FlavorText, i: number) => (
              <div key={i}>
                <div className="text-xl font-bold my-2 text-center">
                  {entry.version.name}
                </div>
                <div className="text-center text-pretty">
                  {entry.flavor_text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </dialog>
      <div className="w-full text-pretty text-center">
        {firstFlavorText}{" "}
        <button
          onClick={openModal}
          className=" hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md p-2"
        >
          <ArrowInBoxTopRight strokeWidth={2} width={16} height={16} />

          <span className="sr-only">click to open modal</span>
        </button>
      </div>
    </Fragment>
  );
}
