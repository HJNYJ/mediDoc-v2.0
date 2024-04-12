import ReviewList from "@/components/map/defaultTab/ReviewList";
import ReviewItem from "@/components/map/review/ReviewItem";
import React from "react";

const HospitalPage = () => {
  return (
    <>
      {/* 여기서부턴 리뷰 - 몇가지 안나오는 */}
      <ReviewItem />
      <ReviewList />
    </>
  );
};

export default HospitalPage;
