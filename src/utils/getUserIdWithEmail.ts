import { supabase } from "@/api/supabase";

export const getUserIdwithEmail = async () => {
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    const userEmail = session?.user?.email;
    if (error) throw new Error(error.message);
    return { userId, userEmail };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return null;
  }
};
