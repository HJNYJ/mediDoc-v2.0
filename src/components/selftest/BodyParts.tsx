// 부위 div
import React, { useState } from "react";
import { CheckedIcon, NotCheckedIcon } from "../layout/CheckIcons";
import YellowBarMg from "../layout/YellowBarMg";
import GrayBar from "../layout/GrayBar";
import useSelftestStore from "@/shared/zustand/selftestStore";
interface BodyPartsProps {
  department: "이비인후과" | "내과";
  // | "외과" | "치과" | "안과";
}

const BodyParts: React.FC<BodyPartsProps> = ({ department }) => {
  const bodyParts = {
    이비인후과: ["귀", "코", "목"],
    내과: ["배", "등/허리", "가슴"]
    // 외과: ["팔", "다리", "손", "발"],
    // 치과: ["이", "입"],
    // 안과: ["눈"]
  };
  const { setSelectedPart } = useSelftestStore();
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  const onSelectBodyPart = (bodypart: string) => {
    setSelectedPart(bodypart);
    setSelectedBodyPart(bodypart);
  };

  return (
    <section className="w-full py-[15px]">
      <div className="flex mb-[30px]">
        <YellowBarMg />
        <YellowBarMg />
        <YellowBarMg />
        <GrayBar />
      </div>
      <section className="flex flex-col mb-[54px]">
        <p className="w-full h-[36px] mb-5 bold-26">어디가 불편하신가요?</p>
        <p className="w-full h-[21px] medium-18 text-gray-400">
          지금 불편한 신체 부위를 선택해 주세요.
        </p>
      </section>
      <section>
        <section>
          {bodyParts[department].map((part, index) => (
            <div
              key={index}
              className={`flex items-center w-full h-[55px] border-2 rounded-[8px] mb-[16px] relative cursor-pointer ${selectedBodyPart === part ? "border-orange" : "border-bluegray"}`}
              onClick={() => onSelectBodyPart(part)}
            >
              <label
                htmlFor={`checkbox-${index}`}
                className="flex items-center w-full h-[21px] ml-[16px] mr-[4px] mt-[17px] mb-[17px] semibold-18 cursor-pointer"
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
