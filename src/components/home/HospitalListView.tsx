"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Button from "../layout/Buttons";

const HospitalListView = () => {
  const router = useRouter();
  return (
    <div className="relative mt-[12px]">
      <Button
        type="button"
        buttonType="filled"
        size="lg"
        onClick={() => router.push("/map")}
        label={
          <>
            <span className="regular-14 w-full h-[17px]">
              지금 나의 건강상태를 확인하세요.
            </span>
            <span className="bold-22 w-full h-[26px]">
              병원 리스트 보러가기
            </span>
          </>
        }
      />
    </div>
  );
};

export default HospitalListView;
