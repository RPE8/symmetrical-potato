import { FC } from "react";
import { Icons, Icon } from "@/components/Icons";

type WeatherIcon = {
  icon: React.ReactNode;
};
type WeatherIconMap = Record<Weather, WeatherIcon>;

interface WeatherInfoMainProps {
  temperature: number;
  temperatureUnit: string;
  weather: Weather;
  location: string;
}

const iconClasses = "h-32 w-32";

const weatherInfo: WeatherIconMap = {
  Atmosphere: {
    icon: <Icons.CloudFog />,
  },
  Thunderstorm: {
    icon: <Icons.CloudLightning className={iconClasses} />,
  },
  Rain: {
    icon: <Icons.CloudRain className={iconClasses} />,
  },
  Snow: {
    icon: <Icons.CloudSnow className={iconClasses} />,
  },
  Clouds: {
    icon: <Icons.Cloudy className={iconClasses} />,
  },
  Clear: {
    icon: <Icons.Sun className={iconClasses} />,
  },
  Drizzle: {
    icon: <Icons.CloudDrizzle className={iconClasses} />,
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
