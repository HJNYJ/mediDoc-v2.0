// 방문자 사진 section
"use client";
import useDetailTabStore from "@/shared/zustand/detailTabStore";
import Image from "next/image";
import React from "react";

const ReviewImageList = () => {
  const { selectTab } = useDetailTabStore();
  return (
    <section>
      <h3>방문자 사진</h3>
      <article>
        <div className="grid grid-cols-3 gap-4">
          <Image src="" alt="사진1" />
          <Image src="" alt="사진2" />
          <Image src="" alt="사진3" />
          <Image src="" alt="사진4" />
          <Image src="" alt="사진5" />
          <Image src="" alt="사진6" />
        </div>
      </article>
      <button
        onClick={(e) => {
          e.preventDefault();
          selectTab("image");
        }}
      >
        전체보기
      </button>
    </section>
  );
};

export default ReviewImageList;
