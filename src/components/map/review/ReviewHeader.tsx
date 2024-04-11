"use client";

import { useState } from "react";
import Reviews from "./Reviews";
import type { Tab } from "@/types";
import { useRouter } from "next/navigation";

const ReviewHeader = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<Tab>("starRating");

  const handleTabClick = (tab: Tab) => {
    setSelectedTab(tab);
  };

  const goToReviewForm = () => {
    router.push(`/hospital/reviewform`);
  };

  return (
    <div>
      <span>
        <h2>방문자 리뷰</h2>
      </span>
      <button onClick={goToReviewForm}>리뷰 쓰기</button>
      <br />
      <button
        className={selectedTab === "starRating" ? "activeTab" : ""}
        onClick={() => handleTabClick("starRating")}
      >
        별점 높은 순
      </button>
      <button
        className={selectedTab === "latest" ? "activeTab" : ""}
        onClick={() => handleTabClick("latest")}
      >
        최신순
      </button>
      <Reviews selectedTab={selectedTab} />
    </div>
  );
};

export default ReviewHeader;
