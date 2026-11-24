import { Suspense } from "react";
import WeatherWidget from "@/components/WeatherWidget";
import { fetchForecast } from "@/services/fetchForecast";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import Warning from "@/components/Warning";

export default function Home({ searchParams }: PageProps<"/">) {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
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
  try {
    const params = await searchParams;
    const location =
      typeof params.location === "string"
        ? params.location
        : "52.0578725,5.1088778";
    const data = await fetchForecast(location);
    // eslint-disable-next-line react-hooks/error-boundaries
    return <WeatherWidget data={data} />;
  } catch (err) {
    console.warn(err);
    return <Warning message="Failed to load weather information" />;
  }
}
