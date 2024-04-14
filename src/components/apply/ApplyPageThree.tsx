"use client";

import React, { useEffect } from "react";
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
    phoneNumber,
    setIdNumber,
    selectedDate,
    selectedTime,
    userNameData,
    userEmailData,
    setPhoneNumber,
    isCourseClicked,
    setIsTimeClicked,
    setIsDateClicked,
    selectedCourseName,
    selectedCourseDetail,
    setReservationInfo
  } = useApplyStore();

  const router = useRouter();

  const handlePrevOrNextClick = (status: string) => {
    if (isCourseClicked === false) {
      alert("코스를 선택해주세요.");
    } else if (isCourseClicked === true && status === "success") {
      return setPageCount("four");
    }
  };

  const backHandlerClick = () => {
    setIsTimeClicked(false);
    setIsDateClicked(false);
    return setPageCount("two");
  };

  const handleBtnClick = () => {
    setName("");
    setIdNumber("");
    setPhoneNumber("");
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
    program_detail: selectedCourseDetail
  };

  /**
   * useMutation을 이용한 데이터 처리 사용 방법
   * 1. service 폴더에 적절한 supabase의 insert/update/delete를 다루는 함수를 만든다.
   * 2. hooks/useMutation 폴더에 적절한 use~~~~~Mutation 함수를 만든다.
   * 3. 적용하려고 하는 컴포넌트를 client components로 바꾼다 -> "use client";
   * 4. const { mutate: 바꿔줄이름 } = useMetPeopleMutation(); => mutation을 호출한다.2번에서 만든 mutation.
   * 5. 실제 click이 일어나서 데이터를 넣어야 하는 곳에 mutate 함수를 실행한다.
   * 6. 실행이 완료되면(onSuccess), 갱신해야하는 useQuery로 가져온 데이터를 invalidate 처리한다.
   */

  // A데이터 = 쿼리를 이용해서 데이터를 불러올거 아님
  // A데이터가 필요한 B쿼리 = (ex:A=유저, 유저아이디를 기반으로 어떤 테이블 데이터를 가지고 올때, 내가 예약한 정보라던지)
  // A데이터를 불러오기 전에 B쿼리가 실행이 돼버려서 A가없이 B가 실행됨 <<<<<<막기위해서 쓰는 옵션이 있어요
  // useEffect 거의쓸일없음
  // A데이터가 들어와야 얘가 실행되게 해주는 옵션 enabled

  // export const useGetUserPostQuery = (userId: string) => {
  //   const { data } = useQuery({
  //     queryKey: [USER_POST_QUERY_KEY],
  //     queryFn: () => fetchUserPost(userId),
  //     enabled: !!userId
  //   });
  //   return data;
  // };

  const handleReservation = async () => {
    try {
      const { data, error } = await supabase
        .from("reservation_info")
        .insert([testObj])
        .select();

      setReservationInfo(data?.[0]);
      handlePrevOrNextClick("success");
    } catch (error) {
      console.log(error);
      handlePrevOrNextClick("error");
    }
  };

  return (
    <div>
      <button className="m-2" onClick={() => backHandlerClick()}>
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
        }}
      >
        예약하기
      </button>
    </div>
  );
};

export default ApplyPageThree;
