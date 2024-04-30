// 제휴 병원 간단 정보 div
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import star from "@/assets/icons/star.png";
import { useRouter } from "next/navigation";
import { getTime, removeTimeSecond } from "@/utils/changeTimeFormat";
import { checkHospitalOpen } from "@/utils/checkHospitalOpen";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/api/supabase";
import { Spinner } from "@nextui-org/react";

const HospitalItem = ({ hospital }) => {
  const router = useRouter();
  const [averageRating, setAverageRating] = useState<number>(0);

  // 병원 리뷰 평균 별점
  const {
    data: ratingData,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["rating", hospital.hospital_id],
    queryFn: async () => {
      const response = await supabase
        .from("review_info")
        .select("rating")
        .eq("hospital_id", hospital.hospital_id);

      return response.data;
    }
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      if (ratingData && ratingData.length > 0) {
        const sum = ratingData.reduce((acc, review) => acc + review.rating, 0);
        const average = sum / ratingData.length;
        setAverageRating(average);
      }
    }
  }, [ratingData, isLoading, isError]);

  // 시간 출력 타입 변경
  const secondRemovedStartTime = removeTimeSecond(hospital.start_time);
  const secondRemovedEndTime = removeTimeSecond(hospital.end_time);

  // 운영 여부
  const currentTime = getTime();
  const isHospitalOpen = checkHospitalOpen(
    currentTime,
    secondRemovedStartTime,
    secondRemovedEndTime
  );

  if (isLoading) return <Spinner size="lg" color="warning" />;
  if (isError) return <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;

  return (
    <section
      className="flex gap-4 cursor-pointer"
      onClick={() => router.push(`/map/${hospital.hospital_id}`)}
    >
      <figure className="flex flex-col justify-center">
        <Image
          src={hospital.hospital_image}
          alt="병원 이미지"
          width={96}
          height={98}
          className="w-[100px] h-[91px] object-cover rounded-[10px]"
        />
      </figure>
      {/* 오른쪽 - 병원 정보 */}
      <article className="w-[222px] h-[91px] flex flex-col">
        <span className="w-[200px] h-[21px] semibold-18">
          {hospital.hospital_name}
        </span>
        {/* 진료 여부 */}
        <span className="w-[222px] h-[19px] regular-16 mt-[8px]">
          {isHospitalOpen}
        </span>
        {/* 병원 주소 */}
        <p className="regular-14 text-gray-800 mt-[4px] mb-[4px]">
          {hospital.hospital_address}
        </p>
        {/* 평균 별점 & 후기 개수 */}
        <div className="flex">
          <Image
            src={star}
            alt="star"
            width={18}
            height={18}
            className="w-[18px] h-[18px]"
          />
          <span className="regular-14 text-gray-800 ml-[4px]">
            {averageRating.toFixed(1)}
          </span>
        </div>
        {/* <p> 5.0 (40개)</p> */}
      </article>
    </section>
  );
};

export default HospitalItem;
