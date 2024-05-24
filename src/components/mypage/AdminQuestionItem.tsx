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
    <div className="w-[358px] h-[71px] mx-auto">
      {myAnsweredConsults.length === 0 && (
        <p className="w-full text-center mt-[185px] text-[16px] text-gray-400">
          실시간 상담 내역이 없습니다.
        </p>
      )}
      {myAnsweredConsults.length > 0 && (
        <div className="mt-4 w-[358px]">
          {myAnsweredConsults.map((consult) => (
            <div
              key={consult.consult_id}
              className="flex flex-col items-center w-[358px] my-4 border border-gray-200 rounded-lg p-4 shadow-md"
            >
              <Link
                href={`/consult/${consult.consult_id}`}
                className="flex flex-row h-[71px] justify-center items-center"
              >
                <div className="w-[60px] h-[60px] overflow-hidden mr-[5.5px]">
                  {consult.photos.map((photo) => (
                    <Image
                      key={photo.photo_id}
                      src={photo.photos}
                      alt=""
                      width={100}
                      height={100}
                      className="w-[60px] h-[60px] object-cover rounded-[10px]"
                    />
                  ))}
                </div>
                <div className="flex flex-col justify-center ml-[5.5px] w-[211px] h-[71px]">
                  <p className="text-start semibold-18 mb-[8px] line-clamp-1">
                    {consult.questionInfo.consult_title}
                  </p>
                  <p className="text-start medium-14 text-gray-700 line-clamp-2">
                    {consult.questionInfo.consult_content}
                  </p>
                </div>
                <div className="flex flex-col justify-center ml-[18px] w-[57px] h-[27px]">
                  <span className="w-[49px] h-[16px] text-center rounded-[4px] medium-13 text-orange bg-amber-100 justify-center">
                    답변 완료
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminQuestionItem;
