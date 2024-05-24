// 관리자페이지 메인 div
import { supabase } from "@/api/supabase";
import React, { useState } from "react";
import useMyPageStore from "@/shared/zustand/myPageStore";
import AdminQuestionItem from "./AdminQuestionItem";
import ReservationInfoItem from "./ReservationInfoItem";

const AdminMenu = () => {
  const [showConsultList, setShowConsultList] = useState(false);
  const [showReservationList, setShowReservationList] = useState(false);
  // const [showConsultButton, setShowConsultButton] = useState(true);
  // const [showReservationButton, setShowReservationButton] = useState(true);
  const { hospitalName } = useMyPageStore();

  const handleConsultList = async () => {
    try {
      const { error } = await supabase.from("consult_info").select("*");
      if (error) throw new Error(error.message);
      // setShowConsultButton(false);
      // setShowReservationButton(false);
      setShowConsultList(true);
      setShowReservationList(false);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  const handleReservationList = async () => {
    try {
      const { error } = await supabase
        .from("reservation_info")
        .select("*")
        .eq("hospital_name", hospitalName);
      if (error) throw new Error(error.message);

      // setShowConsultButton(false);
      // setShowReservationButton(false);
      setShowConsultList(false);
      setShowReservationList(true);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center mt-[38px] text-center">
      {!showConsultList && !showReservationList && (
        <>
          <div className="w-[171px] h-[83px] regular-20 rounded-[20px] mr-[16px] place-content-center border-gray border-4">
            <button onClick={handleConsultList}>실시간 상담</button>
          </div>
          <div className="w-[171px] h-[83px] regular-20 rounded-[20px] mr-[16px] place-content-center border-gray border-4">
            <button onClick={handleReservationList}>예약 내역 관리</button>
          </div>
        </>
      )}
      {showConsultList && <AdminQuestionItem />}
      {showReservationList && <ReservationInfoItem />}
    </div>
  );
};

export default AdminMenu;
