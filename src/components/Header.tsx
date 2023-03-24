import { FC, HTMLAttributes } from "react";
import LocationSearch from "@/components/LocationSearch";

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className="h-14 w-full flex items-center border border-solid border-blue-100">
      <LocationSearch />
    </header>
  );
};

export default Header;
