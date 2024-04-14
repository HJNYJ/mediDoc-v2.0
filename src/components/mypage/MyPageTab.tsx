// 마이페이지 탭 컴포넌트

import React, { useState } from "react";
import ReservationInfoList from "./ReservationInfoList";
import ScrappedList from "./ScrappedList";
import MyQuestionList from "./MyQuestionList";
import Tab from "../layout/Tabs";

const MyPageTab = () => {
  const [currentTab, SetCurrentTab] = useState("예약 정보");
  const onChangeTabHandler = (tabName: string) => {
    SetCurrentTab(tabName);
  };
  return (
    <>
      <section className="w-[358px] mx-[16px]">
        <div className="flex">
          <Tab
            onClick={() => onChangeTabHandler("예약 정보")}
            text="bold-16"
            active={currentTab === "예약 정보"}
          >
            예약 정보
          </Tab>
          <Tab
            onClick={() => onChangeTabHandler("스크랩")}
            text="bold-16"
            active={currentTab === "스크랩"}
          >
            스크랩
          </Tab>
          <Tab
            onClick={() => onChangeTabHandler("내가 한 질문")}
            text="bold-16"
            active={currentTab === "내가 한 질문"}
          >
            내가 한 질문
          </Tab>
        </div>
      </section>
      <section>{currentTab === "예약 정보" && <ReservationInfoList />}</section>
      <section>{currentTab === "스크랩" && <ScrappedList />}</section>
      <section>{currentTab === "내가 한 질문" && <MyQuestionList />}</section>
    </>
  );
};

export default MyPageTab;
