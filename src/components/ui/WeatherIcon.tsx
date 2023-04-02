import type { IconName } from "@/components/ui/Icon";
import Icon, { sizes } from "@/components/ui/Icon";
import type { Weather } from "@/utils/constants";
import { validWeatherValues } from "@/utils/constants";
import { SVGAttributes } from "react";

import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const weatherIconVariants = cva("", {
  variants: {
    variant: {
      filled:
        "fill-gray-c1 dark:fill-black-c1 stroke-gray-c4 dark:stroke-gray-c3",
      outline: "bg-transparent text-gray-c4 dark:text-gray-c3",
      default: "bg-transparent",
    },
    size: sizes,
  },

  defaultVariants: {
    variant: "default",
    size: "3xl",
  },
});

type WeatherToIcon = {
  [weather in Weather]: IconName;
};

// Map weather values from endpoint to icon names
export const weatherToIcon: WeatherToIcon = {
  Clear: "Sun",
  Clouds: "Cloudy",
  Rain: "CloudRain",
  Snow: "CloudSnow",
  Thunderstorm: "CloudLightning",
  Drizzle: "CloudDrizzle",
  Atmosphere: "CloudFog",
};
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
    throw new Error(`Invalid weather value: ${weather}`);
  }

  if (!(weather in weatherToIcon)) {
    throw new Error(`There is no Weather:Icon mapping for weather: ${weather}`);
  }

  const iconName = weatherToIcon[weather];
  return (
    <Icon
      iconName={iconName}
      className={twMerge(weatherIconVariants({ variant, size }), className)}
    />
  );
}
