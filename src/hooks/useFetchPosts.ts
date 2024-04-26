// import { supabase } from "@/api/supabase";
// import type { ConsultType } from "@/types";

// export const useFetchPosts = async (
//   currentTab: string,
//   page: number
// ): Promise<{ data: ConsultType[]; count: number }> => {
//   const {
//     // data: [],
//     count,
//     error
//   } = await supabase
//     .from("consult_info")
//     .select(
//       `consult_id,
//       user_name,
//       consult_title,
//       consult_content,
//       bodyparts,
//       hashtags,
//       consult_answer(*),
//       consult_photos(*)`,
//       { count: "exact" }
//     )
//     .eq("bodyparts", currentTab)
//     .range((page - 1) * 7, (page - 1) * 7 + 6);

//   if (error) {
//     console.error("Error fetching posts:", error);
//   }
// };
