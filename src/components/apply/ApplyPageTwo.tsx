"use client";

import Calendar from "./CalendarDay";
import TimeSelect from "./TimeSelect";
import Button from "../layout/Buttons";
import GrayBar from "../layout/GrayBar";
import { useRouter } from "next/navigation";
import PageCancel from "../layout/PageCancel";
import PagebackBtn from "../layout/PageBackBtn";
import YellowBarMg from "../layout/YellowBarMg";
import useApplyStore from "@/shared/zustand/applyStore";

const ApplyPageTwo = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isTimeClicked, isDateClicked, setName, setIdNumber, setPhoneNumber } =
    useApplyStore();
  // 쥬스탄드를 사용하여 선택한 날짜와 시간을 담아주게 사용 하였습니다.
  const router = useRouter();

  const onClickNextButtonHandler = () => {
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
  // 날짜와 시간을 모두 선택하면 다음페이지로 이동하게하는 유효성 검사입니다.
  const onClickBackButtonHandler = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    return setPageCount("one");
  };
  // 뒤로가기버튼을 누르게되면 이전페이지로 이동하되 정보를 리셋시키고 이동하게 됩니다.
  const onClickButtonHandler = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    router.push("/home");
  };
  // X 버튼을 누르게 되면 이름 생년월일 전화번호를 비우고 홈페이지로 이동하게 되는 로직입니다.
  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="flex w-full py-[15px]">
        <button
          className="mr-auto"
          onClick={() => {
            onClickBackButtonHandler();
          }}
        >
          <PagebackBtn />
        </button>
        <button className="ml-auto" onClick={onClickButtonHandler}>
          <PageCancel />
        </button>
      </div>
      <div className="flex mb-[30px]">
        <YellowBarMg />
        <YellowBarMg />
        <GrayBar />
      </div>
      <Calendar />
      <TimeSelect />
      <div className="mt-auto">
        <Button
          type="button"
          buttonType="filled"
          size="base"
          label="다음"
          onClick={() => onClickNextButtonHandler()}
        />
      </div>
    </div>
  );
};

export default ApplyPageTwo;
