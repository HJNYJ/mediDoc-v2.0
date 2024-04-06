import { ConsultInfoType } from "@/types";
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
  // newConsultPhotos: string[]
) => {
  const { data, error } = await supabase.from("consult_info").insert([
    {
      consult_title: newTitle,
      consult_content: newContents,
      bodyparts: newBodyParts,
      hashtags: newHashTags
      // consult_photos: newConsultPhotos
    }
  ]);
  if (error) {
    console.error("consultAddForm 데이터 추가 실패", error);
    return error;
  } else {
    console.log("consultAddForm 추가 성공", data);
    return data;
  }
};

export const uploadPhotosUrl = async (url: string) => {
  // consult_info 테이블에서 consult_id 값을 조회
  const { data: consultData, error } = await supabase
    .from("consult_info")
    .select("consult_id");
  // .select("*");

  if (error) {
    console.error("Data fetch error", error);
    return error;
  }
  const newFileName = `${Math.random()}`;
  // 이미지 업로드
  const uploadResult = await supabase.storage
    .from("images")
    .upload(`user_images/${newFileName}`, url, {
      contentType: "image/*"
    });

  if (uploadResult.error) {
    console.error("Image upload error:", uploadResult.error);
    return;
  }
  // 조회된 consult_id 값을 consult_photos에 삽입
  const insertResult = await supabase.from("consult_photos").insert([
    {
      consult_id: consultData[0].consult_id,
      photos: url
    }
  ]);

  if (insertResult.error) {
    console.error("consultId 외래키로 가져오기 에러! => ", insertResult.error);
    return insertResult.error;
  }

  return insertResult.data;
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
