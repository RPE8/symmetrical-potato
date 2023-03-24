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

const weatherInfo: WeathersInfoMap = {
  sunny: {
    description: "Sunny",
    icon: <Icons.Sun />,
  },
  cloudy: {
    description: "Cloudy",
    icon: <Icons.Cloudy />,
  },
  rainy: {
    description: "Rainy",
    icon: <Icons.CloudRain />,
  },
  snowy: {
    description: "Snowy",
    icon: <Icons.CloudSnow />,
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
    <div className="flex flex-col items-center">
      {currentWeather.icon} {location}{" "}
      <span>
        {temperature} {temperatureUnit}
      </span>
    </div>
  );
};

export default WeatherInfoMain;
