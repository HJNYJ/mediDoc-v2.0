// 부위 div
import React, { useState } from "react";

const BodyParts = ({ department, onClickBodyPart }) => {
  const bodyParts = {
    이비인후과: ["귀", "코", "목"],
    내과: ["배", "등/허리", "가슴"],
    외과: ["팔", "다리", "손", "발"],
    치과: ["이", "입"],
    안과: ["눈"]
  };
  const [selectedPart, setSelectedPart] = useState(null);

  const onClickBodyPartHandler = (bodypart) => {
    setSelectedPart(bodypart);
    onClickBodyPart();
  };

  return (
    <div className="flex flex-col">
      <h2>어디가 불편하신가요?</h2>
      {bodyParts[department].map((part, index) => (
        <button key={index} onClick={() => onClickBodyPartHandler("part")}>
          {part}
        </button>
      ))}
    </div>
  );
};

export default BodyParts;
