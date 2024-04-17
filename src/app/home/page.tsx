// 메인페이지
"use client";

import FindHospital from "@/components/home/FindHospital";
import HospitalListView from "@/components/home/HospitalListView";
import React from "react";
import MainPageReview from "@/components/home/MainPageReview";
import SelfTestWidget from "@/components/home/SelfTestWidget";
import HomeConsultList from "@/components/home/consult/HomeConsultList";

const HomePage = () => {
  return (
    <div className="flex flex-col w-[358px] mx-[16px] h-[1389px]">
      <HospitalListView />
      <FindHospital />
      <MainPageReview />
      <HomeConsultList />
      <SelfTestWidget />
    </div>
  );
};

export default HomePage;
