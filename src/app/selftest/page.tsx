// 자가진단 페이지
"use client";

import React, { useState } from "react";
import Genders from "@/components/selftest/Genders";
import Departments from "@/components/selftest/Departments";
import BodyParts from "@/components/selftest/BodyParts";
import Symptoms from "@/components/selftest/Symptoms";

const SelftestPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<
    "이비인후과" | "내과" | "외과" | "치과" | "안과"
  >("이비인후과");
  const [showGenders, setShowGenders] = useState(true);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showBodyParts, setShowBodyParts] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);

  // 성별 선택
  const onClickGenderHandler = () => {
    setShowGenders(false);
    setShowDepartments(true);
  };

  // 진료과 선택
  const onClickDepartmentHandler = (department: string) => {
    if (
      department === "이비인후과" ||
      department === "내과" ||
      department === "외과" ||
      department === "치과" ||
      department === "안과"
    ) {
      setSelectedDepartment(department);
      setShowDepartments(false);
      setShowBodyParts(true);
    } else {
      console.error("부서가 잘못되었습니다.");
    }
  };
  // 아픈 부위 선택
  const onClickBodyPartHandler = () => {
    setShowBodyParts(false);
    setShowSymptoms(true);
  };

  // 뒤로 가기
  const goToPreviousPage = () => {
    if (showDepartments) {
      setShowGenders(true);
      setShowDepartments(false);
    } else if (showBodyParts) {
      setShowDepartments(true);
      setShowBodyParts(false);
    } else if (showSymptoms) {
      setShowBodyParts(true);
      setShowSymptoms(false);
    }
  };

  return (
    <div className="w-[358px] mx-[16px]">
      {showDepartments || showBodyParts || showSymptoms ? (
        <button onClick={goToPreviousPage}>뒤로 가기</button>
      ) : null}
      progressbar 위치
      {showGenders && <Genders onClickGender={onClickGenderHandler} />}
      {showDepartments && (
        <Departments onClickDepartment={onClickDepartmentHandler} />
      )}
      {showBodyParts && (
        <BodyParts
          department={selectedDepartment}
          onClickBodyPart={onClickBodyPartHandler}
        />
      )}
      {showSymptoms && <Symptoms />}
    </div>
  );
};

export default SelftestPage;
