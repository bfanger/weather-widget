import WeatherIcon from "@/components/WeatherIcon/WeatherIcon";
import { type WeatherValues } from "@/services/fetchForecast";

interface Props {
  time: string;
  values: WeatherValues;
}

export default function WeatherInfo({ time, values }: Props) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
      <dt>{values.weatherCode}</dt>
      <dd>
        <WeatherIcon code={values.weatherCode ?? 0} />
      </dd>
      <dt>Time</dt>
      <dd>
        {new Date(time).toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </dd>
      <dt>Temperature</dt>
      <dd>{values.temperature}°C</dd>
      <dt>Humidity</dt>
      <dd>{values.humidity}%</dd>
      <dt>Wind</dt>
      <dd>{values.windSpeed} m/s</dd>
      <dt>Precipitation</dt>
      <dd>{values.precipitationProbability}%</dd>
    </dl>
  );
}
