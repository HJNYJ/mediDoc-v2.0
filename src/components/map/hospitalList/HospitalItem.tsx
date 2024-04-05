// 제휴 병원 간단 정보 div
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HospitalItem = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section onClick={() => router.push("/map/12")}>
      {/* 왼쪽 - 병원 이미지 */}
      <figure>
        <Image src="" alt="병원 이미지" />
      </figure>
      {/* 오른쪽 - 병원 정보 */}
      <article>
        <h2>병원이름</h2>
        {/* 진료 여부 */}
        {isOpen ? (
          <span>진료중</span>
        ) : (
          // 진료종료 & ~시에 진료시작
          <div>
            <span>진료 종료</span> <span>09:00 에 진료시작</span>
          </div>
        )}
        {/* 병원 주소 */}
        <p>서울시 광진구 중곡동</p>
        {/* 평균 별점 & 후기 개수 */}
        <p>(별icon) 5.0 (40개)</p>
      </article>
    </section>
  );
};

export default HospitalItem;
