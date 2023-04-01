import { FC } from "react";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";
import InfoBlockItem from "./InfoBlockItem";
import { format } from "date-fns";

interface WeatherAdditionalInfoProps {
  currentDateMs?: number;
  pressure?: number;
  humidityPercent?: number;
  windSpeed?: number;
  isLoading?: boolean;
}

const WeatherAdditionalInfo = ({
  currentDateMs,
  pressure,
  humidityPercent,
  windSpeed,
  isLoading,
}: WeatherAdditionalInfoProps) => {
  if (isLoading) {
    return <WeatherBlockContainer loading={isLoading} />;
  }
  if (!currentDateMs || !pressure || !humidityPercent || !windSpeed) {
    return null;
  }
  return (
    <WeatherBlockContainer loading={isLoading}>
      <div className="flex justify-between">
        <InfoBlockItem
          valueName="Time"
          value={(currentDateMs && format(currentDateMs, "hh:mm a")) || ""}
        />
        <InfoBlockItem valueName="Pressure" value={`${pressure} mm`} />
        <InfoBlockItem valueName="Hum." value={`${humidityPercent} %`} />
        <InfoBlockItem valueName="Wind" value={`${windSpeed} m/s`} />
      </div>
    </WeatherBlockContainer>
  );
};

export default WeatherAdditionalInfo;
