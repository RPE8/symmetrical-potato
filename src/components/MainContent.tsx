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
