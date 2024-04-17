"use client";

import {
  getHospitalImages,
  getHospitalInfo,
  getReviewDetail
} from "@/api/supabase";
import Tab from "@/components/layout/Tabs";
import TopNavbar from "@/components/layout/TopNavbar";
import HospitalInfoHeader from "@/components/map/HospitalInfoHeader";
import Notice from "@/components/map/defaultTab/Notice";
import ProgramInfo from "@/components/map/defaultTab/ProgramInfo";
import ReviewImageList from "@/components/map/defaultTab/ReviewImageList";
import ReviewItem from "@/components/map/review/ReviewItem";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const HospitalDetailPage = ({ params }: { params: { hospitalId: string } }) => {
  console.log("params ===> ", params.hospitalId);
  const [selectedTab, setSelectedTab] = useState("default");
  const { data: reviewDetailData, refetch: refetchReviews } = useQuery({
    queryKey: ["reviewDetail", params.hospitalId],
    queryFn: () => getReviewDetail(params.hospitalId)
  });
  const { data: hospitalInfo, refetch: refetchHospitalInfo } = useQuery({
    queryKey: ["hospitalInfo", params.hospitalId],
    queryFn: () => getHospitalInfo(params.hospitalId)
  });
  const { data: hospitalImages, refetch: refetchHospitalImages } = useQuery({
    queryKey: ["hospitalImages", params.hospitalId],
    queryFn: () => getHospitalImages(params.hospitalId)
  });

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    switch (tab) {
      case "default":
        refetchHospitalInfo();
        break;
      case "image":
        refetchHospitalImages();
        break;
      case "review":
        refetchReviews();
        break;
    }
  };

  return (
    <main className="w-[390px] h-[2398px]">
      <TopNavbar />
      <HospitalInfoHeader params={params} />
      <nav className="w-[390px] flex justify-center py-2 mt-[26px] border-t-4">
        <Tab
          label="기본정보"
          active={selectedTab === "default"}
          onClick={() => handleTabClick("default")}
        />
        <Tab
          label="사진"
          active={selectedTab === "image"}
          onClick={() => handleTabClick("image")}
        />
        <Tab
          label="리뷰"
          active={selectedTab === "review"}
          onClick={() => handleTabClick("review")}
        />
        {/* <button
          className={`bg-sky-500 mx-4 ${selectedTab === "default" ? "bg-sky-500" : "bg-gray-200"}`}
          onClick={() => handleTabClick("default")}
        >
          기본정보
        </button>
        <button
          className={`bg-red-100 mx-4 ${selectedTab === "image" ? "bg-red-100" : "bg-gray-200"}`}
          onClick={() => handleTabClick("image")}
        >
          사진
        </button>
        |
        <button
          className={`bg-amber-100 mx-4 ${selectedTab === "review" ? "bg-amber-100" : "bg-gray-200"}`}
          onClick={() => handleTabClick("review")}
        >
          리뷰
        </button> */}
      </nav>

      {selectedTab === "default" && (
        <>
          <ProgramInfo />
          {/* <span>--------------</span> */}
          <Notice />
          <ReviewImageList />
          <ReviewItem hospitalId={params.hospitalId} />
        </>
      )}
      {selectedTab === "image" && <ReviewImageList />}
      {selectedTab === "review" && (
        <>
          <ReviewItem hospitalId={params.hospitalId} />
        </>
      )}
    </main>
  );
};

export default HospitalDetailPage;
