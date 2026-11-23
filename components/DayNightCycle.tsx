const sunrise = 6;
const sunset = 18;

interface Props {
  /** timestamp (milliseconds since the epoch) */
  time: number;
}
export default function DayNightCycle({ time }: Props) {
  const hours = new Date(time).getHours();
  const elevation = Math.sin(
    (Math.PI * (hours - sunrise)) / (sunset - sunrise),
  );
  const day = Math.max(elevation, 0);
  const night = Math.max(-elevation, 0);
  const dusk = 1 - day - night;
  const startOfToday = new Date(time);
  startOfToday.setHours(0, 0, 0, 0);
  const sunFrac =
    startOfToday.getTime() / 86400000 + (hours - sunrise) / (sunset - sunrise);
  const sunAngle = (sunFrac - 0.5) * 360;
  return (
    <div className="pointer-events-none fixed inset-0 transition duration-1000 ease-out starting:opacity-0">
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
        className="absolute top-0 left-1/2 h-full origin-bottom transition-transform duration-200 ease-out"
        style={{
          transform: `rotate(${sunAngle}deg)`,
        }}
      >
        <div className="absolute top-[20%] size-40 -translate-x-1/2 rounded-full bg-amber-300 opacity-50 blur-2xl" />
      </div>
    </div>
  );
}
