"use client";

import React, { useEffect, useState } from "react";
import { getMyConsultAnswerData } from "@/hooks/getMyConsultData";
import Link from "next/link";

const AdminQuestionItem = () => {
  const [myAnsweredConsults, setMyAnsweredConsults] = useState([]);

  // 병원 관계자일 경우
  useEffect(() => {
    const fetchMyAnsweredConsults = async () => {
      try {
        // 자신이 답변한 질문 가져오기
        const answeredConsults = await getMyConsultAnswerData();
        console.log("answeredConsults", answeredConsults);
        setMyAnsweredConsults(answeredConsults || []);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchMyAnsweredConsults();
  }, []);
  return (
    <>
      {myAnsweredConsults.length === 0 && <p>실시간 상담 내역이 없습니다.</p>}
      {myAnsweredConsults.length > 0 && (
        <div className="mt-4">
          {myAnsweredConsults.map((consult) => (
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
              {/* <div className="flex flex-col justify-between flex-1">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    {consult.consult_info.consult_title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2">
                    {consult.consult_info.consult_content}
                  </p>
                </div>
              </div> */}
              <p className="text-sm text-gray-500">답변 완료</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminQuestionItem;
