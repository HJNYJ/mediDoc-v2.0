"use client";

// 상담 내역 1개 div
import { useQuery } from "@tanstack/react-query";
import { fetchImages, supabase } from "@/api/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import AnswerComplete from "@/components/layout/AnswerComplete";
import AnswerWaiting from "@/components/layout/AnswerWaiting";
import { useEffect, useState } from "react";

const HomeConsultItem = () => {
  // 사진 가져오기위해
  // const [consultsData, setConsultsData] = useState([]);
  const [consultPhotos, setConsultPhotos] = useState([]);

  useEffect(() => {
    const fetchConsultPhotos = async () => {
      const consultPhotos = await fetchImages();
      setConsultPhotos(consultPhotos);
    };

    fetchConsultPhotos();
  }, []);

  const {
    data: consultRecentData,
    isLoading: isLoadingRecent,
    isError: isErrorRecent
  } = useQuery({
    queryKey: ["consultRecent"],
    queryFn: async () => {
      const response = await supabase
        .from("consult_info")
        .select(
          `consult_id, 
          user_name, 
          consult_title, 
          consult_content,
          bodyparts, 
          hashtags,
          consult_answer(*)
          `
        )
        .order("created_at", { ascending: false })
        .range(0, 3);

      return response.data;
    }
  });

  if (isLoadingRecent) return <div>로딩 중...</div>;

  if (isErrorRecent) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="w-[360px]">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
      >
        {consultRecentData?.map((consult, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <div className="flex flex-col">
                <Swiper
                  spaceBetween={50}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                  }}
                >
                  {consultPhotos
                    ?.filter(
                      (image) => image?.consult_id === consult?.consult_id
                    )
                    ?.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image.photos}
                          alt={`상담 이미지 ${index + 1}`}
                          className="w-[100px] h-[100px]"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
                <div className="semibold-18">{consult?.consult_title}</div>
                <div className="medium-14 text-gray-700">
                  {consult?.consult_content}
                </div>
              </div>

              <div>
                {consult?.consult_answer &&
                consult?.consult_answer?.length >= 1 ? (
                  <AnswerComplete />
                ) : (
                  <AnswerWaiting />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
    </div>
  );
};

export default HomeConsultItem;
