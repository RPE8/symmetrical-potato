import { FC } from "react";

interface WeatherInfoBlockContainerProps {
  children: React.ReactNode;
}

const WeatherInfoBlockContainer = ({
  children,
}: WeatherInfoBlockContainerProps) => {
  return <div className="bg-block-info">{children}</div>;
};

export default WeatherInfoBlockContainer;
