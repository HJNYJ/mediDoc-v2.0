import React from "react";
import CourseSelect from "./CourseSelect";
import CourseSelectItem from "./CourseSelectItem";

const ApplyPageThird = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleNextClick = () => {
    return setPageCount("forth");
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

export default ApplyPageThird;
