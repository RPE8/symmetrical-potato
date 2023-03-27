"use client";

import { FC, HTMLAttributes, useContext, useState, useCallback } from "react";
import * as Form from "@radix-ui/react-form";
import z from "zod";

import useSWR from "swr";
import _ from "lodash";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { WeatherContext } from "@/context/WeatherContext";
import { setLocation, setSearchLocation } from "@/context/weatherActions";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";

interface LocationSearchProps extends HTMLAttributes<HTMLElement> {}

const locationApiKey = process.env.NEXT_PUBLIC_LOCATION_API_KEY;

const locationsSchema = z.array(
  z.object({
    name: z.string(),
    country: z.string(),
  })
);

type SuggestionLocation = z.TypeOf<typeof locationsSchema>[number] & {
  id: string;
};
type SuggestionLocations = SuggestionLocation[];

const LocationSearch: FC<LocationSearchProps> = () => {
  const [suggestions, setSuggestions] = useState<SuggestionLocations>([]);
  const [searchString, setSearchString] = useState<string>("");
  const { state, dispatch } = useContext(WeatherContext);

  const fetcher = useCallback(
    (url: string) =>
      fetch(url).then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          const error = new Error("An error occurred while fetching the data.");
          return Promise.reject(error);
        }
        return _.uniqBy(
          locationsSchema.parse(data).map((location) => ({
            ...location,
            id: `${location.name}-${location.country}`,
          })),
          "id"
        );
      }),
    []
  );

  const data = _.uniqBy(
    locationsSchema
      .parse([
        {
          name: "Lond",
          lat: 25.584911,
          lon: 76.6395092,
          country: "IN",
          state: "Madhya Pradesh",
        },
        {
          name: "Fossvogur",
          local_names: { is: "Fossvogur" },
          lat: 64.1202709,
          lon: -21.8722472,
          country: "IS",
        },
        { name: "Lönd", lat: 64.1694796, lon: -21.6770985, country: "IS" },
        { name: "Lönd", lat: 64.8292796, lon: -13.8293999, country: "IS" },
      ])
      .map((location) => ({
        ...location,
        id: `${location.name}-${location.country}`,
      })),
    "id"
  );

  if (!suggestions.length) setSuggestions(data);

  //   const { data, error } = useSWR(
  //     `https://api.openweathermap.org/geo/1.0/direct?q=${searchString}&limit=5&appid=${locationApiKey}`,
  //     fetcher,
  //     {
  //       revalidateOnFocus: false,
  //       revalidateOnReconnect: false,
  //       revalidateOnMount: false,
  //       revalidateIfStale: false,
  //       refreshInterval: 0,
  //       onSuccess: (data) => {
  //         setSuggestions(data);
  //       },
  //     }
  //   );

  return (
    <WeatherBlockContainer className="items-stretch w-full h-12">
      <Form.Root className="flex h-full">
        <Form.Field className="flex-grow" name="location">
          <Form.Label className="sr-only">Search location</Form.Label>
          <div className="flex items-center justify-center w-full h-full">
            <Form.Control asChild>
              <Input
                fullWidth={true}
                placeholder="Enter a location"
                required
                value={searchString ?? ""}
                onChange={(event) => {
                  event.preventDefault();
                  setSearchString(event.target.value);
                }}
                suggestions={suggestions}
                onSuggestionClick={(suggestion) => {
                  dispatch(setLocation(suggestion.name));
                  setSearchString(suggestion.name);
                }}
              />
            </Form.Control>
            <Form.Submit asChild>
              <Button size="sm">
                <Icon iconName="Search" size="xsm" />
              </Button>
            </Form.Submit>
          </div>
        </Form.Field>
      </Form.Root>
    </WeatherBlockContainer>
  );
};

export default LocationSearch;
