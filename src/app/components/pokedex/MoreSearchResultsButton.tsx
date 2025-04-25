interface ShowMoreResultsButtonProps {
  onClick: Function;
  disabled: boolean;
}

export function ShowMoreResultsButton({
  onClick,
  disabled,
}: ShowMoreResultsButtonProps) {
  return (
    <button
      aria-disabled={disabled}
      onClick={() => onClick()}
      className={`bg-indigo-600 hover:bg-indigo-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 shadow-md text-white aria-disabled:bg-transparent aria-disabled:cursor-not-allowed aria-disabled:hover:bg-transparent aria-disabled:text-inherit aria-disabled:shadow-none px-8 py-3 rounded-md font-medium indigo-focus-outline focus-visible:outline-offset-2`}
    >
      {disabled ? "All results displayed" : "Show more results"}
    </button>
  );
}
