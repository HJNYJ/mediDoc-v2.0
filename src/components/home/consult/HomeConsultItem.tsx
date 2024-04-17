"use client";

// 상담 내역 1개 div
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { supabase } from "@/api/supabase";
import Image from "next/image";
import answer_complete from "@/assets/icons/consult/answer_complete.png";
import answer_wait from "@/assets/icons/consult/answer_wait.png";

const HomeConsultItem = () => {
  // 사진 가져오기위해
  // const [consultPhotos, setConsultPhotos] = useState([]);
  // 최신순 데이터 가져오기
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

  // const { data: consultRecentImageData, isError: isErrorImgRecent } = useQuery({
  //   queryKey: ["homeConsultItemPhotos"],
  //   queryFn: async () => {
  //     const response = await supabase
  //       .from("consult_photos")
  //       .select("*")
  //       .order("created_at", { ascending: false })
  //       .range(0, 3);

  //     console.log("home consult img data ~~@@@~~~~~~~~::::", response.data);

  //     return response.data;
  //   }
  // });

  // if (isLoadingRecent || !consultRecentImageData) return <div>로딩 중...</div>;
  // if (isErrorRecent || isErrorImgRecent) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="w-[358px] h-[71px]">
      {consultRecentData?.slice(0, 3).map((consult, index) => (
        <div key={index} className="flex mb-[24px]">
          <Image className="w-[60px] h-[60px] rounded-[10px] mr-[12px]" />
          <div className="flex flex-col mr-[18px]">
            <span className="w-[195px] h-[21px] semibold-18 mb-[8px]">
              {consult?.consult_title}
            </span>
            <span className="w-[211px] medium-14 text-gray-700">
              {consult?.consult_content}
            </span>
          </div>
          <div className="place-content-center">
            {consult?.consult_answer && consult?.consult_answer?.length >= 1 ? (
              <Image
                src={answer_complete}
                alt="답변 완료"
                className="w-[57px] h-[27px]"
              />
            ) : (
              <Image
                src={answer_wait}
                alt="답변 대기중"
                className="w-[57px] h-[27px]"
              />
            )}
          </div>
        </div>
      ))}
    </div>
    // <div className="w-[360px]">
    //   {consultRecentData?.map((consult, index) => {
    //     // const images = consultRecentImageData.filter(
    //     //   (image) => image.consult_id === consult.consult_id
    //     // );
    //     return (
    //       <div key={index} className="flex align-center justify-center">
    //         <div className="flex flex-col">
    //           <div className="semibold-18">{consult?.consult_title}</div>
    //           <div className="medium-14 text-gray-700">
    //             {consult?.consult_content}
    //           </div>
    //         </div>

    //         <div>
    //           {consult?.consult_answer &&
    //           consult?.consult_answer?.length >= 1 ? (
    //             <Image
    //               src={answer_complete}
    //               alt="답변 완료"
    //               className="w-[57px] h-[27px]"
    //             />
    //           ) : (
    //             <Image
    //               src={answer_wait}
    //               alt="답변 대기중"
    //               className="w-[57px] h-[27px]"
    //             />
    //           )}
    //         </div>

    //         {/* {images.map((image, index) => (
    //           <Image
    //             key={index}
    //             src={image.photos}
    //             alt={`상담 이미지 ${index + 1}`}
    //             className="w-[100px] h-[100px]"
    //           />
    //         ))} */}
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default HomeConsultItem;
