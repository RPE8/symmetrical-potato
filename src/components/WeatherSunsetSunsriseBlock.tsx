import { FC } from "react";
import { format } from "date-fns";
import SunsetSunriseChart from "@/components/SunsetSunriseChart";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";
import SunsetSunriseBlockItem from "@/components/SunsetSunriseBlockItem";

interface WeatherSunsetSunsriseBlockProps {
  sunsetMs?: number;
  sunriseMs?: number;
  currentDateMs?: number;
  isLoading?: boolean;
}

const WeatherSunsetSunsriseBlock = ({
  isLoading,
  sunsetMs,
  sunriseMs,
  currentDateMs,
}: WeatherSunsetSunsriseBlockProps) => {
  if (isLoading) {
    return <WeatherBlockContainer loading={isLoading} />;
  }

  if (!sunsetMs || !sunriseMs || !currentDateMs) {
    return null;
  }
  return (
    <WeatherBlockContainer loading={isLoading} className="gap-y-1">
      <h3 className="text-xs font-normal text-gray-c2 uppercase">
        {" "}
        Sunset & Sunrise{" "}
      </h3>
      <SunsetSunriseChart
        sunset={sunsetMs}
        sunrise={sunriseMs}
        currentTime={currentDateMs}
      />
      <div>
        <SunsetSunriseBlockItem
          value={`${format(sunsetMs, "h")}H ${format(sunsetMs, "m")}M`}
          valueName="Length of the day"
        />
        <SunsetSunriseBlockItem
          value={`${format(sunriseMs, "h")}H ${format(sunriseMs, "m")}M`}
          valueName="Length of the night"
        />
        <SunsetSunriseBlockItem
          value={`${format(sunriseMs, "h")}H ${format(sunriseMs, "m")}M`}
          valueName="Remaining daylight"
        />
      </div>
    </WeatherBlockContainer>
  );
};

export default WeatherSunsetSunsriseBlock;
