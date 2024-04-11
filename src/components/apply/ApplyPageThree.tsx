"use client";

import React from "react";
import CourseSelect from "./CourseSelect";
import useApplyStore from "@/shared/zustand/applyStore";
import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";

const ApplyPageThree = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const handlePrevOrNextClick = (param: string) => {
    if (param === "four") {
      confirm("정말로 예약 하시겠습니까?");
    } else {
      param === "two";
    }
    return setPageCount(param);
  };
  const handleBtnClick = () => {
    router.push("/home");
  };

  const {
    name,
    idNumber,
    phoneNumber,
    selectedDate,
    selectedTime,
    selectedCourseName,
    selectedCourseDetail
  } = useApplyStore();

  const testObj = {
    subject_name: name,
    user_email: "nam_sax0531@naver.com",
    subject_phone_number: phoneNumber,
    apply_date: selectedDate,
    apply_time: selectedTime,
    program_name: selectedCourseName,
    program_detail: selectedCourseDetail,
    subject_birth_date: idNumber
  };

  const handleReservation = async () => {
    try {
      const { data, error } = await supabase
        .from("reservation_info")
        .insert([testObj])
        .select();
    } catch (error) {
      console.log(error);
    }
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
      </div>
      <button
        className="m-2 border-2"
        onClick={() => {
          handleReservation();
          handlePrevOrNextClick("four");
        }}
      >
        예약하기
      </button>
    </>
  );
};

export default ApplyPageThree;
