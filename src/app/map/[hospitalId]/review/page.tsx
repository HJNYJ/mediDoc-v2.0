"use client";
// 전체보기 했을 때
import { useParams } from "next/navigation";
import React from "react";
import ReviewForm from "@/components/map/review/ReviewForm";

const ReviewPage = () => {
  const params = useParams();
  const hospitalId = params.hospitalId.toString();
  return (
    <div className="flex flex-col">
      <ReviewForm hospitalId={hospitalId} />
    </div>
  );
};
export default ReviewPage;
