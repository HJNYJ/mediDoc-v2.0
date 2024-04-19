// 병원 리스트 페이지
"use client";

import HospitalList from "@/components/map/hospitalList/HospitalList";
import React, { Suspense } from "react";
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
