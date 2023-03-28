import { round } from "lodash";

const kelvinToCelsiumDiff = 273.15;

const kelvinToCelsium = (kelvin: number | undefined): number | undefined => {
  if (!kelvin) return undefined;
  return round(kelvin - kelvinToCelsiumDiff);
};

export default kelvinToCelsium;
