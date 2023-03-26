import { Icons } from "@/components/Icons";
import type { Weather } from "@/utils/constants";
import { validWeatherValues } from "@/utils/constants";
import { SVGAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface IconProps extends SVGAttributes<SVGElement> {
  weather: Weather;
}

export default function WeatherIcon({
  weather,
  className,
  ...props
}: IconProps) {
  if (!validWeatherValues.includes(weather)) {
    throw new Error("Invalid weather value");
  }

  switch (weather) {
    case "Clear":
      return (
        <Icons.Sun
          className={twMerge(className, "fill-orange-400")}
          {...props}
        />
      );
    case "Clouds":
      return <Icons.Cloudy />;
    case "Rain":
      return <Icons.CloudRain />;
    case "Snow":
      return <Icons.CloudSnow />;
    case "Thunderstorm":
      return <Icons.CloudLightning />;
    case "Drizzle":
      return <Icons.CloudDrizzle />;
    case "Atmosphere":
      return <Icons.CloudFog />;
    default:
      const exhaustiveCheck: never = weather;
      throw new Error(exhaustiveCheck);
  }
}
