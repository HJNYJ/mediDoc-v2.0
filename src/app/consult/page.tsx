// // 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import { checkConsultAnswer, fetchConsults, fetchImages } from "@/api/supabase";
import ConsultTabs from "@/components/consult/ConsultTabs";
import { useEffect, useState } from "react";
import Hashtag from "@/utils/hashtag";
import { useQuery } from "@tanstack/react-query";

// consult_photos: string[]; //다른 테이블로 따로 만들어야. id, url-text로
const ConsultPage = () => {
  const router = useRouter();
  const [consultsData, setConsultsData] = useState([]);
  const [consultPhotos, setConsultPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultsData = async () => {
      setIsLoading(true);
      const consultsData = await fetchConsults();
      setConsultsData(consultsData);
      setIsLoading(false);
    };

    const fetchConsultPhotos = async () => {
      setIsLoading(true);
      const consultPhotos = await fetchImages();
      setConsultPhotos(consultPhotos);
      setIsLoading(false);
    };

    fetchConsultsData();
    fetchConsultPhotos();
  }, []);

  const { data: checkAnswerData } = useQuery({
    queryKey: ["answerDetail"],
    queryFn: checkConsultAnswer
  });

  if (isLoading) return <p>Loading consults..!!</p>;
  if (error) return <p>error : {error}</p>;

  const handleCategoryChange = () => {
    // bodyparts 탭으로 변경
    // setSelectedBodyPart(bodypart);
  };

  const goToAskForm = () => {
    router.push(`/consult/ask`);
  };

  const goToDetailPage = (consultId: string) => {
    router.push(`/consult/${consultId}`);
  };

  return (
    <div className="flex flex-col">
      <div>
        <ConsultTabs handleCategoryChange={handleCategoryChange} />
      </div>
      <div className="w-[390px] h-[154px]">
        {consultsData?.map((consult) => (
          <div
            key={consult?.consult_id}
            className="flex p-4 mb-4 border border-gray-200 cursor-pointer"
            onClick={() => goToDetailPage(consult?.consult_id)} // 클릭 이벤트 핸들러 추가
          >
            <div className="flex flex-col justify-between">
              {consultPhotos
                ?.filter((image) => image?.consult_id === consult?.consult_id)
                ?.map((image) => (
                  <img
                    key={image?.photos_id}
                    src={image?.photos} // 이미지 URL
                    alt="Uploaded Image"
                    className="w-[90px] h-[80px] bg-gray-200 rounded-lg"
                  />
                ))}
            </div>
            <div>
              <p className="semibold-18 text-gray-800">
                {consult?.consult_title}
              </p>
              <p className="text-gray-700 regular-14">
                {consult?.consult_content}
              </p>
              <h2 className="text-lg font-semibold">{consult?.user_name}</h2>
              <div className="regular-12 w-[174px] h-[30px]">
                {consult?.hashtags
                  ?.toString()
                  .split(",")
                  .map((hashtag: string) => (
                    <Hashtag key={hashtag} hashtag={hashtag} />
                  ))}
              </div>
              {/* 답변 완료 여부에 따라 UI 요소 표시 */}
              {checkAnswerData && checkAnswerData[consult.consult_id] ? (
                <button className="bg-yellow-300 text-white rounded-md">
                  답변 완료
                </button>
              ) : (
                <button
                  className="bg-gray-300 text-gray-600 rounded-md"
                  disabled
                >
                  답변 대기 중
                </button>
              )}
            </div>
          </div>
        ))}
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
