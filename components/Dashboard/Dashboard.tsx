import { useEffect, useState } from "react";
import DashboardIcon from "./DashboardIcon";
import DashboardLabel from "./DashboardLabel";
import DashboardValue from "./DashboardValue";
import dashboardJpg from "./dashboard.jpg";

interface Props {
  time: string;
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  precipitation: number | null;
  weatherCode: number | null;
}
export default function Dashboard({
  time,
  temperature,
  humidity,
  windSpeed,
  precipitation,
  weatherCode,
}: Props) {
  return (
    <div
      className="fixed bottom-2/5 left-3 aspect-1588/900 w-[60em] translate-y-1/2 rounded-md bg-[#58595F] bg-cover text-[10px] max-lg:text-[1vw] lg:left-1/2 lg:-translate-x-1/2"
      style={{ backgroundImage: "url(" + dashboardJpg.src + ")" }}
    >
      <DashboardLabel label="Current time" x={24.7} y={8.2} variant="black" />
      <DashboardCurrentTime />
      <DashboardLabel
        label="Destination time"
        x={23.8}
        y={20}
        variant="black"
      />
      <DashboardDestinationTime time={time} />
      <DashboardLabel label="Weather" x={25} y={31.5} variant="black" />
      <DashboardWeather
        temperature={temperature}
        humidity={humidity}
        windSpeed={windSpeed}
        precipitation={precipitation}
        weatherCode={weatherCode}
      />
    </div>
  );
}
function DashboardCurrentTime() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="text-orange-500">
      <DashboardLabel x={5} y={1} label="Month" />
      <DashboardValue
        x={3}
        y={3.5}
        value={time.toLocaleString("en", { month: "short" })}
      />
      <DashboardLabel x={15.5} y={1} label="Day" />
      <DashboardValue x={14} y={3.5} value={time.getDate()} digits={2} />
      <DashboardLabel x={27} y={1} label="Year" />
      <DashboardValue x={23} y={3.5} value={time.getFullYear()} digits={4} />
      <DashboardLabel x={40} y={1} label="Hour" />
      <DashboardValue x={39} y={3.5} value={time.getHours()} digits={2} />
      <DashboardLabel x={49.5} y={1} label="Min" />
      <DashboardValue x={48} y={3.5} value={time.getMinutes()} digits={2} />
    </section>
  );
}

function DashboardDestinationTime({ time }: { time: string }) {
  const date = new Date(time);
  return (
    <section className="text-green-500">
      <DashboardLabel x={5} y={12.5} label="Month" />
      <DashboardValue
        x={3}
        y={15.2}
        value={date.toLocaleString("en", { month: "short" })}
      />
      <DashboardLabel x={15.5} y={12.5} label="Day" />
      <DashboardValue x={14} y={15.2} value={date.getDate()} digits={2} />
      <DashboardLabel x={27} y={12.5} label="Year" />
      <DashboardValue x={23} y={15.2} value={date.getFullYear()} digits={4} />
      <DashboardLabel x={40} y={12.5} label="Hour" />
      <DashboardValue x={39} y={15.2} value={date.getHours()} digits={2} />
      <DashboardLabel x={49.5} y={12.5} label="Min" />
      <DashboardValue x={48} y={15.2} value={date.getMinutes()} digits={2} />
    </section>
  );
}

function DashboardWeather({
  temperature,
  humidity,
  windSpeed,
  precipitation,
  weatherCode,
}: {
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  precipitation: number | null;
  weatherCode: number | null;
}) {
  return (
    <section className="text-yellow-400">
      <DashboardLabel x={2.5} y={24} label="Temperature (°C)" />
      <DashboardValue
        x={3}
        y={26.5}
        value={temperature === null ? "—" : Math.round(temperature)}
        digits={2}
        signed
      />
      <DashboardLabel x={15} y={24} label="Humidity (%)" />
      <DashboardValue
        x={16}
        y={26.5}
        value={humidity === null ? "—" : Math.round(humidity)}
        digits={2}
      />
      <DashboardLabel x={24.5} y={24} label="Wind (m/s)" />
      <DashboardValue
        x={24.5}
        y={26.5}
        value={windSpeed === null ? "—" : Math.round(windSpeed)}
        digits={2}
      />
      <DashboardLabel x={33} y={24} label="Precipitation (%)" />
      <DashboardValue
        x={35}
        y={26.5}
        value={precipitation === null ? "—" : Math.round(precipitation)}
        digits={2}
      />
      <DashboardIcon x={46} y={24.5} code={weatherCode} />
    </section>
  );
}
