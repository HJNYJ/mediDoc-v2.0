// 자가진단 페이지
"use client";

import React, { useState } from "react";
import Genders from "@/components/selftest/Genders";
import Departments from "@/components/selftest/Departments";
import BodyParts from "@/components/selftest/BodyParts";
import Symptoms from "@/components/selftest/Symptoms";
import Button from "@/components/layout/Buttons";
import Image from "next/image";
import xmark from "@/assets/icons/xmark.png";
import previousmark from "@/assets/icons/selftest/previousmark.png";
import { useRouter } from "next/navigation";
import useSelftestStore from "@/shared/zustand/selftestStore";
import PagebackBtn from "@/components/layout/PageBackBtn";
import PageCancel from "@/components/layout/PageCancel";

const SelftestPage = () => {
  const {
    selectedGender,
    selectedDepartment,
    setSelectedDepartment,
    selectedPart
  } = useSelftestStore();
  const [step, setStep] = useState<number>(0);
  const router = useRouter();

  // 뒤로 가기
  const goToPreviousPage = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // 다음 단계로 이동
  const goToNextPage = () => {
    if (step === 0 && selectedGender) {
      setStep(step + 1);
    } else if (step === 1 && selectedDepartment) {
      setStep(step + 1);
    } else if (step === 2 && selectedPart) {
      setStep(step + 1);
    }
  };

  // 홈페이지로 이동
  const goToHomePage = () => {
    router.push("/home");
  };

  return (
    <div className="w-[358px] mx-[16px]">
      <div className="flex flex-row justify-between w-[358px] mt-[44px]">
        <button onClick={goToPreviousPage}>
          <PagebackBtn />
        </button>
        <button onClick={goToHomePage}>
          <PageCancel />
        </button>
      </div>

      <div className="flex justify-center cursor-pointer"></div>
      {/* 각 단계에 따라 컴포넌트 렌더링 */}
      {step === 0 && <Genders onSelect={goToNextPage} />}
      {step === 1 && <Departments onSelectDepartment={setSelectedDepartment} />}
      {step === 2 && (
        <BodyParts department={selectedDepartment} onSelect={goToNextPage} />
      )}
      {step === 3 && <Symptoms />}
      {step < 3 && (
        <Button
          type="button"
          buttonType="filled"
          size="base"
          label="다음"
          onClick={goToNextPage}
        />
        />
      )}
    </div>
  );
};

export default SelftestPage;
