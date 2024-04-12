// 내가 한 질문 내역 div
"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/api/supabase";
import { getMyConsultData } from "@/hooks/getMyConsultData";
import Link from "next/link";

const MyQuestionItem = () => {
  const [myConsults, setMyConsults] = useState([]);

  useEffect(() => {
    // 일반 유저일 경우
    const fetchMyConsults = async () => {
      try {
        // 내가 한 질문을 가져오기
        const consults = await getMyConsultData();

        // 각 질문의 답변 상태를 확인하기
        for (const consult of consults) {
          const consultAnswer = await checkConsultAnswer(consult.consult_id);
          consult.answerStatus = consultAnswer ? "답변 완료" : "답변 대기";
        }

        console.log("consults", consults);
        setMyConsults(consults || []);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchMyConsults();
  }, []);

  // 각 질문의 답변 상태를 확인하는 함수
  const checkConsultAnswer = async (consultId) => {
    try {
      const { data, error } = await supabase
        .from("consult_answer")
        .select("*")
        .eq("consult_id", consultId);
      if (error) throw new Error(error.message);
      if (data) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <>
      {myConsults.length === 0 && <p>내가 한 질문이 없습니다.</p>}
      {myConsults.map((consult) => (
        <Link
          key={consult.consult_id}
          href={`/consult/${consult.consult_id}`}
          className="flex items-center w-96 m-4"
        >
          <div className="relative w-32 h-40 mr-4 overflow-hidden">
            {consult.photos.map((photo) => (
              <img
                key={photo.photo_id}
                src={photo.photos}
                alt=""
                className="w-full h-full object-fit"
              />
            ))}
          </div>
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {consult.consult_title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                {consult.consult_content}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">{consult.answerStatus}</p>
        </Link>
      ))}
    </>
  );
};

export default MyQuestionItem;
