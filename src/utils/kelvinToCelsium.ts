import { round } from "lodash";

const kelvinToCelsiumDiff = 273.15;

const kelvinToCelsium = (kelvin: number): number => {
  if (kelvin == null) throw new Error("Kelvin is not defined");
  return round(kelvin - kelvinToCelsiumDiff);
};

export default kelvinToCelsium;
