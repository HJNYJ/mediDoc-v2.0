// // 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { fetchConsults, supabase } from "@/api/supabase";
import ConsultTabs from "@/components/consult/ConsultTabs";
import { ConsultInfoType } from "@/types";
import { useQuery } from "@tanstack/react-query";
// import Image from "next/image";

// consult_photos: string[]; //다른 테이블로 따로 만들어야. id, url-text로
const ConsultPage = () => {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("");

  const {
    isLoading,
    error,
    data: consultsData
  } = useQuery({ queryKey: ["consults"], queryFn: fetchConsults });

  if (isLoading) return <p>Loading consults..!!</p>;
  if (error) return <p>error : {error.message}</p>;

  const handleCategoryChange = (bodypart: string) => {
    // bodyparts 탭으로 변경
    setSelectedBodyPart(bodypart);
  };

  const handleImagePreview = (photoURL: string | null) => {
    if (photoURL) {
      setImageSrc(photoURL);
    } else {
      setImageSrc(null);
    }
  };

  const goToAskForm = () => {
    router.push(`/consult/ask`);
  };

  return (
    <div className="flex flex-col justify-between bg-green">
      <div className="flex justify-between items-center mb-4">
        <ConsultTabs handleCategoryChange={handleCategoryChange} />
      </div>
      <div>
        <p>이건 consultData!</p>
        {consultsData?.map((consult) => (
          <div
            key={consult.consult_id}
            className="bg-white rounded-md p-4 mb-4 border border-gray-200"
          >
            <p className="text-lg font-semibold mb-2">
              {consult.consult_title}
            </p>
            <p className="text-gray-700 mb-2">{consult.consult_content}</p>
            <h2 className="text-lg font-semibold">{consult.user_name}</h2>
            <div border-t border-gray-200>
              {consult.hashtags.split(",").map((hashtag: string) => (
                <span
                  key={hashtag}
                  className="inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 mr-2"
                >
                  #{hashtag.replace(/[\[\],_\/'"{}%&\*\(\);~\`\|:\?!]/g, "")}
                </span>
              ))}
            </div>
          </div>
        ))}
        <p>여기까지! consultData!</p>
      </div>

      <div className="border-t border-gray-200">
        <button
          onClick={goToAskForm}
          className="border-b py-4 flex justify-between items-center"
        >
          🖋🖋🖋작성
        </button>
      </div>
    </div>
  );
};

export default ConsultPage;
