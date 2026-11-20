import { Suspense } from "react";
import { connection } from "next/server";
import { fetchWeather } from "@/services/fetchWeather";
import WeatherWidget from "@/components/WeatherWidget";

export default async function Home() {
  return (
    <Suspense>
      <HomeAsync />
    </Suspense>
  );
}

async function HomeAsync() {
  await connection(); // dynamic route, because the timeline depends on the date
  const weather = await fetchWeather("52.0578725,5.1088778");
  console.info({ weather });
  return <WeatherWidget />;
}
