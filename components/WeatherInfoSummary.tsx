import { type WeatherDailyValues } from "@/services/fetchForecast";

interface Props {
  values: WeatherDailyValues;
}

export default function WeatherInfoSummary({ values }: Props) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
      <dt>Temperature</dt>
      <dd>
        {values.temperatureMin}–{values.temperatureMax}°C
      </dd>
      <dt>Humidity</dt>
      <dd>{values.humidityMax}%</dd>
      <dt>Wind</dt>
      <dd>{values.windSpeedMax} m/s</dd>
      <dt>Precipitation</dt>
      <dd>{values.precipitationProbabilityMax}%</dd>
    </dl>
  );
}
