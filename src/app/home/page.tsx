// 메인페이지
"use client";

import FindHospital from "@/components/home/FindHospital";
import HospitalListView from "@/components/home/HospitalListView";
import React from "react";
import TopNavbar from "@/components/layout/TopNavbar";

const HomePage = () => {
  return (
    <div className="flex flex-col w-[358px] mx-[16px] h-[1389px]">
      <TopNavbar />
      <HospitalListView />
      <FindHospital />
    </div>
  );
};

export default HomePage;
