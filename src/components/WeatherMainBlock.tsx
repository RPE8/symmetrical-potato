import WeatherIcon from "./ui/WeatherIcon";
import type { Weather } from "@/utils/constants";

interface WeatherMainBlockProps {
  weather: Weather;
  temperature: number;
  temperatureUnit: string;
  weatherDescription: string;
  location: string;
}

const WeatherMainBlock = ({
  weather,
  temperatureUnit,
  temperature,
  location,
}: WeatherMainBlockProps) => {
  return (
    <div className="flex flex-col items-center my-10">
      {weather && <WeatherIcon weather={weather} />}
      <h1 className="text-3xl font-bold my-5">{location}</h1>

      <h2 className="text-5xl font-semibold">
        {temperature} &deg;{temperatureUnit}
      </h2>
    </div>
  );
};

export default WeatherMainBlock;
