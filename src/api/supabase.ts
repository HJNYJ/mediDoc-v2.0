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
