import { describe, it, expect } from "vitest";
import {
  getMockWeather,
  CONDITION_TEXT,
  type Condition,
} from "@/app/lib/weather";

// A fixed reference time makes the assertions stable regardless of when the
// test suite runs.
const FIXED = new Date("2024-06-01T12:00:00Z");

describe("getMockWeather", () => {
  it("returns a complete dataset", () => {
    const data = getMockWeather("Copenhagen", FIXED);
    expect(data.current).toBeDefined();
    expect(data.daily).toHaveLength(7);
    expect(data.hourly).toHaveLength(24);
  });

  it("is deterministic for the same city", () => {
    const a = getMockWeather("Copenhagen", FIXED);
    const b = getMockWeather("Copenhagen", FIXED);
    expect(a).toEqual(b);
  });

  it("produces different data for different cities", () => {
    const a = getMockWeather("Copenhagen", FIXED);
    const b = getMockWeather("Oslo", FIXED);
    expect(a).not.toEqual(b);
  });

  it("keeps values within sane ranges", () => {
    const { current } = getMockWeather("London", FIXED);
    expect(current.humidity).toBeGreaterThanOrEqual(30);
    expect(current.humidity).toBeLessThanOrEqual(90);
    expect(current.uvIndex).toBeGreaterThanOrEqual(0);
    expect(current.uvIndex).toBeLessThanOrEqual(10);
    expect(current.pressure).toBeGreaterThanOrEqual(980);
    expect(current.pressure).toBeLessThanOrEqual(1035);
    expect(current.windSpeed).toBeGreaterThanOrEqual(4);
    expect(current.windSpeed).toBeLessThanOrEqual(38);
  });

  it("always pairs a condition with a known text label", () => {
    const { current } = getMockWeather("Paris", FIXED);
    expect(CONDITION_TEXT).toHaveProperty(current.condition);
    expect(current.conditionText).toBe(
      CONDITION_TEXT[current.condition as Condition]
    );
  });

  it("builds daily dates from the provided reference time", () => {
    const { daily } = getMockWeather("Berlin", FIXED);
    expect(daily[0].date).toBe("2024-06-01");
    expect(daily[6].date).toBe("2024-06-07");
    // Each day's max is at least its min.
    for (const day of daily) {
      expect(day.tempMax).toBeGreaterThanOrEqual(day.tempMin);
    }
  });
});
