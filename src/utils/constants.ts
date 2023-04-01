// Weather thta we expect from openweather
export const validWeatherValues = [
  "Thunderstorm",
  "Drizzle",
  "Rain",
  "Snow",
  "Atmosphere",
  "Clear",
  "Clouds",
] as const;

export type Weather = typeof validWeatherValues[number];
