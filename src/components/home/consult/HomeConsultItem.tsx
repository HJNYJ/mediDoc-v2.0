"use client";

// 상담 내역 1개 div
import { useQuery } from "@tanstack/react-query";
import { fetchImages, supabase } from "@/api/supabase";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import AnswerComplete from "@/components/layout/AnswerComplete";
import AnswerWaiting from "@/components/layout/AnswerWaiting";
import { useEffect, useState } from "react";
import Image from "next/image";

const HomeConsultItem = () => {
  // 사진 가져오기위해
  // const [consultsData, setConsultsData] = useState([]);
  const [consultPhotos, setConsultPhotos] = useState<
    { consult_id: string; photo_id: string; photos: string }[]
  >([]);

  useEffect(() => {
    const fetchConsultPhotos = async () => {
      const consultPhotos = await fetchImages();
      setConsultPhotos(consultPhotos || []);
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
      {consultRecentData?.map((consult, index) => (
        <div key={index}>
          <div className="flex justify-center">
            <div className="flex flex-col">
              {consultPhotos
                ?.filter((image) => image?.consult_id === consult?.consult_id)
                ?.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image.photos}
                      alt={`상담 이미지 ${index + 1}`}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                    {/* <img
                          src={image.photos}
                          alt={`상담 이미지 ${index + 1}`}
                          className="w-[100px] h-[100px]"
                        /> */}
                    {/** 노란줄도 지워야하나 싶어서 지워봄..... */}
                  </div>
                ))}

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
        </div>
      ))}
    </div>
  );
};

export default HomeConsultItem;
