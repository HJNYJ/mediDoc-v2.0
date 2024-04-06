import React from "react";
import TimeSelect from "./TimeSelect";

const ApplyPageTwo = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleNextClick = () => {
    return setPageCount("three");
  };
  return (
    <div>
      <p>
        <TimeSelect />
      </p>
      <button onClick={handleNextClick}>다음</button>
    </div>
  );
};

export default ApplyPageTwo;
