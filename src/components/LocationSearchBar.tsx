"use client";

import { FC, HTMLAttributes, useContext, useState } from "react";
import * as Form from "@radix-ui/react-form";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { WeatherContext } from "@/context/WeatherContext";
import { setSearchLocation } from "@/context/weatherActions";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";

interface LocationSearchProps extends HTMLAttributes<HTMLElement> {}

const LocationSearch: FC<LocationSearchProps> = () => {
  const { state, dispatch } = useContext(WeatherContext);
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
                value={state.searchLocation ?? ""}
                onChange={(event) => {
                  event.preventDefault();
                  dispatch(setSearchLocation(event.target.value));
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
