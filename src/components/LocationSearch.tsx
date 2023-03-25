"use client";

import { FC, HTMLAttributes, useContext, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Icons } from "@/components/Icons";
import Input from "@/components/ui/Input";
import { WeatherContext } from "@/components/WeatherContext";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";

interface LocationSearchProps extends HTMLAttributes<HTMLElement> {}

const LocationSearch: FC<LocationSearchProps> = () => {
  const { state, dispatch } = useContext(WeatherContext);
  return (
    <WeatherBlockContainer className="items-stretch w-full h-12">
      <Form.Root className="flex h-full">
        <Form.Field className="flex-grow" name="location">
          <Form.Label className="sr-only">Search location</Form.Label>
          <div className="flex items-center justify-center w-full h-full p-1">
            <Form.Control asChild>
              <Input
                className="placeholder:text-label-description bg-transparent flex-grow h-full font-weight-400 focus-visible:outline-none text-base font-normal"
                placeholder="Enter a location"
                required
                value={state.locationSearch ? state.locationSearch : ""}
                onChange={(event) => {
                  event.preventDefault();
                  dispatch({
                    type: "SET_LOCATION",
                    payload: event.target.value,
                  });
                }}
              />
            </Form.Control>
            <Form.Submit asChild>
              <button className="flex items-center justify-center h-5 w-5">
                <Icons.Search className="stroke-label-description" />
              </button>
            </Form.Submit>
          </div>
        </Form.Field>
      </Form.Root>
    </WeatherBlockContainer>
  );
};

export default LocationSearch;
