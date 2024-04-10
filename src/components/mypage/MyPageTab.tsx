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
      <section>
        <div>
          <button
            className={`px-10 py-3 rounded-lg focus:outline-none text-lg ${
              currentTab === "예약 정보"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => onChangeTabHandler("예약 정보")}
          >
            예약 정보
          </button>
          <button
            className={`px-10 py-3 rounded-lg focus:outline-none text-lg ${
              currentTab === "스크랩"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => onChangeTabHandler("스크랩")}
          >
            스크랩
          </button>
          <button
            className={`px-10 py-3 rounded-lg focus:outline-none text-lg ${
              currentTab === "내가 한 질문"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
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
