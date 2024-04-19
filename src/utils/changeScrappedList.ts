import { supabase } from "@/api/supabase";

export const addScrappedList = async (hospitalId: string, userId: string) => {
  try {
    const { error } = await supabase
      .from("scrapped_list")
      .insert([{ hospital_id: hospitalId, user_id: userId }]);
    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const removeScrappedList = async (
  hospitalId: string,
  userId: string
) => {
  try {
    const { error } = await supabase
      .from("scrapped_list")
      .delete()
      .eq("hospital_id", hospitalId)
      .eq("user_id", userId);
    if (error) {
      throw error;
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};
