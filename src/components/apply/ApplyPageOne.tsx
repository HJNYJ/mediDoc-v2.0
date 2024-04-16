"use client";

import HospitalName from "./HospitalName";
import useApplyStore from "../../shared/zustand/applyStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import Button from "../layout/Buttons";
import YellowBarMg from "../layout/YellowBarMg";
import GrayBarMg from "../layout/GrayBarMg";
import GrayBar from "../layout/GrayBar";

const ApplyPageOne = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    name,
    setName,
    idNumber,
    setIdNumber,
    phoneNumber,
    setPhoneNumber,
    setUserNameData,
    setUserEmailData
  } = useApplyStore();

  const [nameValid, setNameValid] = useState<boolean>(false);
  const [idNumberValid, setIdNumberValid] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const user = session?.user;
      setUserEmailData(user?.email);
      setUserNameData(user?.user_metadata.name);
    };
    fetchUser();
  }, []);

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
    if (isNaN(Number(idNumber))) {
      alert("주민번호는 숫자만 입력 가능합니다.");
      return;
    } else if (isNaN(Number(phoneNumber))) {
      alert("연락처는 숫자만 입력 가능합니다.");
      return;
    } else if (!nameValid) {
      alert("이름은 반드시 2글자 이상이어야 합니다.");
      return;
    } else if (!idNumberValid) {
      alert("생년월일이 6자리가 아닙니다.");
      return;
    } else if (!phoneValid) {
      alert("연락처가 11자리가 아닙니다.");
      return;
    } else {
      return setPageCount("two");
    }
  };

  const handleBtnClick = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    router.push("/home");
  };

  return (
    <div className="w-[358px] mx-[16px]">
      {/* mt 임시 탬 */}
      <button className="mt-10" onClick={handleBtnClick}>
        X
      </button>
      <div className="flex">
        <YellowBarMg />
        <GrayBarMg />
        <GrayBar />
      </div>
      <HospitalName />
      <article className="m-2">병원 사진</article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="m-2">정보를 입력해주세요.</p>
        <div className="m-2">
          <p>*이름</p>
          <input
            placeholder="홍길동"
            className="text-black m-2 h-10 rounded-lg px-1 w-60 border-2 focus:outline-none focus:ring-2 focus:ring-orange"
            onChange={onChangeName}
            value={name}
          />
          {!nameValid && <p className="text-red-500">이름을 기입해주세요.</p>}
        </div>
        <div className="m-2">
          <p>*주민등록번호</p>
          <input
            className="text-black m-2 w-32 h-10 rounded-lg px-1 border-2 focus:outline-none focus:ring-2 focus:ring-orange"
            onChange={onChangeIdNumber}
            value={idNumber}
            placeholder="생년월일 6자리"
            maxLength={6}
          />
          -
          <input
            maxLength={1}
            className="text-black m-2 w-6 h-10 text-center rounded-lg px-1 border-2 focus:outline-none focus:ring-2 focus:ring-orange"
          />
          * * * * * *
          {!idNumberValid && (
            <p className="text-red-500">생년월일 6자리를 기입해주세요.</p>
          )}
        </div>
        <div className="m-2 mb-4">
          <p>*휴대폰 번호</p>
          <input
            className="text-black m-2 h-10 rounded-lg px-1 w-60 border-2 focus:outline-none focus:ring-2 focus:ring-orange"
            onChange={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="-없이 휴대폰 11자리 번호 입력"
            maxLength={11}
          />
          {!phoneValid && (
            <p className="text-red-500">전화번호를 11자리를 기입해주세요.</p>
          )}
        </div>
        <Button
          type="submit"
          buttonType="filled"
          size="base"
          label="다음"
          onClick={handleNextClick}
        >
          .
        </Button>
      </form>
    </div>
  );
};
export default ApplyPageOne;
