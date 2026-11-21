const sunrise = 6;
const sunset = 18;

interface Props {
  /** timestamp (milliseconds since the epoch) */
  time: number;
}
export default function DayNightCycle({ time }: Props) {
  const hours = new Date(time).getHours() + new Date(time).getMinutes() / 60;

  const elevation = Math.sin(
    (Math.PI * (hours - sunrise)) / (sunset - sunrise),
  );
  const day = Math.max(elevation, 0);
  const night = Math.max(-elevation, 0);
  const dusk = 1 - day - night;
  const sunVisible = hours >= sunrise && hours < sunset;
  const sunFrac = (hours - sunrise) / (sunset - sunrise);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 transition duration-1000 ease-out starting:opacity-0">
      <div
        className="absolute inset-0 bg-linear-to-b from-slate-950 to-gray-900 transition-opacity duration-500"
        style={{ opacity: night }}
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-sky-900 to-slate-600 transition-opacity duration-500"
        style={{ opacity: day }}
      />
      <div
        className="absolute inset-0 bg-linear-to-b from-slate-900 to-amber-950 transition-opacity duration-500"
        style={{ opacity: dusk }}
      />
      <div
        className="absolute top-0 left-1/2 h-full origin-bottom transition-opacity duration-200 ease-out"
        style={{
          transform: `rotate(${(sunFrac - 0.5) * 180}deg)`,
          opacity: sunVisible ? 1 : 0,
        }}
      >
        <div className="absolute top-[20%] size-40 -translate-x-1/2 rounded-full bg-amber-300 opacity-50 blur-2xl" />
      </div>
    </div>
  );
}
