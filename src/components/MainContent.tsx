"use client";

import { HTMLAttributes, useContext, useEffect } from "react";

import WeatherMainBlock from "@/components/WeatherMainBlock";
import WeatherInfoAdditional from "@/components/WeatherAdditionaInfoBlock";
import WeatherSunsetSunsriseBlock from "@/components/WeatherSunsetSunsriseBlock";

import { WeatherContext } from "@/context/WeatherContext";
import useWeather from "@/hooks/useWeather";
import kelvinToCelsium from "@/utils/kelvinToCelsium";

interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main = ({}: MainProps) => {
  const { state, dispatch } = useContext(WeatherContext);

  const { data, isError, isLoading } = useWeather(state.location);

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (!data && !isLoading) {
    return null;
  }

  return (
    <main>
      <section>
        <WeatherMainBlock
          isLoading={isLoading}
          weather={data && data.weather[0].main}
          weatherDescription={data && data.weather[0].description}
          temperature={kelvinToCelsium(data && data.main.temp)}
          temperatureUnit="C"
          location={state.location}
        />
      </section>
      <section>
        <WeatherInfoAdditional
          isLoading={isLoading}
          date={data && data.date}
          humidityPercent={data && data.main.humidity}
          pressure={data && data.main.pressure}
          windSpeed={data && data.wind.speed}
        />
      </section>
      <section>
        <WeatherSunsetSunsriseBlock
          isLoading={isLoading}
          sunset={new Date()}
          sunrise={new Date()}
          currentTime={new Date()}
        />
      </section>
    </main>
  );
};

export default Main;
