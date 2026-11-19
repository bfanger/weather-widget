import type { NextRequest } from "next/server";
import { getMockWeather, type WeatherData } from "@/app/lib/weather";

/**
 * Same-origin weather API.
 *
 * Browsers block cross-origin calls to public weather providers (and we do
 * not want to ship API keys to the client), so the widget talks to this
 * same-origin endpoint instead of the provider directly.
 *
 * In production you would swap the mock for a real upstream request:
 *
 *   if (process.env.WEATHER_API_KEY) {
 *     const res = await fetch(
 *       `https://api.openweathermap.org/data/2.5/one-call?lat=..&lon=..&appid=${process.env.WEATHER_API_KEY}`,
 *     );
 *     return Response.json(await res.json());
 *   }
 *
 * Until a key is configured we serve deterministic mock data, which keeps the
 * app fully self-contained and makes it easy to demo and test.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city")?.trim() || "Copenhagen";

  let data: WeatherData;
  try {
    data = getMockWeather(city);
  } catch {
    return Response.json(
      { error: "Failed to generate weather data." },
      { status: 500 }
    );
  }

  return Response.json(data, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      "X-Data-Source": "mock",
    },
  });
}
