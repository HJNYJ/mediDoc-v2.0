import Link from "next/link";
import React from "react";

interface GendersProps {
  onClickGender: (gender: string) => void;
}

const Genders: React.FC<GendersProps> = ({ onClickGender }) => {
  return (
    <section className="w-[358px]">
      <Link href="/">
        <button>뒤로 가기</button>
      </Link>
      <section>
        <p className="w-[200px] h-[36px] mt-[54px] text-[26px] font-bold">
          성별을 알려주세요.
        </p>
        <p className="w-[310px] h-[21px] mt-[20px] text-[18px] text-gray-400 font-medium">
          성별에 따라 진료 결과가 달라질 수 있어요.
        </p>
      </section>
      <section className="mt-[38px] ">
        <button
          className="w-[168px] h-[185px] border-2 mr-[22px] rounded-[10px]"
          onClick={() => onClickGender("여성")}
        >
          여성
        </button>
        <button
          className="w-[168px] h-[185px] border-2 rounded-[10px]"
          onClick={() => onClickGender("남성")}
        >
          남성
        </button>
      </section>
    </section>
  );
};

export default Genders;
