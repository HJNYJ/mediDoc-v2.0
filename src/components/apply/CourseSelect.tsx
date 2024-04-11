"use client";

import { courseNameSelect } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";
import useApplyStore from "@/shared/zustand/applyStore";
import React, { useState } from "react";

const CourseSelect = () => {
  const {
    data: course,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["course"],
    queryFn: courseNameSelect
  });
  // const [courseToggle, setCourseToggle] = useState<boolean>(false);
  const { setSelectedCourseName, setSelectedCourseDetail } = useApplyStore();

  const courseName = course?.map((card) => {
    return (
      <article key={card.course_id}>
        <button
          className="m-2 border-2 w-24"
          onClick={() => {
            setSelectedCourseName(card.course_name);
            setSelectedCourseDetail(card.course_detail);
            // setCourseToggle(true);
          }}
        >
          <div>{card.course_name}</div>
        </button>
        {/* {courseToggle ? <div>{card.course_detail}</div> : <div></div>} */}
      </article>
    );
  });

  if (isLoading) {
    <div>로딩중 입니다...</div>;
  }
  if (isError) {
    <div>에러 입니다...</div>;
  }

  return <div>{courseName}</div>;
};

export default CourseSelect;
