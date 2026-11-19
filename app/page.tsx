import { Suspense } from "react";
import { fetchWeather } from "../services/fetchWeather";

export default async function Home() {
  return (
    <Suspense>
      <HomeAsync />
    </Suspense>
  );
}

async function HomeAsync() {
  const weather = await fetchWeather("52.0578725,5.1088778");
  return <pre>{JSON.stringify(weather, null, 2)}</pre>;
}
