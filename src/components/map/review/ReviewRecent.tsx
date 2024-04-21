"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/api/supabase";
import { useState } from "react";
import { useParams } from "next/navigation";
import Hashtag from "@/utils/hashtag";
import RoundTabs from "@/components/layout/RoundTabs";

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

      return response.data;
    },
    enabled: selectedTab === "rateTop" // selectedTab이 'rateTop'일 때만 쿼리를 실행
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
        .order("created_at", { ascending: false });

      return response.data;
    },
    enabled: selectedTab === "recent" // selectedTab이 'recent'일 때만 쿼리를 실행
  });

  if (isLoadingRateTop || isLoadingRecent) return <div>로딩 중...</div>;
  if (isErrorRateTop || isErrorRecent) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="mt-[20px]">
      <div className="flex mb-[16px]">
        <RoundTabs
          label="별점 높은 순"
          active={selectedTab === "rateTop"}
          onClick={() => setSelectedTab("rateTop")}
        />
        <RoundTabs
          label="최신 순"
          active={selectedTab === "recent"}
          onClick={() => setSelectedTab("recent")}
        />
      </div>
      <section>
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
      </section>
    </div>
  );
};

export default ReviewRecent;
