// 방문자 리뷰 section
"use client";
import useDetailTabStore from "@/shared/zustand/detailTabStore";
import Image from "next/image";
import React from "react";

const ReviewList = () => {
  const { selectTab } = useDetailTabStore();
  return (
    <section>
      {/* 제목 & 리뷰쓰기 */}
      <div className="flex gap-4">
        <h3>방문자 리뷰</h3>
        <button>리뷰 쓰기</button>
      </div>
      {/* 리뷰 리스트 */}
      <article>
        {/* 작성자 정보 */}
        <div className="flex gap-4">
          <figure>
            <Image src="" alt="프로필 아바타" />
          </figure>
          <div>
            <p>홍**</p>
            <p>별점 5.0</p>
          </div>
        </div>
        {/* 리뷰 내용 */}
        <div>
          <div className="flex gap-4">
            <Image src="" alt="사진1" />
            <Image src="" alt="사진2" />
          </div>
          <div>내용내용내용내용내용내용내용</div>
          {/* 해시태그 & 날짜 */}
          <div className="flex gap-4">
            <div className="flex gap-4">
              <button>#해시태그1</button>
              <button>#해시태그2</button>
            </div>
            <span>24.04.01</span>
          </div>
        </div>
      </article>
      <button
        onClick={(e) => {
          e.preventDefault();
          selectTab("review");
        }}
      >
        전체보기
      </button>
    </section>
  );
};

export default ReviewList;
