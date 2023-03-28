import WeatherIcon from "./ui/WeatherIcon";
import type { Weather } from "@/utils/constants";

interface WeatherMainBlockProps {
  weather: Weather | undefined;
  temperature: number | undefined;
  temperatureUnit: string | undefined;
  weatherDescription: string | undefined;
  location: string | undefined;
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
      <div className="flex flex-col items-center my-10">
        <div className="w-32 h-32 rounded-full bg-gray-c2 animate-pulse" />
        <div className="text-3xl w-32 font-bold my-5 animate-pulse bg-gray-c2 rounded-md">
          &nbsp;
        </div>
        <div className="text-5xl w-32 animate-pulse bg-gray-c2 rounded-md">
          &nbsp;
        </div>
      </div>
    );
  }
  if (!location || temperature == null) return null;

  return (
    <>
      <div className="flex flex-col items-center my-10">
        {weather && <WeatherIcon weather={weather} />}
        <h1 className="text-3xl font-bold my-5">{location}</h1>

        <h2 className="text-5xl font-semibold">
          {temperature} &deg;{temperatureUnit}
        </h2>
      </div>
    </>
  );
};

export default WeatherMainBlock;
