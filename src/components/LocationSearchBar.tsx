"use client";

import {
  FC,
  HTMLAttributes,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import * as Form from "@radix-ui/react-form";
import z from "zod";

import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { WeatherContext } from "@/context/WeatherContext";
import { setLocation, setSearchLocation } from "@/context/weatherActions";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";
import useLocations from "@/hooks/useLocations";

interface LocationSearchProps extends HTMLAttributes<HTMLElement> {}

const LocationSearch: FC<LocationSearchProps> = () => {
  const [searchString, setSearchString] = useState<string>("");
  const { state, dispatch } = useContext(WeatherContext);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const loadLocationOrSkip =
    searchString.length > 2 &&
    searchString !== "" &&
    searchString !== state.location;
  const {
    data: suggestions = [],
    isError,
    isLoading,
  } = useLocations(loadLocationOrSkip ? searchString : null);

  //   const data = _.uniqBy(
  //     locationsSchema
  //       .parse([
  //         {
  //           name: "Lond",
  //           lat: 25.584911,
  //           lon: 76.6395092,
  //           country: "IN",
  //           state: "Madhya Pradesh",
  //         },
  //         {
  //           name: "Fossvogur",
  //           local_names: { is: "Fossvogur" },
  //           lat: 64.1202709,
  //           lon: -21.8722472,
  //           country: "IS",
  //         },
  //         { name: "Lönd", lat: 64.1694796, lon: -21.6770985, country: "IS" },
  //         { name: "Lönd", lat: 64.8292796, lon: -13.8293999, country: "IS" },
  //       ])
  //       .map((location) => ({
  //         ...location,
  //         id: `${location.name}-${location.country}`,
  //       })),
  //     "id"
  //   );

  if (isError) {
    console.error(isError);
  }

  return (
    <WeatherBlockContainer className="items-stretch w-full h-12">
      <Form.Root
        className="flex h-full"
        onSubmit={(event) => {
          event.preventDefault();
          // I don't know how to blur the input field here in another way because of Radix UI
          //   As far as I understand, Radix UI asChild requires a ref to be passed to the child component
          //   and that's why I can't use useImperativeHandle to get required methods from the child component
          searchInputRef.current?.blur();
          if (
            suggestions.find((suggestion) => suggestion.name === searchString)
          ) {
            dispatch(setLocation(searchString));
          }
        }}
      >
        <Form.Field className="flex-grow" name="location">
          <Form.Label className="sr-only">Search location</Form.Label>
          <div className="flex items-center justify-center w-full h-full">
            <Form.Control asChild>
              <Input
                ref={searchInputRef}
                isLoading={isLoading && loadLocationOrSkip}
                fullWidth={true}
                placeholder="Enter a location"
                required
                value={searchString ?? ""}
                onChange={(event) => {
                  event.preventDefault();
                  const { value } = event.target;
                  setSearchString(value);
                }}
                suggestions={suggestions}
                onSuggestionClick={(suggestion) => {
                  searchInputRef.current?.blur();
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
