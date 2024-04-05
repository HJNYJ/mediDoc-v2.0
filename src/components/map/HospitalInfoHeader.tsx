// 병원 정보 공통 출력 section
"use client";
import React, { useState } from "react";

const HospitalInfoHeader = () => {
  const [isTimeToggleOpen, setTimeToggleOpen] = useState(false);
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
            <h1>병원명</h1>
            <p>서울시 충무로 병원주소</p>
          </div>
          <span>(스크랩icon)</span>
        </div>
        <p>----------</p>
        {/* 진료시간 */}
        <div>
          {/* 시간에 따라 운영 여부 다르게 출력 */}
          <span>(진료시간icon)</span> <span>진료 종료</span>
          {/* 요일에 따라 요일&시간 다르게 출력 */}
          <div>
            <span>목요일 10:00~21:00</span>{" "}
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
            {isTimeToggleOpen && <p>Dropdown 전체 내용</p>}
          </div>
        </div>
        {/* 전화번호 */}
        <div>
          <span>(전화번호icon)</span> <span>02-111-1111</span>
        </div>
        {/* 소개글 */}
        <div>
          <span>저희병원에 일단 오세요</span> <span>토글icon</span>
        </div>
      </section>
      <button>예약하기</button>
    </>
  );
};

export default HospitalInfoHeader;
