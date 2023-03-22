import { FC, HTMLAttributes } from "react";

interface HeaderProps extends HTMLAttributes<HTMLElement> {}

const Header: FC<HeaderProps> = ({ children }) => {
  return (
    <header className="h-24 w-full flex items-center justify-between">
      <div>
        <span>Logo</span>
      </div>
      <div className="flex justify-between gap-6">
        <span>Settings</span>
        <span>Theme</span>
      </div>
    </header>
  );
};

export default Header;
