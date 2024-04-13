"use client";

import HospitalName from "./HospitalName";
import useApplyStore from "../../shared/zustand/applyStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();

        const user = session?.user;

        const { data, error } = await supabase
          .from("reservation_info")
          .insert([{ user_email: user?.email, user_name: user?.name }]);
        if (error) throw new Error();
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
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
          <p>*이름</p>
          <input
            placeholder="홍길동"
            className="text-black m-2 h-10 rounded-lg px-1 w-60 border-2"
            onChange={onChangeName}
            value={name}
          />
          {!nameValid && <p className="text-red-500">이름을 기입해주세요.</p>}
        </div>
        <div className="m-2">
          <p>*주민등록번호</p>
          <input
            className="text-black m-2 w-32 h-10 rounded-lg px-1 border-2"
            onChange={onChangeIdNumber}
            value={idNumber}
            placeholder="생년월일 6자리"
          />
          -
          <input
            maxLength={1}
            className="text-black m-2 w-6 h-10 text-center rounded-lg px-1 border-2"
          />
          * * * * * *
          {!idNumberValid && (
            <p className="text-red-500">생년월일 6자리를 기입해주세요.</p>
          )}
        </div>
        <div className="m-2">
          <p>*휴대폰 번호</p>
          <input
            className="text-black m-2 h-10 rounded-lg px-1 w-60 border-2"
            onChange={onChangePhoneNumber}
            value={phoneNumber}
            placeholder="-없이 휴대폰 11자리 번호 입력"
          />
          {!phoneValid && (
            <p className="text-red-500">전화번호를 11자리를 기입해주세요.</p>
          )}
        </div>
        <button
          className="m-4 h-10 border-2 text-center w-60 rounded-lg"
          onClick={handleNextClick}
        >
          다음
        </button>
      </form>
    </>
  );
};
export default ApplyPageOne;
