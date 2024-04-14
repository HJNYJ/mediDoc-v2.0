"use client";

import React from "react";
import { useRouter } from "next/navigation";
import HospitalName from "./HospitalName";
import useApplyStore from "@/shared/zustand/applyStore";
import HospitalReservation from "./GetNewData";

const ApplyPageFour = () => {
  const { setName, setIdNumber, setPhoneNumber } = useApplyStore();

  const router = useRouter();

  const handleBtnClick = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    router.push("/home");
  };

  return (
    <div>
      <strong>
        <HospitalName />
      </strong>
      <p>
        <HospitalReservation />
      </p>
      <button
        className="m-4 h-10 border-2 text-center w-60 rounded-lg"
        onClick={handleBtnClick}
      >
        확인
      </button>
    </div>
  );
};

export default ApplyPageFour;
