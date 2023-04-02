import * as d3 from "d3";
import _ from "lodash";
import type { Weather } from "@/utils/constants";
import { startOfDay, endOfDay, format } from "date-fns";
import getMedianDate from "@/utils/medianDate";
import React, { useRef, useEffect, useState, useCallback } from "react";
import WeatherIcon from "@/components/ui/WeatherIcon";
import interpolateY from "@/utils/interpolateTimeToLinear";
import defaultToCurveCoordinates from "@/utils/defaultToCurveCoordinates";

interface SunsetSunriseChartProps {
  sunsetDateMs: number;
  sunriseDateMs: number;
  currentDateMs: number;
  weather: Weather;
}

const margin = { top: 40, right: 0, bottom: 40, left: 0 };

const SunsetSunriseChart = ({
  sunsetDateMs,
  sunriseDateMs,
  currentDateMs,
  weather,
}: SunsetSunriseChartProps) => {
  const [size, setSize] = useState([0, 0]);
  const svgRef = useRef<SVGSVGElement>(null);

  const placeSunsetSunrise = useCallback(
    ({
      svg,
      xScale,
      yScale,
      timeSelector,
      textSelector,
      groupSelector,
      date,
      highest,
    }: {
      svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
      xScale: d3.ScaleTime<number, number, never>;
      yScale: d3.ScaleLinear<number, number, never>;
      timeSelector: string;
      textSelector: string;
      groupSelector: string;
      date: Date;
      highest: number;
    }) => {
      const time = svg.select<SVGTextElement>(timeSelector);
      if (!time) return;
      const timeNode = time.node();
      if (!timeNode) return;
      const timeBounds = timeNode.getBBox();

      time
        .attr("x", xScale(date) - timeBounds.width / 2)
        .attr("y", yScale(highest));

      const text = svg.select<SVGTextElement>(textSelector);
      if (!text) return;
      const textNode = text.node();
      if (!textNode) return;
      const textBounds = textNode.getBBox();

      text
        .attr("x", xScale(date) - textBounds.width / 2)
        .attr("y", yScale(highest) - textBounds.height);

      svg.select(groupSelector).attr("transform", "translate(0, -10)");
    },
    []
  );

  const handleResize = useCallback(() => {
    if (svgRef.current) {
      const svgBounds = svgRef.current.getBoundingClientRect();

      setSize([svgBounds.width, svgBounds.height]);
    }
  }, []);

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }
    const svgBounds = svgRef.current.getBoundingClientRect();
    const svg = d3.select(svgRef.current);
    if (!svg) return;
    if (svgBounds.width !== size[0] || svgBounds.height !== size[1]) {
      handleResize();
      return;
    }

    window.addEventListener("resize", handleResize);

    const width = size[0];
    const height = size[1];

    const xRange: [number, number] = [0, width];
    const yRange: [number, number] = [height - margin.bottom, margin.top];

    const startDate = startOfDay(currentDateMs);
    const endDate = endOfDay(currentDateMs);
    const sunriseDate = new Date(sunriseDateMs);
    const sunsetDate = new Date(sunsetDateMs);
    const currentDate = new Date(currentDateMs);

    const xDomain: [Date, Date] = [startDate, endDate];
    const domainHighest = 100;
    const domainLowest = -100;

    const sunriseHighest = domainHighest;
    const sunriseLowest = domainLowest;
    const sunsetHighest = domainHighest;

    const medianStartSunrise = getMedianDate(startDate, sunriseDate);
    const medianSunriseSunset = getMedianDate(sunriseDate, sunsetDate);
    const medianSunsetEnd = getMedianDate(sunsetDate, endDate);

    const yDomain: [number, number] = [domainLowest, domainHighest];

    type DataPoint = {
      x: Date;
      y: number;
    };

    const sunriseLineData: DataPoint[] = [
      {
        x: sunriseDate,
        y: 0,
      },
      {
        x: sunriseDate,
        y: sunriseHighest,
      },
    ];
    const sunsetLineData: DataPoint[] = [
      {
        x: sunsetDate,
        y: 0,
      },
      {
        x: sunsetDate,
        y: sunsetHighest,
      },
    ];
    const horizontalLineData: DataPoint[] = [
      {
        x: startDate,
        y: 0,
      },
      {
        x: endDate,
        y: 0,
      },
    ];
    const startToSunriseData: DataPoint[] = [
      {
        x: startDate,
        y: 0,
      },
      {
        x: medianStartSunrise,
        y: sunriseLowest,
      },
      {
        x: sunriseDate,
        y: 0,
      },
    ];
    const sunriseToSunsetData: DataPoint[] = [
      {
        x: sunriseDate,
        y: 0,
      },
      {
        x: medianSunriseSunset,
        y: sunriseHighest,
      },
      {
        x: sunsetDate,
        y: 0,
      },
    ];
    const sunsetToEndData: DataPoint[] = [
      {
        x: sunsetDate,
        y: 0,
      },
      {
        x: medianSunsetEnd,
        y: sunriseLowest,
      },
      {
        x: endDate,
        y: 0,
      },
    ];

    const allData = _.uniqBy(
      [...startToSunriseData, ...sunriseToSunsetData, ...sunsetToEndData],
      (d) => d.x.getTime()
    );

    const bisectDate = d3.bisector<DataPoint, Date>((d) => d.x).left;
    const leftIndex = bisectDate(allData, currentDate);
    const leftObject = allData[leftIndex - 1];
    const rightObject = allData[leftIndex];

    const xGetter = (d: DataPoint) => d.x;
    const yGetter = (d: DataPoint) => d.y;

    const xScale = d3.scaleTime().domain(xDomain).range(xRange);
    const yScale = d3.scaleLinear().domain(yDomain).range(yRange);

    const area = d3
      .area<DataPoint>()
      .curve(d3.curveCatmullRom.alpha(0.5))
      .x((d) => xScale(xGetter(d)))
      .y0(yScale(0))
      .y1((d) => yScale(yGetter(d)));

    const line = d3
      .line<DataPoint>()
      .x((d) => xScale(xGetter(d)))

      .y((d) => yScale(yGetter(d)));

    svg.select("#startToSunrise").datum(startToSunriseData).attr("d", area);
    svg.select("#sunriseToSunset").datum(sunriseToSunsetData).attr("d", area);
    svg.select("#sunsetToEnd").datum(sunsetToEndData).attr("d", area);
    svg.select("#horizontalLine").datum(horizontalLineData).attr("d", line);
    svg.select("#sunriseLine").datum(sunriseLineData).attr("d", line);
    svg.select("#sunsetLine").datum(sunsetLineData).attr("d", line);

    // Placenment of sunriseDateMs time and text
    placeSunsetSunrise({
      svg,
      xScale,
      yScale,
      timeSelector: "#sunriseTime",
      textSelector: "#sunriseDateMs",
      groupSelector: "#sunriseDateMs-g",
      date: sunriseDate,
      highest: sunriseHighest,
    });

    // Placenment of sunsetDateMs time and text
    placeSunsetSunrise({
      svg,
      xScale,
      yScale,
      timeSelector: "#sunsetTime",
      textSelector: "#sunsetDateMs",
      groupSelector: "#sunsetDateMs-g",
      date: sunsetDate,
      highest: sunsetHighest,
    });

    const horizon = svg.select<SVGTextElement>("#horizon");
    if (horizon) {
      const horizonNode = horizon.node();
      if (horizonNode) {
        const horizonBounds = horizonNode.getBBox();
        horizon.attr(
          "transform",
          `translate(${width - horizonBounds.width}, ${yScale(0) - 10})`
        );
      }
    }

    const interpolatedY = interpolateY({
      leftObject,
      rightObject,
      xValue: currentDateMs,
    });

    let pathSelection: d3.Selection<
      SVGSVGElement,
      unknown,
      null,
      undefined
    > | null = null;
    if (currentDateMs < sunriseDateMs) {
      pathSelection = svg.select("#startToSunrise");
    } else if (currentDateMs < sunsetDateMs) {
      pathSelection = svg.select("#sunriseToSunset");
    } else {
      pathSelection = svg.select("#sunsetToEnd");
    }

    if (pathSelection) {
      const curvedCoordinates = defaultToCurveCoordinates({
        pathSelection: pathSelection,
        xScale,
        yScale,
        y: interpolatedY,
        x: currentDate,
      });

      if (!curvedCoordinates) return;

      const currentIconSelection = svg.select<SVGGElement>("#currentIcon");

      if (!currentIconSelection) return;

      const currentIcon = currentIconSelection.node();
      if (!currentIcon) return;

      const currentIconBounds = currentIcon.getBBox();

      currentIconSelection.attr(
        "transform",
        `translate(${curvedCoordinates[0] - currentIconBounds.width / 2}, ${
          curvedCoordinates[1] - currentIconBounds.height / 2
        })`
      );
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    sunsetDateMs,
    sunriseDateMs,
    currentDateMs,
    handleResize,
    size,
    placeSunsetSunrise,
  ]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${size[0]} ${size[1]}`}
    >
      <g id="sunriseDateMs-g">
        <text id="sunriseDateMs" className="text-sm fill-gray-c2">
          Sunrise
        </text>
        <text id="sunriseTime" className="text-md fill-gray-c3">
          {format(sunriseDateMs, "hh:mm a")}
        </text>
      </g>
      <g id="sunsetDateMs-g">
        <text id="sunsetDateMs" className="text-sm fill-gray-c2">
          Sunset
        </text>
        <text id="sunsetTime" className="text-md fill-gray-c3">
          {format(sunsetDateMs, "hh:mm a")}
        </text>
      </g>
      <text id="horizon" className="text-sm fill-gray-c2">
        Horizon
      </text>
      <path
        id="startToSunrise"
        className="fill-blue-900 dark:fill-[#3b4c77]"
      ></path>
      <path
        id="sunriseToSunset"
        className=" fill-blue-300 dark:fill-[#3c6baf]"
      ></path>
      <path
        id="sunsetToEnd"
        className="fill-blue-900 dark:fill-[#3b4c77]"
      ></path>
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
      <g id="currentIcon">
        <WeatherIcon weather={weather} variant="filled" />
      </g>
    </svg>
  );
};

export default SunsetSunriseChart;
