import * as d3 from "d3";

interface InterpolateYProps<T extends { x: number | Date; y: number }> {
  leftObject: T;
  rightObject: T;
  xValue: number;
}

const interpolateY = <T extends { x: number | Date; y: number }>({
  leftObject,
  rightObject,
  xValue,
}: InterpolateYProps<T>) => {
  const d0 = leftObject;
  const d1 = rightObject;
  const x0 = typeof d0.x === "number" ? d0.x : d0.x.getTime();
  const x1 = typeof d1.x === "number" ? d1.x : d1.x.getTime();
  const interpolatedY = d0.y + ((d1.y - d0.y) * (xValue - x0)) / (x1 - x0);
  return interpolatedY;
};

export default interpolateY;
