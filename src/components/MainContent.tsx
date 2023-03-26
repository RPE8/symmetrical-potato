"use client";

import { HTMLAttributes, useContext, useEffect } from "react";

import ky from "ky";

import WeatherInfoMain from "@/components/WeatherMainInfoBlock";
import WeatherInfoAdditional from "@/components/WeatherAdditionaInfoBlock";
import WeatherSunsetSunsriseBlock from "@/components/WeatherSunsetSunsriseBlock";
import { WeatherContext } from "@/context/WeatherContext";

interface MainProps extends HTMLAttributes<HTMLElement> {}

const key = "e99cfc6ee3bdb8cc06ee485de8187f28";

const Main = ({}: MainProps) => {
  const { state, dispatch } = useContext(WeatherContext);
  useEffect(() => {
    const fetchWeather = async () => {
      //   const data = await ky
      //     .get(
      //       `https://api.openweathermap.org/data/2.5/weather?q=${state.searchLocation}&appid=${key}&units=metric`
      //     )
      //     .json();
      //   console.log(data);
    };
    console.log(state.searchLocation);
    if (state.searchLocation === "London" || state.searchLocation === "Minsk") {
      fetchWeather();
    }
  }, [state.searchLocation]);
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
