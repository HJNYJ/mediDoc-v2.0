import { createClient } from "@supabase/supabase-js";

// 필요한 부분은 언제든 꺼내 쓸 수 있게
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// consult page
export const consultAddForm = async (
  newTitle: string,
  newContents: string,
  newBodyParts: string
) => {
  const { data, error } = await supabase.from("consult_info").insert([
    {
      consult_title: newTitle,
      consult_content: newContents,
      bodyparts: newBodyParts
    }
  ]);
  return { data, error };
};

// 임시로 생성한 사용자 정보
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
// 임시 생성임

// 유저 정보 가져오기
export const getUserInform = async () => {
  const { data } = await supabase.auth.getUser();
  return data;
};

// 현재 로그인 유저 정보 가져오기
// export const getCurrentLoginUserInfo = async () => {
//   const {
//     data: { user: currentLoginUserInfo }
//   } = await supabase.auth.getUser();

//   return currentLoginUserInfo;
// };

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
