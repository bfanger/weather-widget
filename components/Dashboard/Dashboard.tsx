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
      <DashboardCurrentTime />
      <DashboardDestinationTime time={time} />
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

  const d = time;
  const day = d.getDate();
  const month = d.toLocaleString("en", { month: "short" }).toUpperCase();
  const minute = d.getMinutes();

  return (
    <>
      <DashboardLabel x={24.7} y={8.2} variant="black" label="Current time" />
      <DashboardLabel x={5} y={1} label="Month" />
      <DashboardValue x={3} y={3.5} value={month} variant="orange" />
      <DashboardLabel x={15.5} y={1} label="Day" />
      <DashboardValue x={14} y={3.5} value={day} digits={2} variant="orange" />
      <DashboardLabel x={27} y={1} label="Year" />
      <DashboardValue x={23} y={3.5} value={d.getFullYear()} variant="orange" />
      <DashboardLabel x={40} y={1} label="Hour" />
      <DashboardValue
        x={39}
        y={3.5}
        value={d.getHours()}
        digits={2}
        variant="orange"
      />
      <DashboardLabel x={49.5} y={1} label="Min" />
      <DashboardValue
        x={48}
        y={3.5}
        value={minute}
        digits={2}
        variant="orange"
      />
    </>
  );
}

function DashboardDestinationTime({ time }: { time: string }) {
  const d = new Date(time);
  const day = d.getDate();
  const month = d.toLocaleString("en", { month: "short" }).toUpperCase();
  const minute = d.getMinutes();

  return (
    <>
      <DashboardLabel
        x={23.8}
        y={20}
        variant="black"
        label="Destination time"
      />
      <DashboardLabel x={5} y={12.5} label="Month" />
      <DashboardValue x={3} y={15.2} value={month} variant="green" />
      <DashboardLabel x={15.5} y={12.5} label="Day" />
      <DashboardValue x={14} y={15.2} value={day} digits={2} variant="green" />
      <DashboardLabel x={27} y={12.5} label="Year" />
      <DashboardValue x={23} y={15.2} value={d.getFullYear()} variant="green" />
      <DashboardLabel x={40} y={12.5} label="Hour" />
      <DashboardValue
        x={39}
        y={15.2}
        value={d.getHours()}
        digits={2}
        variant="green"
      />
      <DashboardLabel x={49.5} y={12.5} label="Min" />
      <DashboardValue
        x={48}
        y={15.2}
        value={minute}
        digits={2}
        variant="green"
      />
    </>
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
    <>
      <DashboardLabel x={25} y={31.5} variant="black" label="Weather" />
      <DashboardLabel x={2.5} y={24} label="Temperature (°C)" />
      <DashboardValue
        x={3}
        y={26.5}
        value={temperature === null ? "—" : Math.round(temperature)}
        digits={2}
        variant="yellow"
        signed
      />
      <DashboardLabel x={15} y={24} label="Humidity (%)" />
      <DashboardValue
        x={16}
        y={26.5}
        value={humidity === null ? "—" : Math.round(humidity)}
        digits={2}
        variant="yellow"
      />
      <DashboardLabel x={24.5} y={24} label="Wind (m/s)" />
      <DashboardValue
        x={24.5}
        y={26.5}
        value={windSpeed === null ? "—" : Math.round(windSpeed)}
        digits={2}
        variant="yellow"
      />
      <DashboardLabel x={33} y={24} label="Precipitation (%)" />
      <DashboardValue
        x={35}
        y={26.5}
        value={precipitation === null ? "—" : Math.round(precipitation)}
        digits={2}
        variant="yellow"
      />
      <DashboardIcon x={46} y={24.5} code={weatherCode} />
    </>
  );
}
