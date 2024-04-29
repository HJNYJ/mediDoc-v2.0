"use client";

import React from "react";
import Button from "../layout/Buttons";
import { useRouter } from "next/navigation";
import HospitalReservation from "./GetNewData";
import useApplyStore from "@/shared/zustand/applyStore";

const ApplyPageFour = () => {
  const { setName, setIdNumber, setPhoneNumber } = useApplyStore();

  const router = useRouter();

  const onClickButtonHandler = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    router.push("/home");
  };

  return (
    <div>
      <p className="mb-4">
        <HospitalReservation />
      </p>
      <div className="mb-4">
        <Button
          type="button"
          buttonType="filled"
          size="base"
          label="확인"
          onClick={onClickButtonHandler}
        />
      </div>
    </div>
  );
};

export default ApplyPageFour;
