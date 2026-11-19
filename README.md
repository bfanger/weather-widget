# Weather Widget

A weather widget for the web browser, built with **Next.js 16** (App Router) and **React 19**. It shows current conditions, a 7‑day forecast, and a 24‑hour outlook, with a city switcher that re-fetches on demand.

The weather data is **mocked** end to end so the app is fully self‑contained — no API key, no network dependency, and it is easy to demo and test.

## Getting started

```bash
pnpm install
pnpm dev          # http://localhost:5173
```

Other commands:

```bash
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # ESLint
pnpm test         # run the unit / API tests (Vitest)
pnpm test:watch   # Vitest in watch mode
```

## What it does

- **Current conditions** — temperature, feels‑like, condition, humidity, wind, UV, pressure, visibility, sunrise/sunset.
- **7‑day forecast** — high/low temps, condition icon, precipitation chance.
- **Next 24 hours** — hourly temperature and condition.
- **City switcher** — pick a city to load a fresh forecast.
- Adapts its sky colour to the current condition, includes a loading skeleton, an error boundary, and works in light and dark mode.

## Architecture

```
app/
├─ api/weather/route.ts      Same-origin weather API (mocked)
├─ lib/weather.ts            Domain model + deterministic mock generator (pure, framework-free)
├─ components/
│  ├─ weather-widget.tsx     Interactive widget (client component)
│  └─ weather-icon.tsx       Condition → icon mapping
├─ icons → (served from public/icons)
├─ page.tsx                  Server Component: renders with real server-side data
├─ loading.tsx               Skeleton shown while the server renders
├─ error.tsx                 Route-segment error boundary
└─ layout.tsx                Root layout + SEO metadata
public/icons/                The provided weather icons, served as static files
tests/                        Vitest unit + API-route tests
```

### Why these choices

- **Server Component for the first paint.** `page.tsx` renders the widget with real data on the server, so the first meaningful paint is complete, fast, and SEO‑friendly. There is no client‑side flash.
- **Client component only for interactivity.** `weather-widget.tsx` is `"use client"` and re‑fetches _only_ when the user changes city. Initial data is passed in as a prop, so the server and client share one source of truth.
- **Same‑origin proxy.** Browsers block cross‑origin calls to public weather APIs (and we never want to ship API keys to the client). The widget therefore talks to a same‑origin Route Handler (`/api/weather`) instead of the provider directly.
- **The mock lives in a pure module.** `app/lib/weather.ts` has no dependency on Next, React, or the network. It is deterministic per city, which keeps the UI stable across reloads and makes the tests reproducible. Both the server page and the API route read from this one module.
- **Swapping in a real provider is one change.** In `app/api/weather/route.ts`, replace the `getMockWeather(...)` call with an upstream `fetch` (e.g. OpenWeatherMap / Tomorrow.io) using a server‑side key. Nothing on the client changes.

### Data model

`WeatherData = { current: CurrentWeather, daily: DayForecast[], hourly: HourForecast[] }` — typed in `app/lib/weather.ts`.

## Accessibility

- Semantic landmarks: `section` + `aria-label`, `dl`/`dt`/`dd` for stats, `ul`/`li` for forecasts, `button` + `aria-pressed` for the city selector.
- Decorative icons are `aria-hidden`; the surrounding text carries the meaning.
- A polite `role="status"` region announces loading / errors to screen readers.
- Keyboard‑operable buttons with visible focus states; sufficient colour contrast (white on the sky gradient).

## Testing

`pnpm test` runs Vitest against the parts that are easy to test in isolation:

- `tests/weather.test.ts` — the mock generator: completeness, determinism, value ranges, date building.
- `tests/weather-route.test.ts` — the API route: status codes, payload shape, default city, response headers.

The route handler is tested by calling `GET` directly with a `Request`, so no HTTP server is needed.

## Swapping the mock for a real provider

In `app/api/weather/route.ts`:

```ts
if (process.env.WEATHER_API_KEY) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/one-call?lat=..&lon=..&appid=${process.env.WEATHER_API_KEY}`
  );
  return Response.json(await res.json());
}
```

Set the key in `env` and the same client code works unchanged.
