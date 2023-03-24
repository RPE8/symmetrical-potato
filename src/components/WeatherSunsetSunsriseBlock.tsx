import { FC } from "react";
import { format } from "date-fns";
import SunsetSunriseChart from "@/components/SunsetSunriseChart";

interface WeatherSunsetSunsriseBlockProps {
  sunset: Date;
  sunrise: Date;
  currentTime: Date;
}

const WeatherSunsetSunsriseBlock = ({
  ...props
}: WeatherSunsetSunsriseBlockProps) => {
  return (
    <div className="h-[500px]">
      <SunsetSunriseChart {...props} />
    </div>
  );
};

export default WeatherSunsetSunsriseBlock;
