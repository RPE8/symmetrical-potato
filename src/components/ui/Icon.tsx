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

// Make sure all Icons are imported from lucide-react
// and that they are added to the Icons object
export type Icon = LucideIcon;
export type IconName =
  | "Cloudy"
  | "Search"
  | "Sun"
  | "CloudRain"
  | "CloudSnow"
  | "CloudFog"
  | "CloudLightning"
  | "CloudDrizzle";
export type Icons = Record<IconName, Icon>;

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

export const sizes = {
  "2xsm": "w-4 h-4",
  xsm: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20",
  "2xl": "w-24 h-24",
  "3xl": "w-32 h-32",
};

const iconVariants = cva("", {
  variants: {
    size: sizes,
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
  if (!(iconName in Icons)) {
    throw new Error(`Invalid icon name: ${iconName}`);
  }
  const mergedClassName = twMerge(iconVariants({ size }), className);

  const Icon = Icons[iconName];
  return <Icon className={mergedClassName} {...props} />;
}
