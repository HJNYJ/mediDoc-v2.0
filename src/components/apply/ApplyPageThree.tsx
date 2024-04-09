"use client";

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
      <button className="m-2" onClick={() => handlePrevOrNextClick("two")}>
        &lt;
      </button>
      <button className="m-2" onClick={handleBtnClick}>
        X
      </button>
      <div>
        <CourseSelect />
        <CourseSelectItem />
      </div>
      <button className="m-2" onClick={() => handlePrevOrNextClick("four")}>
        예약
      </button>
    </>
  );
};

export default ApplyPageThree;
