"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "../layout/Buttons";

const HospitalListView = () => {
  const router = useRouter();
  return (
    <div className="relative mt-3">
      <Button
        type="button"
        buttonType="filled"
        size="lg"
        onClick={() => router.push("/map")}
        label={
          <div className="flex flex-col px-4">
            <span className="regular-14 h-[17px] mb-2">
              지금 나의 건강상태를 확인하세요
            </span>
            <span className="bold-22 h-[26px]">병원 리스트 보러가기</span>
          </div>
        }
      />
    </div>
  );
};

export default HospitalListView;
