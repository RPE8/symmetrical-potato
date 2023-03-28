import { round } from "lodash";

const kelvinToCelsium = (kelvin: number): number => {
  return round(kelvin - 273.15);
};

export default kelvinToCelsium;
