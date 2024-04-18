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
    data: reviewRateTopData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["reviewRateTopMain"],
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

  const handleViewAll = () => {
    router.push("/map");
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <>
      <p className="bold-18 mb-[16px]">내가 찾던 솔직한 후기</p>
      <button onClick={handleViewAll} className="regular-13 text-gray-700">
        전체 보기
      </button>
      <Swiper
        loop={true}
        spaceBetween={4}
        slidesPerView={3}
        scrollbar={{ draggable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        mousewheel={true}
      >
        {reviewRateTopData?.map((review) => (
          <SwiperSlide key={review.review_id}>
            <div className="flex flex-row mr-[14px]">
              <div className="w-[232px] h-[275px] rounded-[6px] border-2 border-bluegray">
                <section className="h-[54px] border-b-2 border-b-bluegray">
                  <p className="w-[180px] h-[19px] bold-16 ml-[10px] mt-[6.5px] mb-[2px]">
                    {review.hospital_info?.hospital_name}
                  </p>
                  <section className="flex">
                    <Image
                      src={star}
                      alt="star"
                      className="w-[20px] h-[20px] ml-[10px]"
                    />
                    <p className="w-[19px] h-[16px] medium-13 text-gray-800 mr-[2px]">
                      {review.rating}
                    </p>
                  </section>
                </section>
                <section className="ml-[10px] mt-[10px]">
                  <div className="w-[140px] h-[30px] mr-[4px] flex">
                    {review.hashtags
                      ?.split(",")
                      .map((hashtag: string) => (
                        <Hashtag key={hashtag} hashtag={hashtag} />
                      ))}
                  </div>
                  <section className="w-[212px] h-[85px] regular-14 mb-[12px]">
                    {review.content}
                  </section>
                  <section>
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
