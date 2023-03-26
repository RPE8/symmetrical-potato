"use client";

import type { ReactNode } from "react";

import { WeatherContextProvider } from "@/context/WeatherContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <WeatherContextProvider>{children}</WeatherContextProvider>;
};

export default Providers;
