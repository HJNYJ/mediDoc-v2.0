"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HospitalName from "./HospitalName";
import VisitorInfo from "./VisitorInfo";

const ApplyPageFour = () => {
  const router = useRouter();

  const handleBtnClick = () => {
    router.push("/home");
  };
  return (
    <>
      <p>
        <HospitalName />
      </p>
      <div>
        <VisitorInfo />
      </div>
      <button className="m-2" onClick={handleBtnClick}>
        확인
      </button>
    </>
  );
};

export default ApplyPageFour;
