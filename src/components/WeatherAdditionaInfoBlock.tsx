import { FC } from "react";
import WeatherInfoBlockContainer from "@/components/WeatherBlockContainer";
import InfoBlockItem from "./InfoBlockItem";
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
    <WeatherInfoBlockContainer>
      <div className="flex justify-between">
        <InfoBlockItem valueName="Time" value={format(date, "hh:mm a")} />
        <InfoBlockItem
          valueName="Rain. chance"
          value={`${precipitationPercent} %`}
        />
        <InfoBlockItem valueName="Hum." value={`${humidityPercent} %`} />
        <InfoBlockItem valueName="Wind" value={`${windSpeed} m/s`} />
      </div>
    </WeatherInfoBlockContainer>
  );
};

export default WeatherInfoAdditional;
