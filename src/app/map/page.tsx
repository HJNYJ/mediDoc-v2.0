// 병원 리스트 페이지
// Server Component로 만들기
// "use client";
"use server";

import React, { Suspense } from "react";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HospitalList from "@/components/map/hospitalList/HospitalList";
import TopNavbar from "@/components/layout/TopNavbar";
import { fetchHospitalList } from "@/hooks/getHospitalData";

const HospitalListPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["hospitalInfo"],
    queryFn: () => fetchHospitalList
  });

  return (
    <section>
      <TopNavbar />
      <HydrationBoundary>
        <Suspense>
          <HospitalList />
        </Suspense>
      </HydrationBoundary>
    </section>
  );
};

export default HospitalListPage;
