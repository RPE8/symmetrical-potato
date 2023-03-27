import { HTMLAttributes } from "react";
import LocationSearch from "@/components/LocationSearchBar";

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header = ({}: HeaderProps) => {
  return (
    <header className="max-h-12 h-auto w-full flex items-center">
      <LocationSearch />
    </header>
  );
};

export default Header;
