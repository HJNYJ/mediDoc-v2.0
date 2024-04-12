"use client";
// 방문자 리뷰 section

import { supabase } from "@/api/supabase";
import useDetailTabStore from "@/shared/zustand/detailTabStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";

// 병원 상세 페이지에 밑에 있는 방문자 리뷰 리스트들( 3-4개만 보여짐 ) -> 전체보기로 넘어갈 수 있음
const ReviewList = () => {
  const { selectTab } = useDetailTabStore();

  const {
    data: reviewData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewRateTop"],
    queryFn: async () => {
      const response = await supabase
        .from("review_info")
        .select("*")
        .order("rating", { ascending: false })
        .range(0, 2);
      console.log("response", response);
      return response.data;
    }
  });

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생</div>;

  return (
    <section>
      {/* 제목 & 리뷰쓰기 */}
      <div className="flex gap-4">
        <h3>방문자 리뷰</h3>
        <button>리뷰 쓰기</button>
      </div>
      {/* 리뷰 리스트 */}
      <div>
        {reviewData?.map((review) => (
          <div key={review.review_id} className="border p-4 mb-4">
            {/* 작성자 정보 */}
            <div className="flex gap-4">
              <div>
                <p>별점 {review.rating}</p>
              </div>
            </div>
            {/* 리뷰 내용 */}
            <p>{review.content}</p>
            {/* 해시태그 & 날짜 */}
            {review.hashtags
              ?.split(",")
              .map((hashtag: string) => (
                <button key={hashtag}>#{hashtag}</button>
              ))}
          </div>
        ))}
      </div>

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

/** 
 * <article>
        작성자 정보
        <div className="flex gap-4">
          <figure>
            <Image src="" alt="프로필 아바타" />
          </figure>
          <div>
            <p>홍**</p>
            <p>별점 5.0</p>
          </div>
        </div>
        {/* 리뷰 내용 */
//   <div>
//     <div className="flex gap-4">
//       <Image src="" alt="사진1" />
//       <Image src="" alt="사진2" />
//     </div>
//     <div>내용내용내용내용내용내용내용</div>
//     {/* 해시태그 & 날짜 */}
//     <div className="flex gap-4">
//       <div className="flex gap-4">
//         <button>#해시태그1</button>
//         <button>#해시태그2</button>
//       </div>
//       <span>24.04.01</span>
//     </div>
//   </div>
// </article>
