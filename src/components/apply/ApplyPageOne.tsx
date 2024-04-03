import React from "react";

import HospitalName from "./HospitalName";
import Button from "./Button";

const ApplyPageOne = () => {
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
      <Button />
    </>
  );
};

export default ApplyPageOne;
