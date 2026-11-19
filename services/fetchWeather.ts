export interface WeatherResponse {
  timelines: {
    minutely: { time: string; values: WeatherValues }[];
    hourly: { time: string; values: WeatherValues }[];
    daily: { time: string; values: Record<string, number | string | null> }[];
  };
  location: { lat: number; lon: number };
}

export interface WeatherValues {
  altimeterSetting: number | null;
  cloudBase: number | null;
  cloudCeiling: number | null;
  cloudCover: number | null;
  dewPoint: number | null;
  evapotranspiration: number | null;
  freezingRainIntensity: number | null;
  humidity: number | null;
  iceAccumulation: number | null;
  iceAccumulationLwe: number | null;
  precipitationProbability: number | null;
  pressureSeaLevel: number | null;
  pressureSurfaceLevel: number | null;
  rainAccumulation: number | null;
  rainIntensity: number | null;
  sleetAccumulation: number | null;
  sleetAccumulationLwe: number | null;
  sleetIntensity: number | null;
  snowAccumulation: number | null;
  snowAccumulationLwe: number | null;
  snowDepth: number | null;
  snowIntensity: number | null;
  temperature: number | null;
  temperatureApparent: number | null;
  uvHealthConcern: number | null;
  uvIndex: number | null;
  visibility: number | null;
  weatherCode: number | null;
  windDirection: number | null;
  windGust: number | null;
  windSpeed: number | null;
}

export async function fetchWeather(
  location: string,
): Promise<WeatherResponse> {
  const apiKey = process.env.TOMORROW_IO_API_KEY;
  if (!apiKey) {
    console.warn(
      "TOMORROW_IO_API_KEY is not set — returning example weather data.",
    );
    return (await import("./example-weather-response.json"))
      .default as WeatherResponse;
  }

  const params = new URLSearchParams({
    location,
    apikey: apiKey,
  });
  const response = await fetch(
    `https://api.tomorrow.io/v4/weather/forecast?${params}`,
  );
  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }
  return response.json() as Promise<WeatherResponse>;
}
