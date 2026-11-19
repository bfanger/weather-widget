/**
 * Domain model + mocked weather data source.
 *
 * This module is pure and framework-agnostic on purpose: it has no dependency
 * on Next.js, React, or the network, so it can be unit-tested in isolation.
 *
 * The mock generator is deterministic per city: the same city name always
 * produces the same dataset, which keeps the UI stable between reloads and
 * makes the automated tests reproducible.
 */

/** The set of weather conditions the UI knows how to render. */
export type Condition =
  | "sun"
  | "cloud"
  | "cloud-sun"
  | "cloud-drizzle"
  | "cloud-snow-alt"
  | "cloud-hail"
  | "cloud-fog"
  | "cloud-moon"
  | "moon"
  | "wind";

export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number; // Celsius
  feelsLike: number; // Celsius
  condition: Condition;
  conditionText: string;
  humidity: number; // percent
  windSpeed: number; // km/h
  windDirection: string; // e.g. "NW"
  uvIndex: number;
  pressure: number; // hPa
  visibility: number; // km
  sunrise: string; // "07:42"
  sunset: string; // "18:05"
  updatedAt: string; // ISO timestamp
}

export interface DayForecast {
  date: string; // ISO date
  weekday: string; // "Mon"
  condition: Condition;
  conditionText: string;
  tempMin: number;
  tempMax: number;
  precipitation: number; // percent chance
  windSpeed: number;
}

export interface HourForecast {
  time: string; // ISO datetime
  label: string; // "14:00"
  condition: Condition;
  temperature: number;
  precipitation: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DayForecast[];
  hourly: HourForecast[];
}

/** Human-readable description for each condition, used for a11y and text. */
export const CONDITION_TEXT: Record<Condition, string> = {
  sun: "Clear sky",
  cloud: "Overcast",
  "cloud-sun": "Partly cloudy",
  "cloud-drizzle": "Light drizzle",
  "cloud-snow-alt": "Snow",
  "cloud-hail": "Thunderstorm",
  "cloud-fog": "Fog",
  "cloud-moon": "Clear at night",
  moon: "Clear at night",
  wind: "Windy",
};

// Daytime conditions (sun is shown during the day).
const DAY_CONDITIONS: Condition[] = [
  "sun",
  "cloud",
  "cloud-sun",
  "cloud-drizzle",
  "cloud-snow-alt",
  "cloud-hail",
  "cloud-fog",
  "wind",
];
// Nighttime conditions.
const NIGHT_CONDITIONS: Condition[] = ["moon", "cloud-moon", "cloud-fog"];

const WIND_DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const COUNTRIES: Record<string, string> = {
  copenahgen: "Denmark",
  copenhagen: "Denmark",
  oslo: "Norway",
  london: "United Kingdom",
  paris: "France",
  berlin: "Germany",
  tokyo: "Japan",
};

/**
 * Deterministically generate a full weather dataset for a city.
 *
 * @param city  Human readable city name.
 * @param now   Reference "current" moment. Defaults to the real clock so the
 *               live UI shows real dates; tests pass a fixed value.
 */
export function getMockWeather(
  city: string,
  now: Date = new Date()
): WeatherData {
  const rand = seededRandom(city.toLowerCase());

  const baseTemp = 8 + Math.floor(rand() * 18); // 8..25 °C
  const baseCondition = pick(DAY_CONDITIONS, rand);

  const current: CurrentWeather = {
    city: prettyCity(city),
    country: COUNTRIES[city.toLowerCase()] ?? "Unknown",
    temperature: baseTemp,
    feelsLike: baseTemp + int(rand, -3, 3),
    condition: baseCondition,
    conditionText: CONDITION_TEXT[baseCondition],
    humidity: int(rand, 30, 90),
    windSpeed: int(rand, 4, 38),
    windDirection: pick(WIND_DIRECTIONS, rand),
    uvIndex: int(rand, 0, 10),
    pressure: int(rand, 980, 1035),
    visibility: int(rand, 3, 16),
    sunrise: "07:42",
    sunset: "18:05",
    updatedAt: now.toISOString(),
  };

  const daily: DayForecast[] = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(now, i);
    const condition = pick(DAY_CONDITIONS, rand);
    const min = baseTemp + int(rand, -5, 4);
    return {
      date: date.toISOString().slice(0, 10),
      weekday: formatWeekday(date),
      condition,
      conditionText: CONDITION_TEXT[condition],
      tempMin: min,
      tempMax: min + int(rand, 3, 8),
      precipitation: int(rand, 0, 90),
      windSpeed: int(rand, 4, 34),
    };
  });

  const hourly: HourForecast[] = Array.from({ length: 24 }, (_, i) => {
    const date = new Date(now.getTime() + i * 3600_000);
    const isNight = date.getHours() < 6 || date.getHours() >= 21;
    const pool = isNight ? NIGHT_CONDITIONS : DAY_CONDITIONS;
    const condition = pick(pool, rand);
    // Temperature curves through the day: cool at night, warm mid-afternoon.
    const hourOffset = i - 12;
    const temperature = baseTemp - Math.round(Math.abs(hourOffset) / 4);
    return {
      time: date.toISOString(),
      label: formatHour(date),
      condition,
      temperature,
      precipitation: int(rand, 0, 80),
    };
  });

  return { current, daily, hourly };
}

/* ------------------------------- helpers ------------------------------ */

function prettyCity(city: string): string {
  return city
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function int(rand: () => number, min: number, max: number): number {
  return min + Math.floor(rand() * (max - min + 1));
}

function formatWeekday(date: Date): string {
  return new Intl.DateTimeFormat("en", { weekday: "short" }).format(date);
}

function formatHour(date: Date): string {
  const h = date.getHours();
  return `${String(h).padStart(2, "0")}:00`;
}

function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

/** FNV-1a style string hash → 32-bit unsigned integer. */
function hashString(str: string): number {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

/** Small, fast, deterministic PRNG (mulberry32). */
function seededRandom(seed: string): () => number {
  let a = hashString(seed);
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
