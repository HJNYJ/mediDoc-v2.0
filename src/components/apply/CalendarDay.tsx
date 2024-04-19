"use client";

import useApplyStore from "@/shared/zustand/applyStore";
import downtoggle from "@/assets/upanddown/down_toggle.png";
import uptoggle from "@/assets/upanddown/up_toggle.png";
import { useState } from "react";
import Image from "next/image";

import type { CalendarDay } from "@/types";
const Calendar = () => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const { setSelectedDate, setIsDateClicked } = useApplyStore();

  const [selectedOneDate, setSelectedOneDate] = useState<Date>();

  const handleDateClick = (date: Date, cellDate: Date) => {
    setSelectedOneDate(cellDate);

    setIsDateClicked(true);
    setSelectedDate(date);
  };

  const [calendarToggle, setCalendarToggle] = useState<number>(1);
  const [isOpenToggle, setIsOpenToggle] = useState<boolean>(true);

  const [currentMonth, setCurrentMonth] = useState(new Date());
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

  const todayDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const toDay = todayDate(new Date());

  const generateMatrix = (): CalendarDay[][] => {
    const matrix: CalendarDay[][] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < calendarToggle; i++) {
      matrix[i] = [];
      for (let j = 0; j < 7; j++) {
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
  const toggleCalendarHandler = () => {
    if (isOpenToggle === false) {
      setIsOpenToggle(true);
    } else {
      setIsOpenToggle(false);
    }
    isOpenToggle ? setCalendarToggle(6) : setCalendarToggle(1);
  };
  const matrix = generateMatrix();

  return (
    <div className="">
      <div className="text-center">
        <button className="m-2" onClick={handlePrevMonth}>
          &lt;
        </button>
        <span className="m-2">
          {currentMonth.getFullYear()}. {monthsInYear[currentMonth.getMonth()]}
        </span>
        <button className="m-2" onClick={handleNextMonth}>
          &gt;
        </button>
        {toDay}
      </div>

      <div
        className="bg-white rounded-b-lg shadow-[0_3px_5px_-2px_rgba(0,0,0,0.3)]
       text-center mb-20"
      >
        <table className="mx-auto px-5">
          <thead>
            <tr className="m-2">
              {daysInWeek.map((day) => (
                <th key={day} className="w-[52px]">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={isOpenToggle ? "h-3" : "h-20"}>
            {matrix.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
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
                        className={`z-10 text-black m-4 px-4 text-center ${JSON.stringify(selectedOneDate) === JSON.stringify(cellDate) ? "selectDate" : ""}`}
                      >
                        {cell.date.getDate()}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={() => toggleCalendarHandler()}>
          {isOpenToggle ? (
            <Image src={downtoggle} alt="" />
          ) : (
            <Image src={uptoggle} alt="" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
