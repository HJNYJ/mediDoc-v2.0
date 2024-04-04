// 자가진단 페이지
"use client";

import React, { useState } from "react";
import Departments from "@/components/selftest/Departments";
import BodyParts from "@/components/selftest/BodyParts";
import Symptoms from "@/components/selftest/Symptoms";

const SelftestPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showDepartments, setShowDepartments] = useState(true);
  const [showBodyParts, setShowBodyParts] = useState(false);
  const [showSymptoms, setShowSymptoms] = useState(false);

  const onClickDepartmentHandler = (department) => {
    setSelectedDepartment(department);
    setShowDepartments(false);
    setShowBodyParts(true);
  };

  const onClickBodyPartHandler = () => {
    setShowBodyParts(false);
    setShowSymptoms(true);
  };

  return (
    <div className="flex flex-col w-96">
      progressbar 위치
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
