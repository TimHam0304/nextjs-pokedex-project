export function Divider() {
  return (
    <div
      aria-hidden
      className="col-span-full border-t-2 border-indigo-500 my-4"
    />
  );
}

interface DividerWithCenterTextProps {
  text: number | string;
}

export function DividerWithCenterText({ text }: DividerWithCenterTextProps) {
  return (
    <div
      aria-hidden
      className="col-span-full border-t-2 border-indigo-500 my-8 relative"
    >
      <div className="absolute top-0 w-full mt-1 flex justify-center">
        {text}
      </div>
    </div>
  );
}
