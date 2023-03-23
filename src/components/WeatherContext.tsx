import type { ReactNode } from "react";
import { createContext, useReducer } from "react";

const SET_LOCATION = "SET_LOCATION";

const initialState = {
  location: "",
};

type State = typeof initialState;

type ACTIONTYPE =
  | { type: typeof SET_LOCATION; payload: string }
  | { type: "DEFAULT" };

const reducer = (state: State, action: ACTIONTYPE) => {
  switch (action.type) {
    case SET_LOCATION:
      return { ...state, location: action.payload };
    default:
      throw new Error("Invalid action type");
  }
};

export const WeatherContext = createContext<{
  state: State;
  dispatch: React.Dispatch<ACTIONTYPE>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // ReturnType
  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};
