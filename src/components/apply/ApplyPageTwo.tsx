"use client";

import React from "react";
import TimeSelect from "./TimeSelect";
import Calendar from "./CalendarDay";
import { useRouter } from "next/navigation";

const ApplyPageTwo = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const handleNextClick = (param: string) => {
    return setPageCount(param);
  };

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
