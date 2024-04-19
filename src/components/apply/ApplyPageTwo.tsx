"use client";

import TimeSelect from "./TimeSelect";
import Calendar from "./CalendarDay";
import { useRouter } from "next/navigation";
import useApplyStore from "@/shared/zustand/applyStore";
import Button from "../layout/Buttons";
import YellowBarMg from "../layout/YellowBarMg";
import GrayBar from "../layout/GrayBar";
import PageCancel from "../layout/PageCancel";
import PagebackBtn from "../layout/PageBackBtn";

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
    router.push(`http://localhost:3000/home`);
  };
  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="flex w-full py-[15px]">
        <button
          className="mr-auto"
          onClick={() => {
            backHandlerClick();
          }}
        >
          <PagebackBtn />
        </button>
        <button className="ml-auto" onClick={handleBtnClick}>
          <PageCancel />
        </button>
      </div>
      <div className="flex mb-[30px]">
        <YellowBarMg />
        <YellowBarMg />
        <GrayBar />
      </div>
      <p className="">
        <Calendar />
        <TimeSelect />
      </p>
      <div className="mt-auto">
        <Button
          type="button"
          buttonType="filled"
          size="base"
          label="다음"
          onClick={() => handleNextClick()}
        />
      </div>
    </div>
  );
};

export default ApplyPageTwo;
