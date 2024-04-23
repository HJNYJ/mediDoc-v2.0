import { supabase } from "@/api/supabase";

// 유저 정보 (ID, 이메일, 이름) 가져오기
export const getUserInfo = async () => {
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    const userName = session?.user?.user_metadata.name;
    if (error) throw new Error(error.message);
    return { userId, userEmail, userName };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
