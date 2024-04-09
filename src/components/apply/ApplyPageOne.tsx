"use client";

import HospitalName from "./HospitalName";
import useApplyStore from "../../shared/zustand/applyStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ApplyPageOne = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { name, setName, idNumber, setIdNumber, phoneNumber, setPhoneNumber } =
    useApplyStore();
  const [nameValid, setNameValid] = useState<boolean>(false);
  const [idNumberValid, setIdNumberValid] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const router = useRouter();

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    setNameValid(value.trim() !== "");
  };
  const onChangeIdNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdNumber(parseFloat(value));
    setIdNumberValid(value.length === 6);
  };
  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(parseFloat(value));
    setPhoneValid(value.length === 11);
  };

  const handleNextClick = () => {
    if (nameValid && idNumberValid && phoneValid) {
      return setPageCount("two");
    }
  };

  const handleBtnClick = () => {
    router.push("/home");
  };

  return (
    <>
      <button className="m-2" onClick={handleBtnClick}>
        X
      </button>
      <HospitalName />
      <article className="m-2">병원 지도</article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="m-2">
          이름 :
          <input
            className="text-black m-2"
            onChange={onChangeName}
            value={name}
          />
          {!nameValid && <p style={{ color: "red" }}>이름이 비어있습니다.</p>}
        </div>
        <div className="m-2">
          주민등록번호 :
          <input
            className="text-black m-2"
            onChange={onChangeIdNumber}
            value={idNumber}
          />
          {!idNumberValid && <p style={{ color: "red" }}>생년월일 다 적어</p>}
        </div>
        <div className="m-2">
          휴대전화번호 :
          <input
            className="text-black m-2"
            onChange={onChangePhoneNumber}
            value={phoneNumber}
          />
          {!phoneValid && <p style={{ color: "red" }}>번달 번줌?</p>}
        </div>
        <button className="m-2" onClick={handleNextClick}>
          다음
        </button>
      </form>
    </>
  );
};
export default ApplyPageOne;
