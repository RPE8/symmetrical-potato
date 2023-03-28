import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";

import HeaderContent from "@/components/HeaderContent";
import MainContent from "@/components/MainContent";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="container mx-auto py-11 px-6 max-w-screen-md">
      <HeaderContent />
      <MainContent />
    </div>
  );
}
