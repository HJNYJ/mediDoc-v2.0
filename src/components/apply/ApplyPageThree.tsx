"use client";

import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";
import CourseSelect from "./CourseSelect";
import useApplyStore from "@/shared/zustand/applyStore";
import Button from "../layout/Buttons";
import YellowBarMg from "../layout/YellowBarMg";
import YellowBar from "../layout/YellowBar";
import PagebackBtn from "../layout/PageBackBtn";
import PageCancel from "../layout/PageCancel";

const ApplyPageThree = ({
  setPageCount
}: {
  setPageCount: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    name,
    setName,
    idNumber,
    phoneNumber,
    setIdNumber,
    selectedDate,
    selectedTime,
    userNameData,
    hospitalName,
    userEmailData,
    setPhoneNumber,
    isCourseClicked,
    setSelectedTime,
    setSelectedDate,
    setIsTimeClicked,
    setIsDateClicked,
    setReservationInfo,
    selectedCourseName,
    selectedCourseDetail
  } = useApplyStore();

  const router = useRouter();

  const clickPrevOrNextHandler = (status: string) => {
    if (isCourseClicked === false) {
      alert("코스를 선택해주세요.");
    } else if (isCourseClicked === true && status === "success") {
      return setPageCount("four");
    }
  };

  const onClickBackButtonHandler = () => {
    setIsTimeClicked(false);
    setIsDateClicked(false);
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    setSelectedTime("");
    setSelectedDate(new Date());
    return setPageCount("one");
  };

  const onClickButtonHandler = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
    setSelectedTime("");
    setSelectedDate(new Date());
    router.push("/home");
  };

  const testObj = {
    subject_name: name,
    user_name: userNameData,
    apply_time: selectedTime,
    apply_date: selectedDate,
    user_email: userEmailData,
    subject_birth_date: idNumber,
    program_name: selectedCourseName,
    subject_phone_number: phoneNumber,
    program_detail: selectedCourseDetail,
    hospital_name: hospitalName
  };

  const handleReservation = async () => {
    try {
      const { data, error } = await supabase
        .from("reservation_info")
        .insert([testObj])
        .select();
      if (error) {
        console.log("에러입니다.", error);
      }
      if (data !== null) {
        setReservationInfo(data?.[0]);
      }
      clickPrevOrNextHandler("success");
      return data;
    } catch (error) {
      console.log(error);
      clickPrevOrNextHandler("error");
    }
  };

  return (
    <div>
      <div className="flex w-full py-[15px]">
        <button className="mr-auto" onClick={() => onClickBackButtonHandler()}>
          <PagebackBtn />
        </button>
        <button className="ml-auto" onClick={onClickButtonHandler}>
          <PageCancel />
        </button>
      </div>
      <div className="flex mb-[30px]">
        <YellowBarMg />
        <YellowBarMg />
        <YellowBar />
      </div>
      <div className="mb-44">
        <CourseSelect />
      </div>
      <div className="mt-auto mb-4">
        <Button
          type="button"
          buttonType="filled"
          size="base"
          label="예약하기"
          onClick={() => {
            handleReservation();
          }}
        />
      </div>
    </div>
  );
};

export default ApplyPageThree;
