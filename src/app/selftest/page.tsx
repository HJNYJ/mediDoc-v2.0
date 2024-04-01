// 자가진단 페이지

import React from "react";
import Departments from "@/components/selftest/Departments";
import BodyParts from "@/components/selftest/BodyParts";
import Symptoms from "@/components/selftest/Symptoms";

const SelftestPage = () => {
  return (
    <div className="flex flex-col w-96">
      progressbar 위치
      <Departments />
      <BodyParts />
      <Symptoms />
    </div>
  );
};

export default SelftestPage;
