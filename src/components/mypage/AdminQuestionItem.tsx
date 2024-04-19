import React, { useEffect, useState } from "react";
import { getMyConsultAnswerData } from "@/hooks/getMyConsultData";
import Link from "next/link";
import Image from "next/image";

interface ConsultAnswer {
  answer: string;
  answer_id: string;
  consult_id: string;
  department: string;
  hospital_id: string | null;
  hospital_name: string | null;
  user_email: string | null;
  user_id: string | null;
  photos: { photo_id: string; photos: string }[];
  questionInfo: {
    consult_title: string;
    consult_content: string;
  };
}

const AdminQuestionItem = () => {
  const [myAnsweredConsults, setMyAnsweredConsults] = useState<ConsultAnswer[]>(
    []
  );

  useEffect(() => {
    const fetchMyAnsweredConsults = async () => {
      try {
        const answeredConsults = await getMyConsultAnswerData();
        setMyAnsweredConsults(answeredConsults || []);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      }
    };

    fetchMyAnsweredConsults();
  }, []);

  if (myAnsweredConsults === null) {
    return (
      <p className="w-full h-[19px] mx-[110.5px] mt-[185px] text-[16px] text-gray-400">
        실시간 상담 내역이 없습니다.
      </p>
    );
  }

  return (
    <>
      {myAnsweredConsults.length === 0 && (
        <p className="w-full h-[19px] mx-[110.5px] mt-[185px] text-[16px] text-gray-400">
          실시간 상담 내역이 없습니다.
        </p>
      )}
      {myAnsweredConsults.length > 0 && (
        <div className="mt-4">
          {myAnsweredConsults.map((consult) => (
            <div
              key={consult.consult_id}
              className="flex items-center w-96 m-4"
            >
              <Link href={`/consult/${consult.consult_id}`}>
                <span className="flex items-center w-full">
                  <div className="relative w-[60px] h-[60px] mr-4 overflow-hidden">
                    {consult.photos.map((photo) => (
                      <Image
                        key={photo.photo_id}
                        src={photo.photos}
                        alt=""
                        width={60}
                        height={60}
                        className="w-[60px] h-[60px] object-fit"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">
                        {consult.questionInfo.consult_title}
                      </h2>
                      <p className="text-sm text-gray-500 mb-2">
                        {consult.questionInfo.consult_content}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">답변 완료</p>
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminQuestionItem;
