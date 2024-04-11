"use client";

import HospitalName from "./HospitalName";
import useApplyStore from "../../shared/zustand/applyStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

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
    setNameValid(value.length >= 2);
  };
  const onChangeIdNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIdNumber(value);
    setIdNumberValid(value.length === 6);
  };
  const onChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    setPhoneValid(value.length === 11);
  };

  const handleNextClick = () => {
    if (nameValid && idNumberValid && phoneValid) {
      return setPageCount("two");
    } else {
      alert("빈칸을 모두 채워주세요");
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
        <p className="m-2">정보를 입력해주세요.</p>
        <div className="m-2">
          이름 :
          <input
            placeholder="홍길동"
            className="text-black m-2"
            onChange={onChangeName}
            value={name}
          />
          {!nameValid && <p className="text-red-500">이름을 기입해주세요.</p>}
        </div>
        <div className="m-2">
          주민등록번호 :
          <input
            className="text-black m-2"
            onChange={onChangeIdNumber}
            value={idNumber}
            placeholder="생년월일"
          />
          {!idNumberValid && (
            <p className="text-red-500">생년월일 6자리를 기입해주세요.</p>
          )}
        </div>
        <div className="m-2">
          휴대전화번호 :
          <input
            className="text-black m-2"
            onChange={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="전화번호"
          />
          {!phoneValid && (
            <p className="text-red-500">전화번호를 11자리를 기입해주세요.</p>
          )}
        </div>
        <button className="m-2 border-2" onClick={handleNextClick}>
          다음
        </button>
      </form>
    </>
  );
};
export default ApplyPageOne;
