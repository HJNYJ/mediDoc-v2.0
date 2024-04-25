"use client";

// 상담 내역 1개 div
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/api/supabase";
import { fetchConsultImages } from "@/hooks/getConsultData";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import AnswerComplete from "@/components/layout/AnswerComplete";
import AnswerWaiting from "@/components/layout/AnswerWaiting";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomeConsultItem = () => {
  const router = useRouter();

  const [consultPhotos, setConsultPhotos] = useState<
    { consult_id: string; photo_id: string; photos: string }[]
  >([]);

  useEffect(() => {
    const fetchConsultPhotos = async () => {
      const consultPhotos = await fetchConsultImages();
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

  const onConsultClickHandler = (consultId: string) => {
    router.push(`/consult/${consultId}`);
  };

  if (isLoadingRecent) return <div>로딩 중...</div>;
  if (isErrorRecent) return <div>에러가 발생했습니다.</div>;

  return (
    <div>
      {consultRecentData?.map((consult, index) => (
        <div
          key={index}
          onClick={() => onConsultClickHandler(consult.consult_id)}
          className="hover:bg-bluegray cursor-pointer"
        >
          <div className="flex justify-between">
            <div className="flex">
              {consultPhotos
                ?.filter((image) => image?.consult_id === consult?.consult_id)
                ?.slice(0, 1)
                ?.map((image, index) => (
                  <div key={index} className=" flex mr-3 my-2">
                    {image ? (
                      <Image
                        src={image.photos}
                        alt={`상담 이미지 ${index + 1}`}
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                    ) : (
                      <div className=" bg-bluegray rounded-lg">
                        <Image
                          src={`https://ifh.cc/g/WDVwsQ.png`}
                          alt="기본 이미지"
                          width={60}
                          height={50}
                          className="rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                ))}
              <div>
                <div className="semibold-16 text-gray-800 overflow-hidden whitespace-nowrap text-ellipsis w-[180px]">
                  {consult?.consult_title}
                </div>
                <div className="medium-14 text-gray-700 w-[170px] h-[42px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {consult?.consult_content}
                </div>
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
          <hr className="h-1" />
        </div>
      ))}
    </div>
  );
};

export default HomeConsultItem;
