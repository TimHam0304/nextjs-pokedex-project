import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface CardProps extends LinkProps {
  text: string;
  title: string;
  children?: ReactNode;
}
/**
 * A homecard-link with a picture and text
 */
export function HomeCardLinkPicure({
  text,
  title,
  children,
  ...props
}: CardProps) {
  return (
    <Link
      {...props}
      className={`flex flex-col w-[300px] h-[300px] bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl shadow-indigo-700/10 dark:shadow-inherit hover:shadow-none hover:bg-neutral-100  dark:hover:bg-neutral-700 transition-all gray-outline-indigo-focus-outline`}
    >
      <div className="flex justify-center items-center flex-1 w-full">
        {children}
      </div>
      <div className="flex flex-col pt-1">
        <h2 className="font-semibold text-xl text-indigo-700 dark:text-inherit">
          {title}
        </h2>
        <p className="text-sm font-normal dark:text-neutral-400">{text}</p>
      </div>
    </Link>
  );
}
