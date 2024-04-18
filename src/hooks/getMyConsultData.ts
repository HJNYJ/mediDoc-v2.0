import { supabase } from "@/api/supabase";

export const getMyConsultData = async () => {
  try {
    // 유저 정보 가져오기
    const {
      data: { session }
    } = await supabase.auth.getSession();

    const user = session?.user;

    // 내가 작성한 상담글 가져오기
    // 1. consult_info에서 user_email이 일치하는 것 가져오기
    const { data: consultInfo, error: consultInfoError } = await supabase
      .from("consult_info")
      .select(`*, consult_photos(*)`)
      .eq("user_email", user?.email || "");

    if (consultInfoError) throw new Error(consultInfoError.message);

    // 2. consult_photos에서 consult_id가 일치하는 사진 가져오기
    for (const consult of consultInfo) {
      const { data: consultPhotos, error: consultPhotosError } = await supabase
        .from("consult_photos")
        .select("*")
        .eq("consult_id", consult.consult_id);

      if (consultPhotosError) throw new Error(consultPhotosError.message);

      consult.photos = consultPhotos;
    }

    return consultInfo;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const getMyConsultAnswerData = async () => {
  try {
    // 병원 관계자의 정보 가져오기
    const {
      data: { session }
    } = await supabase.auth.getSession();
    const user = session?.user;

    // 병원 관계자인지 확인
    const { data: userInfo, error: userInfoError } = await supabase
      .from("user_info")
      .select("*")
      .eq("user_id", user?.id || "");

    if (userInfoError) throw new Error(userInfoError.message);

    // 병원 관계자일 경우
    if (userInfo[0].user_type === "hospital staff") {
      // 병원 관계자가 작성한 답변 가져오기
      const { data: consultAnswerData, error: consultAnswerError } =
        await supabase
          .from("consult_answer")
          .select("*")
          .eq("user_id", userInfo[0].user_id);
      console.log("consultAnswerData", consultAnswerData);
      if (consultAnswerError) throw new Error(consultAnswerError.message);

      // 병원 관계자가 작성한 답변에 있는 상담 정보와 사진 가져오기
      for (const answer of consultAnswerData) {
        // 사진 가져오기
        const { data: consultPhotos, error: consultPhotosError } =
          await supabase
            .from("consult_photos")
            .select("*, consult_info(*)")
            .eq("consult_id", answer.consult_id);

        if (consultPhotosError) throw new Error(consultPhotosError.message);

        // 상담글 가져오기
        const { data: questionInfo, error: questionInfoError } = await supabase
          .from("consult_info")
          .select("*")
          .eq("consult_id", answer.consult_id);
        if (questionInfoError) throw new Error(questionInfoError.message);
        console.log("questionInfo", questionInfo);

        answer.photos = consultPhotos;
        answer.questionInfo = questionInfo[0];
      }

      return consultAnswerData;
    } else {
      return [];
    }
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};
