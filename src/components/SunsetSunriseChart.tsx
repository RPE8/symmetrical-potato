// @ts-nocheck

import * as d3 from "d3";
import { startOfDay, endOfDay, format } from "date-fns";
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

    const xDomain = [startDate, endDate];
    const domainHighest = 100;
    const domainLowest = -100;

    const sunriseHighest = (domainHighest * 70) / 100;
    const sunriseLowest = (domainLowest * 60) / 100;
    const sunsetHighest = (domainHighest * 70) / 100;

    const yDomain = [domainLowest, domainHighest];
    const sunriseLineData = [
      {
        x: sunriseDate,
        y: 0,
      },
      {
        x: sunriseDate,
        y: sunriseHighest,
      },
    ];
    const sunsetLineData = [
      {
        x: sunsetDate,
        y: 0,
      },
      {
        x: sunsetDate,
        y: sunsetHighest,
      },
    ];
    const horizontalLineData = [
      {
        x: startDate,
        y: 0,
      },
      {
        x: endDate,
        y: 0,
      },
    ];
    const startToSunriseData = [
      {
        x: startDate,
        y: 0,
      },
      {
        x: getMedianDate(startDate, sunriseDate),
        y: sunriseLowest,
      },
      {
        x: sunriseDate,
        y: 0,
      },
    ];
    const sunriseToSunsetData = [
      {
        x: sunriseDate,
        y: 0,
      },
      {
        x: getMedianDate(sunriseDate, sunsetDate),
        y: sunriseHighest,
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
      .curve(d3.curveCatmullRom.alpha(0.5))
      .x((d) => xScale(xGetter(d)))
      .y0(yScale(0))
      .y1((d) => yScale(yGetter(d)));

    const line = d3
      .line()
      .x((d) => xScale(xGetter(d)))

      .y((d) => yScale(yGetter(d)));

    svg.select("#startToSunrise").datum(startToSunriseData).attr("d", area);
    svg.select("#sunriseToSunset").datum(sunriseToSunsetData).attr("d", area);

    svg.select("#horizontalLine").datum(horizontalLineData).attr("d", line);

    svg.select("#sunriseLine").datum(sunriseLineData).attr("d", line);

    svg.select("#sunsetLine").datum(sunsetLineData).attr("d", line);

    const sunriseText = svg.select("#sunrise");
    const sunriseTextBounds = sunriseText.node().getBBox();

    sunriseText
      .attr("x", xScale(sunriseDate) - sunriseTextBounds.width / 2)
      .attr("y", yScale(sunriseHighest));

    const sunsetText = svg.select("#sunset");
    const sunsetTextBounds = sunsetText.node().getBBox();

    sunsetText
      .attr("x", xScale(sunsetDate) - sunsetTextBounds.width / 2)
      .attr("y", yScale(sunsetHighest));

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [sunset, sunrise, currentTime, handleResize, size]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      className="aspect-w-16 aspect-h-9"
      viewBox={[0, 0, size[0], size[1]]}
    >
      <text id="sunriseTime">{format(currentTime, "hh:mm a")}</text>
      <text id="sunrise">{format(currentTime, "hh:mm a")}</text>
      <text id="sunrise">Sunrise</text>
      <text id="sunset">Sunset</text>
      <path id="startToSunrise" className="fill-blue-900"></path>
      <path id="sunriseToSunset" className=" fill-blue-300"></path>
      <path
        id="horizontalLine"
        className=" stroke-gray-c2 stroke-dash-line stroke-2"
      ></path>
      <path
        id="sunriseLine"
        className=" stroke-gray-c2 stroke-dash-line stroke-2"
      ></path>
      <path
        id="sunsetLine"
        className=" stroke-gray-c2 stroke-dash-line stroke-2"
      ></path>
    </svg>
  );
};

export default SunsetSunriseChart;
