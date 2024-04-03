import React, { useState } from "react";
// 이건 일단 남겨놓음 소희님 탭스가 어떻게 될지 몰라서

const ConsultTabs = () => {
  // 탭 상태 관리
  const [selectedTab, setSelectedTab] = useState("internal");

  // 탭변경
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const tabButtonClass = (tabName: string) =>
    `px-2 rounded-lg focus:outline-none text-sm ${
      selectedTab === tabName
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-800"
    }`;
  return (
    <section className="max-w-md mx-auto mt-8">
      <label className="block mb-2 text-lg font-medium text-gray-700">
        {/* 진료 칩 구역 */}
      </label>
      <div className="flex space-x-4 mb-4">
        {[
          "internal",
          "surgery",
          "ophthalmology",
          "dentist",
          "otorhinolaryngology"
        ].map((tab) => (
          <button
            key={tab}
            className={tabButtonClass(tab)}
            onClick={() => handleTabChange(tab)}
          >
            {tab === "otorhinolaryngology"
              ? "이비인후과"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
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

export default ConsultTabs;
