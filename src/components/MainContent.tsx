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

  const { weather, main, wind, date } = data ?? {};

  return (
    <main>
      <section>
        <WeatherMainBlock
          isLoading={isLoading}
          weather={weather?.[0].main}
          weatherDescription={weather?.[0].description}
          temperature={kelvinToCelsium(main?.temp || 0)}
          temperatureUnit="C"
          location={state.location}
        />
      </section>
      <section>
        <WeatherInfoAdditional
          isLoading={isLoading}
          date={date}
          humidityPercent={main?.humidity}
          pressure={main?.pressure}
          windSpeed={wind?.speed}
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
