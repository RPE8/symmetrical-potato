import { round } from "lodash";

const fahrenheitToCelsium = (fahrenheit: number): number => {
  return round((fahrenheit - 32) * (5 / 9));
};

export default fahrenheitToCelsium;
