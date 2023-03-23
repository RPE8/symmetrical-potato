"use client";

import type { FC, ReactNode } from "react";

import { WeatherProvider } from "@/components/WeatherContext";

const Providers = ({ children }: { children: ReactNode }) => {
  return <WeatherProvider>{children}</WeatherProvider>;
};

export default Providers;
