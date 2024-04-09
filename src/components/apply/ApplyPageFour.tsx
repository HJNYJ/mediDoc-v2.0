"use client";

import React from "react";
import Reservation from "./Reservation";
import { useRouter } from "next/navigation";
import HospitalName from "./HospitalName";

const ApplyPageFour = () => {
  const router = useRouter();

  const handleBtnClick = () => {
    router.push("/home");
  };
  return (
    <>
      <div>
        <HospitalName />
        <Reservation />
      </div>
      <button className="m-2" onClick={handleBtnClick}>
        확인
      </button>
    </>
  );
};

export default ApplyPageFour;
