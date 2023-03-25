import { FC, HTMLAttributes } from "react";
import LocationSearch from "@/components/LocationSearch";

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className="max-h-12 h-auto w-full flex items-center overflow-hidden">
      <LocationSearch />
    </header>
  );
};

export default Header;
