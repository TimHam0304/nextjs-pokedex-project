import { getAbility } from "@actions/AbilityActions";
import { FetchError } from "@components/error/fetchErrorPage";
import { notFound } from "next/navigation";

interface AbilityPageProps {
  params: Promise<{ slug: string }>;
}

//TODO
export default async function AbilityPage(props: AbilityPageProps) {
  const params = await props.params;
  const { ability, status } = await getAbility(params.slug);

  if (!ability) {
    if (status.code === 404) {
      notFound();
    } else {
      return <FetchError status={status} />;
    }
  }

  return (
    <main className="flex flex-col gap-6 py-20 px-6 mx-auto max-w-7xl h-auto w-full items-center">
      <h1 className="font-bold text-3xl text-center text-indigo-700 dark:text-inherit">
        {ability.name}
      </h1>
      <h2 className="text-sm text-center">Flavor text</h2>
      <section className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2 w-full h-auto">
        more text
      </section>
    </main>
  );
}
