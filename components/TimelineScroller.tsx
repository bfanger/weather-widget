"use client";

import { useEffect, useState } from "react";

const HOURS = 120;

export function getCurrentHour() {
  const now = new Date();
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    now.getHours(),
  ).getTime();
}

interface Props {
  /* timestamp (milliseconds since the epoch) */
  from?: number;
  onTimeChange?: (time: number) => void;
}
export default function TimelineScroller({
  from = getCurrentHour(),
  onTimeChange,
}: Props) {
  const [activeTime, setActiveTime] = useState<number>(from);
  const days: { time: number; hours: number[]; label: boolean }[] = [];
  let day: { time: number; hours: number[]; label: boolean } | undefined;
  for (let time = from; time < from + HOURS * 3600000; time += 3600000) {
    const hour = new Date(time).getHours();
    if (hour === 0 || hour === 23 || !day) {
      day = { time, hours: [], label: hour === 0 || time === from };
      days.push(day);
    }
    day.hours.push(time);
  }

  useEffect(() => {
    const handleScroll = () => {
      const hourHeight =
        (document.body.parentElement!.scrollHeight - window.innerHeight) /
        HOURS;
      const index = window.scrollY / hourHeight;
      const clamped = Math.max(0, Math.min(HOURS - 0.01, index));
      const date = new Date(from + clamped * 3600000);
      date.setMinutes(0, 0, 0);
      const value = date.getTime();
      setActiveTime(value);
      onTimeChange?.(value);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [onTimeChange, from]);

  return (
    <div className="absolute right-0 flex flex-col py-[50vh] whitespace-nowrap [&>div:last-child>div:last-child]:h-px [&>div:last-child>div:last-child]:min-h-0">
      {days.map((day) => (
        <div key={day.time}>
          {day.label && <TimelineDay time={day.time} current={activeTime} />}
          {day.hours.map((time) => (
            <TimelineHour key={time} time={time} active={time === activeTime} />
          ))}
        </div>
      ))}
    </div>
  );
}

function TimelineDay({ time, current }: { time: number; current: number }) {
  const active = new Date(time).getDate() === new Date(current).getDate();
  return (
    <div className="sticky top-[50vh] h-0 w-10">
      <div
        className={`align-center absolute -top-5 right-0 flex h-10 w-10 justify-end pr-15.5 text-xs leading-10 font-bold uppercase sm:text-xl ${
          active ? "opacity-100" : "opacity-30"
        }`}
      >
        {new Date(time).toLocaleDateString("en", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </div>
    </div>
  );
}

function TimelineHour({ time, active }: { time: number; active: boolean }) {
  return (
    <div className="relative h-7 min-h-[2vh]">
      <span
        className={`align-center absolute -top-2 flex h-4 text-xs leading-4 transition-all duration-100 sm:text-sm ${active ? "right-3 opacity-100" : "right-2 opacity-40"}`}
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
