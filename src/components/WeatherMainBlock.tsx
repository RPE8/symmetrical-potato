import WeatherIcon from "./ui/WeatherIcon";
import type { Weather } from "@/utils/constants";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const weatherMainBlock = cva("flex flex-col items-center my-10");

const weatherIconVariants = cva("", {
  variants: {
    loading: {
      true: "h-32 w-32 animate-pulse bg-gray-c2 rounded-full",
    },
  },
  defaultVariants: {
    loading: false,
  },
});

const locationVariants = cva("text-3xl font-bold my-5", {
  variants: {
    loading: {
      true: "animate-pulse bg-gray-c2 rounded-md w-32",
    },
  },
  defaultVariants: {
    loading: false,
  },
});

const temperatureVariants = cva("text-5xl fond-semibold", {
  variants: {
    loading: {
      true: "animate-pulse bg-gray-c2 rounded-md w-32",
    },
  },
  defaultVariants: {
    loading: false,
  },
});

interface WeatherMainBlockProps {
  weather?: Weather;
  temperature?: number;
  temperatureUnit?: string;
  weatherDescription?: string;
  location?: string;
  isLoading?: boolean;
}

const WeatherMainBlock = ({
  weather,
  temperatureUnit,
  temperature,
  isLoading = false,
  location,
}: WeatherMainBlockProps) => {
  if (isLoading) {
    return (
      <div className={weatherMainBlock()}>
        <div className={twMerge(weatherIconVariants({ loading: isLoading }))} />
        <div className={twMerge(locationVariants({ loading: isLoading }))}>
          &nbsp;
        </div>
        <div className={twMerge(temperatureVariants({ loading: isLoading }))}>
          &nbsp;
        </div>
      </div>
    );
  }
  if (!location || temperature == null) return null;

  return (
    <>
      <div className={weatherMainBlock()}>
        {weather && (
          <WeatherIcon
            weather={weather}
            className={twMerge(weatherIconVariants({}))}
          />
        )}
        <h1 className={twMerge(locationVariants({}))}>{location}</h1>

        <h2 className={twMerge(temperatureVariants({}))}>
          {temperature} &deg;{temperatureUnit}
        </h2>
      </div>
    </>
  );
};

export default WeatherMainBlock;
