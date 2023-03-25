import { FC } from "react";
import { format } from "date-fns";
import SunsetSunriseChart from "@/components/SunsetSunriseChart";
import WeatherInfoBlockContainer from "@/components/WeatherBlockContainer";

interface WeatherSunsetSunsriseBlockProps {
  sunset: Date;
  sunrise: Date;
  currentTime: Date;
}

const WeatherSunsetSunsriseBlock = ({
  ...props
}: WeatherSunsetSunsriseBlockProps) => {
  return (
    <WeatherInfoBlockContainer>
      <SunsetSunriseChart {...props} />
      <span>
        Length of the day: {format(props.sunset, "h")}H{" "}
        {format(props.sunset, "m")}M
      </span>
      <span>
        Length of the night: {format(props.sunrise, "h")}H{" "}
        {format(props.sunset, "m")}M
      </span>
      <span>
        Remaining daylight: {format(props.sunset, "h")}H
        {format(props.sunset, "m")}M{" "}
      </span>
    </WeatherInfoBlockContainer>
  );
};

export default WeatherSunsetSunsriseBlock;
