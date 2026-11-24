// @vitest-environment jsdom
import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import DayNightCycle from "./DayNightCycle";

afterEach(cleanup);

function renderedSunAngle(time: number) {
  const { getByTestId } = render(<DayNightCycle time={time} />);
  const style = getByTestId("sun-angle").getAttribute("style");
  const match = style?.match(/rotate\((-?[\d.]+)deg\)/);
  if (!match) {
    throw new Error(`No sun rotation found in "${style}"`);
  }

  const degrees = Number(match[1]);
  return ((degrees % 360) + 360) % 360;
}

describe("DayNightCycle", () => {
  it("points the sun up at 12:00", () => {
    const noon = new Date(2026, 10, 23, 12, 0, 0).getTime();
    expect(renderedSunAngle(noon)).toBe(0);
  });

  it("puts the sun at its lowest point at 0:00", () => {
    const midnight = new Date(2026, 10, 23, 0, 0, 0).getTime();
    expect(renderedSunAngle(midnight)).toBe(180);
  });
});
