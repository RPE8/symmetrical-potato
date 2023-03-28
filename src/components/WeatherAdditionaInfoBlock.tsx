import { FC } from "react";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";
import InfoBlockItem from "./InfoBlockItem";
import { format } from "date-fns";

interface WeatherInfoAdditionalProps {
  date: Date | undefined;
  pressure: number | undefined;
  humidityPercent: number | undefined;
  windSpeed: number | undefined;
  isLoading?: boolean;
}

const WeatherInfoAdditional = ({
  date,
  pressure,
  humidityPercent,
  windSpeed,
  isLoading,
}: WeatherInfoAdditionalProps) => {
  return (
    <WeatherBlockContainer loading={isLoading}>
      <div className="flex justify-between">
        <InfoBlockItem
          valueName="Time"
          value={(date && format(date, "hh:mm a")) || ""}
        />
        <InfoBlockItem valueName="Pressure" value={`${pressure} mm`} />
        <InfoBlockItem valueName="Hum." value={`${humidityPercent} %`} />
        <InfoBlockItem valueName="Wind" value={`${windSpeed} m/s`} />
      </div>
    </WeatherBlockContainer>
  );
};

export default WeatherInfoAdditional;
