"use client";

import { HTMLAttributes, forwardRef } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { useTheme } from "next-themes";

interface ThemeButtonProps {}

const ThemeButton = forwardRef<HTMLButtonElement, ThemeButtonProps>(
  ({}, ref) => {
    const { setTheme, theme } = useTheme();
    const onClick = () => {
      setTheme(theme === "dark" ? "light" : "dark");
    };
    console.log(theme);
    return (
      <Button onClick={onClick} ref={ref}>
        <Icon
          iconName="Moon"
          size="xsm"
          // absolute to make icons stack on each other
          className="absolute dark:opacity-0 transition-all"
        />
        <Icon
          iconName="Sun"
          size="xsm"
          className="opacity-0 dark:opacity-100 transition-all"
        />
      </Button>
    );
  }
);

ThemeButton.displayName = "ThemeButton";
export default ThemeButton;
