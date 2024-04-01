// 진료과 div
import React from "react";

const Departments = () => {
  return (
    <>
      <div className="flex flex-col">
        <h2>과를 선택해주세요</h2>
        <button className="w-">이비인후과</button>
        <button>내과</button>
        <button>외과</button>
        <button>치과</button>
        <button>안과</button>
      </div>
      <h4>불편하신 증상을 바탕으로 자가진단을 하는 검사입니다.</h4>
      <h4> * 연관 있는 질환을 알려드리며 자세한 사항은 전문의와 상담하세요.</h4>
    </>
  );
};

export default Departments;
