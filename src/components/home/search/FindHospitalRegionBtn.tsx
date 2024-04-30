// 지역별 병원 찾기
"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import 서울 from "@/assets/icons/main/서울.png";
import 경기 from "@/assets/icons/main/경기.png";
import 인천 from "@/assets/icons/main/인천.png";
import 강원 from "@/assets/icons/main/강원.png";
import 충청 from "@/assets/icons/main/충청.png";
import 전라 from "@/assets/icons/main/전라.png";
import 경상 from "@/assets/icons/main/경상.png";
import 제주 from "@/assets/icons/main/제주.png";

const region = { 서울, 경기, 인천, 강원, 충청, 전라, 경상, 제주 };

const FindHospitalRegionBtn = ({ regionInfo }) => {
  const router = useRouter();

  const hospitalViewBtnHandler = (id: string) => {
    router.push(`/map?region_id=${id}`);
  };
  return (
    <div
      className="cursor-pointer mt-[16px] text-center"
      onClick={() => hospitalViewBtnHandler(regionInfo.region_id)}
    >
      <div className="mb-2">
        <Image
          src={region[regionInfo.region_name]}
          alt="서울"
          width={44}
          height={44}
          className="w-[44px] h-[44px] inline-block"
        />
      </div>
      <div className="medium-13">{regionInfo.region_name}</div>
    </div>
  );
};

export default FindHospitalRegionBtn;
