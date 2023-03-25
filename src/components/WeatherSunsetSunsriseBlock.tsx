import { FC } from "react";
import { format } from "date-fns";
import SunsetSunriseChart from "@/components/SunsetSunriseChart";
import WeatherInfoBlockContainer from "@/components/WeatherBlockContainer";
import SunsetSunriseBlockItem from "@/components/SunsetSunriseBlockItem";

interface WeatherSunsetSunsriseBlockProps {
  sunset: Date;
  sunrise: Date;
  currentTime: Date;
}

const WeatherSunsetSunsriseBlock = ({
  ...props
}: WeatherSunsetSunsriseBlockProps) => {
  return (
    <WeatherInfoBlockContainer className="gap-y-1">
      <h3 className="text-xs font-normal text-gray-c2 uppercase">
        {" "}
        Sunset & Sunrise{" "}
      </h3>
      <SunsetSunriseChart {...props} />
      <div>
        <SunsetSunriseBlockItem
          value={`${format(props.sunset, "h")}H ${format(props.sunset, "m")}M`}
          valueName="Length of the day"
        />
        <SunsetSunriseBlockItem
          value={`${format(props.sunset, "h")}H ${format(props.sunset, "m")}M`}
          valueName="Length of the night"
        />
        <SunsetSunriseBlockItem
          value={`${format(props.sunset, "h")}H ${format(props.sunset, "m")}M`}
          valueName="Remaining daylight"
        />
      </div>
    </WeatherInfoBlockContainer>
  );
};

export default WeatherSunsetSunsriseBlock;
