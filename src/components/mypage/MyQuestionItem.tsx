// 내가 한 질문 내역 div
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import { getMyConsultData } from "@/hooks/getMyConsultData";
import Link from "next/link";
import AnswerWaiting from "../layout/AnswerWaiting";
import AnswerComplete from "../layout/AnswerComplete";
import Image from "next/image";

interface Consult {
  bodyparts: string | null;
  consult_content: string;
  consult_id: string;
  consult_title: string;
  created_at: string;
  hashtags: string[] | null;
  user_email: string | null;
  user_name: string | null;
  consult_photos: { photo_id: string; photos: string }[];
}

const MyQuestionItem = () => {
  const [myConsults, setMyConsults] = useState<Consult[]>([]);
  const [answerStatus, setAnswerStatus] = useState<object>([]);

  useEffect(() => {
    const fetchMyConsults = async () => {
      try {
        const consults = (await getMyConsultData()) ?? [];

        for (const consult of consults) {
          consult.consult_photos = [];
        }
        setMyConsults(consults);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchMyConsults();
  }, []);

  const checkConsultAnswer = async (consultId: string) => {
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

  useEffect(() => {
    const updateAnswerStatus = async () => {
      const status = await Promise.all(
        myConsults.map((consult) => checkConsultAnswer(consult.consult_id))
      );

      setAnswerStatus(status);
    };

    updateAnswerStatus();
  }, [myConsults]);

  return (
    <>
      <section>
        {myConsults.length === 0 && (
          <p className="w-full h-[19px] mx-[110.5px] mt-[185px] text-[16px]  text-gray-400">
            내가 한 질문이 없습니다.
          </p>
        )}
      </section>
      <section>
        {myConsults.map((consult, index) => (
          <Link
            key={consult.consult_id}
            href={`/consult/${consult.consult_id}`}
          >
            <div className="flex justify-between items-center ">
              <section className="flex flex-row w-[70%] h-[71px] overflow-hidden text-ellipsis">
                {consult.consult_photos.map((photo) => (
                  <Image
                    key={photo.photo_id}
                    src={photo.photos}
                    alt=""
                    className="w-[60px] h-[60px] rounded-[10px] my-[5.5px] mr-[12px] object-fit"
                  />
                ))}
                <section className="flex flex-col  h-[71px]">
                  <p className=" h-[21px] mb-[8px] text-[18px] font-semibold overflow-hidden">
                    {/** 글자 ...표기 */}
                    {consult.consult_title}
                  </p>
                  <p className=" h-[42px] text-[14px] text-gray-500">
                    {consult.consult_content}
                  </p>
                </section>
              </section>
              <p
                className={`h-[27px] text-[13px] text-center place-content-center rounded-[4px]
                  ${
                    answerStatus[index] === "답변 대기" ? (
                      <AnswerWaiting />
                    ) : (
                      <AnswerComplete />
                    )
                  }
                `}
              >
                {answerStatus[index]}
              </p>
              <p>삭제</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default MyQuestionItem;
