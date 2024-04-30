// 테스트 섹션 div
"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import nextIcon from "@/assets/upanddown/Next.png";
import React from "react";

const SelfTestWidget = () => {
  const router = useRouter();
  return (
    <div className="relative mt-[12px]">
      <h3 className="ml-2 h-[21px] bold-18">내 건강은 지금 어떨까?</h3>
      <button
        className="w-full"
        onClick={() => {
          router.push("/selftest");
        }}
      >
        <section className="h-[76px] mt-[16px] flex justify-between bg-gray-100 rounded-[8px]">
          <section className="h-[41px] pl-2 text-left flex flex-col mt-[17.5px]">
            <p className="h-[19px] bold-16 mb-[6px]">
              내 건강상태 체크 해 보기
            </p>
            <p className="h-[16px] regular-13 text-gray-600">
              테스트에서 건강 상태를 확인해보세요.
            </p>
          </section>
          <section className="place-content-center">
            <Image src={nextIcon} alt="버튼" />
          </section>
        </section>
      </button>
    </div>
  );
};

export default SelfTestWidget;
