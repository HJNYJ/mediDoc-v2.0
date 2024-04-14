// 메인페이지

import FindHospital from "@/components/home/FindHospital";
import HospitalListView from "@/components/home/HospitalListView";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HospitalListView />
      <FindHospital />
    </div>
  );
};

export default HomePage;
