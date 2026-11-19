import { describe, it, expect } from "vitest";
import { GET } from "@/app/api/weather/route";

/**
 * Exercises the same-origin route handler directly (no HTTP server needed),
 * which keeps the tests fast and hermetic.
 */
describe("GET /api/weather", () => {
  it("returns 200 and a valid payload for a city", async () => {
    const res = await GET(
      new Request("http://localhost/api/weather?city=Oslo")
    );
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.current.city).toBe("Oslo");
    expect(body.daily).toHaveLength(7);
    expect(body.hourly).toHaveLength(24);
  });

  it("defaults to Copenhagen when no city is provided", async () => {
    const res = await GET(new Request("http://localhost/api/weather"));
    const body = await res.json();
    expect(body.current.city).toBe("Copenhagen");
  });

  it("flags the response as mock data", async () => {
    const res = await GET(new Request("http://localhost/api/weather"));
    expect(res.headers.get("X-Data-Source")).toBe("mock");
  });
});
