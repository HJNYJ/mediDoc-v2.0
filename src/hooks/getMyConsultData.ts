import { supabase } from "@/api/supabase";

interface ConsultAnswer {
  answer: string;
  answer_id: string;
  consult_id: string;
  department: string;
  hospital_id: string | null;
  hospital_name: string | null;
  user_email: string | null;
  user_id: string | null;
  photos: {
    consult_id: string;
    photo_id: string;
    photos: string;
    consult_info: {
      bodyparts: string | null;
      consult_content: string;
      consult_id: string;
      consult_title: string;
      created_at: string;
      hashtags: string | null;
      user_email: string | null;
      user_name: string | null;
    } | null;
  }[];
  questionInfo: {
    bodyparts: string | null;
    consult_content: string;
    consult_id: string;
    consult_title: string;
    created_at: string;
    hashtags: string | null;
    user_email: string | null;
    user_name: string | null;
  };
}
export const getMyConsultData = async () => {
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    const user = session?.user;
    const email = user?.email ?? "";

    const { data: consultInfo, error: consultInfoError } = await supabase
      .from("consult_info")
      .select(`*, consult_photos(*)`)
      .eq("user_email", email);

    if (consultInfoError) throw new Error(consultInfoError.message);

    for (const consult of consultInfo) {
      const { data: consultPhotos, error: consultPhotosError } = await supabase
        .from("consult_photos")
        .select("*")
        .eq("consult_id", consult.consult_id);

      if (consultPhotosError) throw new Error(consultPhotosError.message);

      consult.consult_photos = consultPhotos;
    }

    return consultInfo;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const getMyConsultAnswerData = async (): Promise<ConsultAnswer[]> => {
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const user = session?.user;
    const id = user?.id ?? "";

    const { data: userInfo, error: userInfoError } = await supabase
      .from("user_info")
      .select("*")
      .eq("user_id", id);

    if (userInfoError) throw new Error(userInfoError.message);

    if (userInfo[0].user_type === "hospital staff") {
      const { data: consultAnswerData, error: consultAnswerError } =
        await supabase
          .from("consult_answer")
          .select("*")
          .eq("user_id", userInfo[0].user_id);

      if (consultAnswerError) throw new Error(consultAnswerError.message);

      const combinedConsultAnswerData: ConsultAnswer[] = [];

      for (const answer of consultAnswerData) {
        const { data: consultPhotos, error: consultPhotosError } =
          await supabase
            .from("consult_photos")
            .select("*, consult_info(*)")
            .eq("consult_id", answer.consult_id);

        if (consultPhotosError) throw new Error(consultPhotosError.message);

        const { data: questionInfo, error: questionInfoError } = await supabase
          .from("consult_info")
          .select("*")
          .eq("consult_id", answer.consult_id);

        if (questionInfoError) throw new Error(questionInfoError.message);

        combinedConsultAnswerData.push({
          ...answer,
          photos: consultPhotos,
          questionInfo: questionInfo[0]
        });
      }

      return combinedConsultAnswerData;
    } else {
      return [];
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    return [];
  }
};
