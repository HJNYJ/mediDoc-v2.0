"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/api/supabase";
import { useState } from "react";
import Hashtag from "@/utils/hashtag";
import { useParams } from "next/navigation";

const ReviewRecent = () => {
  const { hospitalId } = useParams();

  const [selectedTab, setSelectedTab] = useState("rateTop");
  // 별점 높은 순 데이터 가져오기

  const {
    data: reviewRateTopData,
    isLoading: isLoadingRateTop,
    isError: isErrorRateTop
  } = useQuery({
    queryKey: ["reviewRateTop"],
    queryFn: async () => {
      const response = await supabase
        .from("review_info")
        .select(
          `*,
        hospital_info (*)`
        )
        .eq("hospital_id", hospitalId)
        .order("rating", { ascending: false })
        .range(0, 3);

      console.log("리뷰정보~~~~~~~~::::", response);
      return response.data;
    },
    enabled: selectedTab === "rateTop" // selectedTab이 'rateTop'일 때만 쿼리를 실행합니다.
  });

  // 최신순 데이터 가져오기
  const {
    data: reviewRecentData,
    isLoading: isLoadingRecent,
    isError: isErrorRecent
  } = useQuery({
    queryKey: ["reviewRecent"],
    queryFn: async () => {
      const response = await supabase
        .from("review_info")
        .select(
          `*,
        hospital_info (*)`
        )
        .eq("hospital_id", hospitalId)
        .order("created_at", { ascending: false })
        .range(0, 3);
      return response.data;
    },
    enabled: selectedTab === "recent" // selectedTab이 'recent'일 때만 쿼리를 실행합니다.
  });

  if (isLoadingRateTop || isLoadingRecent) return <div>로딩 중...</div>;
  if (isErrorRateTop || isErrorRecent) return <div>에러가 발생했습니다.</div>;

  return (
    <div>
      <button
        className={selectedTab === "rateTop" ? "activeTab" : ""}
        onClick={() => setSelectedTab("rateTop")}
      >
        별점 높은 순
      </button>
      <button
        className={selectedTab === "recent" ? "activeTab" : ""}
        onClick={() => setSelectedTab("recent")}
      >
        최신순
      </button>

      {selectedTab === "rateTop" && (
        <div>
          {reviewRateTopData?.map((review) => (
            <div key={review.review_id}>
              <h3>{review.content}</h3>
              <p>별점: {review.rating}</p>
              <div>
                {review.hashtags
                  ?.split(",")
                  .map((hashtag: string) => (
                    <Hashtag key={hashtag} hashtag={hashtag} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <br />
      {selectedTab === "recent" && (
        <div>
          {reviewRecentData?.map((review) => (
            <div key={review.review_id}>
              <h3>{review.content}</h3>
              <p>별점: {review.rating}</p>
              <div>
                {review.hashtags
                  ?.split(",")
                  .map((hashtag: string) => (
                    <Hashtag key={hashtag} hashtag={hashtag} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewRecent;
