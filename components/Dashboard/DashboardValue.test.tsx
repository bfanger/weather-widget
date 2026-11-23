// @vitest-environment jsdom
import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import DashboardValue from "./DashboardValue";
import { ComponentProps } from "react";

afterEach(cleanup);

type DashboardValueProps = ComponentProps<typeof DashboardValue>;

describe("DashboardValue", () => {
  const cases: {
    value: DashboardValueProps["value"];
    signed: DashboardValueProps["signed"];
    digits: DashboardValueProps["digits"];
    expected: string;
  }[] = [
    { value: 1, signed: true, digits: 0, expected: "+1" },
    { value: -1, signed: true, digits: 0, expected: "-1" },
    { value: 0, signed: true, digits: 0, expected: "-0" },
    { value: 1, signed: false, digits: 0, expected: "1" },
    { value: -1, signed: false, digits: 0, expected: "1" },
    { value: 5, signed: false, digits: 2, expected: "05" },
    { value: -5, signed: true, digits: 2, expected: "-05" },
  ];

  for (const { expected, ...props } of cases) {
    it(`renders ${props.value} with signed=${props.signed} digits=${props.digits} as "${expected}"`, () => {
      render(<DashboardValue x={0} y={0} {...props} />);
      expect(screen.getByTestId("dashboard-value").textContent).toBe(expected);
    });
  }
});
