// 진료과 div
import React from "react";

interface DepartmentsProps {
  onClickDepartment: (department: string) => void;
}

const Departments: React.FC<DepartmentsProps> = ({ onClickDepartment }) => {
  return (
    <>
      <section>
        <p className="w-[192px] h-[36px] mt-[54px] text-[26px] font-bold">
          과를 선택해주세요
        </p>
        <p className="w-[240px] h-[21px] mt-[20px] text-[18px] text-gray-400 font-medium">
          진단받고 싶은 과를 선택해주세요.
        </p>
      </section>
      <section>
        <section className="flex flex-col mt-[17px]">
          <button
            className="w-[385px] h-[55px] text-[18px] font-semibold border-2 rounded-[8px] mb-[16px]"
            onClick={() => onClickDepartment("이비인후과")}
          >
            이비인후과
          </button>
          <button
            className="w-[385px] h-[55px] text-[18px] font-semibold border-2 rounded-[8px] mb-[16px]"
            onClick={() => onClickDepartment("내과")}
          >
            내과
          </button>
          <button
            className="w-[385px] h-[55px] text-[18px] font-semibold border-2 rounded-[8px] mb-[16px]"
            onClick={() => onClickDepartment("외과")}
          >
            외과
          </button>
          <button
            className="w-[385px] h-[55px] text-[18px] font-semibold border-2 rounded-[8px] mb-[16px]"
            onClick={() => onClickDepartment("치과")}
          >
            치과
          </button>
          <button
            className="w-[385px] h-[55px] text-[18px] font-semibold border-2 rounded-[8px]"
            onClick={() => onClickDepartment("안과")}
          >
            안과
          </button>
        </section>
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
