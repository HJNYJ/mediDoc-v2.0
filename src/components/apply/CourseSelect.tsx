"use client";

import { courseNameSelect } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";
import useApplyStore from "@/shared/zustand/applyStore";

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

  const courseName = course?.map((card) => {
    return (
      <article key={card.course_id}>
        <div
          className="m-4 h-10 border-2 text-center w-60 rounded-lg justify-start flex items-center"
          onClick={() => {
            setSelectedCourseName(card.course_name);
            setSelectedCourseDetail(card.course_detail);
            setIsCourseClicked(true);
          }}
        >
          <div className="cursor-pointer">
            <input
              type="radio"
              name="card.course_id"
              id={card.course_name}
              className="m-2"
            />
            <label htmlFor={card.course_name} className="cursor-pointer">
              {card.course_name}
            </label>
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
