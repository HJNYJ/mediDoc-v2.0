// 병원 정보 공통 출력 section
"use client";
import { fetchHospitalData } from "@/hooks/getHospitalData";
import { removeTimeSecond, getTime } from "@/utils/changeTimeFormat";
import { checkHospitalOpen } from "@/utils/checkHospitalOpen";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const HospitalInfoHeader = ({ params }: { params: { hospitalId: string } }) => {
  const [isTimeToggleOpen, setTimeToggleOpen] = useState(false); // 진료시간 toggle
  const [isIntroductionToggleOpen, setIntroductionToggleOpen] = useState(false); // 소개글 toggle
  // 병원 데이터 가져오기
  const {
    isLoading,
    isError,
    data: hospitalData
  } = useQuery({
    queryKey: ["hospitalInfo", params.hospitalId],
    queryFn: () => fetchHospitalData(params.hospitalId)
  });

  if (isLoading) return <p>병원 데이터를 가져오는 중입니다.</p>;
  if (isError) return <p>병원 데이터를 가져오는 동안 에러가 발생했습니다</p>;

  // 시간 출력 타입 변경
  const secondRemovedStartTime = removeTimeSecond(hospitalData.start_time);
  const secondRemovedEndTime = removeTimeSecond(hospitalData.end_time);

  // 운영 여부
  const currentTime = getTime();
  const isHospitalOpen = checkHospitalOpen(
    currentTime,
    secondRemovedStartTime,
    secondRemovedEndTime
  );

  return (
    <>
      {/* 병원 위치(지도) */}
      <section>
        <div>병원 위치(지도)</div>
      </section>
      <p>--------------------</p>
      {/* 병원 기본정보 */}
      <section>
        {/* 이름&주소 & 스크랩 버튼 */}
        <div className="flex">
          <div>
            <h1>{hospitalData?.hospital_name}</h1>
            <p>{hospitalData.hospital_address}</p>
          </div>
          <span>(스크랩icon)</span>
        </div>
        <p>----------</p>
        {/* 진료시간 */}
        <div>
          {/* 시간에 따라 운영 여부 다르게 출력 */}
          <span>(진료시간icon)</span> <span>{isHospitalOpen}</span>{" "}
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
        <div>
          <span>(전화번호icon)</span>{" "}
          <span>{hospitalData.hospital_contact}</span>
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
              <span>{hospitalData.hospital_introduction}</span>
            )}
          </div>
        </div>
      </section>
      <button>예약하기</button>
    </>
  );
};

export default HospitalInfoHeader;
