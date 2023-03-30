// @ts-nocheck

import * as d3 from "d3";
import { startOfDay, endOfDay } from "date-fns";
import getMedianDate from "@/utils/medianDate";
import React, { useRef, useEffect, useState, useCallback } from "react";

interface SunsetSunriseChartProps {
  sunset: number;
  sunrise: number;
  currentTime: number;
}

const xType = d3.scaleTime;
const yType = d3.scaleLinear;

const SunsetSunriseChart = ({
  sunset,
  sunrise,
  currentTime,
}: SunsetSunriseChartProps) => {
  const [size, setSize] = useState([0, 0]);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleResize = useCallback(() => {
    if (svgRef.current) {
      const svgBounds = svgRef.current.getBoundingClientRect();

      setSize([svgBounds.width, svgBounds.height]);
    }
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (!svg) return;
    const svgBoundings = svgRef.current.getBoundingClientRect();
    if (svgBoundings.width !== size[0] || svgBoundings.height !== size[1]) {
      handleResize();
      return;
    }
    window.addEventListener("resize", handleResize);
    const width = size[0];
    const height = size[1];

    const xRange = [0, width];
    const yRange = [height, 0];

    const startDate = startOfDay(currentTime);
    const endDate = endOfDay(currentTime);
    const sunriseDate = new Date(sunrise);
    const sunsetDate = new Date(sunset);

    const xDomain = [startDate, sunsetDate];
    const yDomain = [-100, 100];
    const data = [
      {
        x: startDate,
        y: 0,
      },
      {
        x: getMedianDate(startDate, sunriseDate),
        y: -100,
      },
      {
        x: sunriseDate,
        y: 0,
      },
      {
        x: getMedianDate(sunriseDate, sunsetDate),
        y: 100,
      },
      {
        x: sunsetDate,
        y: 0,
      },
    ];
    type Data = typeof data[number];
    const xGetter = (d: Data) => d.x;
    const yGetter = (d: Data) => d.y;

    const xScale = xType(xDomain, xRange);
    const yScale = yType(yDomain, yRange);

    const area = d3
      .area()
      .x((d) => xScale(xGetter(d)))
      .y0(yScale(0))
      .y1((d) => yScale(yGetter(d)));

    svg.select("path").datum(data).attr("d", area);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sunset, sunrise, currentTime, handleResize, size]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={[0, 0, size[0], size[1]]}
    >
      <path></path>
    </svg>
  );
};

export default SunsetSunriseChart;
