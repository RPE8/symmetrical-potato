import { FC } from "react";

interface WeatherInfoBlockContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}
const WeatherInfoBlockContainer = ({
  children,
  ...props
}: WeatherInfoBlockContainerProps) => {
  const { className, ...rest } = props;
  return (
    <div
      className={`flex flex-col bg-block-info rounded-2xl px-5 my-3 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default WeatherInfoBlockContainer;
