import React from "react";
import Page3 from "@/assets/landing/Page3.png";
import Image from "next/image";
import { ThreePage } from "../layout/CheckIcons";

const LandingPageThree = () => {
  return (
    <div className="mt-20">
      <div className="mb-4">
        <p className="semibold-24">한번의 클릭으로</p>
        <p className="text-orange semibold-24 mb-4">제휴 병원 예약하기</p>
        <p className="regular-14 text-gray-700">
          병원에 일일이 전화 하지 않고
          <br />
          모바일로 가격까지 알아보고 예약할 수 있어요
        </p>
      </div>
      <ThreePage />
      <div className="p-12">
        <Image src={Page3} alt="Page 3" />
      </div>
    </div>
  );
};

export default LandingPageThree;
