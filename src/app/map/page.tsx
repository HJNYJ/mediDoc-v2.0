// 병원 리스트 페이지
"use client";

import React, { Suspense } from "react";
import HospitalList from "@/components/map/hospitalList/HospitalList";
import TopNavbar from "@/components/layout/TopNavbar";

const HospitalListPage = () => {
  return (
    <section>
      <TopNavbar />
      <Suspense>
        <HospitalList />
      </Suspense>
    </section>
  );
};

export default HospitalListPage;
