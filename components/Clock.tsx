"use client";

const pad = (n: number) => n.toString().padStart(2, "0");

interface Props {
  /** timestamp (milliseconds since the epoch) */
  time?: number;
}
export default function Clock({ time }: Props) {
  if (time === undefined) {
    return null;
  }

  const date = new Date(time);
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return (
    <div
      role="img"
      aria-label={`Date and time: ${date.toLocaleString()}`}
      className="fixed top-0 left-0 z-10 flex items-center gap-4 bg-black/70 px-3 py-1 font-dseg7 text-lg text-red-500"
    >
      <span>{dateStr}</span>
      <span>{timeStr}</span>
    </div>
  );
}
