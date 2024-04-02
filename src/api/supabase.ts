import { createClient } from "@supabase/supabase-js";

// 필요한 부분은 언제든 꺼내 쓸 수 있게
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// consult page
export const consultAddForm = async (newTitle: string, newContents: string) => {
  const { data, error } = await supabase.from("consult_info").insert([
    {
      consult_title: newTitle,
      consult_content: newContents
    }
  ]);
  return { data, error };
};

// 다른 DB랑 연결하는
export const consultSymptomTest = async () => {
  const { data, error } = await supabase
    .from("consult_info")
    .select(`*, symptom_questions:symptoms_abbr(*)`)
    .eq("ears", true);
  console.log(data);
  return { data, error };
};

export async function getRegions() {
  const { data, error } = await supabase
    .from("consult_info")
    .select("bodysection1");

  if (error) console.log("error", error);
  console.log(data);
  return data;
}
