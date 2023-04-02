"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import { WeatherContextProvider } from "@/context/WeatherContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <WeatherContextProvider>{children}</WeatherContextProvider>
    </ThemeProvider>
  );
};

export default Providers;
