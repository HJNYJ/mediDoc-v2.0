"use client";
// 전체보기 했을 때

import ReviewForm from "@/components/map/review/ReviewForm";
import React from "react";
import { useRouter } from "next/navigation";

const ReviewPage = () => {
  // const router = useRouter();

  return (
    <div>
      <ReviewForm />
    </div>
  );
};

export default ReviewPage;
