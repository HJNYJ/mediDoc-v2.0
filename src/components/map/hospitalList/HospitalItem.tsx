// 제휴 병원 간단 정보 div
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { getTime, removeTimeSecond } from "@/utils/changeTimeFormat";
import { checkHospitalOpen } from "@/utils/checkHospitalOpen";

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
      className="flex gap-4 cursor-pointer"
      onClick={() => router.push(`/map/${hospital.hospital_id}`)}
    >
      {/* 왼쪽 - 병원 이미지 */}
      <figure>
        <img
          src={hospital.hospital_image}
          alt="병원 이미지"
          width={240}
          height={240}
        />
      </figure>
      {/* 오른쪽 - 병원 정보 */}
      <article>
        <h2>{hospital.hospital_name}</h2>
        {/* 진료 여부 */}
        <span>{isHospitalOpen}</span>
        {/* 병원 주소 */}
        <p>{hospital.hospital_address}</p>
        {/* 평균 별점 & 후기 개수 */}
        <p>(별icon) 5.0 (40개)</p>
      </article>
    </section>
  );
};

export default HospitalItem;
