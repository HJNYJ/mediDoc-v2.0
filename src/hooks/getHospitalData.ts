import { supabase } from "@/api/supabase";

// 병원 전체 데이터를 가져오는 함수
export const fetchHospitalList = async () => {
  try {
    const { data: hospitalData, error } = await supabase
      .from("hospital_info")
      .select("*")
      .order("hospital_address", { ascending: true });

    if (error) {
      alert(`DB 에러 => ${error}`);
      console.error("DB를 연동하는 동안 에러가 발생했습니다. => ", error);
      throw error;
    }

    if (!hospitalData) {
      return "데이터가 존재하지 않습니다.";
    }

    return hospitalData;
  } catch (error) {
    alert("에러 발생 => " + error);
    console.error("에러 발생 => ", error);
  }
};

// 선택한 병원의 데이터를 가져오는 함수
export const fetchHospitalData = async (hospital_id: string) => {
  try {
    const { data: hospitalData, error } = await supabase
      .from("hospital_info")
      .select("*")
      .eq("hospital_id", hospital_id)
      .single();

    if (error) {
      alert(`DB 에러 => ${error}`);
      console.error("DB를 연동하는 동안 에러가 발생했습니다. => ", error);
      throw error;
    }

    if (!hospitalData) {
      return "데이터가 존재하지 않습니다.";
    }

    return hospitalData;
  } catch (error) {
    alert("에러 발생 => " + error);
    console.error("에러 발생 => ", error);
  }
};
