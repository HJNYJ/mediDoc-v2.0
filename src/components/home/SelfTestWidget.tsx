// 테스트 섹션 div
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import nextIcon from "@/assets/icons/nextIcon.png";
import React from "react";

const SelfTestWidget = () => {
  const router = useRouter();
  return (
    <div className="relative mt-[12px]">
      <span className="w-[163px] h-[21px] bold-18">내 건강은 지금 어떨까?</span>
      <section className="w-full h-[76px] mt-[16px] flex flex-row bg-gray-100 rounded-[8px]">
        <section className="w-[292px] h-[41px] flex flex-col ml-[18px] mt-[17.5px]">
          <span className="w-[154px] h-[19px] bold-16 mb-[6px]">
            내 건강상태 체크 해 보기
          </span>
          <span className="w-[193px] h-[16px] regular-13 text-gray-600">
            테스트에서 건강 상태를 확인해보세요.
          </span>
        </section>
        <button
          onClick={() => {
            router.push("https://medi-doc-three.vercel.app/selftest");
          }}
        >
          <Image src={nextIcon} alt="버튼" />
        </button>
      </section>
    </div>
  );
};

export default SelfTestWidget;
