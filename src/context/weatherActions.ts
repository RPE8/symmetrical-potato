import { WeatherActionTypes } from "@/context/actionTypeConstants";

interface SetLocation {
  type: typeof WeatherActionTypes.SET_LOCATION;
  payload: string;
}

interface SetSearchLocation {
  type: typeof WeatherActionTypes.SET_SEARCH_LOCATION;
  payload: string;
}

interface SetWeatherData {
  type: typeof WeatherActionTypes.SET_WEATHER_DATA;
  payload: any;
}

export type WeatherAction = SetLocation | SetSearchLocation;

export const setLocation = (location: string): SetLocation => ({
  type: WeatherActionTypes.SET_LOCATION,
  payload: location,
});

export const setSearchLocation = (location: string): SetSearchLocation => ({
  type: WeatherActionTypes.SET_SEARCH_LOCATION,
  payload: location,
});

export const setWeatherData = (data: any): SetWeatherData => ({
  type: WeatherActionTypes.SET_WEATHER_DATA,
  payload: data,
});
