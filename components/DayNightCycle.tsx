const sunrise = 6;
const sunset = 18;

interface Props {
  /** timestamp (milliseconds since the epoch) */
  time: number;
}
export default function DayNightCycle({ time }: Props) {
  const date = new Date(time);
  const hours =
    date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  const elevation = Math.sin(
    (Math.PI * (hours - sunrise)) / (sunset - sunrise),
  );
  const day = Math.max(elevation, 0);
  const night = Math.max(-elevation, 0);
  const dusk = 1 - day - night;
  const startOfToday = new Date(time);
  startOfToday.setHours(0, 0, 0, 0);
  const dayIndex =
    startOfToday.getTime() / 86400000 -
    startOfToday.getTimezoneOffset() / (24 * 60);
  const sunAngle = 180 + (dayIndex + hours / 24) * 360;
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 transition duration-1000 ease-out starting:opacity-0">
      <div
        className="absolute inset-0 bg-linear-to-b from-zinc-950 to-slate-900 transition-opacity duration-150"
        style={{ opacity: night }}
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-slate-800 via-slate-700 to-zinc-600 transition-opacity duration-150"
        style={{ opacity: day }}
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-800 to-indigo-900 transition-opacity duration-150"
        style={{ opacity: dusk }}
      />
      <div
        className="absolute top-0 left-1/2 h-full origin-bottom transition-transform duration-200 ease-out"
        data-testid="sun-angle"
        style={{
          transform: `rotate(${sunAngle}deg)`,
        }}
      >
        <div className="absolute top-[20%] size-40 -translate-x-1/2 rounded-full bg-stone-200 opacity-40 blur-2xl" />
      </div>
    </div>
  );
}
