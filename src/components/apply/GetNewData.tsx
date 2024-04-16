"use client";

import useApplyStore from "@/shared/zustand/applyStore";
import regionCheck from "@/assets/icons/check.png";
import Image from "next/image";
import HospitalName from "./HospitalName";

const HospitalReservation = () => {
  const { reservationInfo } = useApplyStore();
  console.log("reservationInfo", reservationInfo);

  return (
    <div>
      <div className="flex justify-center">
        <Image src={regionCheck} alt="" />
      </div>

      <div className="m-4 text-center">
        <strong>예약이 완료되었습니다.</strong>
        <hr />
      </div>
      <div
        key={reservationInfo?.reservation_id}
        className=" p-4 border-4 w-full"
      >
        <p className="flex mb-4">
          <span className="w-20">병원명 </span>
          <span className=" w-60">
            <HospitalName />
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-20">예약 번호</span>
          <span className=" w-60">
            {reservationInfo?.reservation_id.substring(0, 7)}
          </span>
        </p>
        <p className="flex mb-4">
          <span className="w-20">일정</span>
          <span className=" w-60">{reservationInfo.apply_date}</span>
        </p>
        <p className="flex mb-4">
          <span className="w-20">예약자</span>
          <span className=" w-60">{reservationInfo.subject_name}</span>
        </p>
        <p className="flex mb-4">
          <span className="w-20">시간</span>
          <span className=" w-60">{reservationInfo.apply_time}</span>
        </p>
        <p className="flex mb-4">
          <span className="w-20">연락처</span>
          <span className=" w-60">{reservationInfo.subject_phone_number}</span>
        </p>
        <p className="flex mb-4">
          <span className="w-20">검사 코스</span>
          <span className=" w-60">{reservationInfo.program_name} </span>
        </p>
        <p className="flex mb-4">
          <span className="w-20">검사 내용</span>
          <span className=" w-60">{reservationInfo.program_detail} </span>
        </p>
      </div>
    </div>
  );
};
export default HospitalReservation;
