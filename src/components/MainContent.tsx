"use client";

import { HTMLAttributes, useContext, useEffect } from "react";

import WeatherMainBlock from "@/components/WeatherMainBlock";
import WeatherAdditionalInfo from "@/components/WeatherAdditionaInfoBlock";
import WeatherSunsetSunsriseBlock from "@/components/WeatherSunsetSunsriseBlock";

import { WeatherContext } from "@/context/WeatherContext";
import useWeather from "@/hooks/useWeather";
import kelvinToCelsium from "@/utils/kelvinToCelsium";

interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main = ({}: MainProps) => {
  const { state, dispatch } = useContext(WeatherContext);

  const { data, isError, isLoading } = useWeather(state.location);

  if (isError) {
    console.log(isError);
    return <div>Something went wrong</div>;
  }

  if (!data && !isLoading) {
    return (
      <WeatherSunsetSunsriseBlock
        isLoading={isLoading}
        weather={"Clouds"}
        sunsetMs={0}
        sunriseMs={0}
        currentDateMs={0}
      />
    );
  }

  const currentDateMs = Date.now();
  const { weather, main, wind, date, sys } = data ?? {};

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
        <WeatherAdditionalInfo
          isLoading={isLoading}
          currentDateMs={currentDateMs}
          humidityPercent={main?.humidity}
          pressure={main?.pressure}
          windSpeed={wind?.speed}
        />
      </section>
      <section>
        <WeatherSunsetSunsriseBlock
          isLoading={isLoading}
          weather={weather?.[0].main}
          sunsetMs={sys?.sunset}
          sunriseMs={sys?.sunrise}
          currentDateMs={currentDateMs}
        />
      </section>
    </main>
  );
};

export default Main;
