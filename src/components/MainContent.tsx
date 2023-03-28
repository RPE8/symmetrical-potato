"use client";

import { HTMLAttributes, useContext, useEffect } from "react";

import useSWR from "swr";
import z from "zod";

import WeatherMainBlock from "@/components/WeatherMainBlock";
import WeatherInfoAdditional from "@/components/WeatherAdditionaInfoBlock";
import WeatherSunsetSunsriseBlock from "@/components/WeatherSunsetSunsriseBlock";
import { Weather, validWeatherValues } from "@/utils/constants";
import { WeatherContext } from "@/context/WeatherContext";

interface MainProps extends HTMLAttributes<HTMLElement> {}

const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const fetcher = (url: string) =>
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

const Main = ({}: MainProps) => {
  const { state, dispatch } = useContext(WeatherContext);
  //   console.log(state.searchLocation);
  //   const error = undefined;
  //   const data = weatherSchema.parse({
  //     coord: {
  //       lon: -0.1257,
  //       lat: 51.5085,
  //     },
  //     weather: [
  //       {
  //         id: 804,
  //         main: "Clouds",
  //         description: "overcast clouds",
  //         icon: "04d",
  //       },
  //     ],
  //     base: "stations",
  //     main: {
  //       temp: 8.62,
  //       feels_like: 6.8,
  //       temp_min: 7.14,
  //       temp_max: 9.88,
  //       pressure: 1003,
  //       humidity: 91,
  //     },
  //     visibility: 10000,
  //     wind: {
  //       speed: 3.09,
  //       deg: 360,
  //     },
  //     clouds: {
  //       all: 100,
  //     },
  //     dt: 1679829575,
  //     sys: {
  //       type: 2,
  //       id: 2075535,
  //       country: "GB",
  //       sunrise: 1679809822,
  //       sunset: 1679854923,
  //     },
  //     timezone: 3600,
  //     id: 2643743,
  //     name: "London",
  //     cod: 200,
  //   });
  const { data, error } = useSWR(
    state.location
      ? `https://api.openweathermap.org/data/2.5/weather?q=${state.location}&appid=${weatherApiKey}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <main>
      <section>
        <WeatherMainBlock
          weather={data.weather[0].main}
          weatherDescription={data.weather[0].description}
          temperature={data.main.temp}
          temperatureUnit="C"
          location={state.location}
        />
      </section>
      <section>
        <WeatherInfoAdditional
          date={new Date()}
          humidityPercent={5}
          precipitationPercent={50}
          windSpeed={10}
        />
      </section>
      <section>
        <WeatherSunsetSunsriseBlock
          sunset={new Date()}
          sunrise={new Date()}
          currentTime={new Date()}
        />
      </section>
    </main>
  );
};

export default Main;
