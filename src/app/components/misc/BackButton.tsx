"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@icons/arrow_back";

export function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={router.back}
      className="group py-3 px-8 inline-flex justify-center items-center hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md text-sm font-medium whitespace-nowrap indigo-focus-outline transition-colors"
    >
      <ArrowLeft
        className="-ms-1 me-2 opacity-60 transition-transform group-hover:-translate-x-0.5"
        height={16}
        width={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      Back
    </button>
  );
}
