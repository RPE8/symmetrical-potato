"use client";

import { FC, HTMLAttributes, useState } from "react";
import Search from "@/components/ui/Search";

interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: FC<MainProps> = ({}) => {
  const [text, setText] = useState("");

  return (
    <main>
      <Search text={text} onSearch={setText} />
    </main>
  );
};

export default Main;
