import React, { useState } from "react";

const ConsultList = () => {
  // 현재 선택된 탭의 상태를 관리합니다.
  const [selectedTab, setSelectedTab] = useState("internal");

  // 탭을 변경하는 함수입니다.
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  return (
    <section>
      <label>{/* 진료 칩 구역 */}</label>
      <div>
        <button onClick={() => handleTabChange("internal")}>내과</button>
        <button onClick={() => handleTabChange("surgery")}>외과</button>
        <button onClick={() => handleTabChange("ophthalmology")}>안과</button>
        <button onClick={() => handleTabChange("dentist")}>치과</button>
        <button onClick={() => handleTabChange("otorhinolaryngology")}>
          이비인후과
        </button>
      </div>
      <div>
        {selectedTab === "internal" && <p>내과 정보 나열하기</p>}
        {selectedTab === "surgery" && <p>외과 정보 나열하기!!</p>}
        {selectedTab === "ophthalmology" && <p>안과 정보 여기에 나열!!!</p>}
        {selectedTab === "dentist" && <p>치과 정보는 여기에 나욜!!!!!</p>}
        {selectedTab === "otorhinolaryngology" && (
          <p>이비인후과 정보 여기에서!!-!!</p>
        )}
      </div>
    </section>
  );
};

export default ConsultList;
