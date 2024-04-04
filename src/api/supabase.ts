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
  newHashTags: string[],
  newConsultPhotos: string[]
) => {
  const { data, error } = await supabase.from("consult_info").insert([
    {
      consult_title: newTitle,
      consult_content: newContents,
      bodyparts: newBodyParts,
      hashtags: newHashTags,
      consult_photos: newConsultPhotos
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

export const getStaticProps = async ({
  params
}: {
  params: { tags: string[] };
}) => {
  const selectedTags = params.tags; // URL 파라미터에서 선택된 태그 추출

  const { data, error } = await supabase
    .from("consult_info")
    .select("hashtags")
    .eq("body_section", "eyes") // 카테고리 필터링 추가
    .in("hashtags", selectedTags) // 선택된 태그 필터링 추가
    .single();

  if (error) {
    console.error(error);
    return {
      props: {}
    };
  }

  return {
    props: {
      hashtags: data.hashtags
    }
  };
};

// // 임시로 생성한 사용자 정보
const tempUserInfo = {
  uid: 1111,
  email: "namnam123@gmail.com",
  user_name: "냠냠박사",
  user_images: ["https://ifh.cc/g/WDVwsQ.png", "https://ifh.cc/g/WDVwsQ.png"],
  user_metadata: {
    user_images: ["https://ifh.cc/g/WDVwsQ.png", "https://ifh.cc/g/WDVwsQ.png"],
    email: "namnam123@gmail.com",
    user_name: "냠냠박사"
  }
};

// 임시로 생성한 사용자 정보를 반환
export const getCurrentLoginUserInfo = async () => {
  return tempUserInfo;
};
// // 임시 생성임

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
