// 검진 프로그램 정보 & 가격 div
"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { selectCourseName } from "@/hooks/getReservationData";
import {
  CourseCheckedIcon,
  CourseNotCheckedIcon,
  TreatmentCourse,
  TreatmentNotCourse
} from "@/components/layout/CheckIcons";

const ProgramInfo = () => {
  const [isBasicToggled, setBasicToggled] = useState<boolean>(false);
  const [checkedCourse, setCheckedCourse] = useState(new Map());
  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseInfo"],
    queryFn: selectCourseName
  });

  const checkCourseHandler = (check, id) => {
    const map = new Map();
    map.set(check, id);
    setCheckedCourse(map);
  };

  const course = data?.map((card) => {
    return (
      <article key={card.course_id}>
        <div
          className="mb-2 px-4 py-[14px] border-2 w-full rounded-lg justify-start flex items-center"
          onClick={() => {
            setBasicToggled(true);
            isBasicToggled;
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
                  <label htmlFor={card.course_name} className="cursor-pointer ">
                    <div className="flex justify-between mb-4 bold-14">
                      <div className="flex">
                        <TreatmentCourse />
                        {card.course_name}
                      </div>
                      <CourseCheckedIcon />
                    </div>
                  </label>
                  <p className="break-keep regular-14">
                    {card.course_detail}
                    <div className=" text-orange m-2">
                      {card.course_price.toString().substring(0, 3)}.
                      {card.course_price.toString().substring(3, 7)}원
                    </div>
                  </p>
                </>
              ) : (
                <>
                  <label
                    htmlFor={card.course_name}
                    className="cursor-pointer block"
                  >
                    <div className="flex justify-between bold-14">
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
      </article>
    );
  });

  if (isLoading) {
    <div>로딩 중 입니다...</div>;
  }

  if (isError) {
    <div>에러 입니다...</div>;
  }
  return <section>{course}</section>;
};

export default ProgramInfo;
