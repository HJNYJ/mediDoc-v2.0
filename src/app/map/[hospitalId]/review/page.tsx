"use client";
// 전체보기 했을 때
import ReviewForm from "@/components/map/review/ReviewForm";
import { useParams } from "next/navigation";
import React from "react";
const ReviewPage = () => {
  // const router = useRouter();
  const params = useParams();
  const hospitalId = params.hospitalId.toString(); // Convert hospitalId to string
  console.log("ReviewPage params", hospitalId);
  return (
    <div className="w-[390px] h-[1176px] flex flex-col">
      <ReviewForm hospitalId={hospitalId} />
    </div>
  );
};
export default ReviewPage;
