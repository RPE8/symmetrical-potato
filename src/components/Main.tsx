"use client";

import { FC, HTMLAttributes, useState } from "react";

import WeatherInfoMain from "@/components/WeatherMainInfoBlock";
import WeatherInfoAdditional from "@/components/WeatherAdditionaInfoBlock";

interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: FC<MainProps> = ({}) => {
  const [text, setText] = useState("");

  return (
    <main>
      <section>
        <WeatherInfoMain
          weather="sunny"
          temperature={0}
          temperatureUnit="C"
          location="My location"
        />
      </section>
      <section>
        <WeatherInfoAdditional
          date={new Date()}
          humidityPercent={5}
          precipitationPercent={50}
          windSpeed={10}
        />
      </section>
    </main>
  );
};

export default Main;
