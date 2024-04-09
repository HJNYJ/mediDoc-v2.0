import Link from "next/link";
import React from "react";

interface GendersProps {
  onClickGender: (gender: string) => void;
}

const Genders: React.FC<GendersProps> = ({ onClickGender }) => {
  return (
    <>
      <Link href="/">
        <button>뒤로 가기</button>
      </Link>
      <h2>성별을 선택해주세요.</h2>
      <button onClick={() => onClickGender("남")}>남</button>
      <button onClick={() => onClickGender("여")}>여</button>
    </>
  );
};

export default Genders;
