// 병원 정보 공통 출력 section
"use client";
import { fetchHospitalData } from "@/hooks/getHospitalData";
import { removeTimeSecond, getTime } from "@/utils/changeTimeFormat";
import { checkHospitalOpen } from "@/utils/checkHospitalOpen";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Map from "./Map";
import Image from "next/image";
import scrapIcon from "@/assets/icons/bookmark.png";
import scrappedIcon from "@/assets/icons/bookmark_checked.png";
import timeIcon from "@/assets/icons/date.png";
import phoneIcon from "@/assets/icons/phone.png";
import Button from "../layout/Buttons";
import { useRouter } from "next/navigation";
import {
  addScrappedList,
  removeScrappedList
} from "@/utils/changeScrappedList";
import { getUserInfo } from "@/utils/getUserInfo";
import useScrapStore from "@/shared/zustand/scrapStore";
import { supabase } from "@/api/supabase";

const HospitalInfoHeader = ({ params }: { params: { hospitalId: string } }) => {
  const router = useRouter();
  const [isTimeToggleOpen, setTimeToggleOpen] = useState(false); // 진료시간 toggle
  const [isIntroductionToggleOpen, setIntroductionToggleOpen] = useState(false); // 소개글 toggle
  const { isScrapped, setIsScrapped } = useScrapStore();
  // 병원 데이터 가져오기
  const {
    isLoading,
    isError,
    data: hospitalData
  } = useQuery({
    queryKey: ["hospitalInfo", params.hospitalId],
    queryFn: () => fetchHospitalData(params.hospitalId)
  });

  useEffect(() => {
    const fetchScrappedStatus = async () => {
      const hospitalId = params.hospitalId;
      const userData = await getUserInfo();
      const userId = userData?.userId;

      try {
        const { data: scrappedData, error } = await supabase
          .from("scrapped_list")
          .select("*")
          .eq("hospital_id", hospitalId)
          .eq("user_id", userId);
        if (error) {
          throw error;
        }

        setIsScrapped(scrappedData.length > 0);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchScrappedStatus();
  }, [params.hospitalId, setIsScrapped]);

  if (isLoading) return <p>병원 데이터를 가져오는 중입니다.</p>;
  if (isError) return <p>병원 데이터를 가져오는 동안 에러가 발생했습니다</p>;

  // 시간 출력 타입 변경
  const secondRemovedStartTime = removeTimeSecond(hospitalData!.start_time);
  const secondRemovedEndTime = removeTimeSecond(hospitalData!.end_time);

  // 운영 여부
  const currentTime = getTime();
  const isHospitalOpen = checkHospitalOpen(
    currentTime,
    secondRemovedStartTime,
    secondRemovedEndTime
  );
  const handleScrapClick = async () => {
    const hospitalId = params.hospitalId;
    const userInfo = await getUserInfo();
    const userId = userInfo?.userId;

    if (!userId) {
      console.error("유저 ID를 가져오지 못 했습니다.");
      return;
    }

    if (isScrapped) {
      setIsScrapped(!isScrapped);
      removeScrappedList(hospitalId, userId);
      alert("스크랩이 해제되었습니다.");
    } else {
      setIsScrapped(!isScrapped);
      addScrappedList(hospitalId, userId);
      alert("스크랩되었습니다.");
    }
  };

  const scrapIconSrc = isScrapped ? scrappedIcon : scrapIcon;

  const goToApplyPage = () => {
    if (params?.hospitalId) {
      router.push(`/apply/${params.hospitalId}`);
    } else {
      console.error("병원 ID가 유효하지 않습니다.");
    }
  };

  return (
    <main className="">
      {/* 병원 위치(지도) */}
      <section className="w-[390px]">
        <Map
          name={hospitalData!.hospital_name}
          latitude={hospitalData.hospital_latitude}
          longitude={hospitalData.hospital_longitude}
        />
      </section>
      <section className="w-[358px] mx-[16px] mt-[24px]">
        {/* 병원 기본정보 */}
        <section>
          {/* 이름&주소 & 스크랩 버튼 */}
          <div className="flex w-[358px] h-[64px] border-b-2">
            <div>
              <p className="w-[200px] h-[24px] semibold-20">
                {hospitalData!.hospital_name}
              </p>
              <p className="w-[358px] h-[16px] regular-13 text-gray-800 mt-[2px]">
                {hospitalData!.hospital_address}
              </p>
            </div>
            <Image
              src={scrapIconSrc}
              alt="scrap Icon"
              className="w-[24px] h-[24px]"
              onClick={handleScrapClick}
            />
          </div>
          {/* 진료시간 */}
          <div className="w-[390px] h-[90px] mt-[20px]">
            {/* 시간에 따라 운영 여부 다르게 출력 */}
            <section className="flex flex-row align-middle w-[230px] h-[24px]">
              <Image
                src={timeIcon}
                alt="진료 시간"
                className="w-[24px] h-[24px]"
              />
              <span className="regular-14 ml-[4px] w-[160px] h-[24px] ">
                {isHospitalOpen}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  isTimeToggleOpen
                    ? setTimeToggleOpen(false)
                    : setTimeToggleOpen(true);
                }}
              >
                {isTimeToggleOpen ? "^" : "V"}
              </button>
              {/* 요일에 따라 요일&시간 다르게 출력 */}
            </section>
            <div>
              {isTimeToggleOpen && (
                <div>
                  <p>
                    월요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
                  </p>
                  <p>
                    화요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
                  </p>
                  <p>
                    수요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
                  </p>
                  <p>
                    목요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
                  </p>
                  <p>
                    금요일 : {secondRemovedStartTime} ~ {secondRemovedEndTime}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* 전화번호 */}
          <div className="flex flex-row">
            <Image
              src={phoneIcon}
              alt="전화번호"
              className="w-[24px] h-[24px]"
            />
            <span>{hospitalData!.hospital_contact}</span>
          </div>
          {/* 소개글 */}
          <div>
            <span>소개글</span>{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                isIntroductionToggleOpen
                  ? setIntroductionToggleOpen(false)
                  : setIntroductionToggleOpen(true);
              }}
            >
              {isIntroductionToggleOpen ? "^" : "V"}
            </button>
            <div>
              {isIntroductionToggleOpen && (
                <span>{hospitalData!.hospital_introduction}</span>
              )}
            </div>
          </div>
        </section>
        <Button
          type="button"
          buttonType="hollow"
          label="예약하기"
          onClick={goToApplyPage}
        />
      </section>
    </main>
  );
};

export default HospitalInfoHeader;
