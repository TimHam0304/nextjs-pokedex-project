import { PokemonType } from "@/app/models/Pokemon/pokemon";
import { TYPECOLORS } from "@constants";
import { getTypeDamageMultipliers } from "./util";

interface TypeEffectivenessContainerProps {
  types: PokemonType[];
}

/**
 * Component displaying the Type-Effectiveness of a pokemon
 */
export function TypeEffectivenessContainer({
  types,
}: TypeEffectivenessContainerProps) {
  const FirstTypeColor =
    TYPECOLORS[types[0].type.name as keyof typeof TYPECOLORS] || "#333";
  const typeDamageMultipliers = getTypeDamageMultipliers(
    types[0].type.name,
    types[1]?.type?.name
  );

  const filteredEntries = typeDamageMultipliers.filter(
    (entry) => entry.type !== "unknown"
  );

  const normal = filteredEntries.filter((entry) => entry.value === 1);
  const weak = filteredEntries.filter((entry) => entry.value > 1);
  const immune = filteredEntries.filter((entry) => entry.value === 0);
  const resistant = filteredEntries.filter(
    (entry) => entry.value < 1 && entry.value > 0
  );

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <h2
        style={{ color: FirstTypeColor }}
        className="text-lg font-bold dark:brightness-150"
      >
        Type effectiveness
      </h2>
      <div className="flex flex-col gap-2 w-full">
        <DisplayGroup
          FirstTypeColor={FirstTypeColor}
          title="Damaged normally"
          entries={normal}
        />
        <DisplayGroup
          FirstTypeColor={FirstTypeColor}
          title="Weak to"
          entries={weak}
        />
        <DisplayGroup
          FirstTypeColor={FirstTypeColor}
          title="Immune to"
          entries={immune}
        />
        <DisplayGroup
          FirstTypeColor={FirstTypeColor}
          title="Resistant to"
          entries={resistant}
        />
      </div>
    </div>
  );
}

interface DisplayGroupProps {
  title: string;
  entries: any;
  FirstTypeColor: string;
}

function DisplayGroup({ entries, title, FirstTypeColor }: DisplayGroupProps) {
  return (
    entries.length > 0 && (
      <div className="flex flex-col items-center">
        <h3
          style={{ color: FirstTypeColor }}
          className="text-md font-semibold text-center mb-1 dark:brightness-150"
        >
          {title}
        </h3>
        <div className="flex gap-2 flex-wrap justify-center mb-2">
          {entries.map((entry: any) => {
            const color =
              TYPECOLORS[entry.type as keyof typeof TYPECOLORS] || "#333";
            return (
              <span
                className="py-1 px-2 rounded-xl font-extrabold text-white"
                style={{ backgroundColor: color }}
                key={entry.type}
              >
                {entry.type} : x{entry.value}
              </span>
            );
          })}
        </div>
      </div>
    )
  );
}
