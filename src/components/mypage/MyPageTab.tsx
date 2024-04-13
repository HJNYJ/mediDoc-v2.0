// 마이페이지 탭 컴포넌트

import React, { useState } from "react";
import ReservationInfoList from "./ReservationInfoList";
import ScrappedList from "./ScrappedList";
import MyQuestionList from "./MyQuestionList";

const MyPageTab = () => {
  const [currentTab, SetCurrentTab] = useState("예약 정보");
  const onChangeTabHandler = (tabName: string) => {
    SetCurrentTab(tabName);
  };
  return (
    <>
      <section className="w-[358px] mx-[16px]">
        <div>
          <button
            className={`rounded-lg focus:outline-none text-[16px] font-bold w-[119.3px] h-[35px] ${
              currentTab === "예약 정보"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => onChangeTabHandler("예약 정보")}
          >
            예약 정보
          </button>
          <button
            className={`rounded-lg focus:outline-none text-[16px] font-bold w-[119.3px] h-[35px] ${
              currentTab === "스크랩"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => onChangeTabHandler("스크랩")}
          >
            스크랩
          </button>
          <button
            className={`rounded-lg focus:outline-none text-[16px] font-bold w-[119.3px] h-[35px] ${
              currentTab === "내가 한 질문"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => onChangeTabHandler("내가 한 질문")}
          >
            내가 한 질문
          </button>
        </div>
      </section>
      <section>{currentTab === "예약 정보" && <ReservationInfoList />}</section>
      <section>{currentTab === "스크랩" && <ScrappedList />}</section>
      <section>{currentTab === "내가 한 질문" && <MyQuestionList />}</section>
    </>
  );
};

export default MyPageTab;
