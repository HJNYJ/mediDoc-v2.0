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
      <title>
        <HospitalName />
      </title>
      <p>
        <VisitorInfo />
      </p>
      <button className="m-2 border-2" onClick={handleBtnClick}>
        확인
      </button>
    </>
  );
};

export default ApplyPageFour;
