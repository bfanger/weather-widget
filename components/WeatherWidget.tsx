"use client";

import { useState } from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import DayNightCycle from "@/components/DayNightCycle";
import TimelineScroller from "@/components/TimelineScroller";
import { getFrom, getHourData } from "@/services/forecast-fns";
import { type ForecastData } from "@/services/fetchForecast";

interface Props {
  data: ForecastData;
}

export default function WeatherWidget({ data }: Props) {
  const [time, setTime] = useState<number>();
  const from = getFrom(data);
  const hourData = time === undefined ? undefined : getHourData(data, time);

  return (
    <>
      {time && <DayNightCycle time={time} />}
      {time && hourData && (
        <Dashboard
          time={hourData.time}
          temperature={hourData.values.temperature}
          humidity={hourData.values.humidity}
          windSpeed={hourData.values.windSpeed}
          precipitation={hourData.values.precipitationProbability}
        />
      )}
      <TimelineScroller from={from} onTimeChange={setTime} />
    </>
  );
}
