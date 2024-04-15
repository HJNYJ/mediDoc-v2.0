"use client";

import { useState } from "react";
import Page1 from "@/assets/landing/landing1.png";
import Page2 from "@/assets/landing/landing2.png";
import Page3 from "@/assets/landing/landing3.png";
import Page4 from "@/assets/landing/landing4.png";
import Image from "next/image";

const images = [Page1, Page2, Page3, Page4];

export default function Home() {
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <main>
      <Image src={images[index]} alt={`Page ${index + 1}`} />
      <button onClick={handleNext}>다음</button>
    </main>
  );
}
