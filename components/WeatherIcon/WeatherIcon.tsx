import Image from "next/image";
import cloudDrizzle from "./cloud-drizzle.svg";
import cloudFog from "./cloud-fog.svg";
import cloudHail from "./cloud-hail.svg";
import cloudSnow from "./cloud-snow-alt.svg";
import cloudSun from "./cloud-sun.svg";
import cloud from "./cloud.svg";
import sun from "./sun.svg";

// https://docs.tomorrow.io/reference/data-layers-weather-codes
const weatherCodes: Record<
  number,
  {
    src: string;
    alt: string;
  }
> = {
  1000: { src: sun, alt: "Clear, Sunny" },
  1100: { src: cloudSun, alt: "Mostly Clear" },
  1101: { src: cloudSun, alt: "Partly Cloudy" },
  1102: { src: cloud, alt: "Mostly Cloudy" },
  1001: { src: cloud, alt: "Cloudy" },
  2000: { src: cloudFog, alt: "Fog" },
  2100: { src: cloudFog, alt: "Light Fog" },
  4000: { src: cloudDrizzle, alt: "Drizzle" },
  4001: { src: cloudDrizzle, alt: "Rain" },
  4200: { src: cloudDrizzle, alt: "Light Rain" },
  4201: { src: cloudDrizzle, alt: "Heavy Rain" },
  5000: { src: cloudSnow, alt: "Snow" },
  5001: { src: cloudSnow, alt: "Flurries" },
  5100: { src: cloudSnow, alt: "Light Snow" },
  5101: { src: cloudSnow, alt: "Heavy Snow" },
  6000: { src: cloudDrizzle, alt: "Freezing Drizzle" },
  6001: { src: cloudDrizzle, alt: "Freezing Rain" },
  6200: { src: cloudDrizzle, alt: "Light Freezing Rain" },
  6201: { src: cloudDrizzle, alt: "Heavy Freezing Rain" },
  7000: { src: cloudHail, alt: "Ice Pellets" },
  7101: { src: cloudHail, alt: "Heavy Ice Pellets" },
  7102: { src: cloudHail, alt: "Light Ice Pellets" },
  8000: { src: cloud, alt: "Thunderstorm" },
};

interface Props {
  code: number;
}

export default function WeatherIcon({ code }: Props) {
  const entry = weatherCodes[code];
  if (entry === undefined) {
    return null;
  }
  return (
    <div className="relative h-full w-full">
      <Image
        src={entry.src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full blur-xs"
      />
      <Image
        src={entry.src}
        className="h-full w-full opacity-80"
        alt={entry.alt}
      />
    </div>
  );
}
