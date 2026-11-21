export interface ForecastData {
  timelines: {
    minutely: { time: string; values: WeatherValues }[];
    hourly: { time: string; values: WeatherValues }[];
    daily: { time: string; values: WeatherDailyValues }[];
  };
  location: { lat: number; lon: number };
}

export async function fetchForecast(location: string) {
  const apiKey = process.env.TOMORROW_IO_API_KEY;
  if (!apiKey) {
    console.warn(
      "TOMORROW_IO_API_KEY is not set — returning example weather data.",
    );
    return (await import("./example-weather-response.json"))
      .default as ForecastData;
  }

  const params = new URLSearchParams({
    location,
    units: "metric",
    apikey: apiKey,
  });
  const response = await fetch(
    `https://api.tomorrow.io/v4/weather/forecast?${params}`,
  );
  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }
  const data: ForecastData = await response.json();
  return data;
}

export interface WeatherDailyValues {
  altimeterSettingAvg: number;
  altimeterSettingMax: number;
  altimeterSettingMin: number;
  cloudBaseAvg: number;
  cloudBaseMax: number;
  cloudBaseMin: number;
  cloudCeilingAvg: number;
  cloudCeilingMax: number;
  cloudCeilingMin: number;
  cloudCoverAvg: number;
  cloudCoverMax: number;
  cloudCoverMin: number;
  dewPointAvg: number;
  dewPointMax: number;
  dewPointMin: number;
  evapotranspirationAvg: number;
  evapotranspirationMax: number;
  evapotranspirationMin: number;
  evapotranspirationSum: number;
  freezingRainIntensityAvg: number;
  freezingRainIntensityMax: number;
  freezingRainIntensityMin: number;
  humidityAvg: number;
  humidityMax: number;
  humidityMin: number;
  iceAccumulationAvg: number;
  iceAccumulationLweAvg: number;
  iceAccumulationLweMax: number;
  iceAccumulationLweMin: number;
  iceAccumulationLweSum: number;
  iceAccumulationMax: number;
  iceAccumulationMin: number;
  iceAccumulationSum: number;
  moonriseTime: string;
  moonsetTime: string;
  precipitationProbabilityAvg: number;
  precipitationProbabilityMax: number;
  precipitationProbabilityMin: number;
  pressureSeaLevelAvg: number;
  pressureSeaLevelMax: number;
  pressureSeaLevelMin: number;
  pressureSurfaceLevelAvg: number;
  pressureSurfaceLevelMax: number;
  pressureSurfaceLevelMin: number;
  rainAccumulationAvg: number;
  rainAccumulationMax: number;
  rainAccumulationMin: number;
  rainAccumulationSum: number;
  rainIntensityAvg: number;
  rainIntensityMax: number;
  rainIntensityMin: number;
  sleetAccumulationAvg?: number | null;
  sleetAccumulationLweAvg?: number | null;
  sleetAccumulationLweMax?: number | null;
  sleetAccumulationLweMin?: number | null;
  sleetAccumulationLweSum?: number | null;
  sleetAccumulationMax?: number | null;
  sleetAccumulationMin?: number | null;
  sleetAccumulationSum?: number | null;
  sleetIntensityAvg: number;
  sleetIntensityMax: number;
  sleetIntensityMin: number;
  snowAccumulationAvg: number;
  snowAccumulationLweAvg: number;
  snowAccumulationLweMax: number;
  snowAccumulationLweMin: number;
  snowAccumulationLweSum: number;
  snowAccumulationMax: number;
  snowAccumulationMin: number;
  snowAccumulationSum: number;
  snowDepthAvg?: number | null;
  snowDepthMax?: number | null;
  snowDepthMin?: number | null;
  snowDepthSum?: number | null;
  snowIntensityAvg: number;
  snowIntensityMax: number;
  snowIntensityMin: number;
  sunriseTime: string;
  sunsetTime: string;
  temperatureApparentAvg: number;
  temperatureApparentMax: number;
  temperatureApparentMin: number;
  temperatureAvg: number;
  temperatureMax: number;
  temperatureMin: number;
  uvHealthConcernAvg?: number | null;
  uvHealthConcernMax?: number | null;
  uvHealthConcernMin?: number | null;
  uvIndexAvg?: number | null;
  uvIndexMax?: number | null;
  uvIndexMin?: number | null;
  visibilityAvg: number;
  visibilityMax: number;
  visibilityMin: number;
  weatherCodeAvg: number;
  weatherCodeMax: number;
  weatherCodeMin: number;
  windDirectionAvg: number;
  windDirectionMax: number;
  windDirectionMin: number;
  windGustAvg: number;
  windGustMax: number;
  windGustMin: number;
  windSpeedAvg: number;
  windSpeedMax: number;
  windSpeedMin: number;
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
