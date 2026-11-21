import { type ForecastData } from "./fetchForecast";

export function getFrom(data: ForecastData): number | undefined {
  const dateString = data.timelines.hourly[0]?.time;
  if (dateString) {
    return Date.parse(dateString);
  }
  return undefined;
}

export function getHourData(
  data: ForecastData,
  time: number,
): ForecastData["timelines"]["hourly"][number] | undefined {
  return data.timelines.hourly.find((entry) => Date.parse(entry.time) === time);
}

export function getDailyData(
  data: ForecastData,
  time: number,
): ForecastData["timelines"]["daily"][number] | undefined {
  const day = new Date(time).getDate();
  return data.timelines.daily.find(
    (entry) => new Date(entry.time).getDate() === day,
  );
}
