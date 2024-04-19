"use client";
// 상담 섹션 div
import React from "react";
import HomeConsultItem from "./HomeConsultItem";
import { useRouter } from "next/navigation";

const HomeConsultList = () => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push("https://medi-doc-three.vercel.app/consult");
  };
  return (
    <section className="relative mt-[30px]">
      <div className="flex justify-between mb-[16px]">
        <p className=" bold-18">실시간 상담</p>
        <button onClick={handleViewAll} className="regular-13 text-gray-700">
          전체 보기
        </button>
      </div>
      <HomeConsultItem />
    </section>
  );
};

export default HomeConsultList;
