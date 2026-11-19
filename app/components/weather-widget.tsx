"use client";

import { useState } from "react";
import type { Condition, WeatherData } from "@/app/lib/weather";
import { WeatherIcon } from "./weather-icon";

const CITIES = ["Copenhagen", "Oslo", "London", "Paris", "Berlin", "Tokyo"];

type Status = "idle" | "loading" | "error";

interface WeatherWidgetProps {
  initialData: WeatherData;
  initialCity: string;
}

/**
 * Interactive weather widget.
 *
 * It is a client component so it can re-fetch when the user picks a new city.
 * The first paint is server-rendered (initialData), so there is no layout
 * flash; only subsequent city switches happen on the client.
 */
export function WeatherWidget({
  initialData,
  initialCity,
}: WeatherWidgetProps) {
  const [city, setCity] = useState(initialCity);
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState<Status>("idle");

  const selectCity = (next: string) => {
    if (next === city) return;
    setCity(next);
    setStatus("loading");

    fetch(`/api/weather?city=${encodeURIComponent(next)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<WeatherData>;
      })
      .then((next) => {
        setData(next);
        setStatus("idle");
      })
      .catch(() => {
        // Keep the last good data visible and surface a non-blocking error.
        setStatus("error");
      });
  };

  const { current, daily, hourly } = data;

  return (
    <section
      aria-label={`Weather for ${current.city}`}
      className={`relative w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br p-6 text-white shadow-2xl sm:p-8 ${skyGradient(
        current.condition
      )} transition-colors duration-700`}
    >
      <div className="flex flex-col gap-6">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {current.city}
            </h1>
            <p className="text-sm text-white/70">{current.country}</p>
          </div>
          <CitySelector
            cities={CITIES}
            value={city}
            onSelect={selectCity}
            busy={status === "loading"}
          />
        </header>

        <div
          aria-live="polite"
          role="status"
          className="min-h-5 text-sm text-white/80"
        >
          {status === "loading" && `Loading ${city}…`}
          {status === "error" && `Couldn’t update ${city}. Showing last data.`}
        </div>

        <CurrentConditions current={current} />
        <StatsGrid current={current} />
        <DailyForecast days={daily} />
        <HourlyForecast hours={hourly} />
      </div>
    </section>
  );
}

/* ------------------------------- sub-pieces ---------------------------- */

function CitySelector({
  cities,
  value,
  onSelect,
  busy,
}: {
  cities: string[];
  value: string;
  onSelect: (city: string) => void;
  busy: boolean;
}) {
  return (
    <div
      role="group"
      aria-label="Choose a city"
      className="flex flex-wrap gap-1.5 rounded-full bg-white/10 p-1.5 backdrop-blur-sm"
    >
      {cities.map((c) => (
        <button
          key={c}
          type="button"
          disabled={busy}
          aria-pressed={c === value}
          onClick={() => onSelect(c)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            c === value
              ? "bg-white text-slate-900"
              : "text-white/80 hover:bg-white/15"
          } ${busy ? "cursor-wait opacity-60" : ""}`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

function CurrentConditions({ current }: { current: WeatherData["current"] }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <WeatherIcon
          condition={current.condition}
          className="h-20 w-20 drop-shadow-lg sm:h-24 sm:w-24"
        />
        <div>
          <p className="text-6xl leading-none font-light sm:text-7xl">
            {current.temperature}
            <span className="align-top text-3xl">°</span>
          </p>
          <p className="mt-1 text-lg font-medium">{current.conditionText}</p>
          <p className="text-sm text-white/70">
            Feels like {current.feelsLike}°
          </p>
        </div>
      </div>
      <dl className="hidden text-right text-sm sm:block">
        <div className="space-y-1">
          <div>
            <dt className="text-white/70">Sunrise</dt>
            <dd className="font-medium">{current.sunrise}</dd>
          </div>
          <div>
            <dt className="text-white/70">Sunset</dt>
            <dd className="font-medium">{current.sunset}</dd>
          </div>
        </div>
      </dl>
    </div>
  );
}

function StatsGrid({ current }: { current: WeatherData["current"] }) {
  const stats = [
    { label: "Humidity", value: `${current.humidity}%` },
    {
      label: "Wind",
      value: `${current.windSpeed} km/h ${current.windDirection}`,
    },
    { label: "UV index", value: `${current.uvIndex}/10` },
    { label: "Pressure", value: `${current.pressure} hPa` },
    { label: "Visibility", value: `${current.visibility} km` },
  ];
  return (
    <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm"
        >
          <dt className="text-xs tracking-wide text-white/60 uppercase">
            {s.label}
          </dt>
          <dd className="mt-0.5 text-lg font-semibold">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DailyForecast({ days }: { days: WeatherData["daily"] }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold tracking-wide text-white/70 uppercase">
        7-day forecast
      </h2>
      <ul className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <li
            key={day.date}
            className="flex flex-col items-center gap-1.5 rounded-xl px-1 py-2 text-center"
          >
            <span className="text-xs font-semibold">{day.weekday}</span>
            <WeatherIcon condition={day.condition} className="h-9 w-9" />
            <span className="text-sm font-semibold">{day.tempMax}°</span>
            <span className="text-xs text-white/60">{day.tempMin}°</span>
            {day.precipitation > 0 && (
              <span className="text-xs text-white/70">
                {day.precipitation}%
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function HourlyForecast({ hours }: { hours: WeatherData["hourly"] }) {
  return (
    <div>
      <h2 className="mb-2 text-sm font-semibold tracking-wide text-white/70 uppercase">
        Next 24 hours
      </h2>
      <ul className="flex gap-3 overflow-x-auto pb-2">
        {hours.map((h) => (
          <li
            key={h.time}
            className="flex min-w-[3.5rem] flex-col items-center gap-1.5 rounded-xl bg-white/5 px-2 py-2"
          >
            <span className="text-xs text-white/70">{h.label}</span>
            <WeatherIcon condition={h.condition} className="h-8 w-8" />
            <span className="text-sm font-semibold">{h.temperature}°</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------- helpers -------------------------------- */

/** Maps a condition to a sky gradient (Tailwind classes). */
function skyGradient(condition: Condition): string {
  switch (condition) {
    case "sun":
      return "from-sky-400 to-blue-600";
    case "moon":
      return "from-slate-800 to-indigo-900";
    case "cloud-sun":
      return "from-sky-500 to-sky-700";
    case "cloud":
      return "from-slate-500 to-slate-700";
    case "cloud-drizzle":
      return "from-slate-600 to-slate-800";
    case "cloud-hail":
      return "from-slate-700 to-indigo-900";
    case "cloud-fog":
      return "from-slate-400 to-slate-600";
    case "cloud-moon":
      return "from-slate-800 to-blue-900";
    case "cloud-snow-alt":
      return "from-sky-300 to-slate-500";
    case "wind":
      return "from-teal-500 to-cyan-700";
  }
}
