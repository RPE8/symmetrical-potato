"use client";

import { HTMLAttributes, useContext, useEffect } from "react";

import useSWR from "swr";

import WeatherInfoMain from "@/components/WeatherMainInfoBlock";
import WeatherInfoAdditional from "@/components/WeatherAdditionaInfoBlock";
import WeatherSunsetSunsriseBlock from "@/components/WeatherSunsetSunsriseBlock";
import { WeatherContext } from "@/context/WeatherContext";

interface MainProps extends HTMLAttributes<HTMLElement> {}

const key = process.env.NEXT_PUBLIC_API_KEY;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Main = ({}: MainProps) => {
  const { state, dispatch } = useContext(WeatherContext);
  console.log(state.searchLocation);
  const { data, error } = useSWR(
    state.searchLocation === "London"
      ? `https://api.openweathermap.org/data/2.5/weather?q=${state.searchLocation}&appid=${key}`
      : null,
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <main>
      <section>
        <WeatherInfoMain
          weather={state.weatherData?.type ?? "Thunderstorm"}
          temperature={state.weatherData?.current.temp ?? 0}
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
