"use client";

import { FC, HTMLAttributes, useState } from "react";

interface MainProps extends HTMLAttributes<HTMLElement> {}

const Main: FC<MainProps> = ({}) => {
  const [text, setText] = useState("");

  return <main></main>;
};

export default Main;
