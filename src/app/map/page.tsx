// 병원 리스트 페이지
"use client";

import HospitalList from "@/components/map/hospitalList/HospitalList";
import React from "react";
import TopNavbar from "@/components/layout/TopNavbar";

const HospitalListPage = () => {
  return (
    <main className="w-[390px] h-[844px]">
      <section className="mx-[16px]">
        <TopNavbar />
        <HospitalList />
      </section>
    </main>
  );
};

export default HospitalListPage;
