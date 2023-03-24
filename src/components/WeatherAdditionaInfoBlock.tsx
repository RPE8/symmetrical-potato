import { FC } from "react";
import { format } from "date-fns";

interface WeatherInfoAdditionalProps {
  date: Date;
  precipitationPercent: number;
  humidityPercent: number;
  windSpeed: number;
}

const WeatherInfoAdditional = ({
  date,
  precipitationPercent,
  humidityPercent,
  windSpeed,
}: WeatherInfoAdditionalProps) => {
  return (
    <div className="flex justify-between">
      <span>{format(date, "hh:mm a")} </span>
      <span>{precipitationPercent}%</span> <span>{humidityPercent}%</span>
      <span>{windSpeed}m/s</span>
    </div>
  );
};

export default WeatherInfoAdditional;
