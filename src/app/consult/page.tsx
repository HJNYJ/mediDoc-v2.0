// // 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import { checkConsultAnswer, fetchConsults, fetchImages } from "@/api/supabase";
import ConsultTabs from "@/components/consult/ConsultTabs";
import { useEffect, useState } from "react";
import Hashtag from "@/utils/hashtag";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import addIcon from "@/assets/icons/consult/add.png";
import searchbar from "@/assets/icons/consult/searchbar.png";
import answer_complete from "@/assets/icons/consult/answer_complete.png";
import answer_wait from "@/assets/icons/consult/answer_wait.png";

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
    <div className="mt-1 w-[390px] h-[945px]">
      <div className="mt-10 mb-5">
        <Image src={searchbar} alt="상단바" className="mb-4" />
        <ConsultTabs handleCategoryChange={handleCategoryChange} />
      </div>
      <div className="w-[390px] h-[154px] top-151 absolute">
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
                    className="w-[89px] h-[80px] bg-gray-300 rounded-lg flex-none order-0 flex-grow-0"
                  />
                ))}
            </div>
            <div className="ml-4 w-[262px] h-[113px] overflow-hidden">
              <p className="semibold-18 text-gray-800">
                {consult?.consult_title}
              </p>
              <p className="text-gray-700 regular-14 mb-2">
                {consult?.consult_content}
              </p>

              <div className="mb-2">
                {consult?.hashtags
                  ?.toString()
                  .split(",")
                  .map((hashtag: string) => (
                    <Hashtag key={hashtag} hashtag={hashtag} />
                  ))}
              </div>

              {checkAnswerData && checkAnswerData[consult.consult_id] ? (
                <Image src={answer_complete} alt="답변 완료" />
              ) : (
                <Image src={answer_wait} alt="답변 대기" />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <button onClick={goToAskForm} className="fixed bottom-14 right-3">
          <Image src={addIcon} alt="작성하기" className="w-[80px] h-[80px]" />
        </button>
      </div>
    </div>
  );
};

export default ConsultPage;
