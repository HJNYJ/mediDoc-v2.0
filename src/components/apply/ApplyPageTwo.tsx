"use client";

import TimeSelect from "./TimeSelect";
import Calendar from "./CalendarDay";
import { useRouter } from "next/navigation";
import useApplyStore from "@/shared/zustand/applyStore";

const ApplyPageTwo = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isTimeClicked, isDateClicked, setName, setIdNumber, setPhoneNumber } =
    useApplyStore();
  const router = useRouter();

  const handleNextClick = (param: string) => {
    if (isDateClicked === false && isTimeClicked === false) {
      alert("날짜와 시간 모두 선택해주세요.");
    } else if (isTimeClicked === false) {
      alert("시간을 선택 해주세요.");
    } else if (isDateClicked === false) {
      alert("날짜를 선택 해주세요.");
    } else if (isDateClicked === true && isTimeClicked === true) {
      return setPageCount(param);
    } else if (param === "one") {
      setName("");
      setIdNumber("");
      setPhoneNumber("");
      setPageCount("one");
    }
  };

  const handleBtnClick = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
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
      <button
        className="m-4 h-10 border-2 text-center w-60 rounded-lg"
        onClick={() => handleNextClick("three")}
      >
        다음
      </button>
    </div>
  );
};

export default ApplyPageTwo;
