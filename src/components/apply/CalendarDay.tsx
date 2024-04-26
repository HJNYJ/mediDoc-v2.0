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
  const [selectedOneDate, setSelectedOneDate] = useState<Date>();
  const handleDateClick = (date: Date, cellDate: Date) => {
    setSelectedOneDate(cellDate);
    setIsDateClicked(true);
    setSelectedDate(date);
  };
  const specifiedDate = getDate(selectedDate);
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
                </th>
              ))}
            </tr>
          </thead>
          <tbody className={isOpenToggle ? "h-3" : "h-20"}>
            {matrix.map((row, rowIndex) => {
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
                        {cell.date.getDate()}
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
