import * as d3 from "d3";

const defaultToCurveCoordinates = ({
  pathSelection,
  xScale,
  yScale,
  y,
  x,
}: {
  pathSelection: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  xScale: d3.ScaleTime<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  y: number;
  x: Date;
}) => {
  if (!pathSelection) {
    return;
  }

  const node = pathSelection.node() as unknown as SVGPathElement;

  if (!node) {
    return;
  }

  const pathLength = node.getTotalLength();

  const coordinates: [number, number][] = [];
  for (let i = 0; i <= pathLength; i += 10) {
    const point = node.getPointAtLength(i);
    coordinates.push([point.x, point.y]);
  }

  const specificPoint: [number, number] = [xScale(x), yScale(y)];
  const closestPoint =
    coordinates[
      // @ts-ignore
      // It throws unknown for me error: Property 'scan' does not exist on type 'typeof import("...")'
      d3.scan(coordinates, function (d: [number, number]) {
        const dx = d[0] - specificPoint[0],
          dy = d[1] - specificPoint[1];
        return Math.sqrt(dx * dx + dy * dy);
      })
    ];

  return closestPoint;
};

export default defaultToCurveCoordinates;
