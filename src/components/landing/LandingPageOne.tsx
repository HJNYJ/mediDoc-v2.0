import React from "react";
import Page1 from "@/assets/landing/Page1.png";
import Image from "next/image";
import { OnePage } from "../layout/CheckIcons";

const LandingPageOne = () => {
  return (
    <div className="mt-20">
      <div className="mb-4">
        <p className="semibold-24">버튼 하나로 알아 보는</p>
        <p className="semibold-24 text-orange mb-3">검진 제휴 병원</p>
        <p className="w-[65%] regular-14 text-gray-700">
          여러 병원 검색 할 필요없이 홈 화면에서 한번에 알아볼 수 있어요
        </p>
      </div>
      <div className="mb-20">
        <OnePage />
      </div>
      <div className="p-4">
        <Image src={Page1} alt="Page 1" />
      </div>
    </div>
  );
};

export default LandingPageOne;
