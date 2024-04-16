"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Page1 from "@/assets/landing/landing1.png";
import Page2 from "@/assets/landing/landing2.png";
import Page3 from "@/assets/landing/landing3.png";
import Page4 from "@/assets/landing/landing4.png";
import nextIcon from "@/assets/icons/nextIcon.png";

const images = [Page1, Page2, Page3, Page4];

export default function Home() {
  const [index, setIndex] = useState(0);
  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <main>
      <Image src={images[index]} alt={`Page ${index + 1}`} />
      {index === images.length - 1 ? (
        <Link
          href="/home"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8"
        >
          <p className="text-center semibold-20">Welcome!</p>
        </Link>
      ) : (
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 bottom-0 transform -translate-x-2 -translate-y-1/2 "
        >
          <Image
            src={nextIcon}
            alt="next button"
            className="w-[24px] h-[24px]"
          />
        </button>
      )}
    </main>
  );
}
