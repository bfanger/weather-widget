import { cn } from "@/services/cn";
import WeatherIcon from "../WeatherIcon/WeatherIcon";

interface Props {
  x: number;
  y: number;
  code: number | null;
}

export default function DashboardIcon({ x, y, code }: Props) {
  return (
    <div
      className={cn(
        "absolute rounded-xs border-b border-l border-slate-500 bg-slate-950",
      )}
      style={{ left: `${x}em`, top: `${y}em` }}
    >
      {code !== null && (
        <div className="size-[8em]">
          <WeatherIcon code={code} />
        </div>
      )}
    </div>
  );
}
