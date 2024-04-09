// 진료과 div
import React from "react";

interface DepartmentsProps {
  onClickDepartment: (department: string) => void;
}

const Departments: React.FC<DepartmentsProps> = ({ onClickDepartment }) => {
  return (
    <>
      <section className="flex flex-col">
        <h2>과를 선택해주세요</h2>
        <button onClick={() => onClickDepartment("이비인후과")}>
          이비인후과
        </button>
        <button onClick={() => onClickDepartment("내과")}>내과</button>
        <button onClick={() => onClickDepartment("외과")}>외과</button>
        <button onClick={() => onClickDepartment("치과")}>치과</button>
        <button onClick={() => onClickDepartment("안과")}>안과</button>
      </section>
      <section>
        <h4>불편하신 증상을 바탕으로 자가진단을 하는 검사입니다.</h4>
        <h4>
          * 연관 있는 질환을 알려드리며 자세한 사항은 전문의와 상담하세요.
        </h4>
      </section>
    </>
  );
};

export default Departments;
