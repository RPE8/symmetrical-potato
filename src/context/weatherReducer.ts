import { WeatherActionTypes } from "@/context/actionTypeConstants";
import { WeatherAction } from "@/context/weatherActions";

export interface WeatherState {
  location: string;
  searchLocation: string;
  weatherData: any;
}

const initialState: WeatherState = {
  location: "London",
  searchLocation: "London",
  weatherData: {},
};

export const weatherReducer = (
  state: WeatherState = initialState,
  action: WeatherAction
): WeatherState => {
  switch (action.type) {
    case WeatherActionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case WeatherActionTypes.SET_SEARCH_LOCATION:
      return {
        ...state,
        searchLocation: action.payload,
      };
    default:
      return state;
  }
};
