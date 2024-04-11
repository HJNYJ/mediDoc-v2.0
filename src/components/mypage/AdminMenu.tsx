// 관리자페이지 메인 div
import { supabase } from "@/api/supabase";
import React, { useState } from "react";
import ReservationInfoList from "./ReservationInfoList";
import useMyPageStore from "@/shared/zustand/myPageStore";

const AdminMenu = () => {
  const [showConsultList, setShowConsultList] = useState(false);
  const [showReservationList, setShowReservationList] = useState(false);
  const [showConsultButton, setShowConsultButton] = useState(true);
  const [showReservationButton, setShowReservationButton] = useState(true);
  const { hospitalName } = useMyPageStore();

  const handleConsultList = async () => {
    try {
      const { data, error } = await supabase.from("consult_info").select("*");
      if (error) throw new Error(error.message);
      console.log("data", data);
      setShowConsultButton(false);
      setShowReservationButton(false);
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

      setShowConsultButton(false);
      setShowReservationButton(false);
      setShowConsultList(false);
      setShowReservationList(true);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <>
      {showConsultButton && (
        <button onClick={handleConsultList}>실시간 상담</button>
      )}
      {showReservationButton && (
        <button onClick={handleReservationList}>예약 내역 관리</button>
      )}
      {showReservationList && <ReservationInfoList />}
    </>
  );
};

export default AdminMenu;
