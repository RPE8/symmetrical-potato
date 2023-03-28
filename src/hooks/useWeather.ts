import useSWR from "swr";
import z from "zod";

import { validWeatherValues } from "@/utils/constants";

const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

type Weather = z.TypeOf<typeof weatherSchema>;

type FetcherFn<T> = (url: string) => Promise<T>;

const defaultFetcher: FetcherFn<Weather> = (url: string) =>
  fetch(url).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      return Promise.reject(error);
    }
    return weatherSchema.parse(data);
  });

const zodWeather = z.enum(validWeatherValues);
const weatherSchema = z.object({
  main: z.object({
    temp: z.number(),
    humidity: z.number(),
  }),
  weather: z.array(
    z.object({
      main: zodWeather,
      description: z.string(),
    })
  ),
});

export const useWeather = <T extends Weather>(
  location: string | null,
  fetcher?: FetcherFn<T>
) => {
  const fetchOrSkip = Boolean(location && location.length > 0);
  const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${weatherApiKey}`;
  const { data, error } = useSWR(
    fetchOrSkip ? WEATHER_API_URL : null,
    fetcher || defaultFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  );

  return {
    data,
    isLoading: fetchOrSkip && !error && !data,
    isError: error,
  };
};

export default useWeather;
