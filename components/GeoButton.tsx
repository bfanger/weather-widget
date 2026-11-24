"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Warning from "./Warning";

export default function GeoButton() {
  const location = useSearchParams().get("location");
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const detectPosition = useCallback(() => {
    setFailed(false);
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLoading(false);
        router.push(
          `/?location=${position.coords.latitude},${position.coords.longitude}`,
        );
      },
      (err) => {
        console.warn(err);
        setLoading(false);
        setFailed(true);
      },
    );
  }, [router]);
  useEffect(() => {
    const timer = setTimeout(() => {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (!location && result.state === "granted") {
          detectPosition();
        }
      });
    }, 0);
    return clearTimeout(timer);
  }, [location, detectPosition]);
  return (
    <div className="mx-auto mt-4 text-center">
      {failed && (
        <Warning message="Failed to get location, check permissions" />
      )}
      {location ? (
        <div className="text-center text-sm">Location: {location}</div>
      ) : (
        <button
          disabled={loading}
          className="mx-auto cursor-pointer rounded bg-amber-600 px-3 py-1 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
          onClick={detectPosition}
        >
          {loading ? "Getting position..." : "Use current position"}
        </button>
      )}
    </div>
  );
}
