import { FC, HTMLAttributes } from "react";
import Search from "@/components/Search";

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className="h-24 w-full flex items-center border border-solid border-blue-100">
      <Search />
    </header>
  );
};

export default Header;
