"use client";

import {
  fetchHospitalReviewImages,
  getReviewDetail
} from "@/hooks/getReviewData";
import { getHospitalInfo } from "@/hooks/getHospitalData";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Button from "@/components/layout/Buttons";
import Tab from "@/components/layout/Tabs";
import TopNavbar from "@/components/layout/TopNavbar";
import HospitalInfoHeader from "@/components/map/HospitalInfoHeader";
import Notice from "@/components/map/defaultTab/Notice";
import ProgramInfo from "@/components/map/defaultTab/ProgramInfo";
import ReviewImageList from "@/components/map/defaultTab/ReviewImageList";
import ReviewList from "@/components/map/defaultTab/ReviewList";
import ReviewItem from "@/components/map/review/ReviewItem";
import Image from "next/image";

const HospitalDetailPage = ({ params }: { params: { hospitalId: string } }) => {
  const [selectedTab, setSelectedTab] = useState("default");
  const { refetch: refetchReviews } = useQuery({
    queryKey: ["reviewDetailList", params.hospitalId],
    queryFn: () => getReviewDetail(params.hospitalId)
  });
  const { refetch: refetchHospitalInfo } = useQuery({
    queryKey: ["hospitalInformation", params.hospitalId],
    queryFn: () => getHospitalInfo(params.hospitalId)
  });

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    switch (tab) {
      case "default":
        refetchHospitalInfo();
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
    queryFn: () => fetchHospitalReviewImages(params.hospitalId)
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error!</p>;

  return (
    <main>
      <TopNavbar />
      <HospitalInfoHeader params={params} />
      <nav className="flex justify-center py-2 mt-[26px] border-t-4">
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
          {/* <article className="inline-grid grid-cols-3 gap-2">
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
          </article> */}
          <article className="inline-grid grid-cols-3 gap-2">
            {reviewPhotos?.slice(0, 6).map((img, index) => (
              <div
                key={img?.photo_id}
                className="relative w-[116.67px] h-[116px] rounded-[10px]"
              >
                <Image
                  src={img?.photos}
                  alt={`사진${index + 1}`}
                  width={116.67}
                  height={116}
                  // layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </article>
          <div className="mt-3 flex flex-col align-items">
            <Button
              type="button"
              buttonType="hollow"
              size="base"
              label="전체보기"
              onClick={(e) => {
                e.preventDefault();
                setSelectedTab("image");
              }}
            />
          </div>
          <ReviewList hospitalId={params.hospitalId} />
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
