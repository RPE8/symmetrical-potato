import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const WeatherBlockContainerVariants = cva(
  "flex flex-col bg-gray-c1 rounded-2xl px-5 py-2 my-3 ",
  {
    variants: {
      loading: {
        true: "animate-pulse bg-gray-c2 rounded-md h-32",
      },
    },
    defaultVariants: {
      loading: false,
    },
  }
);

interface WeatherInfoBlockContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof WeatherBlockContainerVariants> {}
const WeatherBlockContainer = ({
  children,
  loading,
  ...props
}: WeatherInfoBlockContainerProps) => {
  const { className, ...rest } = props;
  const classes = twMerge(
    WeatherBlockContainerVariants({ loading }),
    className
  );
  return (
    <div className={classes} {...rest}>
      {loading ? null : children}
    </div>
  );
};

export default WeatherBlockContainer;
