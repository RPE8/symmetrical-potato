import { FC } from "react";
import { Icons, Icon } from "@/components/Icons";

type WeatherInfo = {
  description: string;
  icon: React.ReactNode;
};
type WeathersInfoMap = Record<Weather, WeatherInfo>;

interface WeatherInfoMainProps {
  temperature: number;
  temperatureUnit: string;
  weather: Weather;
  location: string;
}

const iconClasses = "h-32 w-32";

const weatherInfo: WeathersInfoMap = {
  sunny: {
    description: "Sunny",
    icon: <Icons.Sun className={iconClasses + " stroke-orange-400"} />,
  },
  cloudy: {
    description: "Cloudy",
    icon: <Icons.Cloudy className={iconClasses} />,
  },
  rainy: {
    description: "Rainy",
    icon: <Icons.CloudRain className={iconClasses} />,
  },
  snowy: {
    description: "Snowy",
    icon: <Icons.CloudSnow className={iconClasses} />,
  },
};

const WeatherInfoMain = ({
  weather,
  temperatureUnit,
  temperature,
  location,
}: WeatherInfoMainProps) => {
  if (!(weather in weatherInfo)) {
    throw new Error(`Weather ${weather} is not supported`);
  }

  const currentWeather = weatherInfo[weather];

  return (
    <div className="flex flex-col items-center my-10">
      {currentWeather.icon}
      <h1 className="text-3xl font-bold my-5">{location}</h1>

      <h2 className="text-5xl font-semibold">
        {temperature} &deg;{temperatureUnit}
      </h2>
    </div>
  );
};

export default WeatherInfoMain;
