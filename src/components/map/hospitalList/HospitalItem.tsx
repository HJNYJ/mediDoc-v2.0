// 제휴 병원 간단 정보 div
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getTime, removeTimeSecond } from "@/utils/changeTimeFormat";
import { checkHospitalOpen } from "@/utils/checkHospitalOpen";
import Image from "next/image";
import star from "@/assets/icons/star.png";

const HospitalItem = ({ hospital }) => {
  const router = useRouter();

  // 시간 출력 타입 변경
  const secondRemovedStartTime = removeTimeSecond(hospital.start_time);
  const secondRemovedEndTime = removeTimeSecond(hospital.end_time);

  // 운영 여부
  const currentTime = getTime();
  const isHospitalOpen = checkHospitalOpen(
    currentTime,
    secondRemovedStartTime,
    secondRemovedEndTime
  );

  return (
    <section
      className="flex gap-4 cursor-pointer w-[390px] h-[108px]"
      onClick={() =>
        router.push(`http://localhost:3000/map/${hospital.hospital_id}`)
      }
    >
      {/* 왼쪽 - 병원 이미지 */}
      <figure className="flex flex-col w-[96px] h-[98px] justify-center">
        <img
          src={hospital.hospital_image}
          alt="병원 이미지"
          className="min-w-full min-h-full object-cover rounded-[10px]"
        />
      </figure>
      {/* 오른쪽 - 병원 정보 */}
      <article className="w-[222px] h-[91px] flex flex-col">
        <span className="w-[200px] h-[21px] semibold-18">
          {hospital.hospital_name}
        </span>
        {/* 진료 여부 */}
        <span className="w-[222px] h-[19px] regular-16 mt-[8px]">
          {isHospitalOpen}
        </span>
        {/* 병원 주소 */}
        <p className="regular-14 text-gray-800 mt-[4px] mb-[4px]">
          {hospital.hospital_address}
        </p>
        {/* 평균 별점 & 후기 개수 */}
        <Image src={star} alt="star" className="w-[18px] h-[18px]" />
        {/* <p> 5.0 (40개)</p> */}
      </article>
    </section>
  );
};

export default HospitalItem;
