import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

import Navbar from "@/components/Header";
import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container mx-auto p-2 border-8 border-solid border-white-300 rounded-3xl">
      <Navbar />
      <Main />
    </div>
  );
}
