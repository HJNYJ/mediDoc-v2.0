// 부위 div
import React from "react";
import useSelftestStore from "@/shared/zustand/selftestStore";

interface BodyPartsProps {
  department: "이비인후과" | "내과" | "외과" | "치과" | "안과";
  onClickBodyPart: () => void;
}

const BodyParts: React.FC<BodyPartsProps> = ({
  department,
  onClickBodyPart
}) => {
  const bodyParts = {
    이비인후과: ["귀", "코", "목"],
    내과: ["배", "등/허리", "가슴"],
    외과: ["팔", "다리", "손", "발"],
    치과: ["이", "입"],
    안과: ["눈"]
  };
  const { setSelectedPart } = useSelftestStore();

  const onClickBodyPartHandler = (bodypart: string) => {
    setSelectedPart(bodypart);
    onClickBodyPart();
  };

  return (
    <>
      <section className="flex flex-col">
        <p className="w-[230px] h-[36px] mt-[54px] text-[26px] font-bold">
          어디가 불편하신가요?
        </p>
        <p className="w-[280px] h-[21px] mt-[20px] text-[18px] text-gray-400 font-medium">
          지금 불편한 신체 부위를 선택해 주세요.
        </p>
      </section>
      <section>
        <section className="mt-[17px]">
          {bodyParts[department].map((part, index) => (
            <button
              key={index}
              className="w-[385px] h-[55px] text-[18px] font-semibold border-2 rounded-[8px] mb-[16px]"
              onClick={() => onClickBodyPartHandler(part)}
            >
              {part}
            </button>
          ))}
        </section>
      </section>
    </>
  );
};

export default BodyParts;
