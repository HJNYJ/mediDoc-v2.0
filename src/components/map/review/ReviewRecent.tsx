"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/api/supabase";
import { useState } from "react";
import { useParams } from "next/navigation";
import Hashtag from "@/utils/hashtag";
import RoundTabs from "@/components/layout/RoundTabs";
import Image from "next/image";

const ReviewRecent = () => {
  const { hospitalId } = useParams();
  const [selectedTab, setSelectedTab] = useState("ratedTop");
  // 별점 높은 순 데이터 가져오기

  const {
    data: reviewRatedTopData,
    isLoading: isLoadingRatedTop,
    isError: isErrorRatedTop
  } = useQuery({
    queryKey: ["reviewRatedTop"],
    queryFn: async () => {
      const response = await supabase
        .from("review_info")
        .select(
          `*,
        hospital_info (*),
        review_photos(*)`
        )
        .eq("hospital_id", hospitalId)
        .order("rating", { ascending: false });

      return response.data;
    },
    enabled: selectedTab === "ratedTop" // selectedTab이 'ratedTop'일 때만 쿼리를 실행
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
        hospital_info (*),
        review_photos(*)`
        )
        .eq("hospital_id", hospitalId)
        .order("created_at", { ascending: false });

      return response.data;
    },
    enabled: selectedTab === "recent" // selectedTab이 'recent'일 때만 쿼리를 실행
  });

  if (isLoadingRatedTop || isLoadingRecent) return <div>로딩 중...</div>;
  if (isErrorRatedTop || isErrorRecent) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="mt-[20px]">
      <div className="flex mb-[16px]">
        <RoundTabs
          label="별점 높은 순"
          active={selectedTab === "ratedTop"}
          onClick={() => setSelectedTab("ratedTop")}
        />
        <RoundTabs
          label="최신 순"
          active={selectedTab === "recent"}
          onClick={() => setSelectedTab("recent")}
        />
      </div>
      <section>
        {selectedTab === "ratedTop" && (
          <div>
            {reviewRatedTopData?.length === 0 ? (
              <p className="text-gray-700">
                아직 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
              </p>
            ) : (
              reviewRatedTopData?.map((review) => (
                <div key={review.review_id}>
                  {review?.user_name ? (
                    <p>{review.user_name.slice(0, -1) + "*"}</p>
                  ) : (
                    <p>익명</p>
                  )}
                  <p className="regular-13 gray-800">⭐{review.rating}.0</p>

                  {review.review_photos && (
                    <div className="relative w-[100px] h-[100px] border border-gray-100 overflow-hidden flex items-center justify-center">
                      {review.review_photos.map((photo) => (
                        <Image
                          key={photo.photo_id}
                          src={photo.photos}
                          alt="리뷰 이미지"
                          width={100}
                          height={100}
                          objectFit="cover"
                        />
                      ))}
                    </div>
                  )}

                  <div className="gray-800 regular-14">{review.content}</div>
                  <div className="flex text-center my-2">
                    {review.hashtags
                      ?.split(",")
                      .map((hashtag: string) => (
                        <Hashtag key={hashtag} hashtag={hashtag} />
                      ))}
                  </div>
                  <hr className="mb-3" />
                </div>
              ))
            )}
          </div>
        )}
        {selectedTab === "recent" && (
          <div>
            {reviewRecentData?.map((review) => (
              <div key={review.review_id}>
                {review?.user_name ? (
                  <p>{review.user_name.slice(0, -1) + "*"}</p>
                ) : (
                  <p>익명</p>
                )}
                <p className="regular-13 gray-800 my-2">⭐{review.rating}.0</p>
                {review.review_photos && (
                  <div className="flex gap-2">
                    {review.review_photos.map((photo) => (
                      <Image
                        key={photo.photo_id}
                        src={photo.photos}
                        alt="리뷰 이미지"
                        width={85}
                        height={85}
                        className="flex w-[85px] h-[85px] bg-bluegray rounded-lg"
                      />
                    ))}
                  </div>
                )}
                <div className="gray-800 regular-14">{review.content}</div>
                <div className="flex text-center my-2">
                  {review.hashtags
                    ?.split(",")
                    .map((hashtag: string) => (
                      <Hashtag key={hashtag} hashtag={hashtag} />
                    ))}
                </div>
                <hr className="mb-3" />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ReviewRecent;
