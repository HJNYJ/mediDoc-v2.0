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
        <button onClick={() => handleNextClick("one")}>이전</button>
      </p>
      <button onClick={handleBtnClick}>X</button>
      <p>
        <Calendar />
        <TimeSelect />
      </p>
      <button onClick={() => handleNextClick("three")}>다음</button>
    </div>
  );
};

export default ApplyPageTwo;
