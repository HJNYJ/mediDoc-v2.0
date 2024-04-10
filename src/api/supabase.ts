import type { ConsultInfoType } from "@/types";
import { createClient } from "@supabase/supabase-js";

// 필요한 부분은 언제든 꺼내 쓸 수 있게
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// consult page
export const consultAddForm = async (
  newTitle: string,
  newContents: string,
  newBodyParts: string,
  newHashTags: string[]

  // uploadedFileUrl: string[]
) => {
  const { data, error } = await supabase
    .from("consult_info")
    .insert([
      {
        consult_title: newTitle,
        consult_content: newContents,
        bodyparts: newBodyParts,
        hashtags: newHashTags

        // consult_photos: newConsultPhotos
      }
    ])
    .select();

  // await handleAddImages(uploadedFileUrl);
  if (error) {
    console.error("consultAddForm error", error);
    return;
  }
  return data;
};
//constId 복사해오기 , 잘못된 코드,,,
export const getConsultId = async () => {
  // consult_info 테이블에서 consult_id 값을 조회
  const { data, error } = await supabase
    .from("consult_info")
    .select(`*, consult_photos(consult_id)`);

  if (error) {
    console.log("getConsultId error => ", error);
  } else {
    console.log("consult_id 가져오기 성공 ===> ", data);
    return data;
  }

  console.log("이거 외래키 가져올 수 있나,,, => ", data); // 모든 배열을 가져오네
};

// url string 업로드하기
export const uploadPhotosUrl = async (url: string) => {
  const { data: consultId } = await supabase
    .from("consult_info")
    .select(`consult_id, consult_photos(consult_id)`);
  console.log("consultId", consultId);

  const consultIdString = consultId?.map((item) => item.consult_id).toString();
  console.log(consultIdString);
  // url 문자열과 consult_id 값을 consult_photos 테이블에 넣기
  const { data, error } = await supabase
    .from("consult_photos")
    .insert([{ photos: url, consult_id: consultIdString }])
    .single();

  if (error) {
    console.error("url 업로드 error.... => ", error);
    return error;
  }
  console.log("uploadPhotosUrl data up => ", data);
  return data;
};

export const fetchImages = async () => {
  const { data, error } = await supabase.from("consult_photos").select("*");
  if (error) {
    console.error("error", error);
    return;
  }

  return data;
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

export const fetchConsults = async () => {
  const { data, error } = await supabase
    .from("consult_info")
    .select(
      "consult_id, user_name, consult_title, consult_content, bodyparts, hashtags"
    );
  if (error) console.error("error", error);
  return data as ConsultInfoType[];
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

// consult detail page - 병원 답변 폼 외래키 연결
export const getAnswerDetail = async (consultId: string) => {
  try {
    const { data: answerId, error } = await supabase
      .from("consult_answer")
      .select("*")
      .eq("consult_id", consultId)
      .single();

    if (error) {
      console.error("답변 가져오기 실패..", error);
      throw error;
    }
    console.log("답변 가져오기 성공 ===> ", answerId);
    return answerId;
  } catch (error) {
    console.error("답변 가져오기 실패...", error);
    return null;
  }
};

// export const getConsultId = async () => {
//   const { data, error } = await supabase
//     .from("consult_info")
//     .select("consult_id, consult_answer:consult_id(*)");

//   if (error) {
//     console.error("consult_id 가져오기 실패..", error);
//     throw error;
//   }
//   console.log("consult_id 가져오기 성공 ===> ", data);
//   return data;
// };
