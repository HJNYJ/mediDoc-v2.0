import { supabase } from "@/api/supabase";

export const getUserId = async () => {
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    if (error) throw new Error(error.message);
    return userId;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
