import React from "react";

import HospitalName from "./HospitalName";

const ApplyPageOne = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleNextClick = () => {
    return setPageCount("second");
  };
  return (
    <>
      <HospitalName />
      <article>병원사진</article>
      <div>
        이름
        <input />
      </div>
      <div>
        주민등록번호
        <input /> - <input />
      </div>
      <div>
        휴대전화번호
        <input />
      </div>
      <button onClick={handleNextClick}>다음</button>
    </>
  );
};

export default ApplyPageOne;
