import Icon, { sizes } from "@/components/ui/Icon";
import type { Weather } from "@/utils/constants";
import { validWeatherValues } from "@/utils/constants";
import { SVGAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const weatherIconVariants = cva("", {
  variants: {
    variant: {
      filled: "fill-slate-100",
      outline: "bg-transparent text-gray-c2",
      default: "bg-transparent",
    },
    size: sizes,
  },

  defaultVariants: {
    variant: "default",
    size: "3xl",
  },
});

interface IconProps
  extends SVGAttributes<SVGElement>,
    VariantProps<typeof weatherIconVariants> {
  weather: Weather;
}

export default function WeatherIcon({
  weather,
  size,
  variant,
  className,
  ...props
}: IconProps) {
  if (!validWeatherValues.includes(weather)) {
    throw new Error("Invalid weather value");
  }

  switch (weather) {
    case "Clear":
      return (
        <Icon
          iconName="Sun"
          className={twMerge(weatherIconVariants({ variant, size }), className)}
        />
      );
    case "Clouds":
      return (
        <Icon
          iconName="Cloudy"
          className={twMerge(weatherIconVariants({ variant, size }), className)}
        />
      );
    case "Rain":
      return (
        <Icon
          iconName="CloudRain"
          className={twMerge(weatherIconVariants({ variant, size }), className)}
        />
      );
    case "Snow":
      return (
        <Icon
          iconName="CloudSnow"
          className={twMerge(weatherIconVariants({ variant, size }), className)}
        />
      );
    case "Thunderstorm":
      return (
        <Icon
          iconName="CloudLightning"
          className={twMerge(weatherIconVariants({ variant, size }), className)}
        />
      );
    case "Drizzle":
      return (
        <Icon
          iconName="CloudDrizzle"
          className={twMerge(weatherIconVariants({ variant, size }), className)}
        />
      );
    case "Atmosphere":
      return (
        <Icon
          iconName="CloudFog"
          className={twMerge(weatherIconVariants({ variant, size }), className)}
        />
      );
    default:
      const exhaustiveCheck: never = weather;
      throw new Error(exhaustiveCheck);
  }
}
