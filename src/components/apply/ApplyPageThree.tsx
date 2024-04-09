import React from "react";
import CourseSelect from "./CourseSelect";
import CourseSelectItem from "./CourseSelectItem";

const ApplyPageThree = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleNextClick = () => {
    return setPageCount("four");
  };
  return (
    <>
      <div>
        <CourseSelect />
        <CourseSelectItem />
      </div>
      <button onClick={handleNextClick}>다음</button>
    </>
  );
};

export default ApplyPageThree;
