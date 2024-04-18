// 내가 한 질문 내역 div
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import { getMyConsultData } from "@/hooks/getMyConsultData";
import Link from "next/link";
import AnswerWaiting from "../layout/AnswerWaiting";
import AnswerComplete from "../layout/AnswerComplete";
import { ConsultType } from "@/types";

interface ConsultType {
  bodyparts: string | null;
  consult_content: string;
  consult_id: string;
  consult_title: string;
  created_at: string;
  hashtags: string[] | null;
  user_email: string | null;
  user_name: string | null;
  consult_photos: string;
  answerStatus: string; // Add the answerStatus property
}

const MyQuestionItem = () => {
  const [myConsults, setMyConsults] = useState<ConsultType[]>([]);

  useEffect(() => {
    const fetchMyConsults = async () => {
      try {
        const consults = await getMyConsultData();

        if (consults) {
          // 각 질문의 답변 상태를 확인하기
          for (const consult of consults) {
            const consultAnswer = await checkConsultAnswer(consult.consult_id);
            consult.answerStatus = consultAnswer;
          }
        }

        setMyConsults(consults || []);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchMyConsults();
  }, []);

  const checkConsultAnswer = async (
    consultId: string
  ): Promise<JSX.Element | string> => {
    try {
      const { data: checkConsultAnswer, error } = await supabase
        .from("consult_info")
        .select(
          `consult_id, 
           user_name, 
           consult_title, 
           consult_content,
           bodyparts, 
           hashtags,
           consult_answer(*)
          `
        )
        .eq("consult_id", consultId);

      if (error) throw new Error(error.message);

      if (checkConsultAnswer && checkConsultAnswer.length > 0) {
        if (checkConsultAnswer[0].consult_answer.length > 0) {
          return <AnswerComplete />;
        } else {
          return <AnswerWaiting />;
        }
      } else {
        return "답변 정보 없음";
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
      return "오류 발생";
    }
  };

  return (
    <>
      <section>
        {myConsults.length === 0 && (
          <p className="w-full h-[19px] mx-[110.5px] mt-[185px] text-[16px]  text-gray-400">
            내가 한 질문이 없습니다.
          </p>
        )}
      </section>
      <section className="w-[358px] mx-[16px]">
        {myConsults.map((consult) => (
          <Link
            key={consult.consult_id}
            href={`/consult/${consult.consult_id}`}
          >
            <a className="flex items-center w-96 m-4">
              <section className="flex flex-row w-[267px] h-[71px] mr-[34px] overflow-hidden">
                {consult.photos.map((photo) => (
                  <Image
                    key={photo.photo_id}
                    src={photo.photos}
                    alt=""
                    className="w-[60px] h-[60px] rounded-[10px] my-[5.5px] mr-[12px] object-fit"
                  />
                ))}
                <section className="flex flex-col w-[195px] h-[71px]">
                  <p className="w-[195px] h-[21px] mb-[8px] text-[18px] font-semibold ">
                    {consult.consult_title}
                  </p>
                  <p className="w-[186px] h-[42px] text-[14px] text-gray-500">
                    {consult.consult_content}
                  </p>
                </section>
              </section>
              <p
                className={`w-[57px] h-[27px] text-[13px] text-center place-content-center rounded-[4px]
                  ${consult.answerStatus === "답변 대기" ? " text-gray-500 bg-gray-200" : " text-amber-500 bg-amber-100"}
                `}
              >
                {consult.answerStatus}
              </p>
            </a>
          </Link>
        ))}
      </section>
    </>
  );
};

export default MyQuestionItem;
