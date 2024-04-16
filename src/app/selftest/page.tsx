// 자가진단 페이지
"use client";

import React, { useState } from "react";
import Genders from "@/components/selftest/Genders";
import Departments from "@/components/selftest/Departments";
import BodyParts from "@/components/selftest/BodyParts";
import Symptoms from "@/components/selftest/Symptoms";
import Button from "@/components/layout/Buttons";
import Image from "next/image";
import progress_step1 from "@/assets/icons/selftest/progress_step1.png";
import progress_step2 from "@/assets/icons/selftest/progress_step2.png";
import progress_step3 from "@/assets/icons/selftest/progress_step3.png";
import progress_step4 from "@/assets/icons/selftest/progress_step4.png";
import xmark from "@/assets/icons/xmark.png";
import previousmark from "@/assets/icons/selftest/previousmark.png";
import { useRouter } from "next/navigation";

const SelftestPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<
    "이비인후과" | "내과" | "외과" | "치과" | "안과"
  >("이비인후과");
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
    setStep(step + 1);
  };

  // 홈페이지로 이동
  const goToHomePage = () => {
    router.push("/home");
  };

  return (
    <div className="w-[358px] mx-[16px]">
      <div className="flex flex-row justify-between w-[358px] mt-[44px]">
        <button onClick={goToPreviousPage}>
          <Image
            src={previousmark}
            alt="<"
            className="w-[24px] h-[24px] bluegray"
          />
        </button>
        <button onClick={goToHomePage}>
          <Image src={xmark} alt="x" className="w-[20px] h-[20px]" />
        </button>
      </div>
      <div className="flex justify-center cursor-pointer">
        <Image
          src={
            step === 0
              ? progress_step1
              : step === 1
                ? progress_step2
                : step === 2
                  ? progress_step3
                  : progress_step4
          }
          alt={`Step ${step + 1}`}
          className="mt-[50px]"
        />
      </div>
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
        >
          다음
        </Button>
      )}
    </div>
  );
};

export default SelftestPage;
