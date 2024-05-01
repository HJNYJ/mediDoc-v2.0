"use client";

import Image from "next/image";
import { useState } from "react";
import Back from "@/assets/upanddown/Back.png";
import Next from "@/assets/upanddown/Next.png";
import { getDate } from "@/utils/changeTimeFormat";
import uptoggle from "@/assets/upanddown/UpToggle.png";
import useApplyStore from "@/shared/zustand/applyStore";
import downtoggle from "@/assets/upanddown/DownToggle.png";

import type { CalendarDay } from "@/types";

const Calendar = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const { setSelectedDate, setIsDateClicked, selectedDate } = useApplyStore();
  // 쥬스탄드로 선택하는 날짜를 담아 다음페이지로 이동하게 하였습니다.
  const [selectedOneDate, setSelectedOneDate] = useState<Date>();
  const handleDateClick = (date: Date, cellDate: Date) => {
    setSelectedOneDate(cellDate);
    setIsDateClicked(true);
    setSelectedDate(date);
    // 주스탄드로 관리하는 setSate와 해당날짜를 비교하기위한 state를 만들었습니다.
  };
  const specifiedDate = getDate(selectedDate);
  // 선택한 날짜를 보여주기위해 스트링타입으로 변환하여 사용했습니다.
  const [calendarToggle, setCalendarToggle] = useState<number>(1);
  // 캘린더에 토글버튼을 위해 만들었습니다.
  const [isOpenToggle, setIsOpenToggle] = useState<boolean>(true);
  // 토글버튼을 불린형으로 줄였다 커졌다 하기위한 스테이트입니다.
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // 이전달 다음달 버튼을 위한 스테이트 입니다.
  const daysInWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const monthsInYear = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];

  const generateMatrix = (): CalendarDay[][] => {
    const matrix: CalendarDay[][] = [];
    // for문을 사용하려고하는데 값을 담아주기 위해 배열을 사용하여 map메소드를 사용하여 캘린더의 각 날짜를 보여주기 위해 사용했습니다.
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    // 이전달 다음달 버튼을 위해 선택한 날짜의 년 월을 변경하기 위한 로직입니다.
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    // 달력 마다 각 월 일을 보여주기 위해 사용했습니다.

    let date = 1;
    for (let i = 0; i < calendarToggle; i++) {
      matrix[i] = [];
      // for문을 사용하여 세로의 각 날짜를 보여주는 로직입니다.
      for (let j = 0; j < 7; j++) {
        // for문을 사용하여 가로의 각 날짜를 보여주는 로직입니다.
        if (i === 0 && j < firstDay) {
          matrix[i][j] = {
            date: new Date(year, month, date - firstDay + j),
            isCurrentMonth: false
          };
        } else if (date > numDays) {
          matrix[i][j] = {
            date: new Date(year, month, date++),
            isCurrentMonth: false
          };
        } else {
          matrix[i][j] = {
            date: new Date(year, month, date),
            isCurrentMonth: true
          };
          date++;
        }
      }
    }
    // 조건문을 사용하여 해당 일자 까지 (ex) 1dnjfqnxj 28일인 달이 있고 31일인 달이 있어서 사용 하였습니다.
    return matrix;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };
  // 이전달 다음달 버튼 로직입니다.
  const toggleCalendarHandler = () => {
    if (isOpenToggle === false) {
      setIsOpenToggle(true);
    } else {
      setIsOpenToggle(false);
    }
    isOpenToggle ? setCalendarToggle(6) : setCalendarToggle(1);
  };
  // 캘린더의 토글기능을 위해 for문 내부의 사용하였습니다.
  const matrix = generateMatrix();

  return (
    <div>
      <div className="text-center mb-4">
        <div className="flex items-center justify-center">
          <button className="m-2" onClick={handlePrevMonth}>
            <div className="w-5 relative top-[1px]">
              <Image src={Back} alt="Back" />
            </div>
          </button>
          <span className="m-2 bold-20">
            {currentMonth.getFullYear()}.{monthsInYear[currentMonth.getMonth()]}
          </span>
          <button className="m-2" onClick={handleNextMonth}>
            <div className="w-5 relative top-[1px]">
              <Image src={Next} alt="Next" />
            </div>
          </button>
        </div>
        <div className="text-gray-800">{specifiedDate}</div>
      </div>

      <div className="bg-white rounded-b-lg shadow-[0_3px_5px_-2px_rgba(0,0,0,0.3)] text-center mb-20">
        <table className="mx-auto px-5">
          <thead>
            <tr>
              {daysInWeek.map((day) => (
                <th key={day} className="w-[52px]">
                  {day}
                  {/* 요일을 보여주는 로직입니다. */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={isOpenToggle ? "h-3" : "h-20"}>
            {matrix.map((row, rowIndex) => {
              // 각 일자를 나타내는 함수입니다.
              return (
                <tr key={rowIndex} className="bold-14">
                  {row.map((cell, cellIndex) => {
                    const cellDate = new Date(cell.date);
                    const isPastDate = cellDate < currentDate;
                    return (
                      <td
                        onClick={
                          !isPastDate
                            ? () => handleDateClick(cell.date, cellDate)
                            : undefined
                        }
                        key={cellIndex}
                        style={{
                          cursor: isPastDate ? "default" : "pointer",
                          color: isPastDate ? "gray" : "black"
                        }}
                        className={`z-10 text-black m-4 px-2 text-center ${JSON.stringify(selectedOneDate) === JSON.stringify(cellDate) ? "selectDate" : ""}`}
                      >
                        {/* 삼항연산자를 사용하여 선택한 날짜에 스타일을 주입하기위해 사용하였고  Date타입이기에 스트링 타입으로 바꿔서 비교연산자를 사용했습니다.*/}
                        {cell.date.getDate()}
                        {/* 스트링 타입으로 바꿔서 모른 일자가 보여지게 됩니다. */}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => toggleCalendarHandler()} className="w-6">
          {isOpenToggle ? (
            <Image src={downtoggle} alt="down" />
          ) : (
            <Image src={uptoggle} alt="up" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
