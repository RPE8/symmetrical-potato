import * as d3 from "d3";

interface InterpolateTimeToLinearProps {
  linearScale: d3.ScaleLinear<number, number>;
  leftTimeValue: number;
  rightTimeValue: number;
  leftLinearValue: number;
  rightLinearValue: number;
  timeToBeInterpolated: number;
  extra: number;
}

const interpolateTimeToLinear = ({
  linearScale,
  leftTimeValue,
  rightTimeValue,
  leftLinearValue,
  rightLinearValue,
  timeToBeInterpolated,
}: InterpolateTimeToLinearProps) => {
  const interpolateY = d3
    .scaleLinear()
    .domain([leftTimeValue, rightTimeValue])
    .range([leftLinearValue, rightLinearValue])
    .interpolate(d3.interpolateNumber);

  const interpolatedY = interpolateY(timeToBeInterpolated);
  const interpolatedPoint = linearScale(interpolatedY);
  return interpolatedPoint;
};

export default interpolateTimeToLinear;
