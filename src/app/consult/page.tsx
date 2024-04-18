// // 실시간 상담 페이지 [최종적으로 나와야하는 = 부위 카테고리, 모든 게시글 리스트, 카테고리별 리스트, 작성하기 버튼]
"use client";

import { useRouter } from "next/navigation";
import { fetchConsults } from "@/api/supabase";
import ConsultTabs from "@/components/consult/ConsultTabs";
import { useEffect, useState } from "react";
import Hashtag from "@/utils/hashtag";
import Image from "next/image";
import addIcon from "@/assets/icons/consult/add.png";
import PagebackBtn from "@/components/layout/PageBackBtn";
import AnswerComplete from "@/components/layout/AnswerComplete";
import AnswerWaiting from "@/components/layout/AnswerWaiting";
import { ConsultType } from "@/types";

// consult_photos: string[]; //다른 테이블로 따로 만들어야. id, url-text로
const ConsultPage = () => {
  const router = useRouter();
  const [consultsData, setConsultsData] = useState<ConsultType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConsultsData = async () => {
      setIsLoading(true);
      const consultsData = await fetchConsults();
      setConsultsData(consultsData || []);
      setIsLoading(false);
    };

    fetchConsultsData();
  }, []);

  if (isLoading) return <p>Loading consults..!!</p>;
  // if (error) return <p>error : {error}</p>;

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
  const onClickHomeHandler = () => {
    router.push("/home");
  };

  return (
    <div className="w-full">
      <div className="mt-10 mb-5 flex justify-center it relative">
        <button className="flex absolute left-3" onClick={onClickHomeHandler}>
          <PagebackBtn />
        </button>
        <p className="flex">실시간 상담</p>
      </div>
      <ConsultTabs handleCategoryChange={handleCategoryChange} />
      <div className="h-[154px] top-151">
        {consultsData?.map((consult) => {
          return (
            <div
              key={consult?.consult_id}
              className="flex p-4 mb-4 cursor-pointer"
              onClick={() => goToDetailPage(consult?.consult_id)} // 클릭 이벤트 핸들러 추가
            >
              <div className="flex flex-col justify-between">
                {consult?.consult_photos && consult?.consult_photos.length ? (
                  consult?.consult_photos?.map((item) => {
                    return (
                      <img
                        key={item?.photo_id}
                        src={item?.photos || undefined} // 이미지 URL
                        alt="Uploaded Image"
                        className="w-[89px] h-[80px] bg-gray-300 rounded-lg flex-none order-0 flex-grow-0"
                      />
                    );
                  })
                ) : (
                  <img
                    src={`https://ifh.cc/g/WDVwsQ.png`} // 이미지 URL
                    alt="Uploaded Image"
                    className="w-[89px] h-[80px] bg-gray-300 rounded-lg flex-none order-0 flex-grow-0"
                  />
                )}
              </div>
              {/* <div className="flex flex-col justify-between">
                {consult?.consult_photos?.length ? (
                  consult?.consult_photos?.map((item) => {
                    return (
                      <img
                        key={item?.photo_id}
                        src={item?.photos} // 이미지 URL
                        alt="Uploaded Image"
                        className="w-[89px] h-[80px] bg-gray-300 rounded-lg flex-none order-0 flex-grow-0"
                      />
                    );
                  })
                ) : (
                  <img
                    src={`https://ifh.cc/g/WDVwsQ.png`} // 이미지 URL
                    alt="Uploaded Image"
                    className="w-[89px] h-[80px] bg-gray-300 rounded-lg flex-none order-0 flex-grow-0"
                  />
                )}
              </div> */}

              <div className="ml-4 w-full overflow-hidden">
                <p className="semibold-18 text-gray-800">
                  {consult?.consult_title}
                </p>
                <p className="text-gray-700 regular-14 mb-2">
                  {consult?.consult_content}
                </p>
                <div className="mb-4 flex">
                  {consult?.hashtags
                    ?.toString()
                    .split(",")
                    .map((hashtag: string) => (
                      <Hashtag key={hashtag} hashtag={hashtag} />
                    ))}
                </div>
                {consult?.consult_answer &&
                consult?.consult_answer?.length > 0 ? (
                  <AnswerComplete />
                ) : (
                  <AnswerWaiting />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <hr className="w-full border-solid border-gray-400 border-1 mb-3" />
      {/* 밑 줄 이거를 어떻게 반복 시킬까... */}
      <div className="relative">
        <button onClick={goToAskForm} className="fixed bottom-14 right-3">
          <Image src={addIcon} alt="작성하기" className="w-[80px] h-[80px]" />
        </button>
      </div>
    </div>
  );
};

export default ConsultPage;
