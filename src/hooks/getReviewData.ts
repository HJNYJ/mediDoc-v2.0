import { supabase } from "@/api/supabase";

export const uploadReviewPhotosUrl = async (
  url: string,
  review_id: string,
  hospital_id: string
) => {
  try {
    // url 문자열과 consult_id 값을 consult_photos 테이블에 넣기
    const { data, error } = await supabase
      .from("review_photos")
      .insert([{ photos: url, review_id, hospital_id }]);

    if (error) {
      console.log("url 업로드 error.... => ", error);
      return { error };
    }
    return { data };
  } catch (error) {
    console.log("url 업로드 error.... => ", error);
  }
};

export const fetchReviewImages = async () => {
  const { data, error } = await supabase.from("review_photos").select("*");
  if (error) {
    console.error("error", error);
    return;
  }
  return data;
};

export const fetchHospitalReviewImages = async (hospitalId: string) => {
  const { data, error } = await supabase
    .from("review_photos")
    .select("*")
    .eq("hospital_id", hospitalId);

  if (error) {
    throw new Error(error.message);
    return;
  }
  return data;
};

export const getReviewDetail = async (hospitalId: string) => {
  try {
    const { data, error } = await supabase
      .from("review_info")
      .select("*")
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
