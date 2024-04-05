import React, { useState } from "react";
// 이건 일단 남겨놓음 소희님 탭스가 어떻게 될지 몰라서

interface TabsProps {
  handleCategoryChange: (bodypart: string) => void; // bodypart 타입으로 변경
}

const ConsultTabs: React.FC<TabsProps> = ({ handleCategoryChange }) => {
  // 탭 상태 관리
  const [selectedTab, setSelectedTab] = useState("eyes"); // 초기 선택 탭 설정

  // 탭변경
  const handleTabChange = (tabName: string) => {
    setSelectedTab(tabName);
    handleCategoryChange(tabName); // 선택된 탭 이름을 handleCategoryChange에 전달
  };

  const tabButtonClass = (tabName: string) =>
    `px-10 py-3 rounded-lg focus:outline-none text-lg ${
      selectedTab === tabName
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-800"
    }`;
  return (
    <section className="max-w-md mx-auto mt-8">
      <label className="block mb-2 text-lg font-medium text-gray-700">
        {/* 진료 칩 구역 */}
      </label>
      <div className="flex space-x-6 mb-4">
        {["eyes", "ears", "nose", "abdomen", "neck"].map((tab) => (
          <button
            key={tab}
            className={tabButtonClass(tab)}
            onClick={() => handleTabChange(tab)}
          >
            {tab === "eyes" && "눈 통증"}
            {tab === "ears" && "귀 통증"}
            {tab === "nose" && "코 불편"}
            {tab === "abdomen" && "배 통증"}
            {tab === "neck" && "목 통증"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        {selectedTab === "eyes" && <p>눈 상담 나열</p>}
        {selectedTab === "ears" && <p>귀 상담 나열</p>}
        {selectedTab === "nose" && <p>코 상담 나열</p>}
        {selectedTab === "abdomen" && <p>배 상담 나열</p>}
        {selectedTab === "neck" && <p>목 상담 나열</p>}
      </div>
    </section>
  );
};

export default ConsultTabs;
