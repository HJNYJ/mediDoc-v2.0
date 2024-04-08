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
        <h2>어디가 불편하신가요?</h2>
        {bodyParts[department].map((part, index) => (
          <button key={index} onClick={() => onClickBodyPartHandler(part)}>
            {part}
          </button>
        ))}
      </section>
    </>
  );
};

export default BodyParts;
