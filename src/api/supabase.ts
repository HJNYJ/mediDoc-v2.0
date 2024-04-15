import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";
import { v4 as uuidv4 } from "uuid";

// 필요한 부분은 언제든 꺼내 쓸 수 있게
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createBrowserClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

//consult id를 가진 답변이 있는지 확인
export const checkConsultAnswer = async (consultId: string) => {
  const { data: consultAnswer, error } = await supabase
    .from("consult_answer")
    .select("answer")
    .eq("consult_id", consultId)
    .single();

  if (error) {
    console.error("checkConsultAnswer error => ", error);
  }
  console.log("getInfoId consultAnswer => ", consultAnswer);
};

// consult page
export const consultAddForm = async (
  newTitle: string,
  newContents: string,
  newBodyParts: string,
  newHashTags: string[]
  // newUID: string // uuid

  // uploadedFileUrl: string[]
) => {
  try {
    // 실시간 상담 정보 저장 , 저장한 UUID 를 돌려주고,

    const consult_id = uuidv4();
    await supabase.from("consult_info").insert([
      {
        consult_id,
        consult_title: newTitle,
        consult_content: newContents,
        bodyparts: newBodyParts,
        hashtags: newHashTags

        // consult_photos: newConsultPhotos
      }
    ]);

    console.log("저장했음!!!~", consult_id);
    // await uploadPhotosUrl();
    return consult_id;
    //
  } catch (error) {
    if (error) {
      console.error("consultAddForm error", error);
      return;
    }
  }
};

// review page
export const reviewAddForm = async (
  newContents: string,
  newHashTags: string[],
  newRating: number
) => {
  try {
    const review_id = uuidv4();
    await supabase.from("review_info").insert([
      {
        review_id,
        content: newContents,
        hashtags: newHashTags,
        rating: newRating
      }
    ]);

    console.log("저장했음!!!~", review_id);
    return review_id;
  } catch (error) {
    if (error) {
      console.error("reviewAddForm error", error);
      return;
    }
  }
};

//constId 복사해오기 , 모든 아이디 가져옴
export const getConsultId = async () => {
  // consult_info 테이블에서 consult_id 값을 조회
  const { data, error } = await supabase
    .from("consult_info")
    .select(`*, consult_photos(consult_id)`); //필터링.........

  if (error) {
    console.log("getConsultId error => ", error);
  } else {
    console.log("consult_id 가져오기 성공 ===> ", data);
    return data;
  }

  console.log("이거 외래키 가져올 수 있나,,, => ", data); // 모든 배열을 가져오네
};

export const consultUserCheck = async () => {
  const { data, error } = await supabase.from("consult_info").select("*");

  if (error) {
    console.error("error", error);
    return;
  }

  return data;
};

export const fetchReviewHashtags = async () => {
  const { data, error } = await supabase.from("review_hashtags").select("*");
  if (error) {
    console.error("error", error);
    return;
  }

  return data;
};

// url string 업로드하기 이거 되는 코드
export const uploadPhotosUrl = async (url: string, consult_id: string) => {
  try {
    // const consultId = await getConsultId();
    console.log("consult_id ===>", consult_id); //모든 consultId를 가져옴

    // const consultIdString = consultId?.map((item) => item.consult_id);
    // console.log("consultIdString", consultIdString?.[0]);
    // url 문자열과 consult_id 값을 consult_photos 테이블에 넣기
    const { data, error } = await supabase
      .from("consult_photos")
      .insert([{ photos: url, consult_id: consult_id }])
      .single();

    if (error) {
      console.error("uploadPhotosUrl error => ", error);
    }
    return data;
  } catch (error) {
    console.log("url 업로드 error.... => ", error);
    return error;
  }
};

export const uploadReviewPhotosUrl = async (url: string, review_id: string) => {
  try {
    // url 문자열과 consult_id 값을 consult_photos 테이블에 넣기
    const { data } = await supabase
      .from("review_photos")
      .insert([{ photos: url, review_id: review_id }])
      .single();

    console.log("uploadPhotosUrl data up => ", data);
    return data;
  } catch (error) {
    console.log("url 업로드 error.... => ", error);
    return error;
  }
};

export const insertAnswer = async () => {
  try {
    const { data: consultIdData } = await supabase
      .from("consult_answer")
      .select("consult_id");

    const consultId = consultIdData;
    console.log("consultId ===> ", consultId);
    // 병원 ID 가져오기
    const hospitalIdData = await getHospitalId();
    if (!hospitalIdData) {
      console.error("병원 ID를 가져올 수 없습니다.");
    }

    const hospitalId = hospitalIdData?.[0].hospital_id;
    console.log("병원 ID ===> ", hospitalId);

    // 답변 삽입
    const { data: insertedData, error: insertError } = await supabase
      .from("consult_answer")
      .insert([]);

    if (insertError) {
      throw insertError;
    }

    console.log("답변이 성공적으로 삽입되었습니다.");
    return insertedData;
  } catch (error) {
    console.error("답변 삽입 오류:", error);
    return null;
  }
};

export const fetchImages = async () => {
  const { data, error } = await supabase.from("consult_photos").select("*");
  if (error) {
    console.error("error", error);
    return;
  }

  return data;
};

export const fetchReviewImages = async () => {
  const { data, error } = await supabase.from("review_photos").select("*");
  if (error) {
    console.error("error", error);
    return;
  }

  return data;
};

export const fetchConsults = async () => {
  const { data, error } = await supabase
    .from("consult_info")
    .select(
      "consult_id, user_name, consult_title, consult_content, bodyparts, hashtags"
    );
  if (error) console.error("error", error);
  return data;
};

export const getConsultDetail = async (consultId: string) => {
  try {
    const { data, error } = await supabase
      .from("consult_info")
      .select("*")
      .eq("consult_id", consultId)
      .single();

    if (error) {
      console.error("상담 내역 상세 정보 가져오기 실패..", error);
      throw error;
    }

    console.log(data);
    return data; // 데이터 반환해!
  } catch (error) {
    console.error("상담 내역 상세 정보 가져오기 실패ㅠㅡㅠ", error);
    return null;
  }
};

export const getAnswerDetail = async (consultId: string) => {
  try {
    const { data, error } = await supabase
      .from("consult_answer")
      .select("*")
      .eq("consult_id", consultId);

    if (error) {
      console.error("답변 가져오기 실패..", error);
      throw error;
    }
    console.log("답변 가져오기 성공 ===> ", data);
    return data;
  } catch (error) {
    console.error("답변 가져오기 실패...", error);
    return null;
  }
};

// 유저 정보 가져오기
export const getUserInform = async () => {
  const { data } = await supabase.auth.getUser();
  return data;
};

// 유저 정보 업데이트
export const updateUserInform = async (name: string, images: string) => {
  const { data, error } = await supabase.auth.updateUser({
    data: { name, images }
  });
  if (error) {
    console.error("업데이트 에러 => ", error);
    return alert("업데이트를 다시 시도해주세요!");
  }
  return data;
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

export const hospitalName = async () => {
  const response = await supabase
    .from("reservation_info")
    .select("hospital_name");

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
