import { supabase } from "@/api/supabase";

// 병원 전체 데이터를 가져오는 함수
export const fetchHospitalList = async (regionId: string | null) => {
  try {
    let response;
    if (regionId !== null) {
      // 지역별 병원 조회
      response = await supabase
        .from("hospital_info")
        .select(
          `
        *,
        hospital_region (*)`
        )
        .eq("region_id", regionId)
        .order("hospital_address", { ascending: true });
    } else {
      // 전체 병원 조회
      response = await supabase
        .from("hospital_info")
        .select(
          `
        *,
        hospital_region (*)`
        )
        .order("hospital_address", { ascending: true });
    }

    if (response.error) {
      alert(`DB 에러 => ${response.error}`);
      console.error(
        "DB를 연동하는 동안 에러가 발생했습니다. => ",
        response.error
      );
      throw response.error;
    }

    if (!response.data) {
      return "데이터가 존재하지 않습니다.";
    }

    return response.data;
  } catch (error) {
    alert("에러 발생 => " + error);
    console.error("에러 발생 => ", error);
  }
};

// 선택한 병원의 데이터를 가져오는 함수
// eslint-disable-next-line
export const fetchHospitalData = async (hospital_id: string): Promise<any> => {
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

export const getHospitalInfo = async (hospitalId: string) => {
  try {
    const { data, error } = await supabase
      .from("hospital_info")
      .select("*")
      .eq("hospital_id", hospitalId)
      .single();

    if (error) {
      console.error("error", error);
    }
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const getHospitalImages = async (hospitalId: string) => {
  try {
    const { data, error } = await supabase
      .from("hospital_info")
      .select("hospital_image")
      .eq("hospital_id", hospitalId);

    if (error) {
      console.error("error", error);
    }
    return data;
  } catch (error) {
    console.error("error", error);
    return null;
  }
};

export const courseNameSelect = async () => {
  const response = await supabase
    .from("course_info")
    .select("*")
    .order("course_price", { ascending: true });
  const { data } = response;
  return data;
};

export const getHospitalId = async () => {
  try {
    const { data } = await supabase.from("hospital_info").select("hospital_id");
    return data;
  } catch (error) {
    console.error("hospital_id를 가져오는 중 오류 발생:", error);
    return null;
  }
};

export const hospitalName = async (hospitalId: string) => {
  const response = await supabase
    .from("hospital_info")
    .select("hospital_name")
    .eq("hospital_id", hospitalId);

  const { data } = response;
  return data;
};

export const hospitalReservation = async () => {
  const response = await supabase.from("reservation_info").select("*");
  const { data } = response;
  return data;
};

export const hospitalRegion = async () => {
  const response = await supabase.from("hospital_region").select("*");
  const { data } = response;
  return data;
};

export const hospitalImage = async (hospitalId: string) => {
  const response = await supabase
    .from("hospital_info")
    .select("hospital_image")
    .eq("hospital_id", hospitalId);

  const { data } = response;
  return data;
};
