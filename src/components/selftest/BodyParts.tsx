// 부위 div
import React, { useState } from "react";
import useSelftestStore from "@/shared/zustand/selftestStore";
import { CheckedIcon, NotCheckedIcon } from "../layout/CheckIcons";
interface BodyPartsProps {
  department: "이비인후과" | "내과" | "외과" | "치과" | "안과";
  onSelect: () => void;
}

const BodyParts: React.FC<BodyPartsProps> = ({ department, onSelect }) => {
  const bodyParts = {
    이비인후과: ["귀", "코", "목"],
    내과: ["배", "등/허리", "가슴"],
    외과: ["팔", "다리", "손", "발"],
    치과: ["이", "입"],
    안과: ["눈"]
  };
  const { setSelectedPart } = useSelftestStore();
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  const onSelectBodyPart = (bodypart: string) => {
    setSelectedPart(bodypart);
    setSelectedBodyPart(bodypart);
  };

  return (
    <section className="w-[358px] mx-[16px]">
      <section className="flex flex-col">
        <p className="w-[230px] h-[36px] mt-[54px] bold-26">
          어디가 불편하신가요?
        </p>
        <p className="w-[280px] h-[21px] mt-[20px] medium-18 text-gray-400">
          지금 불편한 신체 부위를 선택해 주세요.
        </p>
      </section>
      <section>
        <section className="mt-[17px]">
          {bodyParts[department].map((part, index) => (
            <div
              key={index}
              className={`flex items-center w-[358px] h-[55px] border-2 rounded-[8px] mb-[16px] relative cursor-pointer ${selectedBodyPart === part ? "border-orange" : "border-bluegray"}`}
              onClick={() => onSelectBodyPart(part)}
            >
              <label
                htmlFor={`checkbox-${index}`}
                className="flex items-center w-[292px] h-[21px] ml-[16px] mr-[4px] mt-[17px] mb-[17px] semibold-18 cursor-pointer"
              >
                {part}
              </label>
              <input
                type="checkbox"
                id={`checkbox-${index}`}
                checked={selectedBodyPart === part}
                onChange={() => onSelectBodyPart(part)}
                className="opacity-0 w-0 h-0"
              />
              <div className="relative">
                {selectedBodyPart === part ? (
                  <CheckedIcon />
                ) : (
                  <NotCheckedIcon />
                )}
              </div>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
};

export default BodyParts;
