"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import { DeleteBtnIcon, WarningIcon } from "../layout/CheckIcons";
import HospitalName from "./HospitalName";
import useApplyStore from "../../shared/zustand/applyStore";
import Button from "../layout/Buttons";
import YellowBarMg from "../layout/YellowBarMg";
import GrayBarMg from "../layout/GrayBarMg";
import GrayBar from "../layout/GrayBar";
import PageCancel from "../layout/PageCancel";
import HospitalImage from "./HospitalImage";

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
  // 주스탄드로 이름 전화번호 생년월일 받습니다.

  const [nameValid, setNameValid] = useState<boolean>(false);
  const [idNumberValid, setIdNumberValid] = useState<boolean>(false);
  const [phoneValid, setPhoneValid] = useState<boolean>(false);
  const router = useRouter();
  // 이름 전화번호 생년월일에 유효성검사를 하게 useState를 만들었습니다.
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const user = session?.user;
      const email = user?.email ?? "";
      setUserEmailData(email);
      setUserNameData(user?.user_metadata.name);
    };
    fetchUser();
  }, [setUserEmailData, setUserNameData]);
  // 예약페이지에 오게되면 해당 병원의 이미지를 보여지게 되는 로직입니다.

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
  // 이름 생년월일 전화번호를 입력하고 setState에 값을 담게 됩니다. 또한 유효성검사를 진행합니다.

  const onClickNextHandler = () => {
    if (!(nameValid && idNumberValid && phoneValid)) {
      return;
    }
    setPageCount("two");
  };
  // if문을 사용하여 다음버튼을 누를시 유효성검사가 모두 통과 되면 다음페이지로 이동하는 로직입니다.
  const onClickButtonHandler = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    router.push("/home");
  };
  // X 버튼을 누르게 되면 이름 생년월일 전화번호를 비우고 홈페이지로 이동하게 되는 로직입니다.
  const checkMaxLength = (target) => {
    if (target.value.length > target.maxLength) {
      target.value = target.value.slice(0, target.maxLength);
    }
  };
  // 별도 alert창을 띄우지 않고 제한 자릿수를 넘으면 더이상 입력하지 않게 하는 함수입니다.
  const closeBtnHandler = (target) => {
    switch (target) {
      case "name":
        setName("");
        setNameValid(false);
        break;
      case "idNumber":
        setIdNumber("");
        setIdNumberValid(false);
        break;
      case "phoneNumber":
        setPhoneNumber("");
        setPhoneValid(false);
        break;
      default:
        break;
    }
  };
  // input창 안에 X버튼을 두고 switch문을 사용하여 해당 인자로 받아오는 값에서 값을 비워주고 유효성 검사를 리셋 시키는 함수입니다.
  return (
    <div>
      <div className="flex w-full py-[15px]">
        <button className="ml-auto" onClick={onClickButtonHandler}>
          <PageCancel />
        </button>
      </div>
      <div className="flex mb-[30px]">
        <YellowBarMg />
        <GrayBarMg />
        <GrayBar />
      </div>
      <HospitalName hospitalId={hospitalId} />
      <article className="w-[100%] mt-3 mb-6 h-[168px] rounded-lg overflow-hidden">
        <HospitalImage hospitalId={hospitalId} />
      </article>
      <div className="flex flex-col min-h-[55vh]">
        <p className="mb-7 font-bold text-xl text-black">
          정보를 입력해주세요.
        </p>
        <div className="mb-7">
          <p className="mb-3 text-[13px]">*이름</p>
          <label className="relative">
            <input
              placeholder="홍길동"
              className="text-black mb-2 w-full px-4 py-[14px] h-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange"
              onChange={onChangeName}
              value={name}
            />
            <button
              className="absolute top-[50%] right-4 translate-y-[-50%]"
              onClick={() => closeBtnHandler("name")}
            >
              <DeleteBtnIcon />
            </button>
          </label>
          {!nameValid && (
            <p className="text-[#F95F5F] text-[13px] flex relative pl-4">
              <WarningIcon />
              이름을 기입해주세요.
            </p>
          )}
        </div>
        <div className="mb-7">
          <p className="mb-3 text-[13px]">*주민등록번호</p>
          <label className="relative">
            <input
              className="text-black w-[45%] mb-2 px-4 py-[14px] mr-[10px] h-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange"
              onChange={onChangeIdNumber}
              value={idNumber}
              placeholder="생년월일 6자리"
              maxLength={6}
              type="number"
              onInput={(e) => checkMaxLength(e.target)}
            />
            <button
              className="absolute top-[50%] right-5 translate-y-[-50%]"
              onClick={() => closeBtnHandler("idNumber")}
            >
              <DeleteBtnIcon />
            </button>
          </label>
          -
          <input
            maxLength={1}
            type="number"
            onInput={(e) => checkMaxLength(e.target)}
            className="text-black ml-[10px] px-4 py-[14px] w-14 h-10 text-center rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange"
          />
          &nbsp; * * * * * *
          {!idNumberValid && (
            <p className="text-[#F95F5F] text-[13px] flex relative pl-4">
              <WarningIcon />
              생년월일 6자리를 기입해주세요.
            </p>
          )}
        </div>
        <div className="mb-7">
          <p className="mb-3 text-[13px]">*휴대폰 번호</p>
          <label className="relative">
            <input
              className="text-black w-full mb-2 px-4 py-[14px] h-10 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange"
              onChange={onChangePhoneNumber}
              value={phoneNumber}
              placeholder="-없이 휴대폰 11자리 번호 입력"
              type="number"
              maxLength={11}
              onInput={(e) => checkMaxLength(e.target)}
            />
            <button
              className="absolute top-[50%] right-4 translate-y-[-50%]"
              onClick={() => closeBtnHandler("phoneNumber")}
            >
              <DeleteBtnIcon />
            </button>
          </label>
          {!phoneValid && (
            <p className="text-[#F95F5F] text-[13px] flex relative pl-4">
              <WarningIcon />
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
            onClick={onClickNextHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default ApplyPageOne;
