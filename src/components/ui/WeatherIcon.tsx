import Icon from "@/components/ui/Icon";
import type { Weather } from "@/utils/constants";
import { validWeatherValues } from "@/utils/constants";
import { SVGAttributes } from "react";

interface IconProps extends SVGAttributes<SVGElement> {
  weather: Weather;
}

export default function WeatherIcon({ weather, ...props }: IconProps) {
  if (!validWeatherValues.includes(weather)) {
    throw new Error("Invalid weather value");
  }

  switch (weather) {
    case "Clear":
      return <Icon iconName="Sun" size="3xl" />;
    case "Clouds":
      return <Icon iconName="Cloudy" size="3xl" />;
    case "Rain":
      return <Icon iconName="CloudRain" size="3xl" />;
    case "Snow":
      return <Icon iconName="CloudSnow" size="3xl" />;
    case "Thunderstorm":
      return <Icon iconName="CloudLightning" size="3xl" />;
    case "Drizzle":
      return <Icon iconName="CloudDrizzle" size="3xl" />;
    case "Atmosphere":
      return <Icon iconName="CloudFog" size="3xl" />;
    default:
      const exhaustiveCheck: never = weather;
      throw new Error(exhaustiveCheck);
  }
}
