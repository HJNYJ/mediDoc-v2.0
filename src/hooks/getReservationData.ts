import { supabase } from "@/api/supabase";

export const fetchReservationData = async () => {
  try {
    const { data: reservationData, error } = await supabase
      .from("reservation_info")
      .select("*");

    if (error) {
      alert("에러가 발생했습니다.");
      console.error("에러 => ", error);
      throw error;
    }

    if (!reservationData) {
      return "예약 내역이 존재하지 않습니다.";
    }

    return reservationData;
  } catch (error) {
    alert("에러 발생 => " + error);
    console.error("에러 발생 => ", error);
  }
};
