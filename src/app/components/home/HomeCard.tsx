import Link, { LinkProps } from "next/link";
import Image from "next/image";

interface CardProps extends LinkProps {
  text: string;
  title: string;
  imgSrc?: any;
}
/**
 * A homecard-link with a picture and text
 */
export function HomeCardLinkPicure({
  text,
  title,
  imgSrc,
  ...props
}: CardProps) {
  return (
    <Link
      {...props}
      className={`bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-xl shadow-indigo-700/10 dark:shadow-inherit hover:shadow-none max-w-[28rem]hover:bg-neutral-100  dark:hover:bg-neutral-700 transition-all gray-outline-indigo-focus-outline`}
    >
      <div className="flex flex-col justify-center overflow-hidden w-full h-full">
        {imgSrc && (
          <div className="flex justify-center w-full h-auto">
            <Image
              className="w-full h-auto max-w-[22rem]"
              src={imgSrc}
              alt=""
            ></Image>
          </div>
        )}
        <div className="pt-1">
          <h2 className="font-semibold text-xl text-indigo-700 dark:text-inherit">
            {title}
          </h2>
          <p className="text-sm font-normal dark:text-neutral-400">{text}</p>
        </div>
      </div>
    </Link>
  );
}
