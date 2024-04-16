"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useApplyStore from "@/shared/zustand/applyStore";
import HospitalReservation from "./GetNewData";
import Button from "../layout/Buttons";

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
      <p>
        <HospitalReservation />
      </p>
      <Button
        type="button"
        buttonType="filled"
        size="base"
        label="확인"
        onClick={handleBtnClick}
      />
    </div>
  );
};

export default ApplyPageFour;
