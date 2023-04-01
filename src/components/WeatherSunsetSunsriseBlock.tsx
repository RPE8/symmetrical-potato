import { format } from "date-fns";
import type { Weather } from "@/utils/constants";
import SunsetSunriseChart from "@/components/SunsetSunriseChart";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";
import SunsetSunriseBlockItem from "@/components/SunsetSunriseBlockItem";

interface WeatherSunsetSunsriseBlockProps {
  sunsetMs?: number;
  sunriseMs?: number;
  weather: Weather;
  currentDateMs?: number;
  isLoading?: boolean;
}

const WeatherSunsetSunsriseBlock = ({
  isLoading,
  weather,
  sunsetMs,
  sunriseMs,
  currentDateMs,
}: WeatherSunsetSunsriseBlockProps) => {
  //   if (isLoading) {
  //     return <WeatherBlockContainer loading={isLoading} />;
  //   }

  //   if (!sunsetMs || !sunriseMs || !currentDateMs) {
  //     return null;
  //   }
  return (
    <WeatherBlockContainer loading={isLoading} className="gap-y-6">
      <h3 className="text-xs font-normal text-gray-c2 uppercase">
        {" "}
        Sunset & Sunrise{" "}
      </h3>
      <div className="aspect-video max-h-64">
        <SunsetSunriseChart
          weather={weather}
          sunsetDateMs={sunsetMs || 1680192073000}
          sunriseDateMs={sunriseMs || 1680145609000}
          currentDateMs={currentDateMs || 1680178000000}
        />
      </div>
      {/* <div>
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
      </div> */}
    </WeatherBlockContainer>
  );
};

export default WeatherSunsetSunsriseBlock;
