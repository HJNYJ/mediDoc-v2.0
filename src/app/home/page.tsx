// 메인페이지
"use client";

import FindHospital from "@/components/home/FindHospital";
import HospitalListView from "@/components/home/HospitalListView";
import React from "react";
import HomeConsultList from "@/components/home/consult/HomeConsultList";
import HomeConsultItem from "@/components/home/consult/HomeConsultItem";

const HomePage = () => {
  return (
    <div className="flex flex-col w-[358px] mx-[16px] h-[1389px]">
      <HospitalListView />
      <FindHospital />
      <HomeConsultList />
      <HomeConsultItem />
    </div>
  );
};

export default HomePage;
