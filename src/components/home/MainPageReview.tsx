"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/api/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import Hashtag from "@/utils/hashtag";
import Image from "next/image";
import star from "@/assets/icons/star.png";
import { useRouter } from "next/navigation";

const MainPageReview = () => {
  const router = useRouter();
  const {
    data: reviewRatedTopData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewRatedTopMain"],
    queryFn: async () => {
      const response = await supabase
        .from("review_info")
        .select(
          `*,
        review_photos (*), hospital_info(*)`
        )
        .order("rating", { ascending: false });

      return response.data;
    }
  });

  const onReviewClickHandler = (hospitalId: string) => {
    router.push(`/map/${hospitalId}`);
  };

  const handleViewAll = () => {
    router.push("/map");
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <div className="flex justify-between mb-4">
        <h3 className="bold-18">내가 찾던 솔직한 후기</h3>
        <button onClick={handleViewAll} className="regular-13 text-gray-700">
          전체 보기
        </button>
      </div>

      <Swiper
        loop={true}
        spaceBetween={4}
        slidesPerView={1.5}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        mousewheel={true}
      >
        {/* 후기 보러가기 버튼 추가 */}
        {reviewRatedTopData?.map((review) => (
          <SwiperSlide key={review.review_id}>
            <div
              className="flex flex-row mr-[14px] overflow-hidden hover:bg-bluegray cursor-pointer"
              onClick={() =>
                onReviewClickHandler(review?.hospital_info?.hospital_id ?? "")
              }
            >
              <div className=" rounded-[6px] border-2 border-bluegray  w-[232px]">
                <section className="h-[54px] border-b-2 border-b-bluegray">
                  <p className="h-[19px] bold-16 ml-[10px] mt-[6.5px] mb-[2px]">
                    {review.hospital_info?.hospital_name}
                  </p>
                  <section className="flex">
                    <Image
                      src={star}
                      alt="star"
                      width={20}
                      height={20}
                      className="w-[20px] h-[20px] ml-[10px]"
                    />
                    <p className="w-[19px] h-[16px] medium-13 text-gray-800 mr-[2px]">
                      {review.rating}
                    </p>
                  </section>
                </section>
                <section className="ml-[10px] mt-[10px] flex flex-col h-[201px]">
                  <div className="mr-[4px] flex flex-wrap">
                    {review.hashtags
                      ?.split(",")
                      .map((hashtag: string) => (
                        <Hashtag key={hashtag} hashtag={hashtag} />
                      ))}
                  </div>
                  <section className="regular-14 w-full text-ellipsis overflow-hidden">
                    {review.content}
                  </section>
                  <section className="mt-auto mb-3 flex">
                    {review.review_photos &&
                      review.review_photos.map((photo, index) => (
                        <Image
                          key={index}
                          src={photo.photos}
                          alt={`후기 사진 ${index + 1}`}
                          width={68}
                          height={62}
                          className="w-[68px] h-[62px] rounded-[4px] mr-[4px]"
                        />
                      ))}
                  </section>
                </section>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MainPageReview;
