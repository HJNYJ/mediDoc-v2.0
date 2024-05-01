"use client";

import React from "react";
import { getDate } from "@/utils/changeTimeFormat";
import useApplyStore from "@/shared/zustand/applyStore";

const TimeSelect = () => {
  const { selectedDate, setSelectedTime, setIsTimeClicked, selectedTime } =
    useApplyStore();
  // 쥬스탄드로 선택한 시간을 담기위해 사용했습니다.
  const morning = ["9:00", "10:00", "11:00", "12:00"];
  const afternoon = [
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00"
  ];
  const now = new Date();
  // 현재날짜를 선언하여 사용했습니다.

  const isSelectedDateBeforeAfterToday = (): "before" | "after" | "today" => {
    // 함수를 만들때 필요한 것은 이전인이 이후인지 오늘인지 이기에 타입을 직관적으로 표현했습니다.
    const nowDateObj = getDate(now);
    const selectedDateObj = getDate(selectedDate);
    // 쥬스탄드에서 선택한 날짜와 현재 날짜를 스트일타입으로 선언하였습니다.
    if (selectedDateObj < nowDateObj) {
      return "before";
    } else if (selectedDateObj > nowDateObj) {
      return "after";
    } else {
      return "today";
    }
  };
  // 현재날짜와 선택한 날짜를 비교하여 타입을 리턴하는 로직입니다.

  const isDisabled = (time: string) => {
    const [hour] = time.split(":");
    const selectedHour = parseInt(hour);
    // 시간에 따라 메서드를 사용하여 : 로 분리하고 , 시간을 넘버타입으로 변환했습니다.
    if (isSelectedDateBeforeAfterToday() === "before") return true;
    if (isSelectedDateBeforeAfterToday() === "after") return false;

    if (now.getHours() > selectedHour) {
      return true;
    } else {
      return false;
    }
  };
  // if문을 사용해 이전일때는 트루 이후일때는 폴스를 반환하고, 전역으로 선언한 현재날짜의 시간을
  // 가져와 인자로 담아오는 선택한 시간을 비교하여 불린형으로 반환 합니다.
  const morningClick = (time: string) => {
    setSelectedTime(time);
    setIsTimeClicked(true);
  };

  const afternoonClick = (time: string) => {
    setSelectedTime(time);
    setIsTimeClicked(true);
  };
  // 오전과 오후를 나눠서 값을 담아줍니다.
  return (
    <div>
      <div className="bold-16">시간선택</div>
      <div className="my-3">오전</div>
      <div>
        {morning.map((time, idx) => {
          return (
            <button
              key={idx}
              onClick={() => morningClick(time)}
              className={`border m-1 w-14 h-8 rounded-lg shadow-[0_1px_5px_-0px_rgba(0,0,0,0.3)] ${isDisabled(time) ? "disabled" : ""}
               ${selectedTime === time ? "bg-yellow text-orange border-orange border-2 font-bold" : ""}`}
              disabled={isDisabled(time)}
            >
              {time}
            </button>
          );
        })}
      </div>
      <div className="my-3">오후</div>
      <div className="flex flex-wrap mb-6">
        {afternoon.map((time, idx) => {
          return (
            <button
              key={idx}
              onClick={() => afternoonClick(time)}
              className={`border m-1 w-14 h-8 rounded-lg shadow-[0_1px_5px_-0px_rgba(0,0,0,0.3)] ${isDisabled(time) ? "disabled" : ""}
               ${selectedTime === time ? "bg-yellow text-orange border-orange border-2 font-bold" : ""}`}
              disabled={isDisabled(time)}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelect;
