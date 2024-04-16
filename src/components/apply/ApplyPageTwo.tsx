"use client";

import TimeSelect from "./TimeSelect";
import Calendar from "./CalendarDay";
import { useRouter } from "next/navigation";
import useApplyStore from "@/shared/zustand/applyStore";
import Button from "../layout/Buttons";
import YellowBarMg from "../layout/YellowBarMg";
import GrayBar from "../layout/GrayBar";

const ApplyPageTwo = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isTimeClicked, isDateClicked, setName, setIdNumber, setPhoneNumber } =
    useApplyStore();

  const router = useRouter();

  const handleNextClick = () => {
    if (isDateClicked === false && isTimeClicked === false) {
      alert("날짜와 시간 모두 선택해주세요.");
    } else if (isTimeClicked === false) {
      alert("시간을 선택 해주세요.");
    } else if (isDateClicked === false) {
      alert("날짜를 선택 해주세요.");
    } else if (isDateClicked === true && isTimeClicked === true) {
      return setPageCount("three");
    }
  };
  const backHandlerClick = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    return setPageCount("one");
  };

  const handleBtnClick = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    router.push("/home");
  };
  return (
    <div>
      {/* mt 임시 탬 */}
      <p className="mt-10">
        <button
          className="m-2"
          onClick={() => {
            backHandlerClick();
          }}
        >
          &lt;
        </button>
        <button className="m-4" onClick={handleBtnClick}>
          X
        </button>
        <div className="flex">
          <YellowBarMg />
          <YellowBarMg />
          <GrayBar />
        </div>
      </p>
      <p className="mb-40">
        <Calendar />
        <TimeSelect />
      </p>
      <Button
        type="button"
        buttonType="filled"
        size="base"
        label="다음"
        onClick={() => handleNextClick()}
      />
    </div>
  );
};

export default ApplyPageTwo;
