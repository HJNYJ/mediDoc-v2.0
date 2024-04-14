"use client";

import useApplyStore from "@/shared/zustand/applyStore";
import regionCheck from "@/assets/check.png";
import Image from "next/image";

const HospitalReservation = () => {
  const { reservationInfo } = useApplyStore();
  console.log("reservationInfo", reservationInfo);

  return (
    <div>
      <Image src={regionCheck} alt="" className="" />
      <p className="m-4">예약이 완료되었습니다.</p>
      <div key={reservationInfo?.reservation_id} className="m-4 border-4 w-80">
        <p className="m-4">
          예약번호 : {reservationInfo?.reservation_id.substring(0, 7)}
        </p>
        <p className="m-4">예약 일시 : {reservationInfo.apply_date}</p>
        <p className="m-4">예약자 : {reservationInfo.subject_name}</p>
        <p className="m-4">시간 : {reservationInfo.apply_time}</p>
        <p className="m-4">연락처 : {reservationInfo.subject_phone_number} </p>
        <p className="m-4">검사 코스 : {reservationInfo.program_name}</p>
        <p className="m-4">검사 내용 : {reservationInfo.program_detail}</p>
      </div>
    </div>
  );
};
export default HospitalReservation;
