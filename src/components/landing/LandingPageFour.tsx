import React from "react";
import Image from "next/image";
import Page4 from "@/assets/landing/Page4.png";
import { FourPage } from "../layout/CheckIcons";

const LandingPageFour = () => {
  return (
    <div className="mt-20">
      <div className="mb-5">
        <p className="semibold-24">건강 상태가 궁금할 땐</p>
        <p className="text-orange semibold-24 mb-4">건강상태 자가진단</p>
        <p className="regular-14 text-gray-700">
          몸 어딘가가 불편하다면 간단하게
          <br />
          건강상태를 자가진단 할 수 있어요
        </p>
      </div>

      <div>
        <FourPage />
      </div>
      <div className="p-20 pb-14">
        <Image src={Page4} alt="Page 4" />
      </div>
    </div>
  );
};

export default LandingPageFour;
