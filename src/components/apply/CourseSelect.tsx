"use client";

import { selectCourseName } from "@/hooks/getReservationData";
import useApplyStore from "@/shared/zustand/applyStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  CourseCheckedIcon,
  CourseNotCheckedIcon,
  TreatmentCourse,
  TreatmentNotCourse
} from "../layout/CheckIcons";
import { Spinner } from "@nextui-org/react";

const CourseSelect = () => {
  const {
    data: course,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["course"],
    queryFn: selectCourseName
  });
  // 슈파베이스에서 코스 이름과 내용을 가져오게됩니다.
  const { setSelectedCourseName, setSelectedCourseDetail, setIsCourseClicked } =
    useApplyStore();
  // 해당 코스를 쥬스탄드에서 관리하려고 사용했습니다.
  const [checkedCourse, setCheckedCourse] = useState(new Map());
  const checkCourseHandler = (check, id) => {
    const map = new Map();
    map.set(check, id);
    setCheckedCourse(map);
  };
  // 코스를 선택하면 체크표시를 하고 토글을 사용하여 클릭한 코스만 보여지게 만든 로직입니다.
  const courseName = course?.map((card) => {
    return (
      <article key={card.course_id}>
        <div
          className="mb-2 px-4 py-[14px] border-2 w-full rounded-lg justify-start flex items-center"
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
                  <label htmlFor={card.course_name} className="cursor-pointer ">
                    <div className="flex justify-between mb-4 bold-14">
                      <div className="flex">
                        <TreatmentCourse />
                        {card.course_name}
                      </div>
                      <CourseCheckedIcon />
                    </div>
                  </label>
                  <p className="break-keep regular-14 ">{card.course_detail}</p>
                  <div className="flex justify-end text-orange m-2">
                    {card.course_price.toString().substring(0, 3)}.
                    {card.course_price.toString().substring(3, 7)}원
                  </div>
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
    <Spinner size="lg" color="warning" />;
  }
  if (isError) {
    <p>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
  }

  return <div>{courseName}</div>;
};

export default CourseSelect;
