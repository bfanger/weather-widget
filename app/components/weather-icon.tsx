import type { Condition } from "@/app/lib/weather";

// Icons are served from /public so they can be referenced by a plain URL.
const ICONS: Record<Condition, string> = {
  sun: "/icons/sun.svg",
  moon: "/icons/moon.svg",
  cloud: "/icons/cloud.svg",
  "cloud-sun": "/icons/cloud-sun.svg",
  "cloud-drizzle": "/icons/cloud-drizzle.svg",
  "cloud-snow-alt": "/icons/cloud-snow-alt.svg",
  "cloud-hail": "/icons/cloud-hail.svg",
  "cloud-fog": "/icons/cloud-fog.svg",
  "cloud-moon": "/icons/cloud-moon.svg",
  wind: "/icons/wind.svg",
};

interface WeatherIconProps {
  condition: Condition;
  className?: string;
}

/**
 * Renders the white-filled weather icon for a condition. The icons are pure
 * white, so they are meant to sit on a colored (sky) background.
 *
 * The icon is decorative: the surrounding text already conveys the meaning,
 * so it is hidden from assistive technology.
 */
export function WeatherIcon({ condition, className }: WeatherIconProps) {
  return (
    <img
      src={ICONS[condition]}
      alt=""
      aria-hidden="true"
      className={className}
      width={48}
      height={48}
      loading="lazy"
    />
  );
}
