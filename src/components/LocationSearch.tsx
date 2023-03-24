"use client";

import { FC, HTMLAttributes, useContext, useState } from "react";
import * as Form from "@radix-ui/react-form";
import { Icons } from "@/components/Icons";
import Input from "@/components/ui/Input";
import { WeatherContext } from "@/components/WeatherContext";

interface LocationSearchProps extends HTMLAttributes<HTMLElement> {}

const LocationSearch: FC<LocationSearchProps> = () => {
  const { state, dispatch } = useContext(WeatherContext);
  const [showError, setShowError] = useState<boolean>(false);
  return (
    <Form.Root>
      <Form.Field className="grid grid-rows-2" name="location">
        <div className="flex justify-between">
          <Form.Message className=" flex-grow" match="valueMissing" />
          <Form.Label className="sr-only">Search location</Form.Label>
        </div>
        <div className="flex justify-between">
          <Form.Control asChild>
            <Input
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
            <button>
              <Icons.Search />
            </button>
          </Form.Submit>
        </div>
      </Form.Field>
    </Form.Root>
  );
};

export default LocationSearch;
