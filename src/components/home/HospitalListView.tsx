"use client";

import { useRouter } from "next/navigation";
import React from "react";

const HospitalListView = () => {
  const router = useRouter();
  return (
    <div className="max-w-lg mx-auto space-y-5">
      <button
        className="border-4 border-red-600"
        onClick={() => router.push("/map")}
      >
        <div>지금 나의 건강상태를 확인하세요</div>
        <div>병원 리스트 보러가기</div>
      </button>
    </div>
  );
};

export default HospitalListView;
