// 진료과 div
import React, { useState } from "react";
import { CheckedIcon, NotCheckedIcon } from "../layout/CheckIcons";
import YellowBarMg from "../layout/YellowBarMg";
import GrayBarMg from "../layout/GrayBarMg";
import GrayBar from "../layout/GrayBar";

interface DepartmentsProps {
  onSelectDepartment: (department: string) => void;
}

const Departments: React.FC<DepartmentsProps> = ({ onSelectDepartment }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const handleDepartmentSelect = (department: string) => {
    if (selectedDepartment === department) {
      setSelectedDepartment(null);
      onSelectDepartment(null);
    } else {
      setSelectedDepartment(department);
      onSelectDepartment(department);
    }
  };

  return (
    <section className="w-full py-[15px]">
      <div className="flex mb-[30px]">
        <YellowBarMg />
        <YellowBarMg />
        <GrayBarMg />
        <GrayBar />
      </div>
      <section>
        <p className="w-full h-[36px] mt-[54px] bold-26">과를 선택해주세요</p>
        <p className="w-full h-[21px] mt-[20px] medium-18 text-gray-400">
          진단받고 싶은 과를 선택해주세요.
        </p>
      </section>
      <section>
        <section className="flex flex-col mt-[17px]">
          {["이비인후과", "내과", "외과", "치과", "안과"].map(
            (department, index) => (
              <div
                key={index}
                className={`flex items-center w-[358px] h-[55px] border-2 rounded-[8px] mb-[16px] relative cursor-pointer ${selectedDepartment === department ? "border-orange" : "border-bluegray"}`}
                onClick={() => handleDepartmentSelect(department)}
              >
                <label
                  htmlFor={`checkbox-${index}`}
                  className="flex items-center w-[292px] h-[21px] ml-[16px] mr-[4px] mt-[17px] mb-[17px] semibold-18 cursor-pointer"
                >
                  {department}
                </label>
                <input
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={selectedDepartment === department}
                  onChange={() => handleDepartmentSelect(department)}
                  className="opacity-0 w-0 h-0"
                />

                <div>
                  {selectedDepartment === department ? (
                    <CheckedIcon />
                  ) : (
                    <NotCheckedIcon />
                  )}
                </div>
              </div>
            )
          )}
        </section>
      </section>
    </section>
  );
};

export default Departments;
