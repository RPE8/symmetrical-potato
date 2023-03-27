import { SVGAttributes } from "react";
import { cva, VariantProps } from "class-variance-authority";
import {
  Cloudy,
  Search,
  Sun,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  CloudDrizzle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

export type Icon = LucideIcon;
export const Icons = {
  Cloudy,
  CloudRain,
  CloudSnow,
  Sun,
  Search,
  CloudFog,
  CloudLightning,
  CloudDrizzle,
};

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16",
      xl: "w-20 h-20",
      "2xl": "w-24 h-24",
      "3xl": "w-32 h-32",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface IconProps
  extends SVGAttributes<SVGElement>,
    VariantProps<typeof iconVariants> {
  iconName: keyof typeof Icons;
}

export default function Icon({
  className,
  size,
  iconName,
  ...props
}: IconProps) {
  const iconClass = twMerge(iconVariants({ size }));

  switch (iconName) {
    case "Sun":
      return <Sun className={twMerge(iconClass, className)} {...props} />;
    case "Cloudy":
      return <Cloudy className={twMerge(iconClass, className)} {...props} />;
    case "CloudRain":
      return <CloudRain className={twMerge(iconClass, className)} {...props} />;
    case "CloudSnow":
      return <CloudSnow className={twMerge(iconClass, className)} {...props} />;
    case "CloudFog":
      return <CloudFog className={twMerge(iconClass, className)} {...props} />;
    case "CloudLightning":
      return (
        <CloudLightning className={twMerge(iconClass, className)} {...props} />
      );
    case "CloudDrizzle":
      return (
        <CloudDrizzle className={twMerge(iconClass, className)} {...props} />
      );
    case "Search":
      return <Search className={twMerge(iconClass, className)} {...props} />;
    default: {
      const exhaustiveCheck: never = iconName;
      throw new Error(exhaustiveCheck);
    }
  }
}
