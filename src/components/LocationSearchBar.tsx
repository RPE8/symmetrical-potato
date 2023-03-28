"use client";

import {
  HTMLAttributes,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
} from "react";
import * as Form from "@radix-ui/react-form";

import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { WeatherContext } from "@/context/WeatherContext";
import { setLocation, setSearchLocation } from "@/context/weatherActions";
import WeatherBlockContainer from "@/components/WeatherBlockContainer";
import useLocations from "@/hooks/useLocations";

interface LocationSearchProps extends HTMLAttributes<HTMLElement> {}

const LocationSearch = ({}: LocationSearchProps) => {
  const [searchString, setSearchString] = useState<string>("");
  const [debouncedSearchString, setDebouncedSearchString] =
    useState<string>("");
  const { state, dispatch } = useContext(WeatherContext);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const loadLocationOrSkip =
    debouncedSearchString.length > 2 && debouncedSearchString !== "";

  const {
    data: suggestions = [],
    isError,
    isLoading,
  } = useLocations(loadLocationOrSkip ? debouncedSearchString : null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchString(searchString);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchString]);

  if (isError) {
    console.error(isError);
  }

  const handleSearchStringChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchString(event.target.value);
    },
    []
  );

  const handleSuggestionsClick = useCallback(
    (suggestion: string) => {
      searchInputRef.current?.blur();
      dispatch(setLocation(suggestion));
      setSearchString(suggestion);
    },
    [dispatch]
  );

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

          dispatch(setLocation(searchString));
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
                onChange={handleSearchStringChange}
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
