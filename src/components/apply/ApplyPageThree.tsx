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
  const {
    name,
    setName,
    idNumber,
    setIdNumber,
    phoneNumber,
    setPhoneNumber,
    selectedDate,
    selectedTime,
    selectedCourseName,
    selectedCourseDetail,
    isCourseClicked
  } = useApplyStore();

  const router = useRouter();

  const handlePrevOrNextClick = (param: string) => {
    if (isCourseClicked === false) {
      alert("코스를 선택해주세요.");
    } else if (isCourseClicked === true) {
      return setPageCount(param);
    }
  };
  const handleBtnClick = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    router.push("/home");
  };

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
    <div>
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
        className="m-4 h-10 border-2 text-center w-60 rounded-lg"
        onClick={() => {
          handleReservation();
          handlePrevOrNextClick("four");
        }}
      >
        예약하기
      </button>
    </div>
  );
};

export default ApplyPageThree;
