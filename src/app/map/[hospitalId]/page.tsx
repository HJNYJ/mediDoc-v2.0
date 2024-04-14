// 병원 상세페이지
"use client";
import { supabase } from "@/api/supabase";
import HospitalInfoHeader from "@/components/map/HospitalInfoHeader";
import HospitalMainInfo from "@/components/map/HospitalMainInfo";
import ReviewList from "@/components/map/defaultTab/ReviewList";
import useDetailTabStore from "@/shared/zustand/detailTabStore";

import React from "react";

const HospitalDetailPage = ({ params }: { params: { hospitalId: string } }) => {
  const { selectedTab, selectTab } = useDetailTabStore();

  return (
    <main>
      <HospitalInfoHeader params={params} />
      <p>--------------------</p>
      <nav className="w-[390px]">
        <button
          className="bg-sky-500 mx-4"
          onClick={(e) => {
            e.preventDefault();
            selectTab("default");
          }}
        >
          기본정보
        </button>{" "}
        |{" "}
        <button
          className="bg-red-100 mx-4"
          onClick={(e) => {
            e.preventDefault();
            selectTab("image");
          }}
        >
          사진
        </button>{" "}
        |{" "}
        <button
          className="bg-amber-100 mx-4"
          onClick={(e) => {
            e.preventDefault();
            selectTab("review");
          }}
        >
          리뷰
        </button>
      </nav>
      <p>--------------------</p>

      <HospitalMainInfo selectedTab={selectedTab} />
      <ReviewList params={params} />
    </main>
  );
};

export default HospitalDetailPage;
