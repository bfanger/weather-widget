import { Suspense } from "react";
import WeatherWidget from "@/components/WeatherWidget";
import { fetchForecast } from "@/services/fetchForecast";
import Header from "@/components/Header";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <Header />
      <Suspense>
        <HomeAsync searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function HomeAsync({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const location =
    typeof params.location === "string"
      ? params.location
      : "52.0578725,5.1088778";
  const data = await fetchForecast(location);
  return <WeatherWidget data={data} />;
}
