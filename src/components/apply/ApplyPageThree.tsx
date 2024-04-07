import React from "react";
import CourseSelect from "./CourseSelect";
import CourseSelectItem from "./CourseSelectItem";
import { useRouter } from "next/navigation";

const ApplyPageThree = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const handlePrevOrNextClick = (param: string) => {
    return setPageCount(param);
  };
  const handleBtnClick = () => {
    router.push("/home");
  };
  return (
    <>
      <button onClick={() => handlePrevOrNextClick("two")}>이전</button>
      <button onClick={handleBtnClick}>X</button>
      <div>
        <CourseSelect />
        <CourseSelectItem />
      </div>
      <button onClick={() => handlePrevOrNextClick("four")}>
        다음(예약하기)
      </button>
    </>
  );
};

export default ApplyPageThree;
