// 상단 내비게이션 바
"use client";

import React from "react";
import PageCancel from "./PageCancel";
import { useRouter } from "next/navigation";
import PagebackBtn from "./PageBackBtn";

interface TopNavbarProps {
  title?: string | null;
  goToPreviousPage?: () => void | null;
}

const TopNavbar = ({ title, goToPreviousPage }: TopNavbarProps) => {
  const router = useRouter();
  const goTopHomePage = () => {
    router.push("/home");
  };

  return (
    <section className="flex flex-row h-[50px] items-center justify-between z-50">
      <button
        onClick={goTopHomePage}
        className="flex items-center w-[24px] h-[24px]"
      >
        <PagebackBtn />
      </button>
      <span className="flex items-center text-center w-[225px] h-[21px] semibold-18 ml-auto">
        {title}
      </span>
      {goToPreviousPage && (
        <button
          onClick={goToPreviousPage}
          className="flex items-center mr-[13px]"
        >
          <PageCancel />
        </button>
      )}
    </section>
  );
};

export default TopNavbar;
