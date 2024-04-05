// 병원 정보 전체 div
"use client";
import type { TabList } from "@/types";

import React from "react";
import DefaultTab from "./defaultTab/DefaultTab";
import ImageTab from "./imageTab/ImageTab";
import ReviewTab from "./reviewTab/ReviewTab";

const HospitalMainInfo = ({ selectedTab }: TabList) => {
  switch (selectedTab) {
    case "default":
      return <DefaultTab />;
    case "image":
      return <ImageTab />;
    case "review":
      return <ReviewTab />;
  }
};

export default HospitalMainInfo;
