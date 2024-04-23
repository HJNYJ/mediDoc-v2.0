import { supabase } from "@/api/supabase";

// 모든 예약 정보를 가져오는 함수
export const fetchReservationData = async () => {
  try {
    const { data: reservationData, error } = await supabase
      .from("reservation_info")
      .select("*");

    if (error) {
      alert("에러가 발생했습니다.");
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

// 건강검진 코스 선택하는 함수
export const selectCourseName = async () => {
  const response = await supabase
    .from("course_info")
    .select("*")
    .order("course_price", { ascending: true });
  const { data } = response;
  return data;
};

// 예약 페이지로 넘어갈 때 그 병원의 이름을 가져가는 함수
export const getHospitalName = async (hospitalId: string) => {
  const response = await supabase
    .from("hospital_info")
    .select("hospital_name")
    .eq("hospital_id", hospitalId);

  const { data } = response;
  return data;
};
