import { connection } from "next/server";
import { WeatherWidget } from "@/app/components/weather-widget";
import { getMockWeather } from "@/app/lib/weather";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * Server Component. It renders the widget with real, server-side data so the
 * first meaningful paint is complete and SEO-friendly. The client component
 * then only re-fetches when the user switches city.
 *
 * Weather is live, per-request data: the forecast is anchored to "now", which
 * uses `new Date()`. With Cache Components (PPR) that value would be flagged
 * as unstable during prerendering, so we `await connection()` to defer it to
 * request time. The `loading.tsx` in this segment provides the <Suspense>
 * boundary that streams the request-time render in.
 *
 * We read the weather directly from the shared lib (no HTTP hop during SSR);
 * the `/api/weather` route is the same-origin proxy the client uses for
 * subsequent, interactive requests.
 */
export default async function Page({ searchParams }: PageProps) {
  // Stop prerendering here; everything below runs at request time.
  await connection();

  const query = await searchParams;
  const city =
    (Array.isArray(query.city) ? query.city[0] : query.city)?.trim() ||
    "Copenhagen";

  const initialData = getMockWeather(city);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-16">
      <WeatherWidget initialData={initialData} initialCity={city} />
      <p className="mt-4 max-w-2xl text-center text-xs text-slate-500 dark:text-slate-400">
        Weather data is mocked for demo purposes. Select a city above to load a
        fresh forecast.
      </p>
    </div>
  );
}
