"use client";

import { useState } from "react";
import Clock from "@/components/Clock";
import TimelineScroller from "@/components/TimelineScroller";
import WeatherInfo from "@/components/WeatherInfo";
import WeatherInfoSummary from "@/components/WeatherInfoSummary";
import { getDailyData, getFrom, getHourData } from "@/services/forecast-fns";
import { type ForecastData } from "@/services/fetchForecast";

interface Props {
  data: ForecastData;
}

export default function WeatherWidget({ data }: Props) {
  const [time, setTime] = useState<number>();
  const from = getFrom(data);
  const hourData = time === undefined ? undefined : getHourData(data, time);
  const dailyData = time === undefined ? undefined : getDailyData(data, time);

  return (
    <>
      <Clock time={time} />
      <div className="fixed top-60">
        {hourData && (
          <WeatherInfo time={hourData.time} values={hourData.values} />
        )}
        {dailyData && <WeatherInfoSummary values={dailyData.values} />}
      </div>
      <TimelineScroller from={from} onTimeChange={setTime} />
    </>
  );
}
