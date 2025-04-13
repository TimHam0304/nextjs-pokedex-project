interface ShowMoreResultsButtonProps {
  onClick: Function;
  disabled: boolean;
}

export function ShowMoreResultsButton({
  onClick,
  disabled,
}: ShowMoreResultsButtonProps) {
  const baseStyle =
    "bg-indigo-600 hover:bg-indigo-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-md text-white";
  const disabledStyle = "bg-transparent cursor-not-allowed";

  return (
    <button
      aria-disabled={disabled}
      onClick={() => onClick()}
      className={`${
        disabled ? disabledStyle : baseStyle
      } px-8 py-3 rounded-md font-medium outline outline-2 outline-gray-900/5 focus-visible:outline-indigo-700`}
    >
      {disabled ? "All results displayed" : "Show more results"}
    </button>
  );
}
