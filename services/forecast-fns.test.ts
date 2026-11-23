import { describe, it, expect } from "vitest";
import { getFrom, getHourData, getDailyData } from "./forecast-fns";
import { type ForecastData } from "./fetchForecast";

const HOUR = 3_600_000;
const DAY = 86_400_000;

const fixture = {
  timelines: {
    minutely: [],
    hourly: [
      { time: "2020-01-01T00:00:00Z", values: {} },
      { time: "2020-01-01T01:00:00Z", values: {} },
      { time: "2020-01-01T02:00:00Z", values: {} },
    ],
    daily: [
      { time: "2020-01-01T00:00:00Z", values: {} },
      { time: "2020-01-02T00:00:00Z", values: {} },
    ],
  },
  location: { lat: 0, lon: 0 },
} as unknown as ForecastData;

describe("getFrom", () => {
  it("returns the timestamp of the first hourly entry", () => {
    expect(getFrom(fixture)).toBe(Date.parse("2020-01-01T00:00:00Z"));
  });
});

describe("getHourData", () => {
  it("returns the entry matching the given time", () => {
    expect(getHourData(fixture, Date.parse("2020-01-01T01:00:00Z"))).toBe(
      fixture.timelines.hourly[1],
    );
  });

  it("returns undefined for a time outside the data range", () => {
    expect(
      getHourData(fixture, Date.parse("2020-01-01T00:00:00Z") - HOUR),
    ).toBeUndefined();
    expect(
      getHourData(fixture, Date.parse("2020-01-01T02:00:00Z") + HOUR),
    ).toBeUndefined();
  });
});

describe("getDailyData", () => {
  it("returns the daily entry matching the calendar date", () => {
    expect(getDailyData(fixture, Date.parse("2020-01-02T00:00:00Z"))).toBe(
      fixture.timelines.daily[1],
    );
  });

  it("returns undefined for a date outside the data range", () => {
    expect(
      getDailyData(fixture, Date.parse("2020-01-01T00:00:00Z") - DAY),
    ).toBeUndefined();
    expect(
      getDailyData(fixture, Date.parse("2020-01-02T00:00:00Z") + DAY),
    ).toBeUndefined();
  });
});
