"use client";

import Clock from "@/components/Clock";
import Timeline from "@/components/Timeline";
import { useTimelineStore } from "@/services/timelineStore";

export default function WeatherWidget() {
  const { setTime } = useTimelineStore();

  return (
    <>
      <Clock />
      <Timeline onValueChange={setTime} />
    </>
  );
}
