"use client";

import useApplyStore from "@/shared/zustand/applyStore";
import regionCheck from "@/assets/icons/consult/check.png";
import Image from "next/image";

const HospitalReservation = () => {
  const { reservationInfo } = useApplyStore();

  return (
    <div>
      <div className="flex justify-center mb-[15px]">
        <Image src={regionCheck} alt="" />
      </div>
      <div className="m-4 text-center bold-24">예약이 완료되었습니다.</div>
      <hr className="my-[18px]" />
      <div
        key={reservationInfo?.reservation_id}
        className=" p-4 border-4 w-full rounded-xl mb-6"
      >
        <p className="flex mb-4">
          <span className="w-[70px] bold-16 mr-3">병원명 </span>
          <span className="w-60 regular-16">
            {reservationInfo.hospital_name}
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-[70px] bold-16 mr-3">예약번호</span>
          <span className="w-60 regular-16">
            {reservationInfo?.reservation_id.toString().substring(0, 7)}
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-[70px] bold-16 mr-3">일정</span>
          <span className="w-60 regular-16">
            {reservationInfo.apply_date.toString().substring(0, 4)}년&nbsp;
            {reservationInfo.apply_date.toString().substring(5, 7)}월&nbsp;
            {reservationInfo.apply_date.toString().substring(8, 10)}일
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-[70px] bold-16 mr-3">예약자</span>
          <span className="w-60 regular-16">
            {reservationInfo.subject_name} 님
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-[70px] bold-16 mr-3">시간</span>
          <span className="w-60 regular-16">
            {reservationInfo.apply_time.toString().substring(0, 5)}
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-[70px] bold-16 mr-3">연락처</span>
          <span className="w-60 regular-16">
            {reservationInfo.subject_phone_number.substring(0, 3)}-
            {reservationInfo.subject_phone_number.substring(3, 7)}-
            {reservationInfo.subject_phone_number.substring(7, 11)}
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-[70px] bold-16 mr-3">검사코스</span>
          <span className="w-60 regular-16">
            {reservationInfo.program_name}
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-[70px] bold-16 mr-3">검사내용</span>
          <span className="w-60 regular-16">
            {reservationInfo.program_detail}
          </span>
        </p>
      </div>
    </div>
  );
};
export default HospitalReservation;
