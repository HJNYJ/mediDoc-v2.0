"use client";

import React from "react";
import { getDate } from "@/utils/changeTimeFormat";
import useApplyStore from "@/shared/zustand/applyStore";

const TimeSelect = () => {
  const { selectedDate, setSelectedTime, setIsTimeClicked, selectedTime } =
    useApplyStore();
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

  const isSelectedDateBeforeAfterToday = (): "before" | "after" | "today" => {
    const nowDateObj = getDate(now);

    const selectedDateObj = getDate(selectedDate);

    if (selectedDateObj < nowDateObj) {
      return "before";
    } else if (selectedDateObj > nowDateObj) {
      return "after";
    } else {
      return "today";
    }
  };

  const isDisabled = (time: string) => {
    const [hour] = time.split(":");
    const selectedHour = parseInt(hour);

    if (isSelectedDateBeforeAfterToday() === "before") return true;
    if (isSelectedDateBeforeAfterToday() === "after") return false;

    if (now.getHours() > selectedHour) {
      return true;
    } else {
      return false;
    }
  };

  const morningClick = (time: string) => {
    setSelectedTime(time);
    setIsTimeClicked(true);
  };

  const afternoonClick = (time: string) => {
    setSelectedTime(time);
    setIsTimeClicked(true);
  };
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
