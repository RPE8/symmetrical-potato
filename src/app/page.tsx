import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

import Navbar from "@/components/Header";
import Main from "@/components/Main";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container mx-auto py-11 px-6">
      <Navbar />
      <Main />
    </div>
  );
}
