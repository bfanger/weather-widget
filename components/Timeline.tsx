"use client";

import { useEffect, useState } from "react";

const DAYS = 6;

function getToday() {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
  ).getTime();
}

interface Props {
  /* timestamp (milliseconds since the epoch) */
  from?: number;
  onValueChange?: (time: number) => void;
}
export default function Timeline({
  from = getToday(),
  onValueChange: onValueChange,
}: Props) {
  const [activeTime, setActiveTime] = useState<number>(from);
  const entries = Array.from({ length: DAYS }, (_, i) => from + i * 86400000);

  useEffect(() => {
    const handleScroll = () => {
      const dayHeight =
        (document.body.parentElement!.scrollHeight - window.innerHeight) / DAYS;
      const index = window.scrollY / dayHeight;
      const clamped = Math.max(0, Math.min(DAYS - 0.01, index));
      const date = new Date(from + clamped * 86400000);
      date.setMinutes(0, 0, 0);
      const value = date.getTime();
      setActiveTime(value);
      onValueChange?.(value);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [onValueChange, from]);

  return (
    <div className="absolute right-0 flex flex-col py-[50vh] whitespace-nowrap">
      {entries.map((time, i) => (
        <TimelineDay key={i} time={time} current={activeTime} />
      ))}
    </div>
  );
}

function TimelineDay({ time, current }: { time: number; current: number }) {
  const active = current >= time && current < time + 86400000;
  const hours = Array.from({ length: 24 }, (_, i) => time + i * 3600000);
  return (
    <div className="relative flex w-10 flex-col text-xl font-bold uppercase last:border-b-0">
      <div
        className={`align-center absolute -top-5 z-10 flex h-10 leading-10 font-(--font-dseg) transition-all duration-100 ${
          active ? "right-14 opacity-100" : "right-12 opacity-30"
        }`}
      >
        {new Date(time).toLocaleDateString("en", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </div>
      <div className="flex flex-col">
        {hours.map((hour, i) => (
          <TimelineHour key={i} time={hour} active={hour === current} />
        ))}
      </div>
    </div>
  );
}

function TimelineHour({ time, active }: { time: number; active: boolean }) {
  return (
    <div className="relative h-5 min-h-[2vh]">
      <span
        className={`align-center absolute -top-2 z-10 flex h-4 text-[10px] leading-4 font-(--font-dseg) transition-all duration-100 ${active ? "right-3 opacity-100" : "right-2 opacity-40"}`}
      >
        {new Date(time).toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
    </div>
  );
}
