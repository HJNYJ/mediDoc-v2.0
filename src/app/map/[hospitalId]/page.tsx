"use client";

import {
  fetchReviewImages,
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
import ReviewList from "@/components/map/defaultTab/ReviewList";
import ReviewItem from "@/components/map/review/ReviewItem";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const HospitalDetailPage = ({ params }: { params: { hospitalId: string } }) => {
  // console.log("params ===> ", params.hospitalId);
  const [selectedTab, setSelectedTab] = useState("default");
  const { data: reviewDetailData, refetch: refetchReviews } = useQuery({
    queryKey: ["reviewDetailList", params.hospitalId],
    queryFn: () => getReviewDetail(params.hospitalId)
  });
  const { data: hospitalInfo, refetch: refetchHospitalInfo } = useQuery({
    queryKey: ["hospitalInformation", params.hospitalId],
    queryFn: () => getHospitalInfo(params.hospitalId)
  });
  const { data: hospitalImages, refetch: refetchHospitalImages } = useQuery({
    queryKey: ["hospitalFetchImages", params.hospitalId],
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

  const {
    data: reviewPhotos,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewFetchPhotos"],
    queryFn: fetchReviewImages
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

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
      </nav>

      {selectedTab === "default" && (
        <>
          <ProgramInfo />
          {/* <span>--------------</span> */}
          <Notice />
          <h3 className="bold-18 mb-3">방문자 사진</h3>
          <article className="inline-grid grid-cols-3 gap-2">
            {reviewPhotos
              ?.slice(0, 6)
              .map((img, index) => (
                <img
                  key={img?.photo_id}
                  src={img?.photos}
                  alt={`사진${index + 1}`}
                  className="w-[116.67px] h-[116px] rounded-[10px]"
                />
              ))}
          </article>

          <div className="mt-3 flex flex-col align-items">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSelectedTab("image");
              }}
              className="border border-gray-300 text-gray-800 w-[358px] h-[50px] mt-3 rounded-lg"
            >
              전체보기
            </button>
          </div>

          {/* <ReviewItem hospitalId={params.hospitalId} /> */}
          <ReviewList
            reviewDetailData={reviewDetailData}
            hospitalId={params.hospitalId}
          />
        </>
      )}
      {selectedTab === "image" && (
        <ReviewImageList hospitalId={params.hospitalId} />
      )}
      {selectedTab === "review" && (
        <>
          <ReviewItem hospitalId={params.hospitalId} />
        </>
      )}
    </main>
  );
};

export default HospitalDetailPage;
