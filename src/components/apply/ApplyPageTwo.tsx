"use client";

import React, { useState } from "react";
import TimeSelect from "./TimeSelect";
import Calendar from "./CalendarDay";
import { useRouter } from "next/navigation";
import useApplyStore from "@/shared/zustand/applyStore";

const ApplyPageTwo = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [nextToggle, setNextToggle] = useState<boolean>(false);
  const { selectedDate } = useApplyStore();
  const router = useRouter();
  const handleNextClick = (param: string) => {
    if (selectedDate.toString() === "") {
      alert("시간과 날짜를 모두 입력해주세요.");
    } else {
      return setPageCount(param);
    }
  };
  console.log("시간 초기값", selectedDate);
  const handleBtnClick = () => {
    router.push("/home");
  };
  return (
    <div>
      <p>
        <button className="m-2" onClick={() => handleNextClick("one")}>
          &lt;
        </button>
        <button className="m-4" onClick={handleBtnClick}>
          X
        </button>
      </p>

      <p>
        <Calendar />
        <TimeSelect />
      </p>
      <button className="m-2" onClick={() => handleNextClick("three")}>
        다음
      </button>
    </div>
  );
};

export default ApplyPageTwo;
