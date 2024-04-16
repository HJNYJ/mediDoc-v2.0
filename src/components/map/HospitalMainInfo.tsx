// 병원 정보 전체 div 병원 상세페이지에서 보이는 기본 정보
"use client";
import type { TabList } from "@/types";

import React from "react";
import DefaultTab from "./defaultTab/DefaultTab";
import ImageTab from "./imageTab/ImageTab";
import ReviewTab from "./reviewTab/ReviewTab";

const HospitalMainInfo = ({
  selectedTab,
  reviewDetailData
}: TabList & { reviewDetailData: any }) => {
  console.log("selectedTab", selectedTab);
  switch (selectedTab) {
    case "default":
      return <DefaultTab />;
    case "image":
      return <ImageTab />;
    case "review":
      return <ReviewTab reviewDetailData={reviewDetailData} />;
  }
};

export default HospitalMainInfo;
