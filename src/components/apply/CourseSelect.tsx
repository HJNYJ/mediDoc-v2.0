"use client";

import { courseNameSelect } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";
import useApplyStore from "@/shared/zustand/applyStore";
import { useState } from "react";
import {
  CourseCheckedIcon,
  CourseNotCheckedIcon,
  TreatmentCourse,
  TreatmentNotCourse
} from "../layout/CheckIcons";

const CourseSelect = () => {
  const {
    data: course,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["course"],
    queryFn: courseNameSelect
  });

  const { setSelectedCourseName, setSelectedCourseDetail, setIsCourseClicked } =
    useApplyStore();

  const [checkedCourse, setCheckedCourse] = useState(new Map());

  const checkCourseHandler = (check, id) => {
    const map = new Map();
    map.set(check, id);
    setCheckedCourse(map);
  };

  const courseName = course?.map((card) => {
    return (
      <article key={card.course_id}>
        <div
          className="m-4 border-2 w-60 rounded-lg justify-start flex items-center"
          onClick={() => {
            setIsCourseClicked(true);
            setSelectedCourseName(card.course_name);
            setSelectedCourseDetail(card.course_detail);
          }}
        >
          <div className="cursor-pointer w-full">
            <input
              type="radio"
              name="card.course_id"
              id={card.course_name}
              className="hidden"
              onChange={(e) =>
                checkCourseHandler(e.target.checked, e.target.id)
              }
            />
            <div>
              {card.course_name === checkedCourse.get(true) ? (
                <>
                  <label htmlFor={card.course_name} className="cursor-pointer">
                    <div className="flex justify-between">
                      <div className="flex">
                        <TreatmentCourse />
                        {card.course_name}
                      </div>

                      <CourseCheckedIcon />
                    </div>
                  </label>
                  <p>{card.course_detail}</p>
                </>
              ) : (
                <>
                  <label
                    htmlFor={card.course_name}
                    className="cursor-pointer block"
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <TreatmentNotCourse />
                        {card.course_name}
                      </div>
                      <CourseNotCheckedIcon />
                    </div>
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
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
