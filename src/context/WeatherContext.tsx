import { createContext, Dispatch, useReducer } from "react";
import { weatherReducer, WeatherState } from "@/context/weatherReducer";
import { WeatherAction } from "@/context/weatherActions";

interface WeatherContextProps {
  state: WeatherState;
  dispatch: Dispatch<WeatherAction>;
}

export const WeatherContext = createContext<WeatherContextProps>({
  state: { searchLocation: "", weatherData: null, location: "" },
  dispatch: () => {},
});

export const WeatherContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(weatherReducer, {
    searchLocation: "",
    weatherData: null,
    location: "",
  });

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};
