import { supabase } from "@/api/supabase";
import { getUserInfo } from "./getUserInfo";
import { v4 as uuidv4 } from "uuid";
import { ConsultType } from "@/types";

// 실시간 상담 글 추가하는 함수
export const consultAddForm = async (
  newTitle: string,
  newContents: string,
  newBodyParts: string | null,
  newHashTags: string[] | null,
  userName: string | null,
  userEmail: string | null
) => {
  try {
    const consultId = uuidv4();
    const userData = await getUserInfo();
    const userId = userData?.userId;
    await supabase.from("consult_info").insert({
      consult_id: consultId,
      consult_title: newTitle,
      consult_content: newContents,
      bodyparts: newBodyParts,
      hashtags: newHashTags,
      user_name: userName,
      user_email: userEmail
    });
    return { consultId, userId, userEmail };
  } catch (error) {
    if (error) {
      console.error("consultAddForm error", error);
      return;
    }
  }
};

// 실시간 상담에 추가한 사진 url string을 DB에 업로드하는 함수
export const uploadPhotosUrl = async (url: string, consult_id: string) => {
  try {
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

// 모든 실시간 상담 사진 불러오는 함수
export const fetchConsultImages = async () => {
  const { data, error } = await supabase.from("consult_photos").select("*");
  if (error) {
    console.error("error", error);
    return;
  }
  return data;
};

// 실시간 상담 글을 최신 순으로 정렬하기
export const fetchConsults = async (): Promise<ConsultType[] | null> => {
  const { data, error } = await supabase
    .from("consult_info")
    .select(
      `*,
        consult_answer(*),
        consult_photos(*)
        `
    )
    .order("created_at", { ascending: true });
  if (error) console.error("error", error);
  return data as ConsultType[] | null;
};

// 실시간 상담에서 글 id가 같은 글 가져오는 함수
export const getConsultDetail = async (consultId: string) => {
  try {
    const { data, error } = await supabase
      .from("consult_info")
      .select(
        `consult_id, 
        user_name, 
        user_email,
        consult_title, 
        consult_content,
        bodyparts, 
        hashtags,
        consult_answer(*),
        consult_photos(*)
        `
      )
      .eq("consult_id", consultId)
      .single();

    if (error) {
      console.error("상담 내역 상세 정보 가져오기 실패..", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("상담 내역 상세 정보 가져오기 실패ㅠㅡㅠ", error);
    return null;
  }
};

// 실시간 상담에서 user email 같으면 삭제 가능한 함수
export const getConsultCheckUser = async (consultId: string) => {
  try {
    const consultInform = await supabase
      .from("consult_info")
      .select(
        `consult_id, 
        user_name, 
        user_email,
        consult_title, 
        consult_content,
        bodyparts, 
        hashtags,
        consult_answer(*),
        consult_photos(*)
        `
      )
      .eq("consult_id", consultId)
      .single();

    console.log("consultInform ===> ", consultInform?.data?.user_email);

    return consultInform?.data;
  } catch (error) {
    console.error("상담 내역 상세 정보 가져오기 실패ㅠㅡㅠ", error);
    return null;
  }
};

// 실시간 상담 답변 중에서 글 id가 같은 답변 가져오는 함수
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
    return data;
  } catch (error) {
    console.error("답변 가져오기 실패...", error);
    return null;
  }
};
