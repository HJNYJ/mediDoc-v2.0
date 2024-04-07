import useApplyStore from "@/shared/zustand/applyStore";
import React, { useState } from "react";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
}

const Calendar: React.FC = () => {
  /** 현재 날짜 */
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  /** 선택된 날짜 */
  const { selectedDate, setSelectedDate } = useApplyStore();

  const handleDateClick = (date: Date) => {
    // 날짜 포맷 (ex: 2024-4-7)
    const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    setSelectedDate(formatDate);
  };

  /** 캘린더 생성 */
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const monthsInYear = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월"
  ];

  const generateMatrix = (): CalendarDay[][] => {
    const matrix: CalendarDay[][] = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
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

  const matrix = generateMatrix();

  return (
    <div>
      <button className="border-2" onClick={handlePrevMonth}>
        이전 달
      </button>
      <span className="border-2">
        {currentMonth.getFullYear()}년 {monthsInYear[currentMonth.getMonth()]}
      </span>
      <button className="border-2" onClick={handleNextMonth}>
        다음 달 --- {selectedDate}
      </button>
      <table>
        <thead>
          <tr className="border-2">
            {daysInWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
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
                          ? () => handleDateClick(cell.date)
                          : undefined
                      }
                      key={cellIndex}
                      style={{
                        backgroundColor: cell.isCurrentMonth
                          ? "white"
                          : "lightgray",
                        cursor: !isPastDate ? "pointer" : "default",
                        color: isPastDate ? "gray" : "black"
                      }}
                      className="text-black"
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
    </div>
  );
};

export default Calendar;
