import * as d3 from "d3";

interface InterpolateYProps<T, T2> {
  leftObject: T;
  rightObject: T;
  xValue: T2;
}

// Nop override supported as for now
const interpolateY = ({
  leftObject,
  rightObject,
  xValue,
}: InterpolateYProps<{ x: number; y: number }, number>) => {
  const d0 = leftObject;
  const d1 = rightObject;
  const interpolatedY =
    d0.y + ((d1.y - d0.y) * (xValue - d0.x)) / (d1.x - d0.x);
  return interpolatedY;
};

export default interpolateY;
