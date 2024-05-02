import { supabase } from "@/api/supabase";

const fetchHashtags = async (selectedCategory: string) => {
  try {
    const { data, error } = await supabase
      .from("consult_test")
      .select("tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9, tag10")
      .eq("body_section", selectedCategory);

    if (error) {
      console.error(error);
      return {};
    }

    if (data.length > 0) {
      const tags = data[0];
      return {
        tag1: tags.tag1,
        tag2: tags.tag2,
        tag3: tags.tag3,
        tag4: tags.tag4,
        tag5: tags.tag5,
        tag6: tags.tag6,
        tag7: tags.tag7,
        tag8: tags.tag8,
        tag9: tags.tag9,
        tag10: tags.tag10
      };
    } else {
      return {};
    }
  } catch (error) {
    console.error("에러 발생", error);
    return {};
  }
};

export default fetchHashtags;
