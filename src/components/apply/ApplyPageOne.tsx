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
import PageCancel from "../layout/PageCancel";
import warning from "@/assets/icons/modal/warning.png";
import Image from "next/image";

const ApplyPageOne = ({
  setPageCount,
  hospitalId
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
  hospitalId: string;
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
    <div>
      <div className="flex w-full py-[15px]">
        <button className="ml-auto" onClick={handleBtnClick}>
          <PageCancel />
        </button>
      </div>
      <div className="flex mb-[30px]">
        <YellowBarMg />
        <GrayBarMg />
        <GrayBar />
      </div>
      <HospitalName hospitalId={hospitalId} />
      <article className="w-[100%] mt-3 mb-6 h-[168px] bg-green-300 rounded-lg overflow-hidden">
        병원 사진
      </article>
      <form
        className="flex flex-col min-h-[55vh]"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <p className="mb-7 font-bold text-xl text-black">
          정보를 입력해주세요.
        </p>
        <div className="mb-7">
          <p className="mb-3 text-[13px]">*이름</p>
          <input
            placeholder="홍길동"
            className="text-black mb-2 w-full px-4 py-[14px] h-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange"
            onChange={onChangeName}
            value={name}
          />
          {!nameValid && (
            <p className="text-[#F95F5F] text-[13px] flex">
              <Image src={warning} alt="" />
              이름을 기입해주세요.
            </p>
          )}
        </div>
        <div className="mb-7">
          <p className="mb-3 text-[13px]">*주민등록번호</p>
          <input
            className="text-black w-[45%] mb-2 px-4 py-[14px] mr-[10px] h-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange"
            onChange={onChangeIdNumber}
            value={idNumber}
            placeholder="생년월일 6자리"
            maxLength={6}
          />
          -
          <input
            maxLength={1}
            className="text-black ml-[10px] px-4 py-[14px] w-[40px] h-10 text-center rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange"
          />
          &nbsp; &nbsp;* &nbsp;* &nbsp;* &nbsp;* &nbsp;* &nbsp;*
          {!idNumberValid && (
            <p className="text-[#F95F5F] text-[13px] flex">
              <Image src={warning} alt="" />
              생년월일 6자리를 기입해주세요.
            </p>
          )}
        </div>
        <div className="mb-7">
          <p className="mb-3 text-[13px]">*휴대폰 번호</p>
          <input
            className="text-black w-full mb-2 px-4 py-[14px] h-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange"
            onChange={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="-없이 휴대폰 11자리 번호 입력"
            maxLength={11}
          />
          {!phoneValid && (
            <p className="text-[#F95F5F] text-[13px] flex">
              <Image src={warning} alt="" />
              전화번호를 11자리를 기입해주세요.
            </p>
          )}
        </div>
        <div className="mt-auto">
          <Button
            type="submit"
            buttonType="filled"
            size="base"
            label="다음"
            onClick={handleNextClick}
          />
        </div>
      </form>
    </div>
  );
};
export default ApplyPageOne;
